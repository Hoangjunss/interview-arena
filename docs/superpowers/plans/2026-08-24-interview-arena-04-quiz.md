# Interview Arena — Phase 4: Quiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Multiple-choice quiz per topic with immediate answer explanation
(spec §3.3).

**Architecture:** Quiz questions reuse the same `questions` table/content
files from Phase 2 — a quiz question's markdown body additionally embeds
`## Đáp án trắc nghiệm` with an options list and the correct index, parsed
at read-time by a small `QuizContentParser` (no new content type, no new
migration for question content — only a `quiz_attempts` table to record
what the user answered).

**Tech Stack:** Same as prior phases.

**Spec:** `docs/superpowers/specs/2026-08-24-interview-arena-design.md` (§3.3)
**Overview/diagrams:** `docs/superpowers/plans/2026-08-24-interview-arena-00-overview.md`

## Global Constraints

- Depends on Phase 1 (auth) and Phase 2 (`questions` table + content
  reading infra).
- Quiz markdown files add one more required section
  (`## Đáp án trắc nghiệm`) on top of Phase 2's frontmatter contract; this
  section is optional for non-quiz questions and only parsed when a quiz
  attempt is submitted for that question.

---

### Task 1: Quiz markdown convention + `QuizContentParser`

**Files:**
- Create: `content/questions/frontend/react/react-quiz-jsx-keys.md`
- Create: `backend/src/main/java/com/interviewarena/quiz/QuizOption.java`
- Create: `backend/src/main/java/com/interviewarena/quiz/QuizContentParser.java`
- Test: `backend/src/test/java/com/interviewarena/quiz/QuizContentParserTest.java`

**Interfaces:**
- Consumes: raw markdown body string (as returned by
  `QuestionContentReader.readBody`, Phase 2).
- Produces: `QuizContentParser.parse(String markdownBody): List<QuizOption>`
  where `QuizOption` is a record `(String text, boolean correct)`. Throws
  `IllegalArgumentException` if no `## Đáp án trắc nghiệm` section is
  found. Consumed by `QuizService` (Task 2).

- [ ] **Step 1: Write the seed quiz content file**

```markdown
---
id: react-quiz-jsx-keys
position: frontend
technology: react
level: junior
tags: [jsx, lists]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao React yêu cầu prop `key` khi render danh sách phần tử?

## Question (EN)
Why does React require a `key` prop when rendering a list of elements?

## Đáp án trắc nghiệm
- [ ] Để tăng tốc độ CSS rendering
- [x] Để React xác định phần tử nào thay đổi/thêm/xóa giữa các lần render
- [ ] Để bắt buộc thứ tự DOM cố định
- [ ] `key` chỉ là quy ước, không ảnh hưởng gì

## Giải thích (VI)
`key` giúp thuật toán reconciliation của React so khớp phần tử cũ và mới
hiệu quả, tránh re-render/re-mount không cần thiết và tránh bug state bị
lẫn giữa các item khi danh sách thay đổi thứ tự.
```

- [ ] **Step 2: Write failing test for `QuizContentParser`**

```java
package com.interviewarena.quiz;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class QuizContentParserTest {

    private final QuizContentParser parser = new QuizContentParser();

    @Test
    void parse_extractsOptionsAndMarksCorrectOne() {
        String body = """
            ## Câu hỏi (VI)
            Câu hỏi mẫu?

            ## Đáp án trắc nghiệm
            - [ ] Sai 1
            - [x] Đúng
            - [ ] Sai 2

            ## Giải thích (VI)
            Vì lý do X.
            """;

        List<QuizOption> options = parser.parse(body);

        assertThat(options).hasSize(3);
        assertThat(options.get(1).text()).isEqualTo("Đúng");
        assertThat(options.get(1).correct()).isTrue();
        assertThat(options.get(0).correct()).isFalse();
    }

    @Test
    void parse_throwsWhenNoQuizSectionPresent() {
        String body = "## Câu hỏi (VI)\nKhông có phần trắc nghiệm.\n";

        assertThatThrownBy(() -> parser.parse(body)).isInstanceOf(IllegalArgumentException.class);
    }
}
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=QuizContentParserTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/quiz/QuizOption.java
package com.interviewarena.quiz;

public record QuizOption(String text, boolean correct) {}
```

