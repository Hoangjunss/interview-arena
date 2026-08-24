# Production Foundation — Design Spec

**Status:** Approved for planning
**Depends on:** existing Phase 1–5 implementation (auth, question bank, flashcard SRS, quiz, AI mock interview)
**Out of scope (separate spec, next):** Freemium quota + Stripe billing (Phase 6 completion)

## 1. Problem

`interview-arena` runs today as a personal/demo project: `docker compose up` on
localhost, no TLS, no auth rate-limiting, no metrics, and at least one service
method (`FlashcardService.dueCards()`) that does an unbounded full-table scan
instead of using the index/cache the original design already built for it.
None of this matters with one developer and three seeded questions. It breaks
the moment real users (hundreds–low thousands) hit it on a single self-hosted
VPS.

This spec makes the app safe to expose to real users on that VPS, without
introducing infrastructure the target scale doesn't need (no Kubernetes, no
managed cloud, no read replicas, no service mesh).

## 2. Goals / Non-goals

**Goals:**
- CI is green and stays green (currently red for 5+ consecutive commits).
- Traffic is served over TLS through a reverse proxy, not raw Spring Boot.
- Secrets can't silently ship with dev defaults into production.
- Auth endpoints are protected from brute-force/credential stuffing.
- Postgres has a backup/restore path.
- Operators can see health/metrics/logs without SSH-ing in and grepping.
- Kafka consumer failures don't silently drop or infinitely retry messages.
- `dueCards()` and other unbounded-list query paths scale with data volume,
  not just row count today.
- Connection pool and batch settings are explicit, not framework defaults
  nobody chose on purpose.

**Non-goals:**
- Multi-region / horizontal auto-scaling (revisit only if traffic actually
  demands it — YAGNI at this scale).
- Managed cloud migration (explicitly staying on self-hosted VPS + Compose).
- Billing/Stripe/subscription enforcement (next spec).
- Read replicas, sharding, or any DB topology change beyond indexes/pooling.

## 3. Approach

Single self-hosted VPS running the existing `docker-compose.yml` stack plus:
a reverse proxy container (Caddy) terminating TLS, an Actuator-based
observability surface on the backend, and targeted fixes to the specific
query paths that don't scale. No new infrastructure services beyond Caddy —
Postgres/Redis/Kafka stay as-is, just configured and monitored properly.

Rejected alternative: move to managed cloud (RDS/ECS/MSK) now. Rejected
because the user explicitly chose self-host for cost, and nothing in this
spec requires managed services to be correct — TLS, backups, and pooling are
solvable on a single VPS.

## 4. Design

### 4.1 CI fix

`.github/workflows/ci.yml` frontend job pins `node-version: "20"`. `jsdom
^30` (via `vitest ^4`) requires `undici` internals (`webidl.util
.markAsUncloneable`) not present in Node 20's bundled fetch implementation —
confirmed via the actual failing run logs (`TypeError: webidl.util
.markAsUncloneable is not a function` inside `node_modules/undici/lib/web
/cache/cachestorage.js`, thrown from `jsdom/lib/api.js`). Fix: bump
`node-version` to `"22"`. No code change, no test change — this is purely an
environment mismatch that has been failing since the frontend was
scaffolded.

### 4.2 TLS + reverse proxy

Add a `caddy` service to `docker-compose.yml`:
- Terminates TLS via automatic Let's Encrypt (Caddy's built-in ACME).
- Reverse-proxies `/api/*` and `/actuator/health` to the `backend` service
  (not exposed on the host directly anymore — only Caddy binds 80/443).
- Serves the Vite production build (`web/dist`) as static files for
  everything else.
- Single `Caddyfile` checked into the repo (not templated — this is one VPS,
  one domain; no need for config-generation machinery).

`backend` and `postgres`/`redis`/`kafka` ports move to internal-only
(`expose`, not `ports`) in `docker-compose.yml` except Caddy's 80/443.

### 4.3 Secrets handling

Current state: `application.yml` embeds dev-value defaults directly in the
`${VAR:default}` syntax for `JWT_SECRET`, `DB_PASSWORD`, etc. — safe pattern
for local dev, dangerous if an operator forgets to override in prod and the
app starts anyway.

Fix: a `@PostConstruct` check in a new `ProductionSafetyConfig` (only active
under a `prod` Spring profile) that fails application startup if
`JWT_SECRET` equals the known dev-default string, or if `LLM_API_KEY` is
blank. This turns "silently running with a dev secret" into "won't boot" —
the cheapest possible guard, no secrets-manager integration needed at this
scale. `.env` (already gitignored, `.env.example` already exists) stays the
delivery mechanism for real secrets on the VPS.

### 4.4 Auth rate-limiting

