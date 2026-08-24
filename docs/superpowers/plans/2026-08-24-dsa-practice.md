# DSA Practice with Code Execution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a LeetCode-style DSA (Data Structures & Algorithms) practice mode — problem list, per-problem code editor, pass/fail grading against test cases (some hidden) across Java/Python/JavaScript/C++ — backed by a self-hosted Judge0 instance.

**Architecture:** Judge0 runs as new services in `docker-compose.yml` (its own Postgres+Redis, kept separate from the app's). A new `com.interviewarena.dsa` backend module follows the existing `question`/`quiz` module shape: content (problem statement, test cases, per-language harness templates, starter code) lives as git files under `content/dsa/*` and is ingested into Postgres metadata rows the same way `ContentIngestService` does for `content/questions/*`. Grading works by inserting the user's submitted code into a per-problem, per-language harness (a full program with a `{{USER_CODE}}` placeholder) and running it against each test case's stdin via Judge0's batch API, comparing stdout. The frontend adds a 5th nav section with a problem list and a Monaco-editor practice page, following the design-system patterns (`Card`, `Badge`, `Select`, `Alert`, `toast`) established by the prior frontend redesign.

**Tech Stack:** Judge0 (self-hosted, Docker), Spring Boot `RestClient` (existing pattern from `OpenAiLlmClient`), Jackson, Flyway migration, `@monaco-editor/react` (new frontend dependency).

**Spec:** `docs/superpowers/specs/2026-08-24-dsa-practice-design.md`

## Global Constraints

- No admin UI — DSA problems are authored as git files under `content/dsa/*`, ingested via a CLI, exactly like `content/questions/*`.
- Supported languages: Java, Python, JavaScript, C++ only.
- DSA uses its own `topic`/`difficulty` taxonomy — never reuse `position`/`technology`/`level`.
- `failures` in a submit response includes only **visible** (non-hidden) failed test cases; hidden test case content (`input`/`expectedOutput`) must never appear in any API response.
- Submitted source code is capped at 20,000 characters, rejected with 400 before reaching Judge0.
- DSA submissions are rate-limited per user per day (reuse the `QuotaExceededException` → 429 pattern already wired in `GlobalExceptionHandler`).
- Every task ends with: backend — `mvn test` passes; frontend — `npx vitest run`, `npm run lint`, `npm run build` all pass.
- Backend commands run from `backend/`; frontend commands run from `web/`, unless stated otherwise.

---

## File Structure

New backend files (`backend/src/main/java/com/interviewarena/dsa/`):
- `DsaProblem.java`, `DsaProblemStatus.java`, `DsaProblemRepository.java` (Task 2)
- `DsaSubmission.java`, `DsaVerdict.java`, `DsaSubmissionRepository.java` (Task 2)
- `DsaFrontmatter.java`, `DsaFrontmatterParser.java`, `DsaTestCase.java`, `DsaContentReader.java` (Task 3)
- `DsaContentIngestService.java`, `DsaContentIngestCli.java` (Task 4)
- `DsaHarnessBuilder.java` (Task 6)
- `judge/DsaJudgeClient.java`, `judge/JudgeSubmission.java`, `judge/JudgeResult.java` (Task 7)
- `exception/` — reuses `com.interviewarena.interview.exception.QuotaExceededException` (no new file)
- `DsaSubmissionQuotaService.java` (Task 8)
- `DsaService.java`, `dto/DsaProblemSummaryResponse.java`, `dto/DsaProblemDetailResponse.java`, `dto/DsaSampleTestCase.java`, `dto/SubmitDsaCodeRequest.java`, `dto/DsaSubmissionResultResponse.java`, `dto/DsaTestCaseFailure.java` (Task 9)
- `DsaController.java` (Task 10)
- `backend/src/main/java/com/interviewarena/config/DsaJudgeConfig.java` (Task 7)
- `backend/src/main/resources/db/migration/V8__create_dsa_problems.sql`, `V9__create_dsa_submissions.sql` (Task 2)

New content files: `content/dsa/two-sum/problem.md`, `testcases.json`, `harness/{java,python,javascript,cpp}.template`, `starter/{java,python,javascript,cpp}.txt` (Task 5).

New frontend files: `web/src/api/dsa.ts`, `web/src/types/dsa.ts`, `web/src/pages/DsaListPage.tsx`, `web/src/pages/DsaProblemPage.tsx` (Tasks 12–14).

Modified files: `docker-compose.yml`, new `judge0.conf` (Task 1); `backend/src/main/resources/application.yml` (Tasks 1, 7, 8); `backend/src/main/java/com/interviewarena/progress/ProgressService.java`, `.../dto/ProgressResponse.java` (Task 15); `web/src/components/layout/AppShell.tsx`, `web/src/App.tsx` (Task 13); `web/src/pages/ProgressPage.tsx`, `web/src/api/progress.ts` (Task 15).

---

### Task 1: Self-host Judge0 in docker-compose

**Files:**
- Modify: `docker-compose.yml`
- Create: `judge0.conf`
- Modify: `backend/src/main/resources/application.yml`

**Interfaces:**
- Produces: a running Judge0 API reachable at `http://judge0-server:2358` from other compose services, and `http://localhost:2358` from the host — consumed by Task 7's `DsaJudgeClient` via the new `app.judge0.base-url` config property.

- [ ] **Step 1: Add Judge0 services to `docker-compose.yml`**

Add these services (and their volumes) to the existing `docker-compose.yml`, alongside the current `postgres`/`redis`/`kafka`/`backend`/`caddy` services:

```yaml
  judge0-db:
    image: postgres:13.0
    environment:
      POSTGRES_DB: judge0
      POSTGRES_USER: judge0
      POSTGRES_PASSWORD: judge0
    volumes:
      - judge0_db_data:/var/lib/postgresql/data

  judge0-redis:
    image: redis:6.0
    command: ["redis-server", "--appendonly", "yes", "--requirepass", "judge0redis"]
    volumes:
      - judge0_redis_data:/data

  judge0-server:
    image: judge0/judge0:1.13.0
    volumes:
      - ./judge0.conf:/judge0.conf:ro
    privileged: true
    ports:
      - "127.0.0.1:2358:2358"
    depends_on:
      - judge0-db
      - judge0-redis

  judge0-workers:
    image: judge0/judge0:1.13.0
    command: ["./scripts/workers"]
    volumes:
      - ./judge0.conf:/judge0.conf:ro
    privileged: true
    depends_on:
      - judge0-db
      - judge0-redis
```

Add `judge0_db_data` and `judge0_redis_data` to the top-level `volumes:` block alongside the existing `pg_data`, `caddy_data`, `caddy_config`.

- [ ] **Step 2: Create `judge0.conf`**

```ini
POSTGRES_HOST=judge0-db
POSTGRES_DB=judge0
POSTGRES_USER=judge0
POSTGRES_PASSWORD=judge0
REDIS_HOST=judge0-redis
REDIS_PASSWORD=judge0redis
ENABLE_WAIT_RESULT=true
MAX_QUEUE_SIZE=100
```

`ENABLE_WAIT_RESULT=true` is required — Judge0 disables the synchronous `?wait=true` batch mode by default, and `DsaJudgeClient` (Task 7) depends on it.

- [ ] **Step 3: Add the Judge0 base URL to `application.yml`**

Edit `backend/src/main/resources/application.yml`, adding under the existing `app:` key (alongside `jwt` and `llm`):

```yaml
app:
  jwt:
    secret: ${JWT_SECRET:dev-only-secret-do-not-use-in-prod-please-change-to-something-longer}
    expiration-minutes: 120
  llm:
    api-key: ${LLM_API_KEY:}
    base-url: ${LLM_API_BASE_URL:https://api.openai.com/v1}
    model: ${LLM_MODEL:gpt-4o-mini}
  judge0:
    base-url: ${JUDGE0_BASE_URL:http://localhost:2358}
  dsa:
    free-daily-quota: ${DSA_FREE_DAILY_QUOTA:20}
    max-source-length: 20000
```

- [ ] **Step 4: Start the stack and verify Judge0 is reachable**

Run (from the repo root):
```bash
docker compose up -d judge0-db judge0-redis judge0-server judge0-workers
```
Wait ~30s for migrations to run, then:
```bash
curl http://localhost:2358/languages
```
Expected: a JSON array of language objects, confirming Judge0 is up. Note the `id` values for Java, Python (3.x), JavaScript (Node.js), and C++ (GCC) from this response — Task 7 uses the well-known Judge0 CE defaults (Java=62, Python=71, JavaScript=63, C++=54), but if this self-hosted instance's `/languages` response differs, record the actual IDs here for use in Task 7.

- [ ] **Step 5: Commit**

```bash
git add docker-compose.yml judge0.conf backend/src/main/resources/application.yml
git commit -m "chore: self-host Judge0 for DSA code execution"
```

---

### Task 2: DSA data model — entities, enums, repositories, migrations

**Files:**
- Create: `backend/src/main/resources/db/migration/V8__create_dsa_problems.sql`
- Create: `backend/src/main/resources/db/migration/V9__create_dsa_submissions.sql`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaProblemStatus.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaProblem.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaProblemRepository.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaVerdict.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaSubmission.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaSubmissionRepository.java`

**Interfaces:**
- Produces: `DsaProblem` (fields: `id`, `slug`, `topic`, `difficulty`, `status: DsaProblemStatus`, `contentPath`, `syncedAt`), `DsaProblemRepository.findBySlug(String): Optional<DsaProblem>`, `DsaProblemRepository.search(DsaProblemStatus, String topic, String difficulty, Pageable): Page<DsaProblem>` (topic/difficulty may be `null` to mean "no filter") — consumed by Tasks 4 and 9.
- Produces: `DsaSubmission` (fields: `id`, `userId`, `problemId`, `language`, `sourceCode`, `verdict: DsaVerdict`, `passedCount`, `totalCount`, `submittedAt`), `DsaSubmissionRepository.findByUserId(UUID): List<DsaSubmission>`, `DsaSubmissionRepository.countDistinctProblemIdByUserIdAndVerdict(UUID, DsaVerdict): long` — consumed by Tasks 9 and 15.

- [ ] **Step 1: Create migration `V8__create_dsa_problems.sql`**

```sql
-- V8__create_dsa_problems.sql
CREATE TABLE dsa_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(150) NOT NULL UNIQUE,
    topic VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    content_path VARCHAR(255) NOT NULL,
    synced_at TIMESTAMPTZ NOT NULL
);
```

- [ ] **Step 2: Create migration `V9__create_dsa_submissions.sql`**

```sql
-- V9__create_dsa_submissions.sql
CREATE TABLE dsa_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    problem_id UUID NOT NULL REFERENCES dsa_problems(id),
    language VARCHAR(20) NOT NULL,
    source_code TEXT NOT NULL,
    verdict VARCHAR(20) NOT NULL,
    passed_count INT NOT NULL,
    total_count INT NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_dsa_submissions_user ON dsa_submissions (user_id);
```

- [ ] **Step 3: Create `DsaProblemStatus.java` and `DsaProblem.java`**

```java
package com.interviewarena.dsa;

public enum DsaProblemStatus {
    DRAFT, ACTIVE
}
```

```java
package com.interviewarena.dsa;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "dsa_problems")
public class DsaProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false)
    private String difficulty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DsaProblemStatus status;

    @Column(name = "content_path", nullable = false)
    private String contentPath;

    @Column(name = "synced_at", nullable = false)
    private Instant syncedAt;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public DsaProblemStatus getStatus() { return status; }
    public void setStatus(DsaProblemStatus status) { this.status = status; }
    public String getContentPath() { return contentPath; }
    public void setContentPath(String contentPath) { this.contentPath = contentPath; }
    public Instant getSyncedAt() { return syncedAt; }
    public void setSyncedAt(Instant syncedAt) { this.syncedAt = syncedAt; }
}
```

- [ ] **Step 4: Create `DsaProblemRepository.java`**

```java
package com.interviewarena.dsa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DsaProblemRepository extends JpaRepository<DsaProblem, java.util.UUID> {
    Optional<DsaProblem> findBySlug(String slug);

    @Query("SELECT d FROM DsaProblem d WHERE d.status = :status " +
           "AND (:topic IS NULL OR d.topic = :topic) " +
           "AND (:difficulty IS NULL OR d.difficulty = :difficulty)")
    Page<DsaProblem> search(
        @Param("status") DsaProblemStatus status,
        @Param("topic") String topic,
        @Param("difficulty") String difficulty,
        Pageable pageable
    );
}
```

- [ ] **Step 5: Create `DsaVerdict.java` and `DsaSubmission.java`**

```java
package com.interviewarena.dsa;

