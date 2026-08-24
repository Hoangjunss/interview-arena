# Production Foundation — TLS + Backup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the two remaining gaps from the Production Foundation spec — real TLS termination in `Caddyfile` (currently HTTP-only on `:80`) and a Postgres backup/restore path (currently nonexistent) — so the "go live on the VPS" step (spec §7 item 5) is actually complete.

**Architecture:** Parameterize the existing single `Caddyfile` with env-var placeholders (`{$DOMAIN}`, `{$ACME_EMAIL}`) so Caddy's built-in automatic-HTTPS picks Let's Encrypt for a real public domain and falls back to its internal self-signed CA for `localhost` — no templating machinery, no code change. Add a `postgres:16`-image sidecar container running a small POSIX shell script that `pg_dump`s on an interval and rotates old dumps by age; rotation logic lives in its own sourceable function so it has a real unit test independent of Docker/Postgres.

**Tech Stack:** Caddy 2.7 (already in the compose stack), POSIX `sh` (portable across the `postgres:16` Debian image and CI's Ubuntu runner), Docker Compose.

**Spec:** `docs/superpowers/specs/2026-08-24-production-foundation-design.md` (sections 4.2 TLS + reverse proxy, 4.5 Backup, §7 rollout item 5)

## Global Constraints

- No Kubernetes, no managed cloud, no service mesh (spec §3 "Approach", explicitly rejected).
- Single VPS, single domain, single `Caddyfile` checked into the repo — no config-generation/templating system (spec §4.2).
- Offsite backup replication is explicitly out of scope for this plan — local rotated dumps only (spec §4.5).
- No new infrastructure services beyond what spec §4.2/§4.5 already names (Caddy, one backup sidecar) — Postgres/Redis/Kafka stay as-is.
- `backend`, `postgres`, `redis`, `kafka` must not become newly reachable from outside the Docker network as a side effect of this work.

---

## File Structure

- `Caddyfile` (modify) — site address becomes `{$DOMAIN}` instead of the hardcoded `:80`, plus a global `email` directive for ACME registration.
- `docker-compose.yml` (modify) — `caddy` service gets `DOMAIN`/`ACME_EMAIL` env vars; new `backup` service + `pg_backups` named volume.
- `.env.example` (modify) — document the four new variables (`DOMAIN`, `ACME_EMAIL`, `BACKUP_RETENTION_DAYS`, `BACKUP_INTERVAL_SECONDS`).
- `backup/rotate.sh` (create) — pure, sourceable `rotate_backups()` function: deletes files matching a name pattern older than N days in a directory. No Postgres/Docker dependency — this is what gets unit-tested.
- `backup/test-rotate.sh` (create) — POSIX-sh test for `rotate_backups()` using a real temp directory and fabricated file mtimes.
- `backup/backup.sh` (create) — sources `rotate.sh`, runs `pg_dump -Fc` on an interval (or once, for testing), calls `rotate_backups` after each dump.
- `.github/workflows/ci.yml` (modify) — new `backup-script` job runs `backup/test-rotate.sh` so a rotation regression fails CI like everything else.

---

## Task 1: TLS via domain-parameterized Caddyfile

**Files:**
- Modify: `Caddyfile`
- Modify: `docker-compose.yml` (`caddy` service only)
- Modify: `.env.example`

**Interfaces:**
- Produces: env vars `DOMAIN` (default `localhost`) and `ACME_EMAIL` (default `admin@example.com`), read by the `caddy` container. Task 3 does not depend on these, but keep the names stable — they're the operator-facing contract for going live on a real domain.

- [ ] **Step 1: Rewrite `Caddyfile` to use env-var placeholders**

Replace the current fixed `:80` block with a global options block (for ACME account email) and a site address driven by `{$DOMAIN}`:

```caddyfile
{
	email {$ACME_EMAIL:admin@example.com}
}

{$DOMAIN:localhost} {
	# Proxy API and Health endpoints to Spring Boot backend
	reverse_proxy /api/* backend:8080
	reverse_proxy /actuator/health backend:8080

	# Serve built static frontend files
	root * /var/www/html
	file_server

	# Fallback to index.html for Single Page App routing
	try_files {path} /index.html
}
```

Caddy's automatic HTTPS treats `localhost` (and other non-public-looking names) as internal and issues a locally-trusted cert from its own CA; any real public hostname in `DOMAIN` gets a genuine Let's Encrypt cert via ACME with no further config. This is why no `tls internal` directive or environment branching is needed.

- [ ] **Step 2: Pass the new env vars into the `caddy` service**

In `docker-compose.yml`, the `caddy` service currently has no `environment:` key. Add one:

```yaml
  caddy:
    image: caddy:2.7-alpine
    ports:
      - "80:80"
      - "443:443"
    environment:
      DOMAIN: ${DOMAIN:-localhost}
      ACME_EMAIL: ${ACME_EMAIL:-admin@example.com}
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - ./web/dist:/var/www/html
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - backend
```

- [ ] **Step 3: Document the variables in `.env.example`**

Append:

```
DOMAIN=localhost
ACME_EMAIL=admin@example.com
```

- [ ] **Step 4: Validate the compose file parses and substitutes correctly**

Run: `docker compose config --quiet && echo COMPOSE_OK`
Expected: `COMPOSE_OK` printed, no errors. (This alone doesn't catch Caddyfile syntax errors — that's step 5.)

- [ ] **Step 5: Verify Caddy actually terminates TLS locally**

```bash
docker compose up -d --build backend caddy
sleep 5
curl -vk https://localhost/actuator/health
```

Expected: the verbose `curl` output shows a completed TLS handshake (`SSL connection using TLSv1.3` or similar, using Caddy's locally-trusted/internal cert since `DOMAIN` defaults to `localhost`), followed by an HTTP response forwarded from the backend's `/actuator/health` (Actuator's health JSON, or a `503`/`down` status if `postgres`/`redis`/`kafka` aren't up yet — either is fine, it proves the proxy chain is live; a TLS handshake failure or connection refused is not).

Tear down after confirming: `docker compose down`

- [ ] **Step 6: Commit**

```bash
git add Caddyfile docker-compose.yml .env.example
git commit -m "feat: parameterize Caddy TLS with DOMAIN/ACME_EMAIL for real Let's Encrypt certs"
```

---

## Task 2: Backup rotation logic (TDD)

**Files:**
- Create: `backup/rotate.sh`
- Test: `backup/test-rotate.sh`

**Interfaces:**
- Produces: `rotate_backups(dir, retention_days, pattern)` — a shell function, sourced (not executed as a subprocess) by both the test and by `backup.sh` in Task 3. Deletes files under `dir` (non-recursive) matching the glob `pattern` whose mtime is older than `retention_days` days.

- [ ] **Step 1: Write the failing test**

Create `backup/test-rotate.sh`:

```sh
#!/bin/sh
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "$SCRIPT_DIR/rotate.sh"

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

touch "$TMP_DIR/interview_arena-new.dump"
touch -d '10 days ago' "$TMP_DIR/interview_arena-old.dump"

rotate_backups "$TMP_DIR" 7 'interview_arena-*.dump'

if [ -f "$TMP_DIR/interview_arena-old.dump" ]; then
  echo "FAIL: old backup (10 days) was not deleted by 7-day retention"
  exit 1
fi

if [ ! -f "$TMP_DIR/interview_arena-new.dump" ]; then
  echo "FAIL: new backup was incorrectly deleted"
  exit 1
fi

echo "PASS: rotate_backups deleted the old backup and kept the new one"
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `chmod +x backup/test-rotate.sh && sh backup/test-rotate.sh`
Expected: FAIL — shell error sourcing `backup/rotate.sh` (`No such file or directory`), non-zero exit, because `rotate.sh` doesn't exist yet.

- [ ] **Step 3: Implement `rotate.sh`**

Create `backup/rotate.sh`:

```sh
#!/bin/sh
# rotate_backups <dir> <retention_days> <name_pattern>
# Deletes files in <dir> matching <name_pattern> whose mtime is older
# than <retention_days> days. Non-recursive.
set -eu

rotate_backups() {
  dir="$1"
  retention_days="$2"
  pattern="$3"

  find "$dir" -maxdepth 1 -name "$pattern" -mtime "+$retention_days" -print -delete
}
```

- [ ] **Step 4: Run the test again and confirm it passes**

Run: `sh backup/test-rotate.sh`
Expected: `PASS: rotate_backups deleted the old backup and kept the new one`, exit code 0.

- [ ] **Step 5: Wire the test into CI**

In `.github/workflows/ci.yml`, add a third job alongside `backend` and `frontend`:

```yaml
  backup-script:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run backup rotation unit test
        run: sh backup/test-rotate.sh
```

- [ ] **Step 6: Commit**

```bash
git add backup/rotate.sh backup/test-rotate.sh .github/workflows/ci.yml
git commit -m "feat: add tested backup rotation logic, enforced in CI"
```

---

## Task 3: Backup runner + Compose wiring + manual e2e verification

**Files:**
- Create: `backup/backup.sh`
- Modify: `docker-compose.yml` (add `backup` service + `pg_backups` volume)
- Modify: `.env.example`

**Interfaces:**
- Consumes: `rotate_backups(dir, retention_days, pattern)` from `backup/rotate.sh` (Task 2) — sourced by path, same signature.
- Consumes env vars set by the `backup` compose service: `DB_HOST`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `BACKUP_DIR` (defaults to `/backups`), `BACKUP_RETENTION_DAYS`, `BACKUP_INTERVAL_SECONDS`, and optional `BACKUP_RUN_ONCE=true` for one-shot verification runs.

- [ ] **Step 1: Write `backup/backup.sh`**

```sh
#!/bin/sh
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "$SCRIPT_DIR/rotate.sh"

BACKUP_DIR="${BACKUP_DIR:-/backups}"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-7}"
BACKUP_INTERVAL_SECONDS="${BACKUP_INTERVAL_SECONDS:-86400}"

run_backup() {
  timestamp=$(date -u +%Y%m%dT%H%M%SZ)
  dump_file="$BACKUP_DIR/interview_arena-$timestamp.dump"

  echo "[backup] starting dump to $dump_file"
  PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -U "$DB_USERNAME" -d "$DB_NAME" -Fc -f "$dump_file"
  echo "[backup] dump complete: $(du -h "$dump_file" | cut -f1)"

  rotate_backups "$BACKUP_DIR" "$BACKUP_RETENTION_DAYS" 'interview_arena-*.dump'
}

run_backup

if [ "${BACKUP_RUN_ONCE:-false}" = "true" ]; then
  exit 0
fi

while true; do
  sleep "$BACKUP_INTERVAL_SECONDS"
  run_backup
done
```

`-Fc` (custom format) is pg_dump's own compressed, restorable archive format — no separate `gzip` step and no extra package needed beyond what the `postgres:16` image already ships.

- [ ] **Step 2: Add the `backup` service and volume to `docker-compose.yml`**

Add this service (anywhere among the other services, e.g. after `backend`):

```yaml
  backup:
    image: postgres:16
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_NAME: interview_arena
      DB_USERNAME: ${DB_USERNAME:-interview_arena}
      DB_PASSWORD: ${DB_PASSWORD:-interview_arena}
      BACKUP_RETENTION_DAYS: ${BACKUP_RETENTION_DAYS:-7}
      BACKUP_INTERVAL_SECONDS: ${BACKUP_INTERVAL_SECONDS:-86400}
    entrypoint: ["/bin/sh", "/scripts/backup.sh"]
    volumes:
      - ./backup/backup.sh:/scripts/backup.sh:ro
      - ./backup/rotate.sh:/scripts/rotate.sh:ro
      - pg_backups:/backups
```

And add `pg_backups:` under the top-level `volumes:` key, alongside the existing `pg_data`, `caddy_data`, `caddy_config`.

- [ ] **Step 3: Document the remaining env vars in `.env.example`**

Append:

```
BACKUP_RETENTION_DAYS=7
BACKUP_INTERVAL_SECONDS=86400
```

- [ ] **Step 4: Verify a real dump gets produced and is restorable**

```bash
docker compose up -d postgres
docker compose run --rm -e BACKUP_RUN_ONCE=true backup
docker compose run --rm backup sh -c 'ls /backups'
```

Expected: the last command prints exactly one file named `interview_arena-<UTC timestamp>.dump`.

```bash
docker compose run --rm backup sh -c 'pg_restore --list /backups/$(ls /backups | tail -n1)'
```

Expected: a table-of-contents listing (schema/table entries), not an error — this confirms the dump is a valid, restorable custom-format archive, without needing a second database to actually restore into.

Tear down: `docker compose down -v` (the `-v` here is intentional cleanup of this test's throwaway volumes, not a production command).

- [ ] **Step 5: Commit**

```bash
git add backup/backup.sh docker-compose.yml .env.example
git commit -m "feat: add scheduled Postgres backup sidecar with rotation"
```

---

## Self-Review Notes

- **Spec coverage:** §4.2 (TLS via Caddy automatic HTTPS) → Task 1. §4.5 (`pg_dump` cron/sidecar with rotation, offsite replication explicitly deferred) → Tasks 2–3. §7 rollout item 5 (TLS + backup last) is satisfied by this plan running after everything else in the spec, which is already shipped (commit `de5d136`).
- **No new infra beyond spec:** only Caddy (already present) gets new config, and one `backup` sidecar (spec-named option) — no cron daemon on the host, no new database, no message queue.
- **Type/name consistency:** `rotate_backups(dir, retention_days, pattern)` signature is identical across `rotate.sh` (Task 2, defines it), `test-rotate.sh` (Task 2, calls it), and `backup.sh` (Task 3, calls it).