```java
// backend/src/main/java/com/interviewarena/quiz/QuizContentParser.java
package com.interviewarena.quiz;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class QuizContentParser {

    private static final Pattern SECTION = Pattern.compile(
        "## Đáp án trắc nghiệm\\s*\\n((?:- \\[[ x]] .*\\n?)+)");
    private static final Pattern OPTION_LINE = Pattern.compile("- \\[( |x)] (.*)");

    public List<QuizOption> parse(String markdownBody) {
        Matcher sectionMatcher = SECTION.matcher(markdownBody);
        if (!sectionMatcher.find()) {
            throw new IllegalArgumentException("No '## Đáp án trắc nghiệm' section found");
        }
        List<QuizOption> options = new ArrayList<>();
        for (String line : sectionMatcher.group(1).split("\\n")) {
            if (line.isBlank()) continue;
            Matcher optionMatcher = OPTION_LINE.matcher(line.trim());
            if (optionMatcher.matches()) {
                boolean correct = optionMatcher.group(1).equals("x");
                options.add(new QuizOption(optionMatcher.group(2).trim(), correct));
            }
        }
        return options;
    }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=QuizContentParserTest`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add content/questions/frontend/react/react-quiz-jsx-keys.md backend/src/main/java/com/interviewarena/quiz backend/src/test/java/com/interviewarena/quiz
git commit -m "feat: add quiz markdown convention and content parser"
```

---

### Task 2: `QuizAttempt` entity + `QuizService` + `QuizController`

**Files:**
- Create: `backend/src/main/resources/db/migration/V5__create_quiz_attempts.sql`
- Create: `backend/src/main/java/com/interviewarena/quiz/QuizAttempt.java`
- Create: `backend/src/main/java/com/interviewarena/quiz/QuizAttemptRepository.java`
- Create: `backend/src/main/java/com/interviewarena/quiz/dto/SubmitAnswerRequest.java`
- Create: `backend/src/main/java/com/interviewarena/quiz/dto/QuizResultResponse.java`
- Create: `backend/src/main/java/com/interviewarena/quiz/QuizService.java`
- Create: `backend/src/main/java/com/interviewarena/quiz/QuizController.java`
- Test: `backend/src/test/java/com/interviewarena/quiz/QuizServiceTest.java`

**Interfaces:**
- Consumes: `QuestionRepository`, `QuestionContentReader` (Phase 2),
  `QuizContentParser` (Task 1).
- Produces: `POST /api/quiz/{questionId}/submit {selectedIndex}` → `200
  QuizResultResponse{correct, correctIndex, explanation}`, and persists a
  `QuizAttempt` row.

- [ ] **Step 1: Write migration**

```sql
-- V5__create_quiz_attempts.sql
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    question_id UUID NOT NULL REFERENCES questions(id),
    selected_index INT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_quiz_attempts_user ON quiz_attempts (user_id);
```

- [ ] **Step 2: Write failing unit test for `QuizService`**

```java
package com.interviewarena.quiz;

import com.interviewarena.question.Question;
import com.interviewarena.question.QuestionContentReader;
import com.interviewarena.question.QuestionRepository;
import com.interviewarena.question.QuestionStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuizServiceTest {

    @Mock private QuestionRepository questionRepository;
    @Mock private QuestionContentReader contentReader;
    @Mock private QuizAttemptRepository quizAttemptRepository;
    private final QuizContentParser parser = new QuizContentParser();

    private Question question() {
        Question q = new Question();
        q.setStatus(QuestionStatus.ACTIVE);
        q.setContentPath("frontend/react/react-quiz-jsx-keys.md");
        return q;
    }

    @Test
    void submitAnswer_recordsCorrectAttemptWhenSelectedIndexMatches() {
        UUID userId = UUID.randomUUID();
        UUID questionId = UUID.randomUUID();
        when(questionRepository.findById(questionId)).thenReturn(Optional.of(question()));
        when(contentReader.readBody(any())).thenReturn("""
            ## Đáp án trắc nghiệm
            - [ ] Sai
            - [x] Đúng
            """);

        QuizService service = new QuizService(questionRepository, contentReader, parser, quizAttemptRepository);
        var result = service.submitAnswer(userId, questionId, 1);

        assertThat(result.correct()).isTrue();
        assertThat(result.correctIndex()).isEqualTo(1);
        verify(quizAttemptRepository).save(argThat(a -> a.isCorrect() && a.getSelectedIndex() == 1));
    }

    @Test
    void submitAnswer_recordsIncorrectAttemptWhenSelectedIndexWrong() {
        UUID userId = UUID.randomUUID();
        UUID questionId = UUID.randomUUID();
        when(questionRepository.findById(questionId)).thenReturn(Optional.of(question()));
        when(contentReader.readBody(any())).thenReturn("""
            ## Đáp án trắc nghiệm
            - [ ] Sai
            - [x] Đúng
            """);

        QuizService service = new QuizService(questionRepository, contentReader, parser, quizAttemptRepository);
        var result = service.submitAnswer(userId, questionId, 0);

        assertThat(result.correct()).isFalse();
        verify(quizAttemptRepository).save(argThat(a -> !a.isCorrect()));
    }
}
```

(add `import static org.mockito.ArgumentMatchers.argThat;`)

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=QuizServiceTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/quiz/QuizAttempt.java
package com.interviewarena.quiz;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "question_id", nullable = false)
    private UUID questionId;

    @Column(name = "selected_index", nullable = false)
    private int selectedIndex;

    @Column(name = "is_correct", nullable = false)
    private boolean correct;

    @Column(name = "answered_at", nullable = false)
    private Instant answeredAt = Instant.now();

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public UUID getQuestionId() { return questionId; }
    public void setQuestionId(UUID questionId) { this.questionId = questionId; }
    public int getSelectedIndex() { return selectedIndex; }
    public void setSelectedIndex(int selectedIndex) { this.selectedIndex = selectedIndex; }
    public boolean isCorrect() { return correct; }
    public void setCorrect(boolean correct) { this.correct = correct; }
    public Instant getAnsweredAt() { return answeredAt; }
    public void setAnsweredAt(Instant answeredAt) { this.answeredAt = answeredAt; }
}
```