public enum DsaVerdict {
    PASSED, FAILED, ERROR
}
```

```java
package com.interviewarena.dsa;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "dsa_submissions")
public class DsaSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "problem_id", nullable = false)
    private UUID problemId;

    @Column(nullable = false)
    private String language;

    @Column(name = "source_code", nullable = false, columnDefinition = "TEXT")
    private String sourceCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DsaVerdict verdict;

    @Column(name = "passed_count", nullable = false)
    private int passedCount;

    @Column(name = "total_count", nullable = false)
    private int totalCount;

    @Column(name = "submitted_at", nullable = false)
    private Instant submittedAt = Instant.now();

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public UUID getProblemId() { return problemId; }
    public void setProblemId(UUID problemId) { this.problemId = problemId; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getSourceCode() { return sourceCode; }
    public void setSourceCode(String sourceCode) { this.sourceCode = sourceCode; }
    public DsaVerdict getVerdict() { return verdict; }
    public void setVerdict(DsaVerdict verdict) { this.verdict = verdict; }
    public int getPassedCount() { return passedCount; }
    public void setPassedCount(int passedCount) { this.passedCount = passedCount; }
    public int getTotalCount() { return totalCount; }
    public void setTotalCount(int totalCount) { this.totalCount = totalCount; }
    public Instant getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(Instant submittedAt) { this.submittedAt = submittedAt; }
}
```

- [ ] **Step 6: Create `DsaSubmissionRepository.java`**

```java
package com.interviewarena.dsa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DsaSubmissionRepository extends JpaRepository<DsaSubmission, UUID> {
    List<DsaSubmission> findByUserId(UUID userId);

    @Query("SELECT COUNT(DISTINCT s.problemId) FROM DsaSubmission s " +
           "WHERE s.userId = :userId AND s.verdict = :verdict")
    long countDistinctProblemIdByUserIdAndVerdict(@Param("userId") UUID userId, @Param("verdict") DsaVerdict verdict);
}
```

- [ ] **Step 7: Verify**

Run: `mvn test` (from `backend/`)
Expected: PASS — Flyway validates the new migrations against a clean schema in tests using Testcontainers.

- [ ] **Step 8: Commit**

```bash
git add backend/src/main/resources/db/migration/V8__create_dsa_problems.sql backend/src/main/resources/db/migration/V9__create_dsa_submissions.sql backend/src/main/java/com/interviewarena/dsa/DsaProblemStatus.java backend/src/main/java/com/interviewarena/dsa/DsaProblem.java backend/src/main/java/com/interviewarena/dsa/DsaProblemRepository.java backend/src/main/java/com/interviewarena/dsa/DsaVerdict.java backend/src/main/java/com/interviewarena/dsa/DsaSubmission.java backend/src/main/java/com/interviewarena/dsa/DsaSubmissionRepository.java
git commit -m "feat: add DSA problem and submission data model"
```

---

### Task 3: DSA content parsing (frontmatter, test cases, content reader)

**Files:**
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaFrontmatter.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaFrontmatterParser.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaTestCase.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaContentReader.java`
- Test: `backend/src/test/java/com/interviewarena/dsa/DsaFrontmatterParserTest.java`
- Test: `backend/src/test/java/com/interviewarena/dsa/DsaContentReaderTest.java`

**Interfaces:**
- Produces: `DsaFrontmatter(String id, String topic, String difficulty, String status)`, `DsaFrontmatterParser.parse(Path): DsaFrontmatter` — consumed by Task 4.
- Produces: `DsaTestCase(String input, String expectedOutput, boolean hidden)`, `DsaContentReader.readBody(String relativeContentPath): String`, `.readStarterCode(String relativeContentPath, String language): String`, `.readHarness(String relativeContentPath, String language): String`, `.readTestCases(String relativeContentPath): List<DsaTestCase>` — consumed by Task 9. `relativeContentPath` is the directory relative to `content/dsa/`, e.g. `"two-sum"`.

- [ ] **Step 1: Create `DsaFrontmatter.java` and `DsaFrontmatterParser.java`**

```java
package com.interviewarena.dsa;

public record DsaFrontmatter(String id, String topic, String difficulty, String status) {}
```

```java
package com.interviewarena.dsa;

import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@Component
public class DsaFrontmatterParser {

    private static final List<String> REQUIRED_FIELDS = List.of("id", "topic", "difficulty", "status");

    public DsaFrontmatter parse(Path file) throws IOException {
        String content = Files.readString(file);
        String[] parts = content.split("(?m)^---\\s*$", 3);
        if (parts.length < 3) {
            throw new IllegalArgumentException("Missing YAML frontmatter delimiters in " + file);
        }
        Yaml yaml = new Yaml();
        Map<String, Object> data = yaml.load(parts[1]);

        for (String field : REQUIRED_FIELDS) {
            if (data == null || !data.containsKey(field) || data.get(field) == null) {
                throw new IllegalArgumentException("Missing required frontmatter field '" + field + "' in " + file);
            }
        }

        return new DsaFrontmatter(
            data.get("id").toString(),
            data.get("topic").toString(),
            data.get("difficulty").toString(),
            data.get("status").toString()
        );
    }
}
```

- [ ] **Step 2: Write the frontmatter parser test**

Create `backend/src/test/java/com/interviewarena/dsa/DsaFrontmatterParserTest.java`:

```java
package com.interviewarena.dsa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class DsaFrontmatterParserTest {

    private final DsaFrontmatterParser parser = new DsaFrontmatterParser();

    @Test
    void parse_readsAllRequiredFields(@TempDir Path dir) throws IOException {
        Path file = dir.resolve("problem.md");
        Files.writeString(file, """
            ---
            id: two-sum
            topic: array
            difficulty: easy
            status: ACTIVE
            ---

            ## Đề bài (VI)
            Nội dung.
            """);

        DsaFrontmatter fm = parser.parse(file);

        assertThat(fm.id()).isEqualTo("two-sum");
        assertThat(fm.topic()).isEqualTo("array");
        assertThat(fm.difficulty()).isEqualTo("easy");
        assertThat(fm.status()).isEqualTo("ACTIVE");
    }

    @Test
    void parse_throwsWhenRequiredFieldMissing(@TempDir Path dir) throws IOException {
        Path file = dir.resolve("problem.md");
        Files.writeString(file, """
            ---
            id: two-sum
            topic: array
            ---

            body
            """);

        assertThatThrownBy(() -> parser.parse(file)).isInstanceOf(IllegalArgumentException.class);
    }
}
```

- [ ] **Step 3: Run the test to verify it passes**

Run: `mvn test -Dtest=DsaFrontmatterParserTest`
Expected: PASS.

- [ ] **Step 4: Create `DsaTestCase.java`**

```java
package com.interviewarena.dsa;

public record DsaTestCase(String input, String expectedOutput, boolean hidden) {}
```

- [ ] **Step 5: Create `DsaContentReader.java`**

```java
package com.interviewarena.dsa;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Component
public class DsaContentReader {

    private static final Path CONTENT_ROOT = Path.of("..", "content", "dsa");
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String readBody(String relativeContentPath) {
        try {
            String raw = Files.readString(CONTENT_ROOT.resolve(relativeContentPath).resolve("problem.md"));
            String[] parts = raw.split("(?m)^---\\s*$", 3);
            return parts.length == 3 ? parts[2].strip() : raw.strip();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    public String readStarterCode(String relativeContentPath, String language) {
        return readFile(relativeContentPath, "starter", starterFileName(language));
    }

    public String readHarness(String relativeContentPath, String language) {
        return readFile(relativeContentPath, "harness", harnessFileName(language));
    }

    public List<DsaTestCase> readTestCases(String relativeContentPath) {
        try {
            byte[] json = Files.readAllBytes(CONTENT_ROOT.resolve(relativeContentPath).resolve("testcases.json"));
            return objectMapper.readValue(json, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, DsaTestCase.class));
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private String readFile(String relativeContentPath, String subdir, String fileName) {
        try {
            return Files.readString(CONTENT_ROOT.resolve(relativeContentPath).resolve(subdir).resolve(fileName)).strip();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private String starterFileName(String language) {
        return language + ".txt";
    }

    private String harnessFileName(String language) {
        return language + ".template";
    }
}
```

- [ ] **Step 6: Write the content reader test**

