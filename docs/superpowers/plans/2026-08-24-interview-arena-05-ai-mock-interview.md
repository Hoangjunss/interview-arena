# Interview Arena — Phase 5: AI Mock Interview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The core differentiator feature — a text-based AI mock interview:
user answers, LLM asks a context-aware follow-up, and after N questions the
LLM scores the whole session with per-turn feedback. Answer submission is
decoupled from the slow LLM call via Kafka so the API never blocks on it.

**Architecture:** `InterviewSession` (one per practice attempt) has many
`InterviewTurn` rows (one per question/answer pair). `POST .../answers`
writes the answer, publishes `InterviewAnswerSubmittedEvent` to Kafka, and
returns immediately (`202 PROCESSING`). `InterviewScoringWorker` (a Kafka
consumer) does the actual LLM call off the request thread: either creates
the next question turn, or — on the last turn — asks the LLM for
structured JSON scoring and marks the session `COMPLETED`. The frontend
polls `GET /api/interviews/{id}` every 2s until a new question or the
final result appears. See the sequence diagram in
`2026-08-24-interview-arena-00-overview.md`.

**Tech Stack:** Same backend/frontend stack as prior phases, plus
`spring-kafka` (already a Phase 1 pom dependency) and a plain HTTP call to
an OpenAI-compatible chat completions endpoint via Spring's `RestClient`
(no SDK dependency needed).

**Spec:** `docs/superpowers/specs/2026-08-24-interview-arena-design.md`
(§3.4, Appendix A.3)
**Overview/diagrams:** `docs/superpowers/plans/2026-08-24-interview-arena-00-overview.md`

## Global Constraints

- Depends on Phase 1 (auth, JWT filter, `users` table).
- Default session length is 5 questions (spec §3.4 "mặc định 5-7 câu" —
  this plan fixes it at 5, configurable via
  `app.interview.total-questions`).
- The worker must never let a malformed LLM scoring response corrupt
  session state silently — a JSON parse failure marks the session
  `FAILED` with the raw LLM output logged, never leaves it stuck `ACTIVE`
  forever.
- LLM API key/base-url/model come from `app.llm.*` config (already defined
  in Phase 1's `application.yml`) — never hardcoded.

---

### Task 1: `InterviewSession` + `InterviewTurn` entities + migration

**Files:**
- Create: `backend/src/main/resources/db/migration/V6__create_interview_tables.sql`
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewStatus.java`
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewSession.java`
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewTurn.java`
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewSessionRepository.java`
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewTurnRepository.java`
- Test: `backend/src/test/java/com/interviewarena/interview/InterviewTurnRepositoryTest.java`

**Interfaces:**
- Produces: `InterviewSession` (`id`, `userId`, `position`, `technology`,
  `level`, `status: InterviewStatus`, `finalScore: Integer` nullable,
  `startedAt`, `completedAt` nullable). `InterviewTurn` (`id`,
  `sessionId`, `turnOrder: int`, `questionText`, `answerText` nullable,
  `followUpFeedback` nullable, `askedAt`, `answeredAt` nullable).
  `InterviewTurnRepository.findBySessionIdOrderByTurnOrderAsc(UUID):
  List<InterviewTurn>` — consumed by every later task in this phase.

- [ ] **Step 1: Write migration**

```sql
-- V6__create_interview_tables.sql
CREATE TABLE interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    position VARCHAR(30) NOT NULL,
    technology VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    final_score INT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE interview_turns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES interview_sessions(id),
    turn_order INT NOT NULL,
    question_text TEXT NOT NULL,
    answer_text TEXT,
    follow_up_feedback TEXT,
    asked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    answered_at TIMESTAMPTZ,
    UNIQUE (session_id, turn_order)
);

CREATE INDEX idx_interview_turns_session ON interview_turns (session_id, turn_order);
```

- [ ] **Step 2: Write failing repository test**

```java
package com.interviewarena.interview;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class InterviewTurnRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired private InterviewSessionRepository sessionRepository;
    @Autowired private InterviewTurnRepository turnRepository;
    @Autowired private JdbcTemplate jdbcTemplate;

    private UUID insertUser() {
        UUID id = UUID.randomUUID();
        jdbcTemplate.update(
            "INSERT INTO users (id, email, password_hash, display_name) VALUES (?, ?, 'x', 'x')",
            id, id + "@example.com");
        return id;
    }

    @Test
    void findBySessionIdOrderByTurnOrderAsc_returnsTurnsInOrder() {
        InterviewSession session = new InterviewSession();
        session.setUserId(insertUser());
        session.setPosition("frontend");
        session.setTechnology("react");
        session.setLevel("mid");
        session.setStatus(InterviewStatus.ACTIVE);
        session = sessionRepository.save(session);

        InterviewTurn turn2 = newTurn(session.getId(), 2, "Q2");
        InterviewTurn turn1 = newTurn(session.getId(), 1, "Q1");
        turnRepository.save(turn2);
        turnRepository.save(turn1);

        List<InterviewTurn> result = turnRepository.findBySessionIdOrderByTurnOrderAsc(session.getId());

        assertThat(result).extracting(InterviewTurn::getQuestionText).containsExactly("Q1", "Q2");
    }

    private InterviewTurn newTurn(UUID sessionId, int order, String question) {
        InterviewTurn turn = new InterviewTurn();
        turn.setSessionId(sessionId);
        turn.setTurnOrder(order);
        turn.setQuestionText(question);
        return turn;
    }
}
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=InterviewTurnRepositoryTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/interview/InterviewStatus.java
package com.interviewarena.interview;