```java
// backend/src/main/java/com/interviewarena/quiz/QuizAttemptRepository.java
package com.interviewarena.quiz;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, UUID> {
}
```

```java
// backend/src/main/java/com/interviewarena/quiz/dto/SubmitAnswerRequest.java
package com.interviewarena.quiz.dto;

import jakarta.validation.constraints.NotNull;

public record SubmitAnswerRequest(@NotNull Integer selectedIndex) {}
```

```java
// backend/src/main/java/com/interviewarena/quiz/dto/QuizResultResponse.java
package com.interviewarena.quiz.dto;

public record QuizResultResponse(boolean correct, int correctIndex) {}
```

```java
// backend/src/main/java/com/interviewarena/quiz/QuizService.java
package com.interviewarena.quiz;

import com.interviewarena.question.QuestionContentReader;
import com.interviewarena.question.QuestionRepository;
import com.interviewarena.quiz.dto.QuizResultResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class QuizService {

    private final QuestionRepository questionRepository;
    private final QuestionContentReader contentReader;
    private final QuizContentParser quizContentParser;
    private final QuizAttemptRepository quizAttemptRepository;

    public QuizService(
        QuestionRepository questionRepository,
        QuestionContentReader contentReader,
        QuizContentParser quizContentParser,
        QuizAttemptRepository quizAttemptRepository
    ) {
        this.questionRepository = questionRepository;
        this.contentReader = contentReader;
        this.quizContentParser = quizContentParser;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    public QuizResultResponse submitAnswer(UUID userId, UUID questionId, int selectedIndex) {
        var question = questionRepository.findById(questionId)
            .orElseThrow(() -> new NoSuchElementException("Question not found: " + questionId));
        String body = contentReader.readBody(question.getContentPath());
        List<QuizOption> options = quizContentParser.parse(body);

        int correctIndex = -1;
        for (int i = 0; i < options.size(); i++) {
            if (options.get(i).correct()) {
                correctIndex = i;
                break;
            }
        }
        boolean correct = selectedIndex == correctIndex;

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUserId(userId);
        attempt.setQuestionId(questionId);
        attempt.setSelectedIndex(selectedIndex);
        attempt.setCorrect(correct);
        quizAttemptRepository.save(attempt);

        return new QuizResultResponse(correct, correctIndex);
    }
}
```

```java
// backend/src/main/java/com/interviewarena/quiz/QuizController.java
package com.interviewarena.quiz;

import com.interviewarena.quiz.dto.QuizResultResponse;
import com.interviewarena.quiz.dto.SubmitAnswerRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/{questionId}/submit")
    public QuizResultResponse submit(@PathVariable UUID questionId, @Valid @RequestBody SubmitAnswerRequest request) {
        UUID userId = UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
        return quizService.submitAnswer(userId, questionId, request.selectedIndex());
    }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=QuizServiceTest`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/resources/db/migration/V5__create_quiz_attempts.sql backend/src/main/java/com/interviewarena/quiz backend/src/test/java/com/interviewarena/quiz/QuizServiceTest.java