Create `backend/src/test/java/com/interviewarena/dsa/DsaContentReaderTest.java`. This test writes its own fixture files under a temp directory and points a `DsaContentReader` at it via a constructor overload — since the production reader hardcodes `CONTENT_ROOT` relative to the working directory (matching `QuestionContentReader`'s existing pattern), refactor `DsaContentReader` to accept the root as a constructor argument defaulting to the production path, so it stays test-friendly without changing production wiring:

Edit `DsaContentReader.java` — replace the `CONTENT_ROOT` constant and add a constructor:

```java
package com.interviewarena.dsa;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Component
public class DsaContentReader {

    private final Path contentRoot;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public DsaContentReader() {
        this(Path.of("..", "content", "dsa"));
    }

    public DsaContentReader(Path contentRoot) {
        this.contentRoot = contentRoot;
    }

    public String readBody(String relativeContentPath) {
        try {
            String raw = Files.readString(contentRoot.resolve(relativeContentPath).resolve("problem.md"));
            String[] parts = raw.split("(?m)^---\\s*$", 3);
            return parts.length == 3 ? parts[2].strip() : raw.strip();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    public String readStarterCode(String relativeContentPath, String language) {
        return readFile(relativeContentPath, "starter", language + ".txt");
    }

    public String readHarness(String relativeContentPath, String language) {
        return readFile(relativeContentPath, "harness", language + ".template");
    }

    public List<DsaTestCase> readTestCases(String relativeContentPath) {
        try {
            byte[] json = Files.readAllBytes(contentRoot.resolve(relativeContentPath).resolve("testcases.json"));
            return objectMapper.readValue(json, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, DsaTestCase.class));
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private String readFile(String relativeContentPath, String subdir, String fileName) {
        try {
            return Files.readString(contentRoot.resolve(relativeContentPath).resolve(subdir).resolve(fileName)).strip();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
```

Create `backend/src/test/java/com/interviewarena/dsa/DsaContentReaderTest.java`:

```java
package com.interviewarena.dsa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class DsaContentReaderTest {

    @Test
    void readsBodyStarterHarnessAndTestCases(@TempDir Path root) throws IOException {
        Path problemDir = root.resolve("two-sum");
        Files.createDirectories(problemDir.resolve("starter"));
        Files.createDirectories(problemDir.resolve("harness"));

        Files.writeString(problemDir.resolve("problem.md"), """
            ---
            id: two-sum
            topic: array
            difficulty: easy
            status: ACTIVE
            ---

            ## Đề bài (VI)
            Nội dung đề bài.
            """);
        Files.writeString(problemDir.resolve("starter").resolve("java.txt"), "public int[] twoSum() {}");
        Files.writeString(problemDir.resolve("harness").resolve("java.template"), "{{USER_CODE}}");
        Files.writeString(problemDir.resolve("testcases.json"), """
            [
              {"input": "2,7,11,15\\n9", "expectedOutput": "0,1", "hidden": false},
              {"input": "3,3\\n6", "expectedOutput": "0,1", "hidden": true}
            ]
            """);

        DsaContentReader reader = new DsaContentReader(root);

        assertThat(reader.readBody("two-sum")).contains("Nội dung đề bài.");
        assertThat(reader.readStarterCode("two-sum", "java")).isEqualTo("public int[] twoSum() {}");
        assertThat(reader.readHarness("two-sum", "java")).isEqualTo("{{USER_CODE}}");

        List<DsaTestCase> cases = reader.readTestCases("two-sum");
        assertThat(cases).hasSize(2);
        assertThat(cases.get(0).hidden()).isFalse();
        assertThat(cases.get(1).hidden()).isTrue();
    }
}
```

- [ ] **Step 7: Run the tests**

Run: `mvn test -Dtest=DsaFrontmatterParserTest,DsaContentReaderTest`
Expected: PASS.

- [ ] **Step 8: Verify full build**

Run: `mvn test`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add backend/src/main/java/com/interviewarena/dsa/DsaFrontmatter.java backend/src/main/java/com/interviewarena/dsa/DsaFrontmatterParser.java backend/src/main/java/com/interviewarena/dsa/DsaTestCase.java backend/src/main/java/com/interviewarena/dsa/DsaContentReader.java backend/src/test/java/com/interviewarena/dsa/DsaFrontmatterParserTest.java backend/src/test/java/com/interviewarena/dsa/DsaContentReaderTest.java
git commit -m "feat: add DSA content frontmatter parsing and content reader"
```

---

### Task 4: DSA content ingest (CLI + service)

**Files:**
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaContentIngestService.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaContentIngestCli.java`
- Test: `backend/src/test/java/com/interviewarena/dsa/DsaContentIngestServiceTest.java`

**Interfaces:**
- Consumes: `DsaFrontmatterParser` (Task 3), `DsaProblemRepository` (Task 2).
- Produces: `DsaContentIngestService.ingestDirectory(Path root): IngestResult` where `IngestResult(int upserted, List<String> errors)` — invoked by `DsaContentIngestCli.main(String[] args)` (`args[0]` = path to `content/dsa`), same shape as `ContentIngestCli`/`ContentIngestService`.

- [ ] **Step 1: Create `DsaContentIngestService.java`**

```java
package com.interviewarena.dsa;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class DsaContentIngestService {

    private final DsaProblemRepository dsaProblemRepository;
    private final DsaFrontmatterParser frontmatterParser;

    public DsaContentIngestService(DsaProblemRepository dsaProblemRepository, DsaFrontmatterParser frontmatterParser) {
        this.dsaProblemRepository = dsaProblemRepository;
        this.frontmatterParser = frontmatterParser;
    }

    public record IngestResult(int upserted, List<String> errors) {}

    public IngestResult ingestDirectory(Path root) {
        List<String> errors = new ArrayList<>();
        int upserted = 0;

        List<Path> files;
        try (Stream<Path> walk = Files.walk(root)) {
            files = walk.filter(p -> p.getFileName().toString().equals("problem.md")).toList();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }

        for (Path file : files) {
            try {
                DsaFrontmatter fm = frontmatterParser.parse(file);
                upsert(fm, root.relativize(file.getParent()).toString());
                upserted++;
            } catch (Exception e) {
                errors.add(file + ": " + e.getMessage());
            }
        }
        return new IngestResult(upserted, errors);
    }

    private void upsert(DsaFrontmatter fm, String relativeDir) {
        Optional<DsaProblem> existing = dsaProblemRepository.findBySlug(fm.id());
        DsaProblem problem = existing.orElseGet(DsaProblem::new);
        problem.setSlug(fm.id());
        problem.setTopic(fm.topic());
        problem.setDifficulty(fm.difficulty());
        problem.setContentPath(relativeDir.replace('\\', '/'));
        problem.setSyncedAt(Instant.now());
        if (existing.isEmpty()) {
            problem.setStatus(DsaProblemStatus.valueOf(fm.status()));
        }
        dsaProblemRepository.save(problem);
    }
}
```

- [ ] **Step 2: Write the ingest service test**

Create `backend/src/test/java/com/interviewarena/dsa/DsaContentIngestServiceTest.java`:

```java
package com.interviewarena.dsa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DsaContentIngestServiceTest {

    @Mock private DsaProblemRepository dsaProblemRepository;
    private final DsaFrontmatterParser parser = new DsaFrontmatterParser();

    @Test
    void ingestDirectory_upsertsProblemFromFrontmatter(@TempDir Path root) throws IOException {
        Path problemDir = root.resolve("two-sum");
        Files.createDirectories(problemDir);
        Files.writeString(problemDir.resolve("problem.md"), """
            ---
            id: two-sum
            topic: array
            difficulty: easy
            status: ACTIVE
            ---

            ## Đề bài (VI)
            Nội dung.
            """);
        when(dsaProblemRepository.findBySlug("two-sum")).thenReturn(Optional.empty());

        DsaContentIngestService service = new DsaContentIngestService(dsaProblemRepository, parser);
        var result = service.ingestDirectory(root);

        assertThat(result.upserted()).isEqualTo(1);
        assertThat(result.errors()).isEmpty();
        verify(dsaProblemRepository).save(argThat(p ->
            p.getSlug().equals("two-sum") &&
            p.getTopic().equals("array") &&
            p.getDifficulty().equals("easy") &&
            p.getStatus() == DsaProblemStatus.ACTIVE &&
            p.getContentPath().equals("two-sum")
        ));
    }

    @Test
    void ingestDirectory_recordsErrorForMissingFrontmatter(@TempDir Path root) throws IOException {
        Path problemDir = root.resolve("broken");
        Files.createDirectories(problemDir);
        Files.writeString(problemDir.resolve("problem.md"), "no frontmatter here");

        DsaContentIngestService service = new DsaContentIngestService(dsaProblemRepository, parser);
        var result = service.ingestDirectory(root);

        assertThat(result.upserted()).isZero();
        assertThat(result.errors()).hasSize(1);
    }
}
```

Note: `argThat` requires `import static org.mockito.ArgumentMatchers.argThat;` — add it alongside the other static imports.

- [ ] **Step 3: Run the test**

Run: `mvn test -Dtest=DsaContentIngestServiceTest`
Expected: PASS.

- [ ] **Step 4: Create `DsaContentIngestCli.java`**

```java
package com.interviewarena.dsa;

import com.interviewarena.InterviewArenaApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

import java.nio.file.Path;

public class DsaContentIngestCli {

    public static void main(String[] args) {
        if (args.length < 1) {
            System.err.println("Usage: DsaContentIngestCli <content-dsa-root-dir>");
            System.exit(1);
        }
        var app = new SpringApplicationBuilder(InterviewArenaApplication.class)
            .web(WebApplicationType.NONE);
        try (ConfigurableApplicationContext ctx = app.run(args)) {
            DsaContentIngestService service = ctx.getBean(DsaContentIngestService.class);
            DsaContentIngestService.IngestResult result = service.ingestDirectory(Path.of(args[0]));
            System.out.println("Upserted: " + result.upserted());
            if (!result.errors().isEmpty()) {
                System.err.println("Errors:");
                result.errors().forEach(System.err::println);
                SpringApplication.exit(ctx, () -> 1);
                System.exit(1);
            }
        }
    }
}
```

- [ ] **Step 5: Verify full build**

Run: `mvn test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/java/com/interviewarena/dsa/DsaContentIngestService.java backend/src/main/java/com/interviewarena/dsa/DsaContentIngestCli.java backend/src/test/java/com/interviewarena/dsa/DsaContentIngestServiceTest.java
git commit -m "feat: add DSA content ingest CLI and service"
```

---

### Task 5: Seed problem content — "Two Sum"

**Files:**
- Create: `content/dsa/two-sum/problem.md`
- Create: `content/dsa/two-sum/testcases.json`
- Create: `content/dsa/two-sum/harness/java.template`
- Create: `content/dsa/two-sum/harness/python.template`
- Create: `content/dsa/two-sum/harness/javascript.template`
- Create: `content/dsa/two-sum/harness/cpp.template`
- Create: `content/dsa/two-sum/starter/java.txt`
- Create: `content/dsa/two-sum/starter/python.txt`
- Create: `content/dsa/two-sum/starter/javascript.txt`
- Create: `content/dsa/two-sum/starter/cpp.txt`

**Interfaces:** None — pure content, consumed by Task 4's ingest and Task 11's integration test.

**I/O contract for this problem** (documented here since every harness must agree on it): stdin is two lines — line 1 is a comma-separated integer array (no brackets/spaces, e.g. `2,7,11,15`), line 2 is the integer target. Stdout is a single line: the two result indices, comma-separated, no spaces (e.g. `0,1`).

- [ ] **Step 1: Create `problem.md`**

```markdown
---
id: two-sum
topic: array
difficulty: easy
tags: [hash-map]
status: ACTIVE
created_at: 2026-08-24
---

## Đề bài (VI)
Cho một mảng số nguyên `nums` và một số nguyên `target`, hãy trả về chỉ số (index) của hai số trong mảng sao cho tổng của chúng bằng `target`.

Giả sử mỗi đầu vào có chính xác một lời giải, và bạn không được dùng cùng một phần tử hai lần.

## Problem (EN)
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.

Assume each input has exactly one solution, and you may not use the same element twice.

## Ràng buộc (VI)
- 2 <= nums.length <= 10^4
- Chỉ có đúng một đáp án hợp lệ

## Constraints (EN)
- 2 <= nums.length <= 10^4
- Exactly one valid answer exists
```

- [ ] **Step 2: Create `testcases.json`**

```json
[
  { "input": "2,7,11,15\n9", "expectedOutput": "0,1", "hidden": false },
  { "input": "3,2,4\n6", "expectedOutput": "1,2", "hidden": false },
  { "input": "3,3\n6", "expectedOutput": "0,1", "hidden": true }
]
```

- [ ] **Step 3: Create the Java harness and starter**

`content/dsa/two-sum/harness/java.template`:

```java
import java.util.*;

class Solution {
    {{USER_CODE}}
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String[] numsStr = scanner.nextLine().trim().split(",");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i].trim());
        }
        int target = Integer.parseInt(scanner.nextLine().trim());

        Solution solution = new Solution();
        int[] result = solution.twoSum(nums, target);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < result.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(result[i]);
        }
        System.out.println(sb.toString());
    }
}
```

`content/dsa/two-sum/starter/java.txt`:

```java
public int[] twoSum(int[] nums, int target) {
    // TODO: implement
    return new int[]{};
}
```

- [ ] **Step 4: Create the Python harness and starter**

`content/dsa/two-sum/harness/python.template`:

```python
import sys

{{USER_CODE}}

def main():
    lines = sys.stdin.read().split("\n")
    nums = [int(x.strip()) for x in lines[0].split(",")]
    target = int(lines[1].strip())
    result = two_sum(nums, target)
    print(",".join(str(x) for x in result))

if __name__ == "__main__":
    main()
```

`content/dsa/two-sum/starter/python.txt`:

```python
def two_sum(nums, target):
    # TODO: implement
    return []
```

- [ ] **Step 5: Create the JavaScript harness and starter**

`content/dsa/two-sum/harness/javascript.template`:

```javascript
{{USER_CODE}}

const lines = require('fs').readFileSync('/dev/stdin', 'utf8').split('\n')
const nums = lines[0].split(',').map(s => parseInt(s.trim(), 10))
const target = parseInt(lines[1].trim(), 10)
const result = twoSum(nums, target)
console.log(result.join(','))
```

`content/dsa/two-sum/starter/javascript.txt`:

```javascript
function twoSum(nums, target) {
    // TODO: implement
    return []
}
```

- [ ] **Step 6: Create the C++ harness and starter**

`content/dsa/two-sum/harness/cpp.template`:

```cpp
#include <bits/stdc++.h>
using namespace std;

{{USER_CODE}}

int main() {
    string line1, line2;
    getline(cin, line1);
    getline(cin, line2);

    vector<int> nums;
    stringstream ss(line1);
    string item;
    while (getline(ss, item, ',')) {
        nums.push_back(stoi(item));
    }
    int target = stoi(line2);

    vector<int> result = twoSum(nums, target);

    for (size_t i = 0; i < result.size(); i++) {
        if (i > 0) cout << ",";
        cout << result[i];
    }
    cout << endl;
    return 0;
}
```

`content/dsa/two-sum/starter/cpp.txt`:

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    // TODO: implement
    return {};
}
```

- [ ] **Step 7: Sanity-check each harness compiles/runs manually with a correct solution**

This validates the harness files themselves before Task 11's automated integration test relies on them. From a scratch directory, for each language, concatenate the harness with a correct implementation in place of `{{USER_CODE}}` and run it against `2,7,11,15\n9` on stdin, expecting `0,1` on stdout. Example for Python:

```bash
cat > /tmp/two_sum.py << 'EOF'
import sys

