# Interview Arena — Phase 2: Question Bank Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Markdown-file-as-source-of-truth question bank: ingest
`.md` files into a queryable DB index, expose browse/detail APIs, and
render them on the frontend.

**Architecture:** Question content lives as `.md` files under
`content/questions/<position>/<technology>/<slug>.md` with YAML
frontmatter. A `ContentIngestCli` parses frontmatter and upserts a
`questions` index row per file (DB never stores the body — it stores
`content_path` and reads the file on detail-view requests). Only
`status=ACTIVE` questions are visible to normal users; ingestion never
promotes a question to `ACTIVE` on its own — only the explicit status
endpoint does, preserving the human-approval gate from spec §3.1.

**Tech Stack:** Same backend/frontend stack as Phase 1. Adds
`org.yaml:snakeyaml` (already a Phase 1 pom dependency) for frontmatter
parsing, and `react-markdown` on the frontend for rendering question body
content.

**Spec:** `docs/superpowers/specs/2026-08-24-interview-arena-design.md`
(§3.1, Appendix A.1-A.2)
**Overview/diagrams:** `docs/superpowers/plans/2026-08-24-interview-arena-00-overview.md`

## Global Constraints

- Depends on Phase 1 being complete (auth, `users` table, JWT filter).
- The `.md` file is the source of truth; the `questions` table is a
  derived index only (spec §3.1) — never write question body text into
  the DB.
- Ingestion must never set `status=ACTIVE` on an existing row — status
  transitions only via the explicit status-update endpoint (spec §5,
  "Chất lượng câu hỏi AI sinh").
- All new code under `com.interviewarena.question` (backend) and
  `web/src/{api,pages}` (frontend), consistent with the Task 1 file layout.

---

### Task 1: `Question` entity + Flyway migration

**Files:**
- Create: `backend/src/main/resources/db/migration/V3__create_questions.sql`
- Create: `backend/src/main/java/com/interviewarena/question/Question.java`
- Create: `backend/src/main/java/com/interviewarena/question/QuestionStatus.java`
- Create: `backend/src/main/java/com/interviewarena/question/QuestionRepository.java`
- Test: `backend/src/test/java/com/interviewarena/question/QuestionRepositoryTest.java`

**Interfaces:**
- Produces: `Question` entity (`id: UUID`, `slug: String` unique,
  `position: String`, `technology: String`, `level: String`,
  `source: String`, `status: QuestionStatus`, `contentPath: String`,
  `syncedAt: Instant`). `QuestionRepository` with
  `Optional<Question> findBySlug(String slug)` and
  `List<Question> findByStatusAndPositionAndTechnologyAndLevel(...)`
  (Spring Data derived query) — consumed by Task 2 (ingest upsert) and
  Task 4 (browse API).

- [ ] **Step 1: Write migration**

```sql
-- V3__create_questions.sql
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(150) NOT NULL UNIQUE,
    position VARCHAR(30) NOT NULL,
    technology VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    source VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    content_path VARCHAR(500) NOT NULL,
    synced_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_questions_filter ON questions (status, position, technology, level);
```

- [ ] **Step 2: Write failing repository test**

```java
package com.interviewarena.question;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class QuestionRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private QuestionRepository questionRepository;

    private Question sample(String slug, QuestionStatus status) {
        Question q = new Question();
        q.setSlug(slug);
        q.setPosition("frontend");
        q.setTechnology("react");
        q.setLevel("mid");
        q.setSource("MANUAL");
        q.setStatus(status);
        q.setContentPath("content/questions/frontend/react/" + slug + ".md");
        q.setSyncedAt(Instant.now());
        return q;
    }

    @Test
    void findByStatusAndFilters_returnsOnlyMatchingActiveQuestions() {
        questionRepository.save(sample("react-q1", QuestionStatus.ACTIVE));
        questionRepository.save(sample("react-q2", QuestionStatus.DRAFT));

        List<Question> result = questionRepository
            .findByStatusAndPositionAndTechnologyAndLevel(QuestionStatus.ACTIVE, "frontend", "react", "mid");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getSlug()).isEqualTo("react-q1");
    }

    @Test
    void findBySlug_returnsEmptyWhenMissing() {
        assertThat(questionRepository.findBySlug("does-not-exist")).isEmpty();
    }
}
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=QuestionRepositoryTest`
Expected: FAIL (compile error — none of the classes exist).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/question/QuestionStatus.java
package com.interviewarena.question;