git commit -m "feat: add quiz attempt submission API"
```

---

### Task 3: Frontend — Quiz page

**Files:**
- Create: `web/src/api/quiz.ts`
- Create: `web/src/pages/QuizPage.tsx`
- Modify: `web/src/App.tsx` (add `/quiz/:questionId` route)
- Test: `web/src/pages/QuizPage.test.tsx`

**Interfaces:**
- Consumes: `questionsApi.detail` (Phase 2, for question text + rendered
  options — note: since options live inside the markdown body, the FE
  parses the same `## Đáp án trắc nghiệm` block client-side for display;
  the backend is the sole source of truth for *correctness*), `POST
  /api/quiz/{id}/submit`.

- [ ] **Step 1: Write API module**

```typescript
// web/src/api/quiz.ts
import { apiClient } from './client'

export interface QuizResult {
  correct: boolean
  correctIndex: number
}

export const quizApi = {
  submit: (questionId: string, selectedIndex: number) =>
    apiClient.post<QuizResult>(`/api/quiz/${questionId}/submit`, { selectedIndex }),
}
```

- [ ] **Step 2: Write failing test for `QuizPage`**

```tsx
// web/src/pages/QuizPage.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { QuizPage } from './QuizPage'
import { questionsApi } from '../api/questions'
import { quizApi } from '../api/quiz'

vi.mock('../api/questions', () => ({ questionsApi: { detail: vi.fn() } }))
vi.mock('../api/quiz', () => ({ quizApi: { submit: vi.fn() } }))

describe('QuizPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders options parsed from markdown and shows result after submit', async () => {
    ;(questionsApi.detail as any).mockResolvedValueOnce({
      id: 'q1',
      slug: 'react-quiz-jsx-keys',
      markdownBody: '## Đáp án trắc nghiệm\n- [ ] Sai\n- [x] Đúng\n',
    })
    ;(quizApi.submit as any).mockResolvedValueOnce({ correct: true, correctIndex: 1 })

    render(
      <MemoryRouter initialEntries={['/quiz/q1']}>
        <Routes>
          <Route path="/quiz/:questionId" element={<QuizPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText('Đúng')).toBeInTheDocument())

    fireEvent.click(screen.getByText('Đúng'))

    await waitFor(() => expect(screen.getByText(/Chính xác/)).toBeInTheDocument())
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd web && npx vitest run src/pages/QuizPage.test.tsx`
Expected: FAIL (`./QuizPage` doesn't exist).

- [ ] **Step 4: Write minimal implementation**

```tsx
// web/src/pages/QuizPage.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { questionsApi } from '../api/questions'
import { quizApi, QuizResult } from '../api/quiz'

function parseOptions(markdownBody: string): string[] {
  const match = markdownBody.match(/## Đáp án trắc nghiệm\s*\n((?:- \[[ x]] .*\n?)+)/)
  if (!match) return []
  return match[1]
    .split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => line.replace(/^- \[[ x]] /, '').trim())
}

export function QuizPage() {
  const { questionId } = useParams<{ questionId: string }>()
  const [options, setOptions] = useState<string[]>([])
  const [result, setResult] = useState<QuizResult | null>(null)

  useEffect(() => {
    if (questionId) {
      questionsApi.detail(questionId).then(detail => setOptions(parseOptions(detail.markdownBody)))
    }
  }, [questionId])

  async function submit(index: number) {
    if (!questionId) return
    const r = await quizApi.submit(questionId, index)
    setResult(r)
  }

  return (
    <div>
      <h1>Trắc nghiệm</h1>
      <ul>
        {options.map((option, i) => (
          <li key={i}>
            <button onClick={() => submit(i)}>{option}</button>
          </li>
        ))}
      </ul>
      {result && <p>{result.correct ? 'Chính xác!' : 'Chưa đúng, thử lại.'}</p>}
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npx vitest run src/pages/QuizPage.test.tsx`
Expected: PASS.

- [ ] **Step 6: Wire route and commit**

Add `<Route path="/quiz/:questionId" element={<QuizPage />} />` and its
import in `App.tsx`.

```bash
git add web/src
git commit -m "feat: add quiz page"
```

---

## Definition of done for this phase

- `cd backend && ./mvnw test` passes.
- `cd web && npx vitest run` passes.
- Manual: visiting `/quiz/<id-of-react-quiz-jsx-keys>` shows the 3 parsed
  options, clicking the correct one shows "Chính xác!".