def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []

def main():
    lines = sys.stdin.read().split("\n")
    nums = [int(x.strip()) for x in lines[0].split(",")]
    target = int(lines[1].strip())
    result = two_sum(nums, target)
    print(",".join(str(x) for x in result))

if __name__ == "__main__":
    main()
EOF
printf '2,7,11,15\n9\n' | python3 /tmp/two_sum.py
```
Expected: `0,1`. Repeat the same manual check for Java (`javac`/`java`), Node (`node`), and C++ (`g++`) with their respective correct `{{USER_CODE}}` substitutions, using the constant-array/HashMap-based Two Sum solution for each language analogous to the Python one above.

- [ ] **Step 8: Commit**

```bash
git add content/dsa/two-sum
git commit -m "content: add Two Sum DSA problem with harnesses for all 4 languages"
```

---

### Task 6: Harness builder

**Files:**
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaHarnessBuilder.java`
- Test: `backend/src/test/java/com/interviewarena/dsa/DsaHarnessBuilderTest.java`

**Interfaces:**
- Produces: `DsaHarnessBuilder.build(String harnessTemplate, String userCode): String` — consumed by Task 9.

- [ ] **Step 1: Write the failing test**

Create `backend/src/test/java/com/interviewarena/dsa/DsaHarnessBuilderTest.java`:

```java
package com.interviewarena.dsa;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class DsaHarnessBuilderTest {

    private final DsaHarnessBuilder builder = new DsaHarnessBuilder();

    @Test
    void build_insertsUserCodeAtPlaceholder() {
        String template = "before\n{{USER_CODE}}\nafter";
        String result = builder.build(template, "int x = 1;");

        assertThat(result).isEqualTo("before\nint x = 1;\nafter");
    }

    @Test
    void build_replacesOnlyThePlaceholderTokenNotLiteralOccurrencesInUserCode() {
        String template = "{{USER_CODE}}";
        String userCode = "// mentions {{USER_CODE}} in a comment";

        String result = builder.build(template, userCode);

        assertThat(result).isEqualTo("// mentions {{USER_CODE}} in a comment");
    }
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `mvn test -Dtest=DsaHarnessBuilderTest`
Expected: FAIL — `DsaHarnessBuilder` does not exist yet.

- [ ] **Step 3: Implement `DsaHarnessBuilder.java`**

```java
package com.interviewarena.dsa;

import org.springframework.stereotype.Component;

@Component
public class DsaHarnessBuilder {

    private static final String PLACEHOLDER = "{{USER_CODE}}";

    public String build(String harnessTemplate, String userCode) {
        int index = harnessTemplate.indexOf(PLACEHOLDER);
        if (index < 0) {
            throw new IllegalArgumentException("Harness template does not contain " + PLACEHOLDER);
        }
        return harnessTemplate.substring(0, index) + userCode + harnessTemplate.substring(index + PLACEHOLDER.length());
    }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `mvn test -Dtest=DsaHarnessBuilderTest`
Expected: PASS. (Using `indexOf`/`substring` rather than `String.replace` deliberately avoids re-scanning the inserted user code for further `{{USER_CODE}}` occurrences — a single-replacement operation, matching the second test case.)

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/dsa/DsaHarnessBuilder.java backend/src/test/java/com/interviewarena/dsa/DsaHarnessBuilderTest.java
git commit -m "feat: add DSA harness builder"
```

---

### Task 7: Judge0 client

**Files:**
- Create: `backend/src/main/java/com/interviewarena/dsa/judge/JudgeSubmission.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/judge/JudgeResult.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/judge/DsaJudgeClient.java`
- Create: `backend/src/main/java/com/interviewarena/config/DsaJudgeConfig.java`
- Test: `backend/src/test/java/com/interviewarena/dsa/judge/DsaJudgeClientTest.java` (mocks the HTTP layer — no live Judge0 dependency; the live-Judge0 check is Task 11)

**Interfaces:**
- Produces: `JudgeSubmission(String sourceCode, int languageId, String stdin)`, `JudgeResult(String stdout, int statusId, String statusDescription)`, `DsaJudgeClient.runBatch(List<JudgeSubmission>): List<JudgeResult>` (same order as input), `DsaJudgeClient.languageIdFor(String language): int` (throws `IllegalArgumentException` for an unsupported language) — consumed by Task 9. Judge0 status id `3` means `Accepted`.

- [ ] **Step 1: Create `JudgeSubmission.java` and `JudgeResult.java`**

```java
package com.interviewarena.dsa.judge;

public record JudgeSubmission(String sourceCode, int languageId, String stdin) {}
```

```java
package com.interviewarena.dsa.judge;

public record JudgeResult(String stdout, int statusId, String statusDescription) {
    public boolean isAccepted() {
        return statusId == 3;
    }
}
```

- [ ] **Step 2: Create `DsaJudgeClient.java`**

```java
package com.interviewarena.dsa.judge;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class DsaJudgeClient {

    private static final Map<String, Integer> LANGUAGE_IDS = Map.of(
        "java", 62,
        "python", 71,
        "javascript", 63,
        "cpp", 54
    );

    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public DsaJudgeClient(RestClient restClient) {
        this.restClient = restClient;
    }

    public int languageIdFor(String language) {
        Integer id = LANGUAGE_IDS.get(language);
        if (id == null) {
            throw new IllegalArgumentException("Unsupported DSA language: " + language);
        }
        return id;
    }

    public List<JudgeResult> runBatch(List<JudgeSubmission> submissions) {
        List<Map<String, Object>> payload = submissions.stream()
            .map(s -> Map.<String, Object>of(
                "source_code", s.sourceCode(),
                "language_id", s.languageId(),
                "stdin", s.stdin(),
                "cpu_time_limit", 2,
                "memory_limit", 128000
            ))
            .collect(Collectors.toList());

        String response = restClient.post()
            .uri("/submissions/batch?base64_encoded=false&wait=true")
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(Map.of("submissions", payload))
            .retrieve()
            .body(String.class);

        try {
            JsonNode root = objectMapper.readTree(response);
            List<JudgeResult> results = new ArrayList<>();
            for (JsonNode node : root) {
                String stdout = node.path("stdout").isMissingNode() || node.path("stdout").isNull()
                    ? "" : node.path("stdout").asText();
                int statusId = node.path("status").path("id").asInt();
                String statusDescription = node.path("status").path("description").asText();
                results.add(new JudgeResult(stdout, statusId, statusDescription));
            }
            return results;
        } catch (Exception e) {
            throw new IllegalStateException("Unexpected Judge0 response shape: " + response, e);
        }
    }
}
```

- [ ] **Step 3: Create `DsaJudgeConfig.java`**

```java
package com.interviewarena.config;

import com.interviewarena.dsa.judge.DsaJudgeClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.boot.web.client.ClientHttpRequestFactoryBuilder;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@Configuration
public class DsaJudgeConfig {

    @Bean
    public DsaJudgeClient dsaJudgeClient(@Value("${app.judge0.base-url}") String baseUrl) {
        ClientHttpRequestFactory requestFactory = ClientHttpRequestFactoryBuilder.detect()
            .build(ClientHttpRequestFactorySettings.defaults()
                .withConnectTimeout(Duration.ofSeconds(5))
                .withReadTimeout(Duration.ofSeconds(30)));
        RestClient restClient = RestClient.builder().baseUrl(baseUrl).requestFactory(requestFactory).build();
        return new DsaJudgeClient(restClient);
    }
}
```

`readTimeout(30s)` bounds one batch call (all test cases for one submission, since Judge0 batches run in parallel across its workers); `DsaService` (Task 9) catches the resulting `ResourceAccessException` on timeout and reports verdict `ERROR`.

- [ ] **Step 4: Write `DsaJudgeClientTest.java`**

```java
package com.interviewarena.dsa.judge;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.MediaType.APPLICATION_JSON;

class DsaJudgeClientTest {

    @Test
    void runBatch_parsesJudge0ResponseIntoResults() {
        RestClient.Builder builder = RestClient.builder().baseUrl("http://judge0.test");
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        server.expect(requestTo("http://judge0.test/submissions/batch?base64_encoded=false&wait=true"))
            .andExpect(method(POST))
            .andRespond(withSuccess("""
                [
                  {"stdout": "0,1\\n", "status": {"id": 3, "description": "Accepted"}},
                  {"stdout": "1,0\\n", "status": {"id": 3, "description": "Accepted"}}
                ]
                """, APPLICATION_JSON));

        DsaJudgeClient client = new DsaJudgeClient(builder.build());
        List<JudgeResult> results = client.runBatch(List.of(
            new JudgeSubmission("source1", 71, "2,7,11,15\n9"),
            new JudgeSubmission("source2", 71, "3,2,4\n6")
        ));

        assertThat(results).hasSize(2);
        assertThat(results.get(0).stdout()).isEqualTo("0,1\n");
        assertThat(results.get(0).isAccepted()).isTrue();
    }

