# Interview Arena — Phase 1b: CI Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A GitHub Actions CI pipeline that runs backend and frontend tests
on every push/PR, so every subsequent commit from Phase 1 Task 2 onward is
verified automatically.

**Architecture:** Two independent jobs in one workflow file — `backend`
(JDK 21 + Maven, runs `./mvnw test`; Testcontainers pulls its own
ephemeral Postgres, and GitHub's `ubuntu-latest` runners have Docker
pre-installed so this works with no extra service containers declared) and
`frontend` (Node 20 + `npm ci` + `npx vitest run`). Both run on every
`push` and `pull_request` targeting any branch.

**Tech Stack:** GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-24-interview-arena-design.md`
**Overview/diagrams:** `docs/superpowers/plans/2026-08-24-interview-arena-00-overview.md`

## Global Constraints

- **Priority:** run this plan immediately after Phase 1 / Task 1 (repo
  scaffolding + docker-compose) and before Phase 1 / Task 2 (Spring Boot
  skeleton), so the very first backend/frontend commits already have CI
  coverage. Re-run/extend nothing retroactively — later phases just keep
  passing the same two jobs.
- No secrets are required for backend/frontend tests in CI — `LLM_API_KEY`
  is never called from unit tests (Phase 5's `OpenAiLlmClientTest` uses
  `MockRestServiceServer`, no network access needed).
- Do not cache in a way that hides a broken `pom.xml`/`package.json` —
  use the official `actions/setup-java` and `actions/setup-node` cache
  keys (keyed on lockfile hashes), not manual cache steps.

---

### Task 1: GitHub Actions workflow for backend + frontend tests

**Files:**
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Produces: a `backend` job and a `frontend` job, both required checks on
  PRs once branch protection is turned on (branch protection setup itself
  is a GitHub repo-settings action, not a file — do it manually via GitHub
  UI after this workflow's first successful run, since GitHub only lets
  you require checks that have run at least once).

- [ ] **Step 1: Write the workflow file**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: ["**"]
  pull_request:
    branches: ["**"]

jobs:
  backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: "21"
          cache: maven
          cache-dependency-path: backend/pom.xml

      - name: Run backend tests
        run: ./mvnw -B test

  frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: web
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node 20
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: web/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run frontend tests
        run: npx vitest run

      - name: Type-check
        run: npx tsc --noEmit
```

- [ ] **Step 2: Make `mvnw` executable (required for `./mvnw` to run on
  Linux CI runners even though Phase 1/Task 2 will generate it from a
  Windows dev machine)**

Run: `cd backend && git update-index --add --chmod=+x mvnw` (run this once
`mvnw` exists, i.e. after Phase 1 / Task 2's `mvn wrapper:wrapper` or
Spring Initializr scaffold has produced it — if `backend/mvnw` does not
exist yet at the time this CI task runs, skip this step now and re-run it
as the last step of Phase 1 / Task 2 instead).

- [ ] **Step 3: Verify the workflow is syntactically valid**

Run: `cd .. && cat .github/workflows/ci.yml` and paste into
https://www.yamllint.com or run `npx -y js-yaml .github/workflows/ci.yml`
to confirm it parses as valid YAML before pushing (no GitHub Actions CLI
dry-run exists locally without `act`, which is not assumed installed).

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions workflow for backend and frontend tests"
```

- [ ] **Step 5: Push and confirm on GitHub**

Run: `git push -u origin <branch-name>` (only if a `origin` remote has
already been configured by the user — if not, this step is deferred until
the user creates the GitHub repo and adds the remote; note this explicitly
rather than silently skipping).
Expected: the Actions tab shows both `backend` and `frontend` jobs
running; once `pom.xml`/`package.json` exist from later Phase 1 tasks,
both go green.

---

## Definition of done for this phase

- `.github/workflows/ci.yml` exists and is valid YAML.
- Once a GitHub remote exists and this is pushed, both `backend` and
  `frontend` jobs appear in the Actions tab and pass once their respective
  `pom.xml`/`package.json` land from Phase 1 Tasks 2 and 7.