public enum QuestionStatus {
    DRAFT, ACTIVE
}
```

```java
// backend/src/main/java/com/interviewarena/question/Question.java
package com.interviewarena.question;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false)
    private String technology;

    @Column(nullable = false)
    private String level;

    @Column(nullable = false)
    private String source;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionStatus status;

    @Column(name = "content_path", nullable = false)
    private String contentPath;

    @Column(name = "synced_at", nullable = false)
    private Instant syncedAt;

    public UUID getId() { return id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public QuestionStatus getStatus() { return status; }
    public void setStatus(QuestionStatus status) { this.status = status; }
    public String getContentPath() { return contentPath; }
    public void setContentPath(String contentPath) { this.contentPath = contentPath; }
    public Instant getSyncedAt() { return syncedAt; }
    public void setSyncedAt(Instant syncedAt) { this.syncedAt = syncedAt; }
}
```

```java
// backend/src/main/java/com/interviewarena/question/QuestionRepository.java
package com.interviewarena.question;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
    Optional<Question> findBySlug(String slug);
    List<Question> findByStatusAndPositionAndTechnologyAndLevel(
        QuestionStatus status, String position, String technology, String level);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=QuestionRepositoryTest`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/resources/db/migration/V3__create_questions.sql backend/src/main/java/com/interviewarena/question backend/src/test/java/com/interviewarena/question
git commit -m "feat: add Question entity, migration, and repository"
```

---

### Task 2: Frontmatter parser + `ContentIngestService`

**Files:**
- Create: `backend/src/main/java/com/interviewarena/question/QuestionFrontmatter.java`
- Create: `backend/src/main/java/com/interviewarena/question/FrontmatterParser.java`
- Create: `backend/src/main/java/com/interviewarena/question/ContentIngestService.java`
- Test: `backend/src/test/java/com/interviewarena/question/FrontmatterParserTest.java`
- Test: `backend/src/test/java/com/interviewarena/question/ContentIngestServiceTest.java`

**Interfaces:**
- Consumes: `QuestionRepository` (Task 1).
- Produces: `FrontmatterParser.parse(Path file): QuestionFrontmatter`
  (throws `IllegalArgumentException` if a required field is missing).
  `ContentIngestService.ingestDirectory(Path root): IngestResult` where
  `IngestResult` is a record `(int upserted, List<String> errors)` —
  consumed by `ContentIngestCli` (Task 3).

- [ ] **Step 1: Write failing test for `FrontmatterParser`**