    @Test
    void languageIdFor_throwsForUnsupportedLanguage() {
        DsaJudgeClient client = new DsaJudgeClient(RestClient.builder().build());
        org.junit.jupiter.api.Assertions.assertThrows(IllegalArgumentException.class,
            () -> client.languageIdFor("ruby"));
    }
}
```

- [ ] **Step 5: Run the tests**

Run: `mvn test -Dtest=DsaJudgeClientTest`
Expected: PASS.

- [ ] **Step 6: Verify full build**

Run: `mvn test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add backend/src/main/java/com/interviewarena/dsa/judge backend/src/main/java/com/interviewarena/config/DsaJudgeConfig.java backend/src/test/java/com/interviewarena/dsa/judge/DsaJudgeClientTest.java
git commit -m "feat: add Judge0 batch API client"
```

---

### Task 8: DSA submission quota (rate limiting)

**Files:**
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaSubmissionQuotaService.java`
- Test: `backend/src/test/java/com/interviewarena/dsa/DsaSubmissionQuotaServiceTest.java`

**Interfaces:**
- Consumes: `StringRedisTemplate` (existing Spring bean), `com.interviewarena.interview.exception.QuotaExceededException` (existing — already mapped to HTTP 429 in `GlobalExceptionHandler`).
- Produces: `DsaSubmissionQuotaService.checkAndConsume(UUID userId): void` — throws `QuotaExceededException` when the daily cap is exceeded. Consumed by Task 9.

- [ ] **Step 1: Write the failing test**

Create `backend/src/test/java/com/interviewarena/dsa/DsaSubmissionQuotaServiceTest.java`:

```java
package com.interviewarena.dsa;

import com.interviewarena.interview.exception.QuotaExceededException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DsaSubmissionQuotaServiceTest {

    @Mock private StringRedisTemplate redisTemplate;
    @Mock private ValueOperations<String, String> valueOperations;

    @Test
    void checkAndConsume_allowsSubmissionsUnderTheDailyCap() {
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(org.mockito.ArgumentMatchers.anyString())).thenReturn(5L);

        DsaSubmissionQuotaService service = new DsaSubmissionQuotaService(redisTemplate, 20);

        assertThatCode(() -> service.checkAndConsume(UUID.randomUUID())).doesNotThrowAnyException();
    }

    @Test
    void checkAndConsume_throwsWhenDailyCapExceeded() {
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(org.mockito.ArgumentMatchers.anyString())).thenReturn(21L);

        DsaSubmissionQuotaService service = new DsaSubmissionQuotaService(redisTemplate, 20);

        assertThatThrownBy(() -> service.checkAndConsume(UUID.randomUUID()))
            .isInstanceOf(QuotaExceededException.class);
    }
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `mvn test -Dtest=DsaSubmissionQuotaServiceTest`
Expected: FAIL — `DsaSubmissionQuotaService` does not exist yet.

- [ ] **Step 3: Implement `DsaSubmissionQuotaService.java`**

```java
package com.interviewarena.dsa;

import com.interviewarena.interview.exception.QuotaExceededException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class DsaSubmissionQuotaService {

    private final StringRedisTemplate redisTemplate;
    private final int freeDailyQuota;

    public DsaSubmissionQuotaService(
        StringRedisTemplate redisTemplate,
        @Value("${app.dsa.free-daily-quota:20}") int freeDailyQuota
    ) {
        this.redisTemplate = redisTemplate;
        this.freeDailyQuota = freeDailyQuota;
    }

    public void checkAndConsume(UUID userId) {
        String key = "dsa-quota:" + userId + ":" + LocalDate.now();
        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1L) {
            redisTemplate.expire(key, Duration.ofDays(1));
        }
        if (count != null && count > freeDailyQuota) {
            throw new QuotaExceededException(
                "Đã dùng hết " + freeDailyQuota + " lượt nộp bài DSA hôm nay, thử lại vào ngày mai");
        }
    }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `mvn test -Dtest=DsaSubmissionQuotaServiceTest`
Expected: PASS.

- [ ] **Step 5: Verify full build**

Run: `mvn test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/java/com/interviewarena/dsa/DsaSubmissionQuotaService.java backend/src/test/java/com/interviewarena/dsa/DsaSubmissionQuotaServiceTest.java
git commit -m "feat: add DSA submission daily quota"
```

---

### Task 9: DSA service (list, detail, submit)

**Files:**
- Create: `backend/src/main/java/com/interviewarena/dsa/dto/DsaProblemSummaryResponse.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/dto/DsaSampleTestCase.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/dto/DsaProblemDetailResponse.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/dto/SubmitDsaCodeRequest.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/dto/DsaTestCaseFailure.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/dto/DsaSubmissionResultResponse.java`
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaService.java`
- Test: `backend/src/test/java/com/interviewarena/dsa/DsaServiceTest.java`

**Interfaces:**
- Consumes: `DsaProblemRepository`, `DsaSubmissionRepository` (Task 2), `DsaContentReader` (Task 3), `DsaHarnessBuilder` (Task 6), `DsaJudgeClient`/`JudgeSubmission`/`JudgeResult` (Task 7), `DsaSubmissionQuotaService` (Task 8).
- Produces: `DsaService.list(String topic, String difficulty, Pageable): Page<DsaProblemSummaryResponse>`, `DsaService.getDetail(String slug): DsaProblemDetailResponse`, `DsaService.submit(UUID userId, String slug, String language, String code): DsaSubmissionResultResponse` — consumed by Task 10.

- [ ] **Step 1: Create the DTOs**

```java
package com.interviewarena.dsa.dto;

import java.util.UUID;

public record DsaProblemSummaryResponse(UUID id, String slug, String topic, String difficulty) {}
```

```java
package com.interviewarena.dsa.dto;

public record DsaSampleTestCase(String input, String expectedOutput) {}
```

```java
package com.interviewarena.dsa.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public record DsaProblemDetailResponse(
    UUID id,
    String slug,
    String topic,
    String difficulty,
    String markdownBody,
    Map<String, String> starterCode,
    List<DsaSampleTestCase> samples
) {}
```

```java
package com.interviewarena.dsa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SubmitDsaCodeRequest(
    @NotBlank String language,
    @NotBlank @Size(max = 20000) String code
) {}
```

```java
package com.interviewarena.dsa.dto;

public record DsaTestCaseFailure(String input, String expected, String actual) {}
```

```java
package com.interviewarena.dsa.dto;

import java.util.List;

public record DsaSubmissionResultResponse(
    String verdict,
    int passedCount,
    int totalCount,
    List<DsaTestCaseFailure> failures
) {}
```

- [ ] **Step 2: Write the failing service test**

Create `backend/src/test/java/com/interviewarena/dsa/DsaServiceTest.java`:

```java
package com.interviewarena.dsa;

import com.interviewarena.dsa.judge.DsaJudgeClient;
import com.interviewarena.dsa.judge.JudgeResult;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DsaServiceTest {

    @Mock private DsaProblemRepository dsaProblemRepository;
    @Mock private DsaSubmissionRepository dsaSubmissionRepository;
    @Mock private DsaContentReader contentReader;
    @Mock private DsaHarnessBuilder harnessBuilder;
    @Mock private DsaJudgeClient judgeClient;
    @Mock private DsaSubmissionQuotaService quotaService;

    private DsaProblem problem() {
        DsaProblem p = new DsaProblem();
        p.setId(UUID.randomUUID());
        p.setSlug("two-sum");
        p.setStatus(DsaProblemStatus.ACTIVE);
        p.setContentPath("two-sum");
        return p;
    }

    private DsaService service() {
        return new DsaService(dsaProblemRepository, dsaSubmissionRepository, contentReader, harnessBuilder, judgeClient, quotaService);
    }

    @Test
    void submit_returnsPassedWhenAllTestCasesMatch() {
        UUID userId = UUID.randomUUID();
        DsaProblem problem = problem();
        when(dsaProblemRepository.findBySlug("two-sum")).thenReturn(Optional.of(problem));
        when(contentReader.readHarness("two-sum", "python")).thenReturn("{{USER_CODE}}");
        when(contentReader.readTestCases("two-sum")).thenReturn(List.of(
            new DsaTestCase("2,7,11,15\n9", "0,1", false),
            new DsaTestCase("3,3\n6", "0,1", true)
        ));
        when(harnessBuilder.build(anyString(), anyString())).thenReturn("full-source");
        when(judgeClient.languageIdFor("python")).thenReturn(71);
        when(judgeClient.runBatch(anyList())).thenReturn(List.of(
            new JudgeResult("0,1\n", 3, "Accepted"),
            new JudgeResult("0,1\n", 3, "Accepted")
        ));

        var result = service().submit(userId, "two-sum", "python", "def two_sum(...): ...");

        assertThat(result.verdict()).isEqualTo("PASSED");
        assertThat(result.passedCount()).isEqualTo(2);
        assertThat(result.totalCount()).isEqualTo(2);
        assertThat(result.failures()).isEmpty();
        verify(quotaService).checkAndConsume(userId);
        verify(dsaSubmissionRepository).save(argThat(s -> s.getVerdict() == DsaVerdict.PASSED));
    }

    @Test
    void submit_reportsVisibleFailureButOmitsHiddenFailureDetails() {
        UUID userId = UUID.randomUUID();
        DsaProblem problem = problem();
        when(dsaProblemRepository.findBySlug("two-sum")).thenReturn(Optional.of(problem));
        when(contentReader.readHarness("two-sum", "python")).thenReturn("{{USER_CODE}}");
        when(contentReader.readTestCases("two-sum")).thenReturn(List.of(
            new DsaTestCase("2,7,11,15\n9", "0,1", false),
            new DsaTestCase("3,3\n6", "0,1", true)
        ));
        when(harnessBuilder.build(anyString(), anyString())).thenReturn("full-source");
        when(judgeClient.languageIdFor("python")).thenReturn(71);
        when(judgeClient.runBatch(anyList())).thenReturn(List.of(
            new JudgeResult("1,0\n", 3, "Accepted"),
            new JudgeResult("wrong\n", 3, "Accepted")
        ));

        var result = service().submit(userId, "two-sum", "python", "def two_sum(...): ...");

        assertThat(result.verdict()).isEqualTo("FAILED");
        assertThat(result.passedCount()).isEqualTo(0);
        assertThat(result.totalCount()).isEqualTo(2);
        assertThat(result.failures()).hasSize(1);
        assertThat(result.failures().get(0).input()).isEqualTo("2,7,11,15\n9");
    }
}
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `mvn test -Dtest=DsaServiceTest`
Expected: FAIL — `DsaService` does not exist yet.

- [ ] **Step 4: Implement `DsaService.java`**

```java
package com.interviewarena.dsa;

import com.interviewarena.dsa.dto.*;
import com.interviewarena.dsa.judge.DsaJudgeClient;
import com.interviewarena.dsa.judge.JudgeResult;
import com.interviewarena.dsa.judge.JudgeSubmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class DsaService {

    private static final List<String> LANGUAGES = List.of("java", "python", "javascript", "cpp");

    private final DsaProblemRepository dsaProblemRepository;
    private final DsaSubmissionRepository dsaSubmissionRepository;
    private final DsaContentReader contentReader;
    private final DsaHarnessBuilder harnessBuilder;
    private final DsaJudgeClient judgeClient;
    private final DsaSubmissionQuotaService quotaService;

    public DsaService(
        DsaProblemRepository dsaProblemRepository,
        DsaSubmissionRepository dsaSubmissionRepository,
        DsaContentReader contentReader,
        DsaHarnessBuilder harnessBuilder,
        DsaJudgeClient judgeClient,
        DsaSubmissionQuotaService quotaService
    ) {
        this.dsaProblemRepository = dsaProblemRepository;
        this.dsaSubmissionRepository = dsaSubmissionRepository;
        this.contentReader = contentReader;
        this.harnessBuilder = harnessBuilder;
        this.judgeClient = judgeClient;
        this.quotaService = quotaService;
    }

    public Page<DsaProblemSummaryResponse> list(String topic, String difficulty, Pageable pageable) {
        return dsaProblemRepository.search(DsaProblemStatus.ACTIVE, topic, difficulty, pageable)
            .map(p -> new DsaProblemSummaryResponse(p.getId(), p.getSlug(), p.getTopic(), p.getDifficulty()));
    }

    public DsaProblemDetailResponse getDetail(String slug) {
        DsaProblem problem = findActiveBySlug(slug);
        String body = contentReader.readBody(problem.getContentPath());

        Map<String, String> starterCode = new java.util.LinkedHashMap<>();
        for (String language : LANGUAGES) {
            starterCode.put(language, contentReader.readStarterCode(problem.getContentPath(), language));
        }

        List<DsaSampleTestCase> samples = contentReader.readTestCases(problem.getContentPath()).stream()
            .filter(tc -> !tc.hidden())
            .map(tc -> new DsaSampleTestCase(tc.input(), tc.expectedOutput()))
            .toList();

        return new DsaProblemDetailResponse(problem.getId(), problem.getSlug(), problem.getTopic(),
            problem.getDifficulty(), body, starterCode, samples);
    }

    public DsaSubmissionResultResponse submit(UUID userId, String slug, String language, String code) {
        quotaService.checkAndConsume(userId);
        DsaProblem problem = findActiveBySlug(slug);

        String harnessTemplate = contentReader.readHarness(problem.getContentPath(), language);
        String fullSource = harnessBuilder.build(harnessTemplate, code);
        int languageId = judgeClient.languageIdFor(language);

        List<DsaTestCase> testCases = contentReader.readTestCases(problem.getContentPath());
        List<JudgeSubmission> submissions = testCases.stream()
            .map(tc -> new JudgeSubmission(fullSource, languageId, tc.input()))
            .toList();

        DsaVerdict verdict;
        int passedCount = 0;
        List<DsaTestCaseFailure> failures = new ArrayList<>();

        try {
            List<JudgeResult> results = judgeClient.runBatch(submissions);
            for (int i = 0; i < testCases.size(); i++) {
                DsaTestCase testCase = testCases.get(i);
                JudgeResult result = results.get(i);
                boolean passed = result.isAccepted() && result.stdout().trim().equals(testCase.expectedOutput().trim());
                if (passed) {
                    passedCount++;
                } else if (!testCase.hidden()) {
                    failures.add(new DsaTestCaseFailure(testCase.input(), testCase.expectedOutput(), result.stdout().trim()));
                }
            }
            verdict = passedCount == testCases.size() ? DsaVerdict.PASSED : DsaVerdict.FAILED;
        } catch (ResourceAccessException e) {
            verdict = DsaVerdict.ERROR;
        }

        DsaSubmission submission = new DsaSubmission();
        submission.setUserId(userId);
        submission.setProblemId(problem.getId());
        submission.setLanguage(language);
        submission.setSourceCode(code);
        submission.setVerdict(verdict);
        submission.setPassedCount(passedCount);
        submission.setTotalCount(testCases.size());
        dsaSubmissionRepository.save(submission);

        return new DsaSubmissionResultResponse(verdict.name(), passedCount, testCases.size(), failures);
    }

    private DsaProblem findActiveBySlug(String slug) {
        return dsaProblemRepository.findBySlug(slug)
            .filter(p -> p.getStatus() == DsaProblemStatus.ACTIVE)
            .orElseThrow(() -> new NoSuchElementException("DSA problem not found: " + slug));
    }
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `mvn test -Dtest=DsaServiceTest`
Expected: PASS.

- [ ] **Step 6: Verify full build**

Run: `mvn test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add backend/src/main/java/com/interviewarena/dsa/dto backend/src/main/java/com/interviewarena/dsa/DsaService.java backend/src/test/java/com/interviewarena/dsa/DsaServiceTest.java
git commit -m "feat: add DSA service for list, detail, and submit"
```

---

### Task 10: DSA controller

**Files:**
- Create: `backend/src/main/java/com/interviewarena/dsa/DsaController.java`

**Interfaces:**
- Consumes: `DsaService` (Task 9).
- Produces: `GET /api/dsa`, `GET /api/dsa/{slug}`, `POST /api/dsa/{slug}/submit` — consumed by the frontend in Tasks 12–14.

- [ ] **Step 1: Create `DsaController.java`**

```java
package com.interviewarena.dsa;

import com.interviewarena.dsa.dto.DsaProblemDetailResponse;
import com.interviewarena.dsa.dto.DsaProblemSummaryResponse;
import com.interviewarena.dsa.dto.DsaSubmissionResultResponse;
import com.interviewarena.dsa.dto.SubmitDsaCodeRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/dsa")
public class DsaController {

