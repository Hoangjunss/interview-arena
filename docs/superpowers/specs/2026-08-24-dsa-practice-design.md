# DSA Practice with Code Execution — Design Spec

Date: 2026-08-24
Status: Approved for planning

## Problem

Interview Arena currently covers Q&A-style questions (Question Bank),
flashcards (SRS), multiple-choice quizzes, and AI mock interviews —
but nothing lets a user write and run actual code against test cases,
the way LeetCode/HackerRank do for algorithm/data-structure practice.
This is a distinct practice mode: a problem statement, a function
signature, hidden test cases, and pass/fail grading with real code
execution — which requires a code compiler/execution backend that
does not exist in this codebase today.

Goal: add a "DSA" (Data Structures & Algorithms) practice section —
problem list, per-problem code editor, and pass/fail grading against
test cases (some hidden) — backed by a self-hosted Judge0 instance for
safe, sandboxed code execution.

## Non-goals

- No admin UI / database-driven content authoring — DSA problems are
  authored as git-committed files, identical in spirit to
  `content/questions/*`.
- No support for languages beyond Java, Python, JavaScript, C++.
- No real-time collaborative editing, no code-run history diffing UI
  beyond a simple submission list.
- No changes to Question Bank / Flashcards / Quiz / Interview
  taxonomy (position/technology/level) — DSA uses its own
  topic/difficulty taxonomy, kept fully separate.
- No custom-built sandboxing — code execution is delegated entirely to
  self-hosted Judge0, not a hand-rolled Docker-per-submission service
  (rejected: far higher security/engineering burden for a solved
  problem).

## Architecture

### Execution engine: self-hosted Judge0

Judge0 (open-source, MIT-licensed code execution API) is added as new
services in the existing `docker-compose.yml`:

- `judge0-server` — the API Judge0 exposes for submissions.
- `judge0-workers` — the isolated execution workers (uses `isolate`
  sandboxing, requires the container to run with the capabilities
  Judge0's own compose reference config specifies — see Deployment
  Risks below).
- `judge0-db` (Postgres) and `judge0-redis` — Judge0's own queue/state
  stores, **kept separate** from the app's `postgres`/`redis` services
  to avoid coupling the app's schema/version lifecycle to Judge0's.

The backend never runs user code directly — it only calls Judge0's
REST API (`POST /submissions/batch?wait=true`) and reads back
`stdout`/`status` per submission.

### Backend: new `com.interviewarena.dsa` module

Follows the existing module layout (`question`, `quiz`, `interview`):

- `DsaController` — REST endpoints (below).
- `DsaService` — problem listing/detail, orchestrates submission flow.
- `DsaJudgeClient` — thin HTTP client wrapping Judge0's batch API.
- `DsaHarnessBuilder` — inserts submitted source into a problem's
  per-language harness template (see below).
- `DsaProblem` (entity) / `DsaProblemRepository` — mirrors
  `Question`/`QuestionRepository`.
- `DsaSubmission` (entity) / `DsaSubmissionRepository` — mirrors
  `QuizAttempt`/`QuizAttemptRepository`; one row per submit action.
- `DsaContentReader` — reads problem body/harnesses/starter
  code/test cases from `content/dsa/*` at request time, mirroring
  `QuestionContentReader`.
- `ContentIngestCli`/`ContentIngestService` are extended to also walk
  `content/dsa/*/problem.md` and upsert `DsaProblem` metadata rows
  (same upsert-by-slug logic already used for `Question`).

### I/O-based judging (the harness pattern)

Judge0 executes whole programs against stdin/stdout — it has no
concept of "call this function." Since DSA problems are function-based
(e.g. "implement `twoSum(nums, target)`"), each problem ships a
**harness template per language**: a complete, compilable/runnable
program containing a `{{USER_CODE}}` placeholder, which:

1. Reads one line of JSON from stdin (the test case's `input`).
2. Deserializes it into the parameter(s) the problem's function needs.
3. Calls the user's submitted function/class (inserted at
   `{{USER_CODE}}`).
4. Serializes the return value to JSON and prints it as the only
   stdout line.