```java
package com.interviewarena.question;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class FrontmatterParserTest {

    @Test
    void parse_extractsAllFields(@TempDir Path tempDir) throws IOException {
        String md = """
            ---
            id: react-hooks-usestate-vs-usereducer
            position: frontend
            technology: react
            level: mid
            tags: [hooks, state-management]
            source: MANUAL
            status: ACTIVE
            created_at: 2026-08-24
            ---

            ## Câu hỏi (VI)
            Nội dung...
            """;
        Path file = tempDir.resolve("sample.md");
        Files.writeString(file, md);

        QuestionFrontmatter fm = new FrontmatterParser().parse(file);

        assertThat(fm.id()).isEqualTo("react-hooks-usestate-vs-usereducer");
        assertThat(fm.position()).isEqualTo("frontend");
        assertThat(fm.technology()).isEqualTo("react");
        assertThat(fm.level()).isEqualTo("mid");
        assertThat(fm.source()).isEqualTo("MANUAL");
        assertThat(fm.status()).isEqualTo("ACTIVE");
    }

    @Test
    void parse_throwsWhenRequiredFieldMissing(@TempDir Path tempDir) throws IOException {
        String md = """
            ---
            id: broken-question
            position: frontend
            ---

            body
            """;
        Path file = tempDir.resolve("broken.md");
        Files.writeString(file, md);

        assertThatThrownBy(() -> new FrontmatterParser().parse(file))
            .isInstanceOf(IllegalArgumentException.class);
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=FrontmatterParserTest`
Expected: FAIL (compile error — classes don't exist).

- [ ] **Step 3: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/question/QuestionFrontmatter.java
package com.interviewarena.question;

public record QuestionFrontmatter(
    String id,
    String position,
    String technology,
    String level,
    String source,
    String status
) {}
```

```java
// backend/src/main/java/com/interviewarena/question/FrontmatterParser.java
package com.interviewarena.question;

import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@Component
public class FrontmatterParser {

    private static final List<String> REQUIRED_FIELDS =
        List.of("id", "position", "technology", "level", "source", "status");

    public QuestionFrontmatter parse(Path file) throws IOException {
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

        return new QuestionFrontmatter(
            data.get("id").toString(),
            data.get("position").toString(),
            data.get("technology").toString(),
            data.get("level").toString(),
            data.get("source").toString(),
            data.get("status").toString()
        );
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=FrontmatterParserTest`
Expected: PASS.

- [ ] **Step 5: Write failing test for `ContentIngestService`**

```java
package com.interviewarena.question;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContentIngestServiceTest {

    private void writeQuestion(Path dir, String id, String status) throws IOException {
        Files.createDirectories(dir);
        String md = """
            ---
            id: %s
            position: frontend
            technology: react
            level: mid
            source: MANUAL
            status: %s
            ---

            ## Câu hỏi (VI)
            Nội dung mẫu.
            """.formatted(id, status);
        Files.writeString(dir.resolve(id + ".md"), md);
    }

    @Test
    void ingestDirectory_insertsNewQuestionWithFrontmatterStatus(@TempDir Path tempDir) throws IOException {
        Path questionsDir = tempDir.resolve("frontend/react");
        writeQuestion(questionsDir, "new-question", "DRAFT");

        QuestionRepository repository = mock(QuestionRepository.class);
        when(repository.findBySlug("new-question")).thenReturn(Optional.empty());

        ContentIngestService service = new ContentIngestService(repository, new FrontmatterParser());
        ContentIngestService.IngestResult result = service.ingestDirectory(tempDir);

        assertThat(result.errors()).isEmpty();
        assertThat(result.upserted()).isEqualTo(1);

        ArgumentCaptor<Question> captor = ArgumentCaptor.forClass(Question.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo(QuestionStatus.DRAFT);
    }

    @Test
    void ingestDirectory_neverDowngradesExistingActiveStatusFromFrontmatter(@TempDir Path tempDir) throws IOException {
        Path questionsDir = tempDir.resolve("frontend/react");
        writeQuestion(questionsDir, "existing-question", "DRAFT");

        Question existing = new Question();
        existing.setSlug("existing-question");
        existing.setStatus(QuestionStatus.ACTIVE);

        QuestionRepository repository = mock(QuestionRepository.class);
        when(repository.findBySlug("existing-question")).thenReturn(Optional.of(existing));

        ContentIngestService service = new ContentIngestService(repository, new FrontmatterParser());
        service.ingestDirectory(tempDir);

        ArgumentCaptor<Question> captor = ArgumentCaptor.forClass(Question.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo(QuestionStatus.ACTIVE);
    }

    @Test
    void ingestDirectory_collectsErrorInsteadOfThrowingOnBadFile(@TempDir Path tempDir) throws IOException {
        Path badDir = tempDir.resolve("frontend/react");
        Files.createDirectories(badDir);
        Files.writeString(badDir.resolve("broken.md"), "not frontmatter at all");

        ContentIngestService service = new ContentIngestService(mock(QuestionRepository.class), new FrontmatterParser());
        ContentIngestService.IngestResult result = service.ingestDirectory(tempDir);

        assertThat(result.errors()).hasSize(1);
        assertThat(result.upserted()).isZero();
    }
}
```

- [ ] **Step 6: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=ContentIngestServiceTest`
Expected: FAIL (compile error — `ContentIngestService` doesn't exist).

- [ ] **Step 7: Write minimal implementation**

```java
package com.interviewarena.question;

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
public class ContentIngestService {

    private final QuestionRepository questionRepository;
    private final FrontmatterParser frontmatterParser;

    public ContentIngestService(QuestionRepository questionRepository, FrontmatterParser frontmatterParser) {
        this.questionRepository = questionRepository;
        this.frontmatterParser = frontmatterParser;
    }

    public record IngestResult(int upserted, List<String> errors) {}

    public IngestResult ingestDirectory(Path root) {
        List<String> errors = new ArrayList<>();
        int upserted = 0;

        List<Path> files;
        try (Stream<Path> walk = Files.walk(root)) {
            files = walk.filter(p -> p.toString().endsWith(".md")).toList();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }

        for (Path file : files) {
            try {
                QuestionFrontmatter fm = frontmatterParser.parse(file);
                upsert(fm, root.relativize(file).toString());
                upserted++;
            } catch (Exception e) {
                errors.add(file + ": " + e.getMessage());
            }
        }
        return new IngestResult(upserted, errors);
    }

    private void upsert(QuestionFrontmatter fm, String relativePath) {
        Optional<Question> existing = questionRepository.findBySlug(fm.id());
        Question question = existing.orElseGet(Question::new);
        question.setSlug(fm.id());
        question.setPosition(fm.position());
        question.setTechnology(fm.technology());
        question.setLevel(fm.level());
        question.setSource(fm.source());
        question.setContentPath(relativePath);
        question.setSyncedAt(Instant.now());
        if (existing.isEmpty()) {
            question.setStatus(QuestionStatus.valueOf(fm.status()));
        }
        // status is intentionally left untouched on updates — only the
        // status endpoint (Task 5) may promote DRAFT -> ACTIVE.
        questionRepository.save(question);
    }
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=ContentIngestServiceTest`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add backend/src/main/java/com/interviewarena/question backend/src/test/java/com/interviewarena/question
git commit -m "feat: add frontmatter parser and content ingest service"
```

---

### Task 3: `ContentIngestCli` runnable entry point

**Files:**
- Create: `backend/src/main/java/com/interviewarena/question/ContentIngestCli.java`

**Interfaces:**
- Consumes: `ContentIngestService` (Task 2).
- Produces: a standalone runnable that ingests a directory path given as
  `args[0]` and prints a summary; exits non-zero if any file errored.

- [ ] **Step 1: Write the CLI class**

```java
package com.interviewarena.question;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.nio.file.Path;

@SpringBootApplication(scanBasePackages = "com.interviewarena")
public class ContentIngestCli {

    public static void main(String[] args) {
        if (args.length < 1) {
            System.err.println("Usage: ContentIngestCli <content-questions-root-dir>");
            System.exit(1);
        }
        var app = new org.springframework.boot.builder.SpringApplicationBuilder(ContentIngestCli.class)
            .web(WebApplicationType.NONE);
        try (ConfigurableApplicationContext ctx = app.run(args)) {
            ContentIngestService service = ctx.getBean(ContentIngestService.class);
            ContentIngestService.IngestResult result = service.ingestDirectory(Path.of(args[0]));
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

Note: this is a manually-run maintenance tool (no automated test needed —
its logic is fully covered by `ContentIngestServiceTest`). It is run via:
`cd backend && ./mvnw compile exec:java -Dexec.mainClass=com.interviewarena.question.ContentIngestCli -Dexec.args=../content/questions` (requires `exec-maven-plugin`; add it to `pom.xml`'s `<build><plugins>` if not already present — see Step 2).

- [ ] **Step 2: Add exec-maven-plugin to `pom.xml`**

Add inside `<build><plugins>` in `backend/pom.xml`:
```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>exec-maven-plugin</artifactId>
    <version>3.3.0</version>
</plugin>
```

- [ ] **Step 3: Manual verification**

Run: `cd backend && ./mvnw compile exec:java -Dexec.mainClass=com.interviewarena.question.ContentIngestCli -Dexec.args=../content/questions`
Expected: prints `Upserted: 0` (directory is empty until Task 7 seeds files)
without error.

- [ ] **Step 4: Commit**

```bash
git add backend/pom.xml backend/src/main/java/com/interviewarena/question/ContentIngestCli.java
git commit -m "feat: add ContentIngestCli runnable entry point"
```

---

### Task 4: `QuestionController` — browse + detail API

**Files:**
- Create: `backend/src/main/java/com/interviewarena/question/QuestionContentReader.java`
- Create: `backend/src/main/java/com/interviewarena/question/dto/QuestionSummaryResponse.java`
- Create: `backend/src/main/java/com/interviewarena/question/dto/QuestionDetailResponse.java`
- Create: `backend/src/main/java/com/interviewarena/question/QuestionService.java`
- Create: `backend/src/main/java/com/interviewarena/question/QuestionController.java`
- Test: `backend/src/test/java/com/interviewarena/question/QuestionServiceTest.java`

**Interfaces:**
- Consumes: `QuestionRepository` (Task 1).
- Produces: `GET /api/questions?position=&technology=&level=` → `200
  List<QuestionSummaryResponse>` (only `ACTIVE`); `GET /api/questions/{id}`
  → `200 QuestionDetailResponse{id, slug, position, technology, level,
  markdownBody}` or `404` if not found or not `ACTIVE`. Consumed by the FE
  in Task 6.

- [ ] **Step 1: Write failing unit test for `QuestionService`**

```java
package com.interviewarena.question;

import com.interviewarena.question.dto.QuestionDetailResponse;
import com.interviewarena.question.dto.QuestionSummaryResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private QuestionContentReader contentReader;

    private Question activeQuestion() {
        Question q = new Question();
        q.setSlug("react-q1");
        q.setPosition("frontend");
        q.setTechnology("react");
        q.setLevel("mid");
        q.setStatus(QuestionStatus.ACTIVE);
        q.setContentPath("frontend/react/react-q1.md");
        return q;
    }

    @Test
    void list_returnsOnlyActiveMatchingQuestions() {
        when(questionRepository.findByStatusAndPositionAndTechnologyAndLevel(
            QuestionStatus.ACTIVE, "frontend", "react", "mid"))
            .thenReturn(List.of(activeQuestion()));

        QuestionService service = new QuestionService(questionRepository, contentReader);
        List<QuestionSummaryResponse> result = service.list("frontend", "react", "mid");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).slug()).isEqualTo("react-q1");
    }

    @Test
    void getDetail_returnsMarkdownBodyForActiveQuestion() {
        Question q = activeQuestion();
        when(questionRepository.findById(any())).thenReturn(Optional.of(q));
        when(contentReader.readBody("frontend/react/react-q1.md")).thenReturn("## Câu hỏi\n...");

        QuestionService service = new QuestionService(questionRepository, contentReader);
        QuestionDetailResponse detail = service.getDetail(UUID.randomUUID());

        assertThat(detail.markdownBody()).isEqualTo("## Câu hỏi\n...");
    }

    @Test
    void getDetail_throwsWhenQuestionIsNotActive() {
        Question q = activeQuestion();
        q.setStatus(QuestionStatus.DRAFT);
        when(questionRepository.findById(any())).thenReturn(Optional.of(q));

        QuestionService service = new QuestionService(questionRepository, contentReader);

        assertThatThrownBy(() -> service.getDetail(UUID.randomUUID()))
            .isInstanceOf(NoSuchElementException.class);
    }
}
```

(add `import static org.mockito.ArgumentMatchers.any;`)

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=QuestionServiceTest`
Expected: FAIL (compile error — classes don't exist).

- [ ] **Step 3: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/question/QuestionContentReader.java
package com.interviewarena.question;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class QuestionContentReader {

    private static final Path CONTENT_ROOT = Path.of("..", "content", "questions");

    public String readBody(String relativeContentPath) {
        try {
            String raw = Files.readString(CONTENT_ROOT.resolve(relativeContentPath));
            String[] parts = raw.split("(?m)^---\\s*$", 3);
            return parts.length == 3 ? parts[2].strip() : raw.strip();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
```

```java
// backend/src/main/java/com/interviewarena/question/dto/QuestionSummaryResponse.java
package com.interviewarena.question.dto;

import java.util.UUID;

public record QuestionSummaryResponse(UUID id, String slug, String position, String technology, String level) {}
```

```java
// backend/src/main/java/com/interviewarena/question/dto/QuestionDetailResponse.java
package com.interviewarena.question.dto;

import java.util.UUID;

public record QuestionDetailResponse(
    UUID id, String slug, String position, String technology, String level, String markdownBody
) {}
```

```java
// backend/src/main/java/com/interviewarena/question/QuestionService.java
package com.interviewarena.question;

import com.interviewarena.question.dto.QuestionDetailResponse;
import com.interviewarena.question.dto.QuestionSummaryResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionContentReader contentReader;

    public QuestionService(QuestionRepository questionRepository, QuestionContentReader contentReader) {
        this.questionRepository = questionRepository;
        this.contentReader = contentReader;
    }

    public List<QuestionSummaryResponse> list(String position, String technology, String level) {
        return questionRepository
            .findByStatusAndPositionAndTechnologyAndLevel(QuestionStatus.ACTIVE, position, technology, level)
            .stream()
            .map(q -> new QuestionSummaryResponse(q.getId(), q.getSlug(), q.getPosition(), q.getTechnology(), q.getLevel()))
            .toList();
    }

    public QuestionDetailResponse getDetail(UUID id) {
        Question q = questionRepository.findById(id)
            .filter(question -> question.getStatus() == QuestionStatus.ACTIVE)
            .orElseThrow(() -> new NoSuchElementException("Question not found: " + id));
        String body = contentReader.readBody(q.getContentPath());
        return new QuestionDetailResponse(q.getId(), q.getSlug(), q.getPosition(), q.getTechnology(), q.getLevel(), body);
    }
}
```

```java
// backend/src/main/java/com/interviewarena/question/QuestionController.java
package com.interviewarena.question;

import com.interviewarena.question.dto.QuestionDetailResponse;
import com.interviewarena.question.dto.QuestionSummaryResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<QuestionSummaryResponse> list(
        @RequestParam String position,
        @RequestParam String technology,
        @RequestParam String level
    ) {
        return questionService.list(position, technology, level);
    }

    @GetMapping("/{id}")
    public QuestionDetailResponse detail(@PathVariable UUID id) {
        return questionService.getDetail(id);
    }
}
```

Add a `NoSuchElementException` → 404 mapping to a shared exception handler
(create it now since Phase 3+ will reuse it):

```java
// backend/src/main/java/com/interviewarena/common/GlobalExceptionHandler.java
package com.interviewarena.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=QuestionServiceTest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/question backend/src/main/java/com/interviewarena/common/GlobalExceptionHandler.java backend/src/test/java/com/interviewarena/question/QuestionServiceTest.java
git commit -m "feat: add question browse/detail API"
```

---

### Task 5: Question status update endpoint (Admin approval)

**Files:**
- Create: `backend/src/main/java/com/interviewarena/question/dto/UpdateStatusRequest.java`
- Modify: `backend/src/main/java/com/interviewarena/question/QuestionService.java` (add `updateStatus`)
- Modify: `backend/src/main/java/com/interviewarena/question/QuestionController.java` (add PATCH endpoint)
- Test: `backend/src/test/java/com/interviewarena/question/QuestionServiceTest.java` (extend)

**Interfaces:**
- Produces: `PATCH /api/questions/{id}/status {status: "ACTIVE"|"DRAFT"}` →
  `200 QuestionSummaryResponse`. Requires authentication (any logged-in
  user in this MVP — role-based admin restriction is explicitly out of
  scope for the MVP per spec §2's "Ngoài phạm vi MVP" scoping; this
  endpoint exists so the content workflow described in spec §3.1/Appendix
  A.2 is fully operable end-to-end).

- [ ] **Step 1: Add failing test case to `QuestionServiceTest`**

```java
    @Test
    void updateStatus_promotesDraftToActiveAndPersists() {
        Question q = activeQuestion();
        q.setStatus(QuestionStatus.DRAFT);
        when(questionRepository.findById(any())).thenReturn(Optional.of(q));
        when(questionRepository.save(any(Question.class))).thenAnswer(inv -> inv.getArgument(0));

        QuestionService service = new QuestionService(questionRepository, contentReader);
        var result = service.updateStatus(UUID.randomUUID(), QuestionStatus.ACTIVE);

        assertThat(result.slug()).isEqualTo("react-q1");
        assertThat(q.getStatus()).isEqualTo(QuestionStatus.ACTIVE);
    }
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=QuestionServiceTest`
Expected: FAIL (`updateStatus` method doesn't exist).

- [ ] **Step 3: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/question/dto/UpdateStatusRequest.java
package com.interviewarena.question.dto;

import jakarta.validation.constraints.NotNull;
import com.interviewarena.question.QuestionStatus;

public record UpdateStatusRequest(@NotNull QuestionStatus status) {}
```

Add to `QuestionService`:
```java
    public QuestionSummaryResponse updateStatus(UUID id, QuestionStatus status) {
        Question q = questionRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Question not found: " + id));
        q.setStatus(status);
        questionRepository.save(q);
        return new QuestionSummaryResponse(q.getId(), q.getSlug(), q.getPosition(), q.getTechnology(), q.getLevel());
    }
```

Add to `QuestionController`:
```java
    @PatchMapping("/{id}/status")
    public QuestionSummaryResponse updateStatus(@PathVariable UUID id, @jakarta.validation.Valid @RequestBody com.interviewarena.question.dto.UpdateStatusRequest request) {
        return questionService.updateStatus(id, request.status());
    }
```

Note: `getDetail`'s existing `.filter(status == ACTIVE)` means a `DRAFT`
question's id still 404s for the read endpoint even for the same logged-in
user — this is acceptable for MVP since there is no separate admin
review-view endpoint yet; reviewing DRAFT content happens by reading the
`.md` file directly before approving.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=QuestionServiceTest`
Expected: PASS (all 5 cases in the class).

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/question backend/src/test/java/com/interviewarena/question/QuestionServiceTest.java
git commit -m "feat: add question status update endpoint for admin approval"
```

---

### Task 6: Frontend — Question Bank browse + detail pages

**Files:**
- Create: `web/src/types/question.ts`
- Create: `web/src/api/questions.ts`
- Create: `web/src/pages/QuestionBankPage.tsx`
- Create: `web/src/pages/QuestionDetailPage.tsx`
- Create: `web/src/components/MarkdownRenderer.tsx`
- Modify: `web/src/App.tsx` (add routes)
- Test: `web/src/pages/QuestionBankPage.test.tsx`

**Interfaces:**
- Consumes: `apiClient` (Phase 1), `GET /api/questions`,
  `GET /api/questions/{id}` (Task 4).
- Produces: routes `/questions` (filterable list) and `/questions/:id`
  (rendered markdown detail).

- [ ] **Step 1: Install `react-markdown`**

Run: `cd web && npm install react-markdown`

- [ ] **Step 2: Write shared types + API module**

```typescript
// web/src/types/question.ts
export interface QuestionSummary {
  id: string
  slug: string
  position: string
  technology: string
  level: string
}

export interface QuestionDetail extends QuestionSummary {
  markdownBody: string
}
```

```typescript
// web/src/api/questions.ts
import { apiClient } from './client'
import type { QuestionDetail, QuestionSummary } from '../types/question'

export const questionsApi = {
  list: (position: string, technology: string, level: string) =>
    apiClient.get<QuestionSummary[]>(
      `/api/questions?position=${position}&technology=${technology}&level=${level}`
    ),
  detail: (id: string) => apiClient.get<QuestionDetail>(`/api/questions/${id}`),
}
```

- [ ] **Step 3: Write failing test for `QuestionBankPage`**

```tsx
// web/src/pages/QuestionBankPage.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QuestionBankPage } from './QuestionBankPage'
import { questionsApi } from '../api/questions'

vi.mock('../api/questions', () => ({
  questionsApi: { list: vi.fn() },
}))

describe('QuestionBankPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('lists questions returned for the default filters', async () => {
    ;(questionsApi.list as any).mockResolvedValueOnce([
      { id: '1', slug: 'react-q1', position: 'frontend', technology: 'react', level: 'junior' },
    ])

    render(
      <MemoryRouter>
        <QuestionBankPage />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('react-q1')).toBeInTheDocument())
  })
})
```

- [ ] **Step 4: Run test to verify it fails**

Run: `cd web && npx vitest run src/pages/QuestionBankPage.test.tsx`
Expected: FAIL (`./QuestionBankPage` doesn't exist).

- [ ] **Step 5: Write minimal implementation**

```tsx
// web/src/pages/QuestionBankPage.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import type { QuestionSummary } from '../types/question'

const POSITIONS = ['frontend', 'backend', 'devops', 'ai', 'database']
const LEVELS = ['junior', 'mid', 'senior']

export function QuestionBankPage() {
  const [position, setPosition] = useState('frontend')
  const [technology, setTechnology] = useState('react')
  const [level, setLevel] = useState('junior')
  const [questions, setQuestions] = useState<QuestionSummary[]>([])

  useEffect(() => {
    questionsApi.list(position, technology, level).then(setQuestions)
  }, [position, technology, level])

  return (
    <div>
      <h1>Kho câu hỏi</h1>
      <select value={position} onChange={e => setPosition(e.target.value)}>
        {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <input value={technology} onChange={e => setTechnology(e.target.value)} placeholder="Công nghệ" />
      <select value={level} onChange={e => setLevel(e.target.value)}>
        {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <ul>
        {questions.map(q => (
          <li key={q.id}>
            <Link to={`/questions/${q.id}`}>{q.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd web && npx vitest run src/pages/QuestionBankPage.test.tsx`
Expected: PASS.

- [ ] **Step 7: Write `MarkdownRenderer` and `QuestionDetailPage` (no separate test — thin wrapper, covered by manual smoke test in Step 8)**

```tsx
// web/src/components/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown'

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
```

```tsx
// web/src/pages/QuestionDetailPage.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import type { QuestionDetail } from '../types/question'

export function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [detail, setDetail] = useState<QuestionDetail | null>(null)

  useEffect(() => {
    if (id) questionsApi.detail(id).then(setDetail)
  }, [id])

  if (!detail) return <p>Đang tải...</p>

  return (
    <div>
      <h1>{detail.slug}</h1>
      <MarkdownRenderer content={detail.markdownBody} />
    </div>
  )
}
```

Wire into `web/src/App.tsx` — add inside `<Routes>`:
```tsx
          <Route path="/questions" element={<QuestionBankPage />} />
          <Route path="/questions/:id" element={<QuestionDetailPage />} />
```
and import both at the top of the file.

- [ ] **Step 8: Manual smoke test**

Seed content (Task 7 below) and run the ingest CLI, then with backend +
frontend running, visit `http://localhost:5173/questions`, confirm the
seeded question appears and clicking it renders the markdown body with
headings.

- [ ] **Step 9: Commit**

```bash
git add web/src
git commit -m "feat: add question bank browse and detail pages"
```

---

### Task 7: Seed real sample content files

**Files:**
- Create: `content/questions/frontend/react/react-hooks-usestate-vs-usereducer.md`
- Create: `content/questions/backend/spring-boot/spring-boot-bean-lifecycle.md`
- Create: `content/questions/devops/docker/docker-image-vs-container.md`

**Interfaces:**
- Produces: real ingestible content so Task 6's manual smoke test has data
  to show.

- [ ] **Step 1: Write the 3 seed files** (frontmatter fields per Task 2's
  parser: `id`, `position`, `technology`, `level`, `source`, `status` are
  required)

`content/questions/frontend/react/react-hooks-usestate-vs-usereducer.md`:
```markdown
---
id: react-hooks-usestate-vs-usereducer
position: frontend
technology: react
level: mid
tags: [hooks, state-management]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào bạn nên dùng `useReducer` thay vì `useState` trong React?

## Question (EN)
When should you use `useReducer` instead of `useState` in React?

## Đáp án chi tiết (VI)
`useReducer` phù hợp khi state có logic cập nhật phức tạp, nhiều state con
liên quan đến nhau, hoặc khi state tiếp theo phụ thuộc vào action cụ thể
thay vì chỉ một giá trị mới.

## Detailed Answer (EN)
`useReducer` fits better when update logic is complex, multiple sub-values
are related, or the next state depends on a specific action rather than a
single new value.
```

`content/questions/backend/spring-boot/spring-boot-bean-lifecycle.md`:
```markdown
---
id: spring-boot-bean-lifecycle
position: backend
technology: spring-boot
level: mid
tags: [ioc, lifecycle]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vòng đời của một Spring Bean diễn ra như thế nào?

## Question (EN)
What is the lifecycle of a Spring Bean?

## Đáp án chi tiết (VI)
Instantiation → Populate Properties → `BeanNameAware`/`BeanFactoryAware` →
`@PostConstruct` → bean sẵn sàng sử dụng → `@PreDestroy` khi container
đóng.

## Detailed Answer (EN)
Instantiation → Populate Properties → `BeanNameAware`/`BeanFactoryAware` →
`@PostConstruct` → bean ready for use → `@PreDestroy` on container
shutdown.
```

`content/questions/devops/docker/docker-image-vs-container.md`:
```markdown
---
id: docker-image-vs-container
position: devops
technology: docker
level: junior
tags: [docker, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa Docker image và Docker container là gì?

## Question (EN)
What is the difference between a Docker image and a Docker container?

## Đáp án chi tiết (VI)
Image là bản đóng gói tĩnh, chỉ đọc, chứa filesystem + config để chạy ứng
dụng. Container là một instance đang chạy của image đó, có thêm một
writable layer.

## Detailed Answer (EN)
An image is a static, read-only package containing the filesystem and
config needed to run an app. A container is a running instance of that
image, with an added writable layer.
```

- [ ] **Step 2: Run ingest CLI**

Run: `cd backend && ./mvnw compile exec:java -Dexec.mainClass=com.interviewarena.question.ContentIngestCli -Dexec.args=../content/questions`
Expected: `Upserted: 3`, no errors printed.

- [ ] **Step 3: Verify via API**

Run: `curl "http://localhost:8080/api/questions?position=frontend&technology=react&level=mid"`
Expected: JSON array containing the `react-hooks-usestate-vs-usereducer`
question.

- [ ] **Step 4: Commit**

```bash
git add content/questions
git commit -m "content: seed 3 sample interview questions"
```

---

## Definition of done for this phase

- `cd backend && ./mvnw test` passes (repository, parser, ingest, service
  tests all green).
- `cd web && npx vitest run` passes.
- Running `ContentIngestCli` against `content/questions` upserts all 3
  seed files with zero errors.
- Manual: `/questions` in the browser lists seeded questions, clicking one
  renders its bilingual markdown body.