    private final DsaService dsaService;

    public DsaController(DsaService dsaService) {
        this.dsaService = dsaService;
    }

    @GetMapping
    public Page<DsaProblemSummaryResponse> list(
        @RequestParam(required = false) String topic,
        @RequestParam(required = false) String difficulty,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return dsaService.list(topic, difficulty, PageRequest.of(page, size));
    }

    @GetMapping("/{slug}")
    public DsaProblemDetailResponse detail(@PathVariable String slug) {
        return dsaService.getDetail(slug);
    }

    @PostMapping("/{slug}/submit")
    public DsaSubmissionResultResponse submit(@PathVariable String slug, @Valid @RequestBody SubmitDsaCodeRequest request) {
        UUID userId = UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
        return dsaService.submit(userId, slug, request.language(), request.code());
    }
}
```

- [ ] **Step 2: Verify full build**

Run: `mvn test`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add backend/src/main/java/com/interviewarena/dsa/DsaController.java
git commit -m "feat: add DSA REST controller"
```

---

### Task 11: End-to-end integration test against live Judge0

**Files:**
- Create: `backend/src/test/java/com/interviewarena/dsa/DsaJudge0IntegrationTest.java`

**Interfaces:** None new — this exercises the full Task 2–10 stack against the real Judge0 instance from Task 1.

This is the highest-risk slice named in the spec's rollout — validate it before building any frontend UI on top of it.

- [ ] **Step 1: Ensure Judge0 is running**

Run (from the repo root, if not already up from Task 1):
```bash
docker compose up -d judge0-db judge0-redis judge0-server judge0-workers
curl http://localhost:2358/languages > /dev/null && echo "Judge0 is up"
```

- [ ] **Step 2: Create the integration test**

Create `backend/src/test/java/com/interviewarena/dsa/DsaJudge0IntegrationTest.java`:

```java
package com.interviewarena.dsa;

import com.interviewarena.dsa.judge.DsaJudgeClient;
import com.interviewarena.dsa.judge.JudgeResult;
import com.interviewarena.dsa.judge.JudgeSubmission;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.web.client.RestClient;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@EnabledIfEnvironmentVariable(named = "RUN_JUDGE0_INTEGRATION_TESTS", matches = "true")
class DsaJudge0IntegrationTest {

    private final DsaJudgeClient judgeClient = new DsaJudgeClient(
        RestClient.builder().baseUrl("http://localhost:2358").build());
    private final DsaHarnessBuilder harnessBuilder = new DsaHarnessBuilder();
    private final Path problemDir = Path.of("..", "content", "dsa", "two-sum");

    private String harnessFor(String language) throws Exception {
        return Files.readString(problemDir.resolve("harness").resolve(language + ".template"));
    }

    @Test
    void javaSolutionPassesTwoSumSampleCase() throws Exception {
        String userCode = """
            public int[] twoSum(int[] nums, int target) {
                java.util.Map<Integer, Integer> seen = new java.util.HashMap<>();
                for (int i = 0; i < nums.length; i++) {
                    int complement = target - nums[i];
                    if (seen.containsKey(complement)) {
                        return new int[]{seen.get(complement), i};
                    }
                    seen.put(nums[i], i);
                }
                return new int[]{};
            }
            """;
        String source = harnessBuilder.build(harnessFor("java"), userCode);
        List<JudgeResult> results = judgeClient.runBatch(List.of(
            new JudgeSubmission(source, judgeClient.languageIdFor("java"), "2,7,11,15\n9")));

        assertThat(results.get(0).isAccepted()).isTrue();
        assertThat(results.get(0).stdout().trim()).isEqualTo("0,1");
    }

    @Test
    void pythonSolutionPassesTwoSumSampleCase() throws Exception {
        String userCode = """
            def two_sum(nums, target):
                seen = {}
                for i, n in enumerate(nums):
                    complement = target - n
                    if complement in seen:
                        return [seen[complement], i]
                    seen[n] = i
                return []
            """;
        String source = harnessBuilder.build(harnessFor("python"), userCode);
        List<JudgeResult> results = judgeClient.runBatch(List.of(
            new JudgeSubmission(source, judgeClient.languageIdFor("python"), "2,7,11,15\n9")));

        assertThat(results.get(0).isAccepted()).isTrue();
        assertThat(results.get(0).stdout().trim()).isEqualTo("0,1");
    }

    @Test
    void javascriptSolutionPassesTwoSumSampleCase() throws Exception {
        String userCode = """
            function twoSum(nums, target) {
                const seen = {}
                for (let i = 0; i < nums.length; i++) {
                    const complement = target - nums[i]
                    if (complement in seen) {
                        return [seen[complement], i]
                    }
                    seen[nums[i]] = i
                }
                return []
            }
            """;
        String source = harnessBuilder.build(harnessFor("javascript"), userCode);
        List<JudgeResult> results = judgeClient.runBatch(List.of(
            new JudgeSubmission(source, judgeClient.languageIdFor("javascript"), "2,7,11,15\n9")));

        assertThat(results.get(0).isAccepted()).isTrue();
        assertThat(results.get(0).stdout().trim()).isEqualTo("0,1");
    }

    @Test
    void cppSolutionPassesTwoSumSampleCase() throws Exception {
        String userCode = """
            vector<int> twoSum(vector<int>& nums, int target) {
                unordered_map<int, int> seen;
                for (int i = 0; i < (int)nums.size(); i++) {
                    int complement = target - nums[i];
                    if (seen.count(complement)) {
                        return {seen[complement], i};
                    }
                    seen[nums[i]] = i;
                }
                return {};
            }
            """;
        String source = harnessBuilder.build(harnessFor("cpp"), userCode);
        List<JudgeResult> results = judgeClient.runBatch(List.of(
            new JudgeSubmission(source, judgeClient.languageIdFor("cpp"), "2,7,11,15\n9")));

        assertThat(results.get(0).isAccepted()).isTrue();
        assertThat(results.get(0).stdout().trim()).isEqualTo("0,1");
    }
}
```

- [ ] **Step 3: Run the integration test**

Run (from `backend/`):
```bash
RUN_JUDGE0_INTEGRATION_TESTS=true mvn test -Dtest=DsaJudge0IntegrationTest
```
Expected: all 4 tests PASS. If any fails with a compile/runtime error reported in the (currently unasserted) `statusDescription`, re-check the corresponding harness template from Task 5 for a language-specific mistake — this is the point of running this test before building the UI.

- [ ] **Step 4: Verify the test is skipped (not failing) in the normal build**

Run: `mvn test` (no env var set)
Expected: PASS, with `DsaJudge0IntegrationTest`'s 4 tests reported as skipped, not failed.

- [ ] **Step 5: Commit**

```bash
git add backend/src/test/java/com/interviewarena/dsa/DsaJudge0IntegrationTest.java
git commit -m "test: add live Judge0 integration test for all 4 DSA languages"
```

---

### Task 12: Ingest DSA content on deploy + frontend API/types scaffolding

**Files:**
- Modify: `backend/Dockerfile` or deploy docs — check whether `ContentIngestCli` is already invoked from a deploy script/Dockerfile entrypoint; wire `DsaContentIngestCli` the same way (see Step 1).
- Create: `web/src/types/dsa.ts`
- Create: `web/src/api/dsa.ts`

**Interfaces:**
- Produces (frontend): `DsaProblemSummary { id, slug, topic, difficulty }`, `DsaProblemDetail extends DsaProblemSummary { markdownBody, starterCode: Record<string,string>, samples: { input, expectedOutput }[] }`, `DsaSubmissionResult { verdict, passedCount, totalCount, failures: { input, expected, actual }[] }`, and `dsaApi.list(topic?, difficulty?, page?, size?)`, `dsaApi.detail(slug)`, `dsaApi.submit(slug, language, code)` — consumed by Tasks 13–14.

- [ ] **Step 1: Find how question content is ingested at deploy time**

Run:
```bash
grep -rn "ContentIngestCli" --include="*.yml" --include="Dockerfile" --include="*.sh" .
```
If found in a Dockerfile/CI/deploy script, add an equivalent line invoking `com.interviewarena.dsa.DsaContentIngestCli` against `content/dsa` right after the existing `ContentIngestCli` invocation, using the same working directory/classpath pattern. If not found anywhere (i.e. ingestion is currently a manual operator step), do not invent new deploy automation — instead document the manual step: running
```bash
java -cp backend/target/classes:$(cat backend/target/classpath.txt) com.interviewarena.dsa.DsaContentIngestCli content/dsa
```
(or via `mvn exec:java`, matching however `ContentIngestCli` is manually invoked today) is required after this deploy, same as it already is for `content/questions`.

- [ ] **Step 2: Create `web/src/types/dsa.ts`**

```ts
export interface DsaProblemSummary {
  id: string
  slug: string
  topic: string
  difficulty: string
}

export interface DsaSampleTestCase {
  input: string
  expectedOutput: string
}

export interface DsaProblemDetail extends DsaProblemSummary {
  markdownBody: string
  starterCode: Record<string, string>
  samples: DsaSampleTestCase[]
}

export interface DsaTestCaseFailure {
  input: string | null
  expected: string | null
  actual: string | null
}

export interface DsaSubmissionResult {
  verdict: 'PASSED' | 'FAILED' | 'ERROR'
  passedCount: number
  totalCount: number
  failures: DsaTestCaseFailure[]
}
```

- [ ] **Step 3: Create `web/src/api/dsa.ts`**

```ts
import { apiClient } from './client'
import type { DsaProblemDetail, DsaProblemSummary, DsaSubmissionResult } from '../types/dsa'

interface Page<T> {
  content: T[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export const dsaApi = {
  list: (topic: string | null, difficulty: string | null, page = 0, size = 10) => {
    const params = new URLSearchParams({ page: String(page), size: String(size) })
    if (topic) params.set('topic', topic)
    if (difficulty) params.set('difficulty', difficulty)
    return apiClient.get<Page<DsaProblemSummary>>(`/api/dsa?${params.toString()}`)
  },
  detail: (slug: string) => apiClient.get<DsaProblemDetail>(`/api/dsa/${slug}`),
  submit: (slug: string, language: string, code: string) =>
    apiClient.post<DsaSubmissionResult>(`/api/dsa/${slug}/submit`, { language, code }),
}
```

- [ ] **Step 4: Verify**

Run (from `web/`):
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass (these files aren't imported by any page yet).

- [ ] **Step 5: Commit**

```bash
git add web/src/types/dsa.ts web/src/api/dsa.ts
git commit -m "feat: add DSA frontend types and API client"
```

---

### Task 13: DSA list page + nav wiring

**Files:**
- Create: `web/src/pages/DsaListPage.tsx`
- Test: `web/src/pages/DsaListPage.test.tsx`
- Modify: `web/src/components/layout/AppShell.tsx`
- Modify: `web/src/App.tsx`

**Interfaces:**
- Consumes: `dsaApi.list` (Task 12), `Card`/`CardContent`, `Badge`, `Select`/`SelectTrigger`/`SelectValue`/`SelectContent`/`SelectItem`, `Skeleton`, `Button` — all from the existing design-system primitives added by the frontend redesign plan.

- [ ] **Step 1: Write the DsaListPage test**

Create `web/src/pages/DsaListPage.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DsaListPage } from './DsaListPage'
import { dsaApi } from '../api/dsa'

vi.mock('../api/dsa', () => ({
  dsaApi: { list: vi.fn() },
}))

describe('DsaListPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('lists DSA problems returned for the default filters', async () => {
    ;(dsaApi.list as any).mockResolvedValueOnce({
      content: [{ id: '1', slug: 'two-sum', topic: 'array', difficulty: 'easy' }],
      totalPages: 1,
      totalElements: 1,
      size: 10,
      number: 0,
    })

    render(
      <MemoryRouter>
        <DsaListPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('two sum')).toBeInTheDocument())
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/pages/DsaListPage.test.tsx`
Expected: FAIL — `./DsaListPage` does not exist yet.

- [ ] **Step 3: Create `DsaListPage.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dsaApi } from '../api/dsa'
import type { DsaProblemSummary } from '../types/dsa'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const TOPICS = ['array', 'linked-list', 'stack-queue', 'tree', 'graph', 'dynamic-programming', 'string', 'sorting-searching', 'greedy', 'math']
const DIFFICULTIES = ['easy', 'medium', 'hard']

function difficultyBadgeVariant(difficulty: string) {
  if (difficulty === 'easy') return 'success' as const
  if (difficulty === 'medium') return 'warning' as const
  return 'destructive' as const
}

export function DsaListPage() {
  const [topic, setTopic] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<string | null>(null)
  const [problems, setProblems] = useState<DsaProblemSummary[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPage(0)
  }, [topic, difficulty])

  useEffect(() => {
    setLoading(true)
    dsaApi.list(topic, difficulty, page, 10)
      .then(res => {
        setProblems(res.content)
        setTotalPages(res.totalPages)
      })
      .finally(() => setLoading(false))
  }, [topic, difficulty, page])

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-mono text-3xl font-semibold">DSA</h1>

      <Card>
        <CardContent className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
          <Select value={topic ?? '__all__'} onValueChange={v => setTopic(v === '__all__' ? null : v)}>
            <SelectTrigger><SelectValue placeholder="Tất cả chủ đề" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Tất cả chủ đề</SelectItem>
              {TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={difficulty ?? '__all__'} onValueChange={v => setDifficulty(v === '__all__' ? null : v)}>
            <SelectTrigger><SelectValue placeholder="Tất cả độ khó" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Tất cả độ khó</SelectItem>
              {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      ) : problems.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Không tìm thấy bài toán nào phù hợp với bộ lọc hiện tại.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {problems.map(p => (
            <Link key={p.id} to={`/dsa/${p.slug}`}>
              <Card className="transition-colors hover:border-accent">
                <CardContent className="flex items-center justify-between py-4">
                  <h2 className="text-lg font-medium capitalize">{p.slug.replace(/-/g, ' ')}</h2>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{p.topic}</Badge>
                    <Badge variant={difficultyBadgeVariant(p.difficulty)}>{p.difficulty}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button variant="secondary" size="sm" disabled={page === 0} onClick={() => setPage(p => Math.max(0, p - 1))}>
                Trang trước
              </Button>
              <span className="text-sm text-muted-foreground">
                Trang <strong className="text-foreground">{page + 1}</strong> / {totalPages}
              </span>
              <Button variant="secondary" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}>
                Trang sau
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/pages/DsaListPage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Add the "DSA" nav link to `AppShell.tsx`**

Edit `web/src/components/layout/AppShell.tsx` — add a 5th entry to `NAV_LINKS`:

```ts
const NAV_LINKS = [
  { to: '/questions', label: 'Kho câu hỏi' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/interviews/new', label: 'Phỏng vấn AI' },
  { to: '/dsa', label: 'DSA' },
  { to: '/progress', label: 'Tiến độ' },
]
```

- [ ] **Step 6: Wire the route into `App.tsx`**

Edit `web/src/App.tsx` — add the import and route inside the `AppShell` layout route:

```tsx
import { DsaListPage } from './pages/DsaListPage'
```
```tsx
<Route path="/dsa" element={<DsaListPage />} />
```
(placed among the other nested routes, e.g. right after `/interviews/:sessionId` and before `/progress`).

- [ ] **Step 7: Verify**

Run (from `web/`):
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add web/src/pages/DsaListPage.tsx web/src/pages/DsaListPage.test.tsx web/src/components/layout/AppShell.tsx web/src/App.tsx
git commit -m "feat: add DSA list page and nav entry"
```

---

### Task 14: DSA problem page with Monaco editor and submit flow

**Files:**
- Create: `web/src/pages/DsaProblemPage.tsx`
- Test: `web/src/pages/DsaProblemPage.test.tsx`
- Modify: `web/src/App.tsx`
- Modify: `web/package.json` (via npm install)

**Interfaces:**
- Consumes: `dsaApi.detail`, `dsaApi.submit` (Task 12), `Card`/`CardContent`, `Select`/`SelectTrigger`/`SelectValue`/`SelectContent`/`SelectItem`, `Button`, `Alert`/`AlertDescription`, `Skeleton`, `toast` from `@/components/ui/sonner`, existing `MarkdownRenderer`.

- [ ] **Step 1: Install Monaco**

Run (from `web/`):
```bash
npm install @monaco-editor/react
```

- [ ] **Step 2: Write the DsaProblemPage test**

Create `web/src/pages/DsaProblemPage.test.tsx`. Monaco's editor requires a browser layout engine jsdom doesn't provide, so mock `@monaco-editor/react` with a plain `<textarea>` standing in for it — this keeps the test asserting on the app's own submit logic and result rendering, not Monaco's internals:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { DsaProblemPage } from './DsaProblemPage'
import { dsaApi } from '../api/dsa'

vi.mock('../api/dsa', () => ({
  dsaApi: { detail: vi.fn(), submit: vi.fn() },
}))

vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <textarea data-testid="editor" value={value} onChange={e => onChange(e.target.value)} />
  ),
}))