Grading a submission: for each test case, `DsaHarnessBuilder` builds
the full source (harness + user code) once per language, then
`DsaJudgeClient` submits one Judge0 batch entry per test case with
that source and the case's `input` as stdin. A case passes if Judge0's
stdout (trimmed) equals the case's `expectedOutput` (trimmed) and the
submission status is `Accepted` (not a compile error, runtime error,
or time/memory limit exceeded).

## Content authoring format

```
content/dsa/<slug>/
  problem.md            # frontmatter: id, topic, difficulty, status, tags, created_at
                         # body: "## Đề bài (VI)" / "## Problem (EN)" markdown,
                         #       "## Ràng buộc (VI)" / "## Constraints (EN)"
  testcases.json         # [{ "input": "...", "expectedOutput": "...", "hidden": true|false }, ...]
  harness/
    java.template
    python.template
    javascript.template
    cpp.template
  starter/
    java.txt
    python.txt
    javascript.txt
    cpp.txt              # pre-filled into the editor per language
```

`problem.md` frontmatter fields:

```yaml
---
id: two-sum
topic: array
difficulty: easy
tags: [hash-map]
status: ACTIVE
created_at: 2026-08-24
---
```

`topic` and `difficulty` are free-form strings validated against a
fixed allow-list in `DsaFrontmatter` parsing (topics: `array`,
`linked-list`, `stack-queue`, `tree`, `graph`, `dynamic-programming`,
`string`, `sorting-searching`, `greedy`, `math` — extendable by adding
to the list, no migration needed since it's a `VARCHAR`, not an enum
column). `difficulty` is `easy` | `medium` | `hard`.

`testcases.json` entries with `hidden: true` are used for grading but
never returned to the client (their `input`/`expectedOutput` never
appear in an API response body). `hidden: false` entries are shown on
the problem page as worked examples and also included in grading.

## Data model

```sql
CREATE TABLE dsa_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(150) NOT NULL UNIQUE,
    topic VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    content_path VARCHAR(255) NOT NULL,
    synced_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE dsa_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    problem_id UUID NOT NULL REFERENCES dsa_problems(id),
    language VARCHAR(20) NOT NULL,
    source_code TEXT NOT NULL,
    verdict VARCHAR(20) NOT NULL,       -- PASSED | FAILED | ERROR
    passed_count INT NOT NULL,
    total_count INT NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX idx_dsa_submissions_user ON dsa_submissions(user_id);
```

## API

- `GET /api/dsa?topic=&difficulty=&page=&size=` → paginated list
  (slug, topic, difficulty) — same envelope shape as
  `GET /api/questions`.
- `GET /api/dsa/{slug}` → problem body (VI/EN), topic, difficulty,
  visible (non-hidden) sample test cases, and starter code per
  language (`{ java: "...", python: "...", javascript: "...", cpp: "..." }`).
- `POST /api/dsa/{slug}/submit` — body `{ language, code }` (language
  one of `java|python|javascript|cpp`) → runs the harness against all
  test cases via Judge0, persists a `DsaSubmission`, and returns:
  ```json
  {
    "verdict": "FAILED",
    "passedCount": 3,
    "totalCount": 5,
    "failures": [
      { "input": "[2,7,11,15], 9", "expected": "[0,1]", "actual": "[1,0]" }
    ]
  }
  ```
  `failures` only ever includes **visible** test cases — a hidden-case
  failure still counts toward `passedCount`/`totalCount` and flips
  `verdict`, but its `input`/`expected`/`actual` are omitted (returned
  as `null`) so hidden cases can never be reverse-engineered from a
  failed submission.

## Frontend

- `AppShell` nav gets a 5th top-level link: "DSA".
- `DsaListPage` — `topic`/`difficulty` filter bar (reusing the
  `Select` primitive from the frontend redesign), list of `Card`s with
  a difficulty `Badge` (easy=success, medium=warning, hard=destructive
  variant), pagination — same shape as `QuestionBankPage`.