public enum InterviewStatus {
    ACTIVE, COMPLETED, FAILED
}
```

```java
// backend/src/main/java/com/interviewarena/interview/InterviewSession.java
package com.interviewarena.interview;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "interview_sessions")
public class InterviewSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false)
    private String technology;

    @Column(nullable = false)
    private String level;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InterviewStatus status = InterviewStatus.ACTIVE;

    @Column(name = "final_score")
    private Integer finalScore;

    @Column(name = "started_at", nullable = false)
    private Instant startedAt = Instant.now();

    @Column(name = "completed_at")
    private Instant completedAt;

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getTechnology() { return technology; }
    public void setTechnology(String technology) { this.technology = technology; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public InterviewStatus getStatus() { return status; }
    public void setStatus(InterviewStatus status) { this.status = status; }
    public Integer getFinalScore() { return finalScore; }
    public void setFinalScore(Integer finalScore) { this.finalScore = finalScore; }
    public Instant getStartedAt() { return startedAt; }
    public void setStartedAt(Instant startedAt) { this.startedAt = startedAt; }
    public Instant getCompletedAt() { return completedAt; }
    public void setCompletedAt(Instant completedAt) { this.completedAt = completedAt; }
}
```

```java
// backend/src/main/java/com/interviewarena/interview/InterviewTurn.java
package com.interviewarena.interview;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "interview_turns")
public class InterviewTurn {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "session_id", nullable = false)
    private UUID sessionId;

    @Column(name = "turn_order", nullable = false)
    private int turnOrder;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "answer_text", columnDefinition = "TEXT")
    private String answerText;

    @Column(name = "follow_up_feedback", columnDefinition = "TEXT")
    private String followUpFeedback;

    @Column(name = "asked_at", nullable = false)
    private Instant askedAt = Instant.now();

    @Column(name = "answered_at")
    private Instant answeredAt;

    public UUID getId() { return id; }
    public UUID getSessionId() { return sessionId; }
    public void setSessionId(UUID sessionId) { this.sessionId = sessionId; }
    public int getTurnOrder() { return turnOrder; }
    public void setTurnOrder(int turnOrder) { this.turnOrder = turnOrder; }
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public String getAnswerText() { return answerText; }
    public void setAnswerText(String answerText) { this.answerText = answerText; }
    public String getFollowUpFeedback() { return followUpFeedback; }
    public void setFollowUpFeedback(String followUpFeedback) { this.followUpFeedback = followUpFeedback; }
    public Instant getAskedAt() { return askedAt; }
    public void setAskedAt(Instant askedAt) { this.askedAt = askedAt; }
    public Instant getAnsweredAt() { return answeredAt; }
    public void setAnsweredAt(Instant answeredAt) { this.answeredAt = answeredAt; }
}
```

```java
// backend/src/main/java/com/interviewarena/interview/InterviewSessionRepository.java
package com.interviewarena.interview;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InterviewSessionRepository extends JpaRepository<InterviewSession, UUID> {
}
```

```java
// backend/src/main/java/com/interviewarena/interview/InterviewTurnRepository.java
package com.interviewarena.interview;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface InterviewTurnRepository extends JpaRepository<InterviewTurn, UUID> {
    List<InterviewTurn> findBySessionIdOrderByTurnOrderAsc(UUID sessionId);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=InterviewTurnRepositoryTest`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/resources/db/migration/V6__create_interview_tables.sql backend/src/main/java/com/interviewarena/interview backend/src/test/java/com/interviewarena/interview
git commit -m "feat: add InterviewSession and InterviewTurn entities, migration, repositories"
```

---

### Task 2: `LlmClient` + `OpenAiLlmClient`

**Files:**
- Create: `backend/src/main/java/com/interviewarena/interview/llm/LlmMessage.java`
- Create: `backend/src/main/java/com/interviewarena/interview/llm/LlmClient.java`
- Create: `backend/src/main/java/com/interviewarena/interview/llm/OpenAiLlmClient.java`
- Create: `backend/src/main/java/com/interviewarena/config/LlmConfig.java`
- Test: `backend/src/test/java/com/interviewarena/interview/llm/OpenAiLlmClientTest.java`

**Interfaces:**
- Produces: `LlmMessage(String role, String content)` record;
  `LlmClient.complete(List<LlmMessage> messages): String` interface —
  consumed by `InterviewService` (Task 3, first question) and
  `InterviewScoringWorker` (Task 5, follow-ups + scoring). Any future LLM
  provider swap only needs a new `LlmClient` implementation.

- [ ] **Step 1: Write failing test using `MockRestServiceServer`**

```java
package com.interviewarena.interview.llm;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class OpenAiLlmClientTest {

    @Test
    void complete_extractsMessageContentFromChatCompletionResponse() {
        RestClient.Builder builder = RestClient.builder().baseUrl("https://fake-llm.test/v1");
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        RestClient restClient = builder.build();

        server.expect(requestTo("https://fake-llm.test/v1/chat/completions"))
            .andExpect(method(org.springframework.http.HttpMethod.POST))
            .andExpect(header("Authorization", "Bearer test-key"))
            .andRespond(withSuccess("""
                {"choices":[{"message":{"role":"assistant","content":"Câu hỏi tiếp theo?"}}]}
                """, MediaType.APPLICATION_JSON));

        OpenAiLlmClient client = new OpenAiLlmClient(restClient, "test-key", "gpt-4o-mini");

        String result = client.complete(List.of(new LlmMessage("user", "Xin chào")));

        assertThat(result).isEqualTo("Câu hỏi tiếp theo?");
        server.verify();
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=OpenAiLlmClientTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 3: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/interview/llm/LlmMessage.java
package com.interviewarena.interview.llm;

public record LlmMessage(String role, String content) {}
```

```java
// backend/src/main/java/com/interviewarena/interview/llm/LlmClient.java
package com.interviewarena.interview.llm;

import java.util.List;

public interface LlmClient {
    String complete(List<LlmMessage> messages);
}
```

```java
// backend/src/main/java/com/interviewarena/interview/llm/OpenAiLlmClient.java
package com.interviewarena.interview.llm;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class OpenAiLlmClient implements LlmClient {

    private final RestClient restClient;
    private final String apiKey;
    private final String model;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public OpenAiLlmClient(RestClient restClient, String apiKey, String model) {
        this.restClient = restClient;
        this.apiKey = apiKey;
        this.model = model;
    }

    @Override
    public String complete(List<LlmMessage> messages) {
        Map<String, Object> body = Map.of(
            "model", model,
            "messages", messages.stream()
                .map(m -> Map.of("role", m.role(), "content", m.content()))
                .collect(Collectors.toList())
        );

        String response = restClient.post()
            .uri("/chat/completions")
            .header("Authorization", "Bearer " + apiKey)
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(body)
            .retrieve()
            .body(String.class);

        try {
            JsonNode root = objectMapper.readTree(response);
            return root.path("choices").get(0).path("message").path("content").asText();
        } catch (Exception e) {
            throw new IllegalStateException("Unexpected LLM response shape: " + response, e);
        }
    }
}
```

```java
// backend/src/main/java/com/interviewarena/config/LlmConfig.java
package com.interviewarena.config;

import com.interviewarena.interview.llm.LlmClient;
import com.interviewarena.interview.llm.OpenAiLlmClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class LlmConfig {

    @Bean
    public LlmClient llmClient(
        @Value("${app.llm.base-url}") String baseUrl,
        @Value("${app.llm.api-key}") String apiKey,
        @Value("${app.llm.model}") String model
    ) {
        RestClient restClient = RestClient.builder().baseUrl(baseUrl).build();
        return new OpenAiLlmClient(restClient, apiKey, model);
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=OpenAiLlmClientTest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/interview/llm backend/src/main/java/com/interviewarena/config/LlmConfig.java backend/src/test/java/com/interviewarena/interview/llm
git commit -m "feat: add LlmClient abstraction with OpenAI-compatible implementation"
```

---

### Task 3: `InterviewPromptBuilder`

**Files:**
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewPromptBuilder.java`
- Test: `backend/src/test/java/com/interviewarena/interview/InterviewPromptBuilderTest.java`

**Interfaces:**
- Consumes: `InterviewSession`, `List<InterviewTurn>`.
- Produces: `buildQuestionPrompt(InterviewSession, List<InterviewTurn>):
  List<LlmMessage>` (system prompt from spec Appendix A.3 + alternating
  assistant/user turns from history) and `buildScoringPrompt(
  InterviewSession, List<InterviewTurn>): List<LlmMessage>` (instructs the
  LLM to return **strict JSON only**, shape
  `{"finalScore": int, "turnFeedback": [{"turnOrder": int, "feedback": string}]}`).
  Consumed by `InterviewService` (Task 4) and `InterviewScoringWorker`
  (Task 5).

- [ ] **Step 1: Write failing test**

```java
package com.interviewarena.interview;

import com.interviewarena.interview.llm.LlmMessage;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class InterviewPromptBuilderTest {

    private final InterviewPromptBuilder builder = new InterviewPromptBuilder(5);

    private InterviewSession session() {
        InterviewSession s = new InterviewSession();
        s.setPosition("frontend");
        s.setTechnology("react");
        s.setLevel("mid");
        return s;
    }

    private InterviewTurn turn(int order, String question, String answer) {
        InterviewTurn t = new InterviewTurn();
        t.setTurnOrder(order);
        t.setQuestionText(question);
        t.setAnswerText(answer);
        return t;
    }

    @Test
    void buildQuestionPrompt_includesSystemPromptMentioningPositionAndLevel() {
        List<LlmMessage> messages = builder.buildQuestionPrompt(session(), List.of());

        assertThat(messages).isNotEmpty();
        assertThat(messages.get(0).role()).isEqualTo("system");
        assertThat(messages.get(0).content()).contains("frontend").contains("react").contains("mid");
    }

    @Test
    void buildQuestionPrompt_convertsHistoryToAlternatingAssistantUserMessages() {
        List<InterviewTurn> history = List.of(turn(1, "Câu hỏi 1?", "Trả lời 1"));

        List<LlmMessage> messages = builder.buildQuestionPrompt(session(), history);

        assertThat(messages).extracting(LlmMessage::role).contains("assistant", "user");
        assertThat(messages).anyMatch(m -> m.content().equals("Câu hỏi 1?") && m.role().equals("assistant"));
        assertThat(messages).anyMatch(m -> m.content().equals("Trả lời 1") && m.role().equals("user"));
    }

    @Test
    void buildScoringPrompt_instructsStrictJsonOutput() {
        List<InterviewTurn> history = List.of(turn(1, "Câu hỏi 1?", "Trả lời 1"));

        List<LlmMessage> messages = builder.buildScoringPrompt(session(), history);

        String allContent = messages.stream().map(LlmMessage::content).reduce("", String::concat);
        assertThat(allContent).contains("finalScore").contains("turnFeedback").contains("JSON");
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=InterviewPromptBuilderTest`
Expected: FAIL (class doesn't exist).

- [ ] **Step 3: Write minimal implementation**

```java
package com.interviewarena.interview;

import com.interviewarena.interview.llm.LlmMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class InterviewPromptBuilder {

    private final int totalQuestions;

    public InterviewPromptBuilder(@Value("${app.interview.total-questions:5}") int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    private String systemPrompt(InterviewSession session) {
        return """
            Bạn đóng vai một Interviewer thật đang phỏng vấn ứng viên vị trí
            %s - %s, cấp độ %s.

            Quy tắc:
            1. Hỏi từng câu một, không hỏi dồn nhiều câu cùng lúc.
            2. Câu hỏi tiếp theo PHẢI bám vào nội dung câu trả lời trước đó của
               ứng viên.
            3. Giữ giọng điệu chuyên nghiệp, khích lệ, không gay gắt.
            4. Sau đúng %d câu, dừng hỏi và chuyển sang chế độ chấm điểm.
            5. Luôn trả lời bằng tiếng Việt trừ khi ứng viên chủ động trả lời
               bằng tiếng Anh.

            Chỉ trả về NỘI DUNG CÂU HỎI tiếp theo, không thêm lời dẫn khác.
            """.formatted(session.getPosition(), session.getTechnology(), session.getLevel(), totalQuestions);
    }

    public List<LlmMessage> buildQuestionPrompt(InterviewSession session, List<InterviewTurn> history) {
        List<LlmMessage> messages = new ArrayList<>();
        messages.add(new LlmMessage("system", systemPrompt(session)));
        for (InterviewTurn turn : history) {
            messages.add(new LlmMessage("assistant", turn.getQuestionText()));
            if (turn.getAnswerText() != null) {
                messages.add(new LlmMessage("user", turn.getAnswerText()));
            }
        }
        return messages;
    }

    public List<LlmMessage> buildScoringPrompt(InterviewSession session, List<InterviewTurn> history) {
        List<LlmMessage> messages = buildQuestionPrompt(session, history);
        messages.add(new LlmMessage("system", """
            Phiên phỏng vấn đã kết thúc. Hãy chấm điểm toàn bộ phần trả lời của
            ứng viên. Đánh giá theo 3 tiêu chí: độ chính xác kỹ thuật, cách
            trình bày/cấu trúc câu trả lời, mức độ tự tin trong ngôn từ.

            Trả về DUY NHẤT một chuỗi JSON hợp lệ, không kèm lời dẫn, không kèm
            markdown code fence, đúng đúng định dạng sau:
            {"finalScore": <0-100>, "turnFeedback": [{"turnOrder": <int>, "feedback": "<string>"}]}
            """));
        return messages;
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=InterviewPromptBuilderTest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/interview/InterviewPromptBuilder.java backend/src/test/java/com/interviewarena/interview/InterviewPromptBuilderTest.java
git commit -m "feat: add interview prompt builder for question and scoring modes"
```

---

### Task 4: Kafka event + producer + `InterviewService.startSession`/`submitAnswer`

**Files:**
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewAnswerSubmittedEvent.java`
- Create: `backend/src/main/java/com/interviewarena/config/KafkaConfig.java`
- Create: `backend/src/main/java/com/interviewarena/interview/dto/StartInterviewRequest.java`
- Create: `backend/src/main/java/com/interviewarena/interview/dto/InterviewTurnDto.java`
- Create: `backend/src/main/java/com/interviewarena/interview/dto/InterviewSessionDto.java`
- Create: `backend/src/main/java/com/interviewarena/interview/dto/SubmitAnswerRequest.java`
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewService.java`
- Test: `backend/src/test/java/com/interviewarena/interview/InterviewServiceTest.java`

**Interfaces:**
- Consumes: `InterviewSessionRepository`, `InterviewTurnRepository` (Task
  1), `LlmClient` (Task 2), `InterviewPromptBuilder` (Task 3),
  `KafkaTemplate<String, InterviewAnswerSubmittedEvent>` (Spring Boot
  auto-configured, topic from `KafkaConfig`).
- Produces: `InterviewService.startSession(UUID userId,
  StartInterviewRequest): InterviewSessionDto`;
  `InterviewService.submitAnswer(UUID userId, UUID sessionId, String
  answerText): void` (publishes the Kafka event; does not call the LLM
  itself); `InterviewService.getSession(UUID userId, UUID sessionId):
  InterviewSessionDto`. Consumed by `InterviewController` (Task 6) and
  `InterviewScoringWorker` (Task 5, via the repositories directly, not
  through this service, to stay off the Spring MVC request thread).

- [ ] **Step 1: Write the Kafka event + config**

```java
// backend/src/main/java/com/interviewarena/interview/InterviewAnswerSubmittedEvent.java
package com.interviewarena.interview;

import java.util.UUID;

public record InterviewAnswerSubmittedEvent(UUID sessionId, int turnOrder) {}
```

```java
// backend/src/main/java/com/interviewarena/config/KafkaConfig.java
package com.interviewarena.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    public static final String INTERVIEW_ANSWER_SUBMITTED_TOPIC = "interview-answer-submitted";

    @Bean
    public NewTopic interviewAnswerSubmittedTopic() {
        return TopicBuilder.name(INTERVIEW_ANSWER_SUBMITTED_TOPIC)
            .partitions(3)
            .replicas(1)
            .build();
    }
}
```

Add to `application.yml` under `spring.kafka` (extend the block from Phase
1):
```yaml
  kafka:
    bootstrap-servers: ${KAFKA_BOOTSTRAP_SERVERS:localhost:9092}
    producer:
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
    consumer:
      group-id: interview-arena-backend
      auto-offset-reset: earliest
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      properties:
        spring.json.trusted.packages: com.interviewarena.interview
```

- [ ] **Step 2: Write failing unit test for `InterviewService`**

```java
package com.interviewarena.interview;

import com.interviewarena.interview.dto.StartInterviewRequest;
import com.interviewarena.interview.llm.LlmClient;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InterviewServiceTest {

    @Mock private InterviewSessionRepository sessionRepository;
    @Mock private InterviewTurnRepository turnRepository;
    @Mock private LlmClient llmClient;
    @Mock private KafkaTemplate<String, InterviewAnswerSubmittedEvent> kafkaTemplate;
    private final InterviewPromptBuilder promptBuilder = new InterviewPromptBuilder(5);

    @Test
    void startSession_createsSessionAndFirstTurnFromLlm() {
        UUID userId = UUID.randomUUID();
        when(llmClient.complete(any())).thenReturn("Câu hỏi đầu tiên?");
        when(sessionRepository.save(any(InterviewSession.class))).thenAnswer(inv -> inv.getArgument(0));
        when(turnRepository.save(any(InterviewTurn.class))).thenAnswer(inv -> inv.getArgument(0));

        InterviewService service = new InterviewService(
            sessionRepository, turnRepository, llmClient, promptBuilder, kafkaTemplate);

        var result = service.startSession(userId, new StartInterviewRequest("frontend", "react", "mid"));

        assertThat(result.status()).isEqualTo("ACTIVE");
        assertThat(result.turns()).hasSize(1);
        assertThat(result.turns().get(0).questionText()).isEqualTo("Câu hỏi đầu tiên?");
    }

    @Test
    void submitAnswer_savesAnswerAndPublishesKafkaEvent() {
        UUID userId = UUID.randomUUID();
        UUID sessionId = UUID.randomUUID();

        InterviewSession session = new InterviewSession();
        session.setUserId(userId);
        session.setStatus(InterviewStatus.ACTIVE);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        InterviewTurn currentTurn = new InterviewTurn();
        currentTurn.setSessionId(sessionId);
        currentTurn.setTurnOrder(1);
        when(turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId)).thenReturn(List.of(currentTurn));
        when(turnRepository.save(any(InterviewTurn.class))).thenAnswer(inv -> inv.getArgument(0));

        InterviewService service = new InterviewService(
            sessionRepository, turnRepository, llmClient, promptBuilder, kafkaTemplate);

        service.submitAnswer(userId, sessionId, "Câu trả lời của tôi");

        assertThat(currentTurn.getAnswerText()).isEqualTo("Câu trả lời của tôi");
        ArgumentCaptor<InterviewAnswerSubmittedEvent> captor = ArgumentCaptor.forClass(InterviewAnswerSubmittedEvent.class);
        verify(kafkaTemplate).send(eq("interview-answer-submitted"), captor.capture());
        assertThat(captor.getValue().sessionId()).isEqualTo(sessionId);
        assertThat(captor.getValue().turnOrder()).isEqualTo(1);
    }

    @Test
    void submitAnswer_throwsWhenSessionBelongsToAnotherUser() {
        UUID ownerId = UUID.randomUUID();
        UUID sessionId = UUID.randomUUID();
        InterviewSession session = new InterviewSession();
        session.setUserId(ownerId);
        session.setStatus(InterviewStatus.ACTIVE);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        InterviewService service = new InterviewService(
            sessionRepository, turnRepository, llmClient, promptBuilder, kafkaTemplate);

        assertThatThrownBy(() -> service.submitAnswer(UUID.randomUUID(), sessionId, "answer"))
            .isInstanceOf(SecurityException.class);
    }
}
```

(add `import static org.mockito.ArgumentMatchers.eq;`)

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=InterviewServiceTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/interview/dto/StartInterviewRequest.java
package com.interviewarena.interview.dto;

import jakarta.validation.constraints.NotBlank;

public record StartInterviewRequest(
    @NotBlank String position, @NotBlank String technology, @NotBlank String level
) {}
```

```java
// backend/src/main/java/com/interviewarena/interview/dto/InterviewTurnDto.java
package com.interviewarena.interview.dto;

public record InterviewTurnDto(int turnOrder, String questionText, String answerText, String feedback) {}
```

```java
// backend/src/main/java/com/interviewarena/interview/dto/InterviewSessionDto.java
package com.interviewarena.interview.dto;

import java.util.List;
import java.util.UUID;

public record InterviewSessionDto(
    UUID sessionId, String status, Integer finalScore, List<InterviewTurnDto> turns
) {}
```

```java
// backend/src/main/java/com/interviewarena/interview/dto/SubmitAnswerRequest.java
package com.interviewarena.interview.dto;

import jakarta.validation.constraints.NotBlank;

public record SubmitAnswerRequest(@NotBlank String answerText) {}
```

```java
package com.interviewarena.interview;

import com.interviewarena.interview.dto.InterviewSessionDto;
import com.interviewarena.interview.dto.InterviewTurnDto;
import com.interviewarena.interview.dto.StartInterviewRequest;
import com.interviewarena.interview.llm.LlmClient;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import static com.interviewarena.config.KafkaConfig.INTERVIEW_ANSWER_SUBMITTED_TOPIC;

@Service
public class InterviewService {

    private final InterviewSessionRepository sessionRepository;
    private final InterviewTurnRepository turnRepository;
    private final LlmClient llmClient;
    private final InterviewPromptBuilder promptBuilder;
    private final KafkaTemplate<String, InterviewAnswerSubmittedEvent> kafkaTemplate;

    public InterviewService(
        InterviewSessionRepository sessionRepository,
        InterviewTurnRepository turnRepository,
        LlmClient llmClient,
        InterviewPromptBuilder promptBuilder,
        KafkaTemplate<String, InterviewAnswerSubmittedEvent> kafkaTemplate
    ) {
        this.sessionRepository = sessionRepository;
        this.turnRepository = turnRepository;
        this.llmClient = llmClient;
        this.promptBuilder = promptBuilder;
        this.kafkaTemplate = kafkaTemplate;
    }

    public InterviewSessionDto startSession(UUID userId, StartInterviewRequest request) {
        InterviewSession session = new InterviewSession();
        session.setUserId(userId);
        session.setPosition(request.position());
        session.setTechnology(request.technology());
        session.setLevel(request.level());
        session.setStatus(InterviewStatus.ACTIVE);
        session = sessionRepository.save(session);

        String firstQuestion = llmClient.complete(promptBuilder.buildQuestionPrompt(session, List.of()));

        InterviewTurn turn = new InterviewTurn();
        turn.setSessionId(session.getId());
        turn.setTurnOrder(1);
        turn.setQuestionText(firstQuestion);
        turn = turnRepository.save(turn);

        return toDto(session, List.of(turn));
    }

    public void submitAnswer(UUID userId, UUID sessionId, String answerText) {
        InterviewSession session = sessionRepository.findById(sessionId)
            .orElseThrow(() -> new NoSuchElementException("Session not found: " + sessionId));
        if (!session.getUserId().equals(userId)) {
            throw new SecurityException("Session does not belong to user");
        }

        List<InterviewTurn> turns = turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId);
        InterviewTurn currentTurn = turns.get(turns.size() - 1);
        currentTurn.setAnswerText(answerText);
        currentTurn.setAnsweredAt(Instant.now());
        turnRepository.save(currentTurn);

        kafkaTemplate.send(INTERVIEW_ANSWER_SUBMITTED_TOPIC,
            new InterviewAnswerSubmittedEvent(sessionId, currentTurn.getTurnOrder()));
    }

    public InterviewSessionDto getSession(UUID userId, UUID sessionId) {
        InterviewSession session = sessionRepository.findById(sessionId)
            .orElseThrow(() -> new NoSuchElementException("Session not found: " + sessionId));
        if (!session.getUserId().equals(userId)) {
            throw new SecurityException("Session does not belong to user");
        }
        List<InterviewTurn> turns = turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId);
        return toDto(session, turns);
    }

    private InterviewSessionDto toDto(InterviewSession session, List<InterviewTurn> turns) {
        List<InterviewTurnDto> turnDtos = turns.stream()
            .map(t -> new InterviewTurnDto(t.getTurnOrder(), t.getQuestionText(), t.getAnswerText(), t.getFollowUpFeedback()))
            .toList();
        return new InterviewSessionDto(session.getId(), session.getStatus().name(), session.getFinalScore(), turnDtos);
    }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=InterviewServiceTest`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/java/com/interviewarena/interview backend/src/main/java/com/interviewarena/config/KafkaConfig.java backend/src/main/resources/application.yml backend/src/test/java/com/interviewarena/interview/InterviewServiceTest.java
git commit -m "feat: add InterviewService with Kafka answer-submitted publishing"
```

---

### Task 5: `InterviewScoringWorker` (Kafka consumer)

**Files:**
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewScoringWorker.java`
- Create: `backend/src/main/java/com/interviewarena/interview/ScoringResult.java`
- Test: `backend/src/test/java/com/interviewarena/interview/InterviewScoringWorkerTest.java`

**Interfaces:**
- Consumes: `InterviewSessionRepository`, `InterviewTurnRepository` (Task
  1), `LlmClient` (Task 2), `InterviewPromptBuilder` (Task 3).
- Produces: `@KafkaListener` method `onAnswerSubmitted(
  InterviewAnswerSubmittedEvent)` — either appends the next
  `InterviewTurn` (question-mode) or completes the session with per-turn
  feedback and `finalScore` (scoring-mode, when `turnOrder ==
  totalQuestions`). On unparseable LLM scoring JSON, marks the session
  `FAILED` instead of leaving it stuck `ACTIVE`.

- [ ] **Step 1: Write failing unit test**

```java
package com.interviewarena.interview;

import com.interviewarena.interview.llm.LlmClient;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InterviewScoringWorkerTest {

    @Mock private InterviewSessionRepository sessionRepository;
    @Mock private InterviewTurnRepository turnRepository;
    @Mock private LlmClient llmClient;
    private final InterviewPromptBuilder promptBuilder = new InterviewPromptBuilder(2);

    private InterviewSession activeSession(UUID id) {
        InterviewSession s = new InterviewSession();
        s.setId(id);
        s.setPosition("frontend");
        s.setTechnology("react");
        s.setLevel("mid");
        s.setStatus(InterviewStatus.ACTIVE);
        return s;
    }

    private InterviewTurn answeredTurn(UUID sessionId, int order) {
        InterviewTurn t = new InterviewTurn();
        t.setSessionId(sessionId);
        t.setTurnOrder(order);
        t.setQuestionText("Q" + order);
        t.setAnswerText("A" + order);
        return t;
    }

    @Test
    void onAnswerSubmitted_createsFollowUpTurnWhenQuestionsRemain() {
        UUID sessionId = UUID.randomUUID();
        InterviewSession session = activeSession(sessionId);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        when(turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId))
            .thenReturn(List.of(answeredTurn(sessionId, 1)));
        when(llmClient.complete(any())).thenReturn("Câu hỏi 2?");
        when(turnRepository.save(any(InterviewTurn.class))).thenAnswer(inv -> inv.getArgument(0));

        InterviewScoringWorker worker = new InterviewScoringWorker(
            sessionRepository, turnRepository, llmClient, promptBuilder);
        worker.onAnswerSubmitted(new InterviewAnswerSubmittedEvent(sessionId, 1));

        verify(turnRepository).save(argThat(t -> t.getTurnOrder() == 2 && t.getQuestionText().equals("Câu hỏi 2?")));
        verify(sessionRepository, never()).save(argThat(s -> s.getStatus() == InterviewStatus.COMPLETED));
    }

    @Test
    void onAnswerSubmitted_completesSessionWithScoreOnLastTurn() {
        UUID sessionId = UUID.randomUUID();
        InterviewSession session = activeSession(sessionId);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        InterviewTurn turn1 = answeredTurn(sessionId, 1);
        InterviewTurn turn2 = answeredTurn(sessionId, 2);
        when(turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId)).thenReturn(List.of(turn1, turn2));
        when(llmClient.complete(any())).thenReturn("""
            {"finalScore": 82, "turnFeedback": [
              {"turnOrder": 1, "feedback": "Tốt"},
              {"turnOrder": 2, "feedback": "Khá tốt"}
            ]}
            """);

        InterviewScoringWorker worker = new InterviewScoringWorker(
            sessionRepository, turnRepository, llmClient, promptBuilder);
        worker.onAnswerSubmitted(new InterviewAnswerSubmittedEvent(sessionId, 2));

        assertThat(session.getStatus()).isEqualTo(InterviewStatus.COMPLETED);
        assertThat(session.getFinalScore()).isEqualTo(82);
        assertThat(turn1.getFollowUpFeedback()).isEqualTo("Tốt");
        assertThat(turn2.getFollowUpFeedback()).isEqualTo("Khá tốt");
        verify(sessionRepository).save(session);
    }

    @Test
    void onAnswerSubmitted_marksSessionFailedWhenScoringJsonIsMalformed() {
        UUID sessionId = UUID.randomUUID();
        InterviewSession session = activeSession(sessionId);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        InterviewTurn turn1 = answeredTurn(sessionId, 1);
        InterviewTurn turn2 = answeredTurn(sessionId, 2);
        when(turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId)).thenReturn(List.of(turn1, turn2));
        when(llmClient.complete(any())).thenReturn("not valid json at all");

        InterviewScoringWorker worker = new InterviewScoringWorker(
            sessionRepository, turnRepository, llmClient, promptBuilder);
        worker.onAnswerSubmitted(new InterviewAnswerSubmittedEvent(sessionId, 2));

        assertThat(session.getStatus()).isEqualTo(InterviewStatus.FAILED);
        verify(sessionRepository).save(session);
    }
}
```

(add `import static org.mockito.ArgumentMatchers.argThat;`)

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=InterviewScoringWorkerTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 3: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/interview/ScoringResult.java
package com.interviewarena.interview;

import java.util.List;

public record ScoringResult(int finalScore, List<TurnFeedback> turnFeedback) {
    public record TurnFeedback(int turnOrder, String feedback) {}
}
```

```java
package com.interviewarena.interview;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewarena.interview.llm.LlmClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static com.interviewarena.config.KafkaConfig.INTERVIEW_ANSWER_SUBMITTED_TOPIC;

@Component
public class InterviewScoringWorker {

    private static final Logger log = LoggerFactory.getLogger(InterviewScoringWorker.class);

    private final InterviewSessionRepository sessionRepository;
    private final InterviewTurnRepository turnRepository;
    private final LlmClient llmClient;
    private final InterviewPromptBuilder promptBuilder;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public InterviewScoringWorker(
        InterviewSessionRepository sessionRepository,
        InterviewTurnRepository turnRepository,
        LlmClient llmClient,
        InterviewPromptBuilder promptBuilder
    ) {
        this.sessionRepository = sessionRepository;
        this.turnRepository = turnRepository;
        this.llmClient = llmClient;
        this.promptBuilder = promptBuilder;
    }

    @KafkaListener(topics = INTERVIEW_ANSWER_SUBMITTED_TOPIC)
    public void onAnswerSubmitted(InterviewAnswerSubmittedEvent event) {
        InterviewSession session = sessionRepository.findById(event.sessionId())
            .orElseThrow(() -> new NoSuchElementException("Session not found: " + event.sessionId()));
        List<InterviewTurn> turns = turnRepository.findBySessionIdOrderByTurnOrderAsc(event.sessionId());

        boolean isLastTurn = turns.size() >= promptBuilder.totalQuestions();
        if (!isLastTurn) {
            askFollowUp(session, turns);
        } else {
            scoreSession(session, turns);
        }
    }

    private void askFollowUp(InterviewSession session, List<InterviewTurn> turns) {
        String nextQuestion = llmClient.complete(promptBuilder.buildQuestionPrompt(session, turns));
        InterviewTurn nextTurn = new InterviewTurn();
        nextTurn.setSessionId(session.getId());
        nextTurn.setTurnOrder(turns.get(turns.size() - 1).getTurnOrder() + 1);
        nextTurn.setQuestionText(nextQuestion);
        turnRepository.save(nextTurn);
    }

    private void scoreSession(InterviewSession session, List<InterviewTurn> turns) {
        String rawResponse = llmClient.complete(promptBuilder.buildScoringPrompt(session, turns));
        try {
            ScoringResult result = objectMapper.readValue(rawResponse, ScoringResult.class);
            Map<Integer, String> feedbackByTurn = result.turnFeedback().stream()
                .collect(java.util.stream.Collectors.toMap(ScoringResult.TurnFeedback::turnOrder, ScoringResult.TurnFeedback::feedback));
            for (InterviewTurn turn : turns) {
                turn.setFollowUpFeedback(feedbackByTurn.get(turn.getTurnOrder()));
                turnRepository.save(turn);
            }
            session.setFinalScore(result.finalScore());
            session.setStatus(InterviewStatus.COMPLETED);
            session.setCompletedAt(Instant.now());
        } catch (Exception e) {
            log.error("Failed to parse LLM scoring JSON for session {}: {}", session.getId(), rawResponse, e);
            session.setStatus(InterviewStatus.FAILED);
        }
        sessionRepository.save(session);
    }
}
```

Add `totalQuestions()` getter to `InterviewPromptBuilder` (modify file
from Task 3):
```java
    public int totalQuestions() {
        return totalQuestions;
    }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=InterviewScoringWorkerTest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/interview backend/src/test/java/com/interviewarena/interview/InterviewScoringWorkerTest.java
git commit -m "feat: add Kafka consumer worker for interview follow-up and scoring"
```

---

### Task 6: `InterviewController`

**Files:**
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewController.java`
- Test: `backend/src/test/java/com/interviewarena/interview/InterviewControllerTest.java`

**Interfaces:**
- Consumes: `InterviewService` (Task 4).
- Produces: `POST /api/interviews` → `201 InterviewSessionDto`;
  `POST /api/interviews/{id}/answers` → `202 {"status":"PROCESSING"}`;
  `GET /api/interviews/{id}` → `200 InterviewSessionDto`. Consumed by the
  FE in Task 7.

- [ ] **Step 1: Write failing MockMvc test**

```java
package com.interviewarena.interview;

import com.interviewarena.interview.dto.InterviewSessionDto;
import com.interviewarena.interview.dto.InterviewTurnDto;
import com.interviewarena.interview.dto.StartInterviewRequest;
import com.interviewarena.interview.dto.SubmitAnswerRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class InterviewControllerTest {

    @Mock private InterviewService interviewService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private MockMvc mockMvc() {
        return MockMvcBuilders.standaloneSetup(new InterviewController(interviewService)).build();
    }

    private void authenticateAs(UUID userId) {
        SecurityContextHolder.getContext().setAuthentication(
            new UsernamePasswordAuthenticationToken(userId.toString(), null, List.of()));
    }

    @Test
    void startInterview_returns201WithSessionDto() throws Exception {
        UUID userId = UUID.randomUUID();
        authenticateAs(userId);
        when(interviewService.startSession(any(), any())).thenReturn(
            new InterviewSessionDto(UUID.randomUUID(), "ACTIVE", null, List.of(new InterviewTurnDto(1, "Q1", null, null))));

        mockMvc().perform(post("/api/interviews")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(new StartInterviewRequest("frontend", "react", "mid"))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test
    void submitAnswer_returns202Processing() throws Exception {
        UUID userId = UUID.randomUUID();
        UUID sessionId = UUID.randomUUID();
        authenticateAs(userId);

        mockMvc().perform(post("/api/interviews/" + sessionId + "/answers")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(new SubmitAnswerRequest("my answer"))))
            .andExpect(status().isAccepted())
            .andExpect(jsonPath("$.status").value("PROCESSING"));
    }

    @Test
    void getSession_returns200WithCurrentState() throws Exception {
        UUID userId = UUID.randomUUID();
        UUID sessionId = UUID.randomUUID();
        authenticateAs(userId);
        when(interviewService.getSession(any(), any())).thenReturn(
            new InterviewSessionDto(sessionId, "COMPLETED", 82, List.of()));

        mockMvc().perform(get("/api/interviews/" + sessionId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.finalScore").value(82));
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=InterviewControllerTest`
Expected: FAIL (`InterviewController` doesn't exist).

- [ ] **Step 3: Write minimal implementation**

```java
package com.interviewarena.interview;

import com.interviewarena.interview.dto.InterviewSessionDto;
import com.interviewarena.interview.dto.StartInterviewRequest;
import com.interviewarena.interview.dto.SubmitAnswerRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping
    public ResponseEntity<InterviewSessionDto> start(@Valid @RequestBody StartInterviewRequest request) {
        InterviewSessionDto dto = interviewService.startSession(currentUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PostMapping("/{id}/answers")
    public ResponseEntity<Map<String, String>> submitAnswer(
        @PathVariable UUID id, @Valid @RequestBody SubmitAnswerRequest request
    ) {
        interviewService.submitAnswer(currentUserId(), id, request.answerText());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("status", "PROCESSING"));
    }

    @GetMapping("/{id}")
    public InterviewSessionDto get(@PathVariable UUID id) {
        return interviewService.getSession(currentUserId(), id);
    }

    private UUID currentUserId() {
        return UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=InterviewControllerTest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/interview/InterviewController.java backend/src/test/java/com/interviewarena/interview/InterviewControllerTest.java
git commit -m "feat: add interview controller (start/answer/get endpoints)"
```

---

### Task 7: Frontend — AI Interview setup + chat session pages

**Files:**
- Create: `web/src/types/interview.ts`
- Create: `web/src/api/interview.ts`
- Create: `web/src/pages/InterviewSetupPage.tsx`
- Create: `web/src/pages/InterviewSessionPage.tsx`
- Modify: `web/src/App.tsx` (add routes)
- Test: `web/src/pages/InterviewSessionPage.test.tsx`

**Interfaces:**
- Consumes: `apiClient`, `POST /api/interviews`,
  `POST /api/interviews/{id}/answers`, `GET /api/interviews/{id}`.

- [ ] **Step 1: Write shared types + API module**

```typescript
// web/src/types/interview.ts
export interface InterviewTurn {
  turnOrder: number
  questionText: string
  answerText: string | null
  feedback: string | null
}

export interface InterviewSession {
  sessionId: string
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED'
  finalScore: number | null
  turns: InterviewTurn[]
}
```

```typescript
// web/src/api/interview.ts
import { apiClient } from './client'
import type { InterviewSession } from '../types/interview'

export const interviewApi = {
  start: (position: string, technology: string, level: string) =>
    apiClient.post<InterviewSession>('/api/interviews', { position, technology, level }),
  submitAnswer: (sessionId: string, answerText: string) =>
    apiClient.post<{ status: string }>(`/api/interviews/${sessionId}/answers`, { answerText }),
  get: (sessionId: string) => apiClient.get<InterviewSession>(`/api/interviews/${sessionId}`),
}
```

- [ ] **Step 2: Write failing test for `InterviewSessionPage`'s polling behavior**

```tsx
// web/src/pages/InterviewSessionPage.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { InterviewSessionPage } from './InterviewSessionPage'
import { interviewApi } from '../api/interview'

vi.mock('../api/interview', () => ({
  interviewApi: { get: vi.fn(), submitAnswer: vi.fn() },
}))

describe('InterviewSessionPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })
  afterEach(() => vi.useRealTimers())

  it('polls and shows the follow-up question once it appears', async () => {
    ;(interviewApi.get as any)
      .mockResolvedValueOnce({
        sessionId: 's1', status: 'ACTIVE', finalScore: null,
        turns: [{ turnOrder: 1, questionText: 'Q1', answerText: 'A1', feedback: null }],
      })
      .mockResolvedValueOnce({
        sessionId: 's1', status: 'ACTIVE', finalScore: null,
        turns: [
          { turnOrder: 1, questionText: 'Q1', answerText: 'A1', feedback: null },
          { turnOrder: 2, questionText: 'Q2', answerText: null, feedback: null },
        ],
      })

    render(
      <MemoryRouter initialEntries={['/interviews/s1']}>
        <Routes>
          <Route path="/interviews/:sessionId" element={<InterviewSessionPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('Q1')).toBeInTheDocument())

    await vi.advanceTimersByTimeAsync(2100)

    await waitFor(() => expect(screen.getByText('Q2')).toBeInTheDocument())
  })

  it('submits an answer via the input form', async () => {
    ;(interviewApi.get as any).mockResolvedValue({
      sessionId: 's1', status: 'ACTIVE', finalScore: null,
      turns: [{ turnOrder: 1, questionText: 'Q1', answerText: null, feedback: null }],
    })
    ;(interviewApi.submitAnswer as any).mockResolvedValueOnce({ status: 'PROCESSING' })

    render(
      <MemoryRouter initialEntries={['/interviews/s1']}>
        <Routes>
          <Route path="/interviews/:sessionId" element={<InterviewSessionPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('Q1')).toBeInTheDocument())

    fireEvent.change(screen.getByPlaceholderText('Nhập câu trả lời của bạn'), { target: { value: 'My answer' } })
    fireEvent.click(screen.getByText('Gửi'))

    await waitFor(() => expect(interviewApi.submitAnswer).toHaveBeenCalledWith('s1', 'My answer'))
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd web && npx vitest run src/pages/InterviewSessionPage.test.tsx`
Expected: FAIL (`./InterviewSessionPage` doesn't exist).

- [ ] **Step 4: Write minimal implementation**

```tsx
// web/src/pages/InterviewSetupPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { interviewApi } from '../api/interview'

const POSITIONS = ['frontend', 'backend', 'devops', 'ai', 'database']
const LEVELS = ['junior', 'mid', 'senior']

export function InterviewSetupPage() {
  const navigate = useNavigate()
  const [position, setPosition] = useState('frontend')
  const [technology, setTechnology] = useState('react')
  const [level, setLevel] = useState('mid')

  async function start() {
    const session = await interviewApi.start(position, technology, level)
    navigate(`/interviews/${session.sessionId}`)
  }

  return (
    <div>
      <h1>Bắt đầu phỏng vấn thử với AI</h1>
      <select value={position} onChange={e => setPosition(e.target.value)}>
        {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <input value={technology} onChange={e => setTechnology(e.target.value)} placeholder="Công nghệ" />
      <select value={level} onChange={e => setLevel(e.target.value)}>
        {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <button onClick={start}>Bắt đầu</button>
    </div>
  )
}
```

```tsx
// web/src/pages/InterviewSessionPage.tsx
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { interviewApi } from '../api/interview'
import type { InterviewSession } from '../types/interview'

const POLL_INTERVAL_MS = 2000

export function InterviewSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [session, setSession] = useState<InterviewSession | null>(null)
  const [answer, setAnswer] = useState('')
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!sessionId) return

    async function poll() {
      const result = await interviewApi.get(sessionId!)
      setSession(result)
      if (result.status !== 'ACTIVE' && pollRef.current) {
        clearInterval(pollRef.current)
      }
    }

    poll()
    pollRef.current = setInterval(poll, POLL_INTERVAL_MS)
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [sessionId])

  async function submit() {
    if (!sessionId || !answer.trim()) return
    await interviewApi.submitAnswer(sessionId, answer)
    setAnswer('')
  }

  if (!session) return <p>Đang tải...</p>

  const currentTurn = session.turns[session.turns.length - 1]
  const waitingForAnswer = session.status === 'ACTIVE' && currentTurn && currentTurn.answerText === null

  return (
    <div>
      <h1>Phỏng vấn thử — {session.status}</h1>
      {session.turns.map(turn => (
        <div key={turn.turnOrder}>
          <p><strong>Q{turn.turnOrder}:</strong> {turn.questionText}</p>
          {turn.answerText && <p><strong>Bạn:</strong> {turn.answerText}</p>}
          {turn.feedback && <p><em>Nhận xét: {turn.feedback}</em></p>}
        </div>
      ))}
      {session.status === 'COMPLETED' && <h2>Điểm cuối: {session.finalScore}/100</h2>}
      {session.status === 'ACTIVE' && !waitingForAnswer && <p>AI đang chuẩn bị câu hỏi tiếp theo...</p>}
      {waitingForAnswer && (
        <div>
          <textarea
            placeholder="Nhập câu trả lời của bạn"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <button onClick={submit}>Gửi</button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npx vitest run src/pages/InterviewSessionPage.test.tsx`
Expected: PASS.

- [ ] **Step 6: Wire routes and commit**

Add to `App.tsx`:
```tsx
          <Route path="/interviews/new" element={<InterviewSetupPage />} />
          <Route path="/interviews/:sessionId" element={<InterviewSessionPage />} />
```

```bash
git add web/src
git commit -m "feat: add AI mock interview setup and session pages"
```

---

## Definition of done for this phase

- `cd backend && ./mvnw test` passes (entities, LLM client, prompt
  builder, service, worker, controller all green).
- `cd web && npx vitest run` passes.
- Manual end-to-end (requires a real `LLM_API_KEY` in `.env` and all infra
  running): start an interview at `/interviews/new`, answer each question
  in the browser, confirm the next question appears within ~1 poll cycle,
  and the final screen shows a numeric score with per-question feedback.