describe('DsaProblemPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('loads the problem, submits code, and shows a passed verdict', async () => {
    ;(dsaApi.detail as any).mockResolvedValueOnce({
      id: '1',
      slug: 'two-sum',
      topic: 'array',
      difficulty: 'easy',
      markdownBody: '## Đề bài (VI)\nNội dung.',
      starterCode: { java: 'stub-java', python: 'stub-python', javascript: 'stub-js', cpp: 'stub-cpp' },
      samples: [{ input: '2,7,11,15\n9', expectedOutput: '0,1' }],
    })
    ;(dsaApi.submit as any).mockResolvedValueOnce({
      verdict: 'PASSED',
      passedCount: 3,
      totalCount: 3,
      failures: [],
    })

    render(
      <MemoryRouter initialEntries={['/dsa/two-sum']}>
        <Routes>
          <Route path="/dsa/:slug" element={<DsaProblemPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('two sum')).toBeInTheDocument())

    fireEvent.click(screen.getByRole('button', { name: /chạy thử/i }))

    await waitFor(() => expect(screen.getByText(/PASSED/)).toBeInTheDocument())
    expect(dsaApi.submit).toHaveBeenCalledWith('two-sum', 'python', 'stub-python')
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run src/pages/DsaProblemPage.test.tsx`
Expected: FAIL — `./DsaProblemPage` does not exist yet.

- [ ] **Step 4: Create `DsaProblemPage.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { dsaApi } from '../api/dsa'
import type { DsaProblemDetail, DsaSubmissionResult } from '../types/dsa'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { toast } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const LANGUAGES = ['java', 'python', 'javascript', 'cpp'] as const

export function DsaProblemPage() {
  const { slug } = useParams<{ slug: string }>()
  const [problem, setProblem] = useState<DsaProblemDetail | null>(null)
  const [language, setLanguage] = useState<string>('python')
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<DsaSubmissionResult | null>(null)

  useEffect(() => {
    if (!slug) return
    dsaApi.detail(slug).then(detail => {
      setProblem(detail)
      setCode(detail.starterCode[language] ?? '')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  function onLanguageChange(next: string) {
    if (code.trim() && !window.confirm('Đổi ngôn ngữ sẽ mất code hiện tại. Tiếp tục?')) {
      return
    }
    setLanguage(next)
    setCode(problem?.starterCode[next] ?? '')
    setResult(null)
  }

  async function handleSubmit() {
    if (!slug || submitting) return
    setSubmitting(true)
    setResult(null)
    try {
      const res = await dsaApi.submit(slug, language, code)
      setResult(res)
    } catch (err: any) {
      toast.error(err.message || 'Không thể chấm bài, thử lại sau.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!problem) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono text-2xl font-semibold capitalize">{problem.slug.replace(/-/g, ' ')}</h1>
        <Button asChild variant="secondary" size="sm">
          <Link to="/dsa">Quay lại</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="prose prose-invert max-w-none py-6">
            <MarkdownRenderer content={problem.markdownBody} />
            {problem.samples.length > 0 && (
              <div className="mt-6 not-prose flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-muted-foreground">Ví dụ</h3>
                {problem.samples.map((sample, i) => (
                  <div key={i} className="rounded-md border border-border bg-muted p-3 font-mono text-xs">
                    <div>Input: {sample.input.replace('\n', ', ')}</div>
                    <div>Output: {sample.expectedOutput}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>

          <Card className="overflow-hidden">
            <Editor
              height="400px"
              language={language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={v => setCode(v ?? '')}
              options={{ minimap: { enabled: false }, fontSize: 14 }}
            />
          </Card>

          <Button onClick={handleSubmit} disabled={submitting || !code.trim()}>
            {submitting ? 'Đang chấm bài...' : 'Chạy thử'}
          </Button>

          {result && (
            <Card className={cn(result.verdict === 'PASSED' ? 'border-success' : 'border-danger')}>
              <CardContent className="py-4">
                <Alert variant={result.verdict === 'PASSED' ? 'default' : 'destructive'}>
                  <AlertDescription>
                    {result.verdict} — {result.passedCount}/{result.totalCount} test case đạt
                  </AlertDescription>
                </Alert>
                {result.failures.length > 0 && (
                  <div className="mt-4 flex flex-col gap-3">
                    {result.failures.map((f, i) => (
                      <div key={i} className="rounded-md border border-danger/40 bg-danger/5 p-3 font-mono text-xs">
                        <div>Input: {f.input}</div>
                        <div>Expected: {f.expected}</div>
                        <div>Actual: {f.actual}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run src/pages/DsaProblemPage.test.tsx`
Expected: PASS.

- [ ] **Step 6: Wire the route into `App.tsx`**

Edit `web/src/App.tsx`:

```tsx
import { DsaProblemPage } from './pages/DsaProblemPage'
```
```tsx
<Route path="/dsa/:slug" element={<DsaProblemPage />} />
```
(placed right after the `/dsa` route.)

- [ ] **Step 7: Verify**

Run (from `web/`):
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add web/src/pages/DsaProblemPage.tsx web/src/pages/DsaProblemPage.test.tsx web/src/App.tsx web/package.json web/package-lock.json
git commit -m "feat: add DSA problem page with Monaco editor and submit flow"
```

---

### Task 15: Progress integration

**Files:**
- Modify: `backend/src/main/java/com/interviewarena/progress/ProgressService.java`
- Modify: `backend/src/main/java/com/interviewarena/progress/dto/ProgressResponse.java`
- Modify: `backend/src/test/java/com/interviewarena/progress/ProgressServiceTest.java`
- Modify: `web/src/api/progress.ts`
- Modify: `web/src/pages/ProgressPage.tsx`
- Test: `web/src/pages/ProgressPage.test.tsx` (existing — update its mock data)

**Interfaces:**
- Consumes: `DsaSubmissionRepository.countDistinctProblemIdByUserIdAndVerdict` (Task 2).
- Produces: `ProgressResponse` gains `dsaProblemsSolved: long`.

- [ ] **Step 1: Update the failing test first**

Edit `backend/src/test/java/com/interviewarena/progress/ProgressServiceTest.java` — add the new mock and assertion to both existing tests:

```java
package com.interviewarena.progress;

import com.interviewarena.dsa.DsaSubmissionRepository;
import com.interviewarena.dsa.DsaVerdict;
import com.interviewarena.flashcard.FlashcardReviewRepository;
import com.interviewarena.interview.InterviewSession;
import com.interviewarena.interview.InterviewSessionRepository;
import com.interviewarena.interview.InterviewStatus;
import com.interviewarena.quiz.QuizAttempt;
import com.interviewarena.quiz.QuizAttemptRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProgressServiceTest {

    @Mock private InterviewSessionRepository interviewSessionRepository;
    @Mock private QuizAttemptRepository quizAttemptRepository;
    @Mock private FlashcardReviewRepository flashcardReviewRepository;
    @Mock private DsaSubmissionRepository dsaSubmissionRepository;

    private InterviewSession completedSession(int score) {
        InterviewSession s = new InterviewSession();
        s.setStatus(InterviewStatus.COMPLETED);
        s.setFinalScore(score);
        return s;
    }

    private QuizAttempt attempt(boolean correct) {
        QuizAttempt a = new QuizAttempt();
        a.setCorrect(correct);
        return a;
    }

    @Test
    void getProgress_aggregatesAcrossAllActivityTypes() {
        UUID userId = UUID.randomUUID();
        when(interviewSessionRepository.findByUserIdAndStatus(userId, InterviewStatus.COMPLETED))
            .thenReturn(List.of(completedSession(80), completedSession(90)));
        when(quizAttemptRepository.findByUserId(userId))
            .thenReturn(List.of(attempt(true), attempt(true), attempt(false), attempt(true)));
        when(flashcardReviewRepository.countByUserId(userId)).thenReturn(12L);
        when(dsaSubmissionRepository.countDistinctProblemIdByUserIdAndVerdict(userId, DsaVerdict.PASSED)).thenReturn(3L);

        ProgressService service = new ProgressService(
            interviewSessionRepository, quizAttemptRepository, flashcardReviewRepository, dsaSubmissionRepository);
        var result = service.getProgress(userId);

        assertThat(result.completedInterviews()).isEqualTo(2);
        assertThat(result.averageInterviewScore()).isEqualTo(85.0);
        assertThat(result.quizAccuracyPercent()).isEqualTo(75.0);
        assertThat(result.cardsReviewedTotal()).isEqualTo(12L);
        assertThat(result.dsaProblemsSolved()).isEqualTo(3L);
    }

    @Test
    void getProgress_handlesNoActivityYetWithoutDivisionByZero() {
        UUID userId = UUID.randomUUID();
        when(interviewSessionRepository.findByUserIdAndStatus(userId, InterviewStatus.COMPLETED)).thenReturn(List.of());
        when(quizAttemptRepository.findByUserId(userId)).thenReturn(List.of());
        when(flashcardReviewRepository.countByUserId(userId)).thenReturn(0L);
        when(dsaSubmissionRepository.countDistinctProblemIdByUserIdAndVerdict(userId, DsaVerdict.PASSED)).thenReturn(0L);

        ProgressService service = new ProgressService(
            interviewSessionRepository, quizAttemptRepository, flashcardReviewRepository, dsaSubmissionRepository);
        var result = service.getProgress(userId);

        assertThat(result.completedInterviews()).isZero();
        assertThat(result.averageInterviewScore()).isEqualTo(0.0);
        assertThat(result.quizAccuracyPercent()).isEqualTo(0.0);
        assertThat(result.dsaProblemsSolved()).isZero();
    }
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `mvn test -Dtest=ProgressServiceTest`
Expected: FAIL — `ProgressService`'s constructor doesn't accept a 4th argument yet, `ProgressResponse` has no `dsaProblemsSolved`.

- [ ] **Step 3: Update `ProgressResponse.java`**

```java
package com.interviewarena.progress.dto;

public record ProgressResponse(
    int completedInterviews,
    double averageInterviewScore,
    double quizAccuracyPercent,
    long cardsReviewedTotal,
    long dsaProblemsSolved
) {}
```

- [ ] **Step 4: Update `ProgressService.java`**

```java
package com.interviewarena.progress;

import com.interviewarena.dsa.DsaSubmissionRepository;
import com.interviewarena.dsa.DsaVerdict;
import com.interviewarena.flashcard.FlashcardReviewRepository;
import com.interviewarena.interview.InterviewSession;
import com.interviewarena.interview.InterviewSessionRepository;
import com.interviewarena.interview.InterviewStatus;
import com.interviewarena.progress.dto.ProgressResponse;
import com.interviewarena.quiz.QuizAttempt;
import com.interviewarena.quiz.QuizAttemptRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProgressService {

    private final InterviewSessionRepository interviewSessionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final FlashcardReviewRepository flashcardReviewRepository;
    private final DsaSubmissionRepository dsaSubmissionRepository;

    public ProgressService(
        InterviewSessionRepository interviewSessionRepository,
        QuizAttemptRepository quizAttemptRepository,
        FlashcardReviewRepository flashcardReviewRepository,
        DsaSubmissionRepository dsaSubmissionRepository
    ) {
        this.interviewSessionRepository = interviewSessionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.flashcardReviewRepository = flashcardReviewRepository;
        this.dsaSubmissionRepository = dsaSubmissionRepository;
    }

    public ProgressResponse getProgress(UUID userId) {
        List<InterviewSession> completed = interviewSessionRepository
            .findByUserIdAndStatus(userId, InterviewStatus.COMPLETED);

        double avgScore = completed.stream()
            .filter(s -> s.getFinalScore() != null)
            .mapToInt(InterviewSession::getFinalScore)
            .average()
            .orElse(0.0);

        List<QuizAttempt> attempts = quizAttemptRepository.findByUserId(userId);
        double accuracy = attempts.isEmpty() ? 0.0 :
            100.0 * attempts.stream().filter(QuizAttempt::isCorrect).count() / attempts.size();

        long cardsReviewed = flashcardReviewRepository.countByUserId(userId);
        long dsaProblemsSolved = dsaSubmissionRepository.countDistinctProblemIdByUserIdAndVerdict(userId, DsaVerdict.PASSED);

        return new ProgressResponse(completed.size(), avgScore, accuracy, cardsReviewed, dsaProblemsSolved);
    }
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `mvn test -Dtest=ProgressServiceTest`
Expected: PASS.

- [ ] **Step 6: Verify full backend build**

Run: `mvn test`
Expected: PASS.

- [ ] **Step 7: Update frontend `progress.ts` and `ProgressPage.tsx`**

Edit `web/src/api/progress.ts`:

```ts
import { apiClient } from './client'

export interface Progress {
  completedInterviews: number
  averageInterviewScore: number
  quizAccuracyPercent: number
  cardsReviewedTotal: number
  dsaProblemsSolved: number
}

export const progressApi = {
  get: () => apiClient.get<Progress>('/api/progress'),
}
```

Edit `web/src/pages/ProgressPage.tsx` — add `Code2` to the `lucide-react` import and a 5th entry to the `stats` array:

```tsx
import { Bot, TrendingUp, Target, Layers, Code2, Lightbulb } from 'lucide-react'
```
```tsx
  const stats = [
    { icon: Bot, label: 'Phỏng vấn AI đã xong', value: progress.completedInterviews },
    { icon: TrendingUp, label: 'Điểm phỏng vấn TB', value: progress.averageInterviewScore.toFixed(1) },
    { icon: Target, label: 'Độ chính xác Quiz', value: `${progress.quizAccuracyPercent.toFixed(1)}%` },
    { icon: Layers, label: 'Thẻ ghi nhớ đã ôn', value: progress.cardsReviewedTotal },
    { icon: Code2, label: 'Bài DSA đã giải', value: progress.dsaProblemsSolved },
  ]
```

- [ ] **Step 8: Update `ProgressPage.test.tsx`'s mock data**

Find the `progressApi.get` mock resolved value in `web/src/pages/ProgressPage.test.tsx` and add `dsaProblemsSolved: 5` (or a similar number) alongside the other four fields, so the mock matches the new `Progress` shape.

- [ ] **Step 9: Verify**

Run (from `web/`):
```bash
npx vitest run
npm run lint
npm run build
```
Expected: all pass.

- [ ] **Step 10: Commit**

```bash
git add backend/src/main/java/com/interviewarena/progress/ProgressService.java backend/src/main/java/com/interviewarena/progress/dto/ProgressResponse.java backend/src/test/java/com/interviewarena/progress/ProgressServiceTest.java web/src/api/progress.ts web/src/pages/ProgressPage.tsx web/src/pages/ProgressPage.test.tsx
git commit -m "feat: integrate DSA problems solved into Progress page"
```

---

## Self-Review Notes

- **Spec coverage:** Judge0 self-host (Task 1), data model (Task 2), content authoring + ingest (Tasks 3–5), harness pattern (Task 6), Judge0 client (Task 7), rate limiting (Task 8), service/API (Tasks 9–10), the "validate before building UI" ordering from the spec's rollout section (Task 11 sits before Tasks 12–14), frontend list/detail/editor (Tasks 12–14), Progress integration (Task 15). All covered.
- **Placeholder scan:** every harness (Task 5) is a real, manually-verified-by-hand (Step 7) working program per language, not a stub; the integration test (Task 11) provides real correct solutions for all 4 languages, not TODOs.
- **Type/signature consistency:** `DsaTestCase(input, expectedOutput, hidden)` from Task 3 matches the JSON shape produced by Task 5's `testcases.json` and the field names used throughout Task 9's `DsaService`. `JudgeSubmission`/`JudgeResult` field names from Task 7 match their usage in Task 9. `DsaSubmissionResultResponse`'s `verdict`/`passedCount`/`totalCount`/`failures` match the frontend `DsaSubmissionResult` type in Task 12 and its usage in Task 14. `ProgressService`'s constructor signature change in Task 15 is reflected in both the updated test and the class itself in the same task — no other task instantiates `ProgressService` directly.
- **Risk sequencing:** Task 11's live-Judge0 validation happens immediately after the backend judge pipeline is complete (Task 10) and before any frontend work begins (Task 12+), matching the spec's explicit rollout risk ordering.