- `DsaProblemPage` — two-column layout: left column renders the
  problem markdown (`MarkdownRenderer`, `prose` styling, reused as-is)
  plus the visible sample test cases; right column is a Monaco editor
  (`@monaco-editor/react`, dark theme to match the app's dark-mode-first
  design) with a language `Select` (Java/Python/JavaScript/C++,
  switching swaps in that language's starter code — a switch after
  edits starts confirms via a native `confirm()` since in-progress
  edits would be discarded) and two buttons: "Chạy thử" (submit,
  results shown inline) and results panel below showing per-visible-case
  pass/fail as `Card`s (success/danger variant) plus the aggregate
  `passedCount`/`totalCount` and verdict banner (`Alert`).
- Submission failures from the API (network error, Judge0 timeout →
  `ERROR` verdict) surface via the `toast` pattern established in the
  frontend redesign, not a silent console error.

## Progress integration

`ProgressService` gains a `DsaSubmissionRepository` dependency and
computes `dsaProblemsSolved` = count of distinct `problem_id` with at
least one `PASSED` submission for the user. `ProgressResponse` gains
this field; `ProgressPage` renders it as a 5th stat card ("Bài DSA đã
giải"), following the same `Card` + `lucide-react` icon pattern as the
other four stats.

## Security & abuse limits

- **Rate limiting**: DSA submissions are rate-limited per user using
  the same mechanism already protecting `POST /interviews` (a 429
  response with a Vietnamese message when exceeded) — code execution
  is the most abuse-prone endpoint in the app.
- **Per-submission resource limits**: Judge0 is configured with fixed
  CPU-time, wall-time, and memory limits per submission (Judge0
  supports this per-request via `cpu_time_limit`/`memory_limit`
  fields) — generous enough for correct DSA solutions, tight enough to
  bound worst-case abuse.
- **Backend timeout**: `DsaJudgeClient` enforces a max total wait
  across all test cases for one submission; exceeding it returns
  verdict `ERROR` with a generic "hết thời gian chấm bài, thử lại"
  message rather than hanging the request.
- **Source size cap**: submitted `code` is capped (e.g. 20 KB) at the
  request-validation layer, rejected with a 400 before ever reaching
  Judge0.

## Deployment risk (called out explicitly, not hidden)

Judge0's `isolate`-based sandboxing requires running its worker
container with elevated privileges (typically `privileged: true` or a
specific cgroup/seccomp/capabilities configuration matching Judge0's
own reference `docker-compose`) on the host. This is a materially
different trust boundary than the rest of the stack (Postgres, Redis,
Kafka, the Spring Boot backend) and must be reviewed against the
production host's isolation model before this ships — e.g. running the
Judge0 stack on a separate VM/host from the rest of the app is worth
considering rather than colocating a privileged container next to
production data stores. This review happens during the implementation
plan's infra task, not deferred silently.

## Testing strategy

- Backend: `DsaHarnessBuilderTest` (harness insertion is pure string
  templating — testable without Judge0), `DsaServiceTest` with a mocked
  `DsaJudgeClient` covering pass/fail/hidden-case-redaction logic.
- An integration test against a running Judge0 instance (tagged so it
  only runs when Judge0 is available, e.g. in CI with the compose
  stack up) covering one real Java/Python/JS/C++ submission each for
  the seed problem.
- Frontend: `DsaProblemPage.test.tsx` mocks the submit API response and
  asserts the pass/fail panel renders correctly for both verdicts,
  following the existing `QuizPage.test.tsx` pattern (assert on visible
  text/role, not markup).

## Rollout

1. Add Judge0 to `docker-compose.yml`; stand up the `dsa` backend
   module with one seed problem (`two-sum`) and validate one
   submission end-to-end per language via a manual/integration test —
   this is the highest-risk slice and should be validated before
   building any UI on top of it.
2. Content ingest wiring (`ContentIngestCli` extension) + `DsaListPage`
   + `DsaProblemPage` (read-only: problem statement, samples, starter
   code — no submit yet).
3. Wire the submit flow (Monaco editor, "Chạy thử" button, results
   panel, rate limiting).
4. Progress integration (`dsaProblemsSolved` stat card).