`AuthController` (`/api/auth/login`, `/api/auth/register`) has no
throttling today. Add a `RateLimitFilter` (servlet filter, ahead of
`JwtAuthFilter` in the chain) that uses Redis (`INCR` + `EXPIRE`, already the
project's Redis client) keyed by `ip:endpoint`, e.g. 10 requests/minute per
IP on `/api/auth/*`. Returns `429` past the limit. This is the same Redis
instance already used for the SRS due-set — no new infra.

### 4.5 Backup

A `pg_dump` cron job (host crontab on the VPS, or a small `backup` sidecar
container running `pg_dump` on a schedule) writing compressed dumps to a
volume, rotated to keep the last N days. Out of scope: offsite replication —
note it as a follow-up once the VPS choice (and its snapshot capability) is
known, don't over-build now.

### 4.6 Observability

- Add `spring-boot-starter-actuator` to `pom.xml`. Expose
  `/actuator/health` (already duplicates the hand-rolled `HealthController`
  — replace it) and `/actuator/prometheus` (via `micrometer-registry-
  prometheus`) internally only (Caddy does not proxy `/actuator/prometheus`
  externally).
- Switch default logging to structured JSON (`logback-spring.xml` with
  `logstash-logback-encoder` or Spring Boot's built-in `structured-logging`
  property in 3.4+ — pin to whatever the current Boot 3.3.4 supports;
  confirm during planning) so logs are greppable/shippable without a
  Graylog-style stack.
- `InterviewScoringWorker` (Kafka consumer): add a dead-letter topic
  (`interview_answer_submitted.DLT`) via Spring Kafka's
  `DefaultErrorHandler` + `DeadLetterPublishingRecoverer`, with a bounded
  retry count (e.g. 3) instead of the current implicit unlimited-retry/
  silent-drop behavior. Expose consumer lag via Micrometer's Kafka binder
  (comes free with `spring-kafka` + Actuator/Micrometer already added above).

### 4.7 Query/load fixes

**`FlashcardService.dueCards()` (the concrete bug found):** currently loads
*all* `ACTIVE` questions via `questionRepository.findByStatus(...)` and *all*
of the user's `flashcard_reviews` via `repository.findByUserId(...)`, then
joins/filters in a Java stream — ignoring both the `idx_flashcard_reviews_due
(user_id, due_at)` index and the `srs:due:{userId}` Redis ZSET that
`reviewCard()` already populates on every review. Fix: read the due-card ID
set from the Redis ZSET (`ZRANGEBYSCORE srs:due:{userId} -inf now`) — this is
what the original design (`docs/superpowers/plans/...03-flashcard-srs.md`)
intended the ZSET *for*, just never wired up on the read side — then batch-
fetch only those `Question` rows by ID (`findAllById`). Falls back to the
indexed DB query (`FlashcardReviewRepository` gets a new
`findDueQuestionIds(userId, now)` derived query using the existing index) if
Redis is unavailable, so correctness doesn't depend on cache liveness.

**Pagination:** `GET /api/questions` (`QuestionController.list` →
`QuestionService.list` → `QuestionRepository
.findByStatusAndPositionAndTechnologyAndLevel`) returns an unbounded
`List`. Add `Pageable`/`Page<QuestionSummaryResponse>` — low urgency today
(3 seeded questions) but the interface changes now, before frontend code
depends on the unpaged shape, is cheaper than migrating later.

**HikariCP pool sizing:** currently unset (Spring Boot default: 10). Set
`spring.datasource.hikari.maximum-pool-size` and `minimum-idle` explicitly
in `application.yml` based on expected concurrent request volume at this
scale (small, fixed number — not auto-scaled) — exact number decided during
planning against the VPS's core count.

**Batch inserts:** `interview_turns` and `flashcard_reviews`/`quiz_attempts`
writes are one-row-at-a-time today, which is fine at this volume; enable
`hibernate.jdbc.batch_size` + `order_inserts`/`order_updates` as a cheap
no-behavior-change win since nothing depends on per-row round-trips.

**N+1 audit:** `FlashcardReviewRepository.findByUserIdAndDueAtLessThanEqual`
already uses `@EntityGraph(attributePaths = {"question"})` correctly.
`InterviewTurnRepository`/`QuizAttemptRepository`/`InterviewSessionRepository`
don't currently join across entities in a way that N+1s — no change needed
there today; flag as a check item for the future progress-dashboard feature
(Phase 6 depends on aggregating across `quiz_attempts` +
`flashcard_reviews` + `interview_sessions` per user, which is exactly where
N+1 shows up).

## 5. Data model changes

None. `FlashcardReviewRepository` gains one derived-query method
(`findDueQuestionIds`) using the existing `idx_flashcard_reviews_due` index —
no migration needed.

## 6. Testing

- CI fix: verified by the next push going green (backend job already
  passes; frontend job is the one under test).
- Rate limiter: unit test hitting the filter directly with a fake Redis
  (or embedded Redis) past the threshold, asserting 429.
- `ProductionSafetyConfig`: test that context refresh fails when
  `JWT_SECRET` is the dev-default under `prod` profile, and succeeds
  otherwise.
- `dueCards()` fix: existing `FlashcardServiceTest` gets rewritten for the
  new Redis-first + DB-fallback path; add a case where Redis is empty/down
  to assert the DB fallback still returns correct due cards.
- DLQ: `InterviewScoringWorkerTest` gains a case where the LLM client throws
  repeatedly and asserts the message lands on the `.DLT` topic after the
  retry budget is exhausted.
- Pagination: `QuestionServiceTest`/`QuestionRepositoryTest` updated for the
  `Page` return type.
- No new test infra needed — project already has Testcontainers (Postgres)
  and `spring-kafka-test`.

## 7. Rollout

Ordered so nothing downstream depends on something not yet shipped:
1. CI fix (unblocks trusting green CI for everything after).
2. Query/load fixes (4.7) — pure backend correctness/perf, no infra change,
   safe to ship immediately.
3. Secrets guard (4.3) + rate limiting (4.4) — security hardening, no infra
   change.
4. Observability (4.6) — Actuator/metrics/DLQ, needed to safely operate
   what comes next.
5. TLS/reverse proxy (4.2) + backup (4.5) — the actual "go live on the VPS"
   step, done last once everything it would expose is already hardened and
   observable.
