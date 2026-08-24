# Interview Arena — Phase 6: Progress Tracking & Subscription Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A progress dashboard aggregating a user's practice history, plus
the freemium quota gate on AI Mock Interview creation (spec §3.5, §3.6).

**Architecture:** `Subscription` is a per-user row (`plan: FREE|PRO`,
`expires_at`). Free-tier daily quota for starting new interview sessions
is enforced with an atomic Redis `INCR` on key
`interview-quota:{userId}:{yyyy-MM-dd}` with a TTL until end-of-day — this
wraps `InterviewController.start` (Phase 5) as a pre-check, never touching
Postgres for the hot-path check. Progress is a read-only aggregation
query across `interview_sessions`, `quiz_attempts`, and
`flashcard_reviews` — no new write-path tables beyond `subscriptions`.

**Tech Stack:** Same as prior phases.

**Spec:** `docs/superpowers/specs/2026-08-24-interview-arena-design.md` (§3.5, §3.6)
**Overview/diagrams:** `docs/superpowers/plans/2026-08-24-interview-arena-00-overview.md`

## Global Constraints

- Depends on Phase 1 (auth), Phase 3 (`flashcard_reviews`), Phase 4
  (`quiz_attempts`), Phase 5 (`interview_sessions`, `InterviewController`).
- Free-tier daily AI-interview quota is **3 sessions/day** for this MVP
  (spec §3.6 leaves the exact number to be tuned post-launch based on
  measured LLM cost; `3` is this plan's concrete starting value, exposed
  via `app.interview.free-daily-quota` so it can be tuned without a code
  change).
- Quota check must be atomic under concurrent requests from the same user
  (two tabs submitting simultaneously must not both slip through) — use
  Redis `INCR` + `EXPIRE`, not read-then-write.

---

### Task 1: `Subscription` entity + migration + `SubscriptionService`

**Files:**
- Create: `backend/src/main/resources/db/migration/V7__create_subscriptions.sql`
- Create: `backend/src/main/java/com/interviewarena/subscription/Plan.java`
- Create: `backend/src/main/java/com/interviewarena/subscription/Subscription.java`
- Create: `backend/src/main/java/com/interviewarena/subscription/SubscriptionRepository.java`
- Create: `backend/src/main/java/com/interviewarena/subscription/SubscriptionService.java`
- Test: `backend/src/test/java/com/interviewarena/subscription/SubscriptionServiceTest.java`

**Interfaces:**
- Produces: `Subscription` (`id`, `userId` unique, `plan: Plan`,
  `expiresAt` nullable — null means "no active Pro term", always treated
  as `FREE`). `SubscriptionService.isPro(UUID userId): boolean` (true only
  if `plan == PRO` and `expiresAt` is null-or-future) — consumed by
  `InterviewQuotaFilter` (Task 2) to decide whether to skip the quota
  check entirely.

- [ ] **Step 1: Write migration**

```sql
-- V7__create_subscriptions.sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id),
    plan VARCHAR(10) NOT NULL DEFAULT 'FREE',
    expires_at TIMESTAMPTZ
);
```

- [ ] **Step 2: Write failing unit test for `SubscriptionService`**

```java
package com.interviewarena.subscription;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SubscriptionServiceTest {

    @Mock
    private SubscriptionRepository repository;

    @Test
    void isPro_returnsFalseWhenNoSubscriptionRow() {
        UUID userId = UUID.randomUUID();
        when(repository.findByUserId(userId)).thenReturn(Optional.empty());

        assertThat(new SubscriptionService(repository).isPro(userId)).isFalse();
    }

    @Test
    void isPro_returnsTrueForActiveProWithFutureExpiry() {
        UUID userId = UUID.randomUUID();
        Subscription sub = new Subscription();
        sub.setPlan(Plan.PRO);
        sub.setExpiresAt(Instant.now().plus(10, ChronoUnit.DAYS));
        when(repository.findByUserId(userId)).thenReturn(Optional.of(sub));

        assertThat(new SubscriptionService(repository).isPro(userId)).isTrue();
    }

    @Test
    void isPro_returnsFalseForExpiredPro() {
        UUID userId = UUID.randomUUID();
        Subscription sub = new Subscription();
        sub.setPlan(Plan.PRO);
        sub.setExpiresAt(Instant.now().minus(1, ChronoUnit.DAYS));
        when(repository.findByUserId(userId)).thenReturn(Optional.of(sub));

        assertThat(new SubscriptionService(repository).isPro(userId)).isFalse();
    }

    @Test
    void isPro_returnsTrueForLifetimeProWithNullExpiry() {
        UUID userId = UUID.randomUUID();
        Subscription sub = new Subscription();
        sub.setPlan(Plan.PRO);
        sub.setExpiresAt(null);
        when(repository.findByUserId(userId)).thenReturn(Optional.of(sub));

        assertThat(new SubscriptionService(repository).isPro(userId)).isTrue();
    }
}
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=SubscriptionServiceTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/subscription/Plan.java
package com.interviewarena.subscription;

public enum Plan {
    FREE, PRO
}
```

```java
// backend/src/main/java/com/interviewarena/subscription/Subscription.java
package com.interviewarena.subscription;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false, unique = true)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Plan plan = Plan.FREE;

    @Column(name = "expires_at")
    private Instant expiresAt;

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public Plan getPlan() { return plan; }
    public void setPlan(Plan plan) { this.plan = plan; }
    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
}
```

```java
// backend/src/main/java/com/interviewarena/subscription/SubscriptionRepository.java
package com.interviewarena.subscription;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
    Optional<Subscription> findByUserId(UUID userId);
}
```

```java
// backend/src/main/java/com/interviewarena/subscription/SubscriptionService.java
package com.interviewarena.subscription;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class SubscriptionService {

    private final SubscriptionRepository repository;

    public SubscriptionService(SubscriptionRepository repository) {
        this.repository = repository;
    }

    public boolean isPro(UUID userId) {
        return repository.findByUserId(userId)
            .filter(s -> s.getPlan() == Plan.PRO)
            .filter(s -> s.getExpiresAt() == null || s.getExpiresAt().isAfter(Instant.now()))
            .isPresent();
    }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=SubscriptionServiceTest`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/resources/db/migration/V7__create_subscriptions.sql backend/src/main/java/com/interviewarena/subscription backend/src/test/java/com/interviewarena/subscription
git commit -m "feat: add Subscription entity and isPro check"
```

---

### Task 2: `InterviewQuotaService` (Redis-backed) + wire into `InterviewController`

**Files:**
- Create: `backend/src/main/java/com/interviewarena/interview/InterviewQuotaService.java`
- Create: `backend/src/main/java/com/interviewarena/interview/exception/QuotaExceededException.java`
- Modify: `backend/src/main/java/com/interviewarena/interview/InterviewController.java` (call quota check before `startSession`)
- Modify: `backend/src/main/java/com/interviewarena/common/GlobalExceptionHandler.java` (map `QuotaExceededException` to 429)
- Test: `backend/src/test/java/com/interviewarena/interview/InterviewQuotaServiceTest.java`

**Interfaces:**
- Consumes: `StringRedisTemplate` (Phase 3), `SubscriptionService` (Task
  1), `app.interview.free-daily-quota` config.
- Produces: `InterviewQuotaService.checkAndConsume(UUID userId)` — no-op
  (always allowed) if `subscriptionService.isPro(userId)`; otherwise
  atomically increments today's counter and throws
  `QuotaExceededException` if the new count exceeds the configured quota.
  Consumed by `InterviewController.start` (Phase 5, modified here).

- [ ] **Step 1: Write failing unit test**

```java
package com.interviewarena.interview;

import com.interviewarena.interview.exception.QuotaExceededException;
import com.interviewarena.subscription.SubscriptionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InterviewQuotaServiceTest {

    @Mock private StringRedisTemplate redisTemplate;
    @Mock private ValueOperations<String, String> valueOperations;
    @Mock private SubscriptionService subscriptionService;

    @Test
    void checkAndConsume_allowsProUsersUnconditionally() {
        UUID userId = UUID.randomUUID();
        when(subscriptionService.isPro(userId)).thenReturn(true);

        InterviewQuotaService service = new InterviewQuotaService(redisTemplate, subscriptionService, 3);

        assertThatCode(() -> service.checkAndConsume(userId)).doesNotThrowAnyException();
        verifyNoInteractions(redisTemplate);
    }

    @Test
    void checkAndConsume_allowsFreeUserUnderQuota() {
        UUID userId = UUID.randomUUID();
        when(subscriptionService.isPro(userId)).thenReturn(false);
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(anyString())).thenReturn(1L);

        InterviewQuotaService service = new InterviewQuotaService(redisTemplate, subscriptionService, 3);

        assertThatCode(() -> service.checkAndConsume(userId)).doesNotThrowAnyException();
        verify(redisTemplate).expire(anyString(), any(java.time.Duration.class));
    }

    @Test
    void checkAndConsume_throwsWhenFreeUserExceedsQuota() {
        UUID userId = UUID.randomUUID();
        when(subscriptionService.isPro(userId)).thenReturn(false);
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(anyString())).thenReturn(4L);

        InterviewQuotaService service = new InterviewQuotaService(redisTemplate, subscriptionService, 3);

        assertThatThrownBy(() -> service.checkAndConsume(userId)).isInstanceOf(QuotaExceededException.class);
    }
}
```

(add `import static org.mockito.ArgumentMatchers.anyString;` and
`import static org.mockito.ArgumentMatchers.any;`)

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=InterviewQuotaServiceTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 3: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/interview/exception/QuotaExceededException.java
package com.interviewarena.interview.exception;

public class QuotaExceededException extends RuntimeException {
    public QuotaExceededException(String message) {
        super(message);
    }
}
```

```java
package com.interviewarena.interview;

import com.interviewarena.interview.exception.QuotaExceededException;
import com.interviewarena.subscription.SubscriptionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class InterviewQuotaService {

    private final StringRedisTemplate redisTemplate;
    private final SubscriptionService subscriptionService;
    private final int freeDailyQuota;

    public InterviewQuotaService(
        StringRedisTemplate redisTemplate,
        SubscriptionService subscriptionService,
        @Value("${app.interview.free-daily-quota:3}") int freeDailyQuota
    ) {
        this.redisTemplate = redisTemplate;
        this.subscriptionService = subscriptionService;
        this.freeDailyQuota = freeDailyQuota;
    }

    public void checkAndConsume(UUID userId) {
        if (subscriptionService.isPro(userId)) {
            return;
        }
        String key = "interview-quota:" + userId + ":" + LocalDate.now();
        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1L) {
            redisTemplate.expire(key, Duration.ofDays(1));
        }
        if (count != null && count > freeDailyQuota) {
            throw new QuotaExceededException(
                "Đã dùng hết " + freeDailyQuota + " lượt phỏng vấn AI miễn phí hôm nay");
        }
    }
}
```

Modify `GlobalExceptionHandler` — add:
```java
    @ExceptionHandler(com.interviewarena.interview.exception.QuotaExceededException.class)
    public ResponseEntity<Map<String, String>> handleQuotaExceeded(com.interviewarena.interview.exception.QuotaExceededException e) {
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(Map.of("message", e.getMessage()));
    }
```

Modify `InterviewController` — inject `InterviewQuotaService` and call it
first in `start`:
```java
    private final InterviewService interviewService;
    private final InterviewQuotaService quotaService;

    public InterviewController(InterviewService interviewService, InterviewQuotaService quotaService) {
        this.interviewService = interviewService;
        this.quotaService = quotaService;
    }

    @PostMapping
    public ResponseEntity<InterviewSessionDto> start(@Valid @RequestBody StartInterviewRequest request) {
        UUID userId = currentUserId();
        quotaService.checkAndConsume(userId);
        InterviewSessionDto dto = interviewService.startSession(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }
```

(replace the existing constructor and `start` method; `InterviewControllerTest`
from Phase 5 must also be updated to construct `InterviewController` with a
mocked `InterviewQuotaService` — add `@Mock private InterviewQuotaService
quotaService;` and pass it into `new InterviewController(interviewService,
quotaService)` in that test's `mockMvc()` helper.)

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=InterviewQuotaServiceTest`
Expected: PASS.

- [ ] **Step 5: Run full backend suite to catch the `InterviewControllerTest` breakage**

Run: `cd backend && ./mvnw test`
Expected: PASS once `InterviewControllerTest` is updated per the note
above.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/java/com/interviewarena/interview backend/src/main/java/com/interviewarena/common/GlobalExceptionHandler.java backend/src/test/java/com/interviewarena/interview
git commit -m "feat: enforce free-tier daily AI interview quota via Redis"
```

---

### Task 3: Progress dashboard endpoint

**Files:**
- Create: `backend/src/main/java/com/interviewarena/progress/dto/ProgressResponse.java`
- Create: `backend/src/main/java/com/interviewarena/progress/ProgressService.java`
- Create: `backend/src/main/java/com/interviewarena/progress/ProgressController.java`
- Test: `backend/src/test/java/com/interviewarena/progress/ProgressServiceTest.java`

**Interfaces:**
- Consumes: `InterviewSessionRepository` (Phase 5),
  `QuizAttemptRepository` (Phase 4), `FlashcardReviewRepository` (Phase 3).
- Produces: `GET /api/progress` → `200 ProgressResponse{
  completedInterviews, averageInterviewScore, quizAccuracyPercent,
  cardsReviewedTotal}`.

- [ ] **Step 1: Add repository query methods needed for aggregation**

Add to `InterviewSessionRepository` (Phase 5, modify file):
```java
    List<InterviewSession> findByUserIdAndStatus(UUID userId, InterviewStatus status);
```

Add to `QuizAttemptRepository` (Phase 4, modify file):
```java
    List<QuizAttempt> findByUserId(UUID userId);
```

Add to `FlashcardReviewRepository` (Phase 3, modify file):
```java
    long countByUserId(UUID userId);
```

- [ ] **Step 2: Write failing unit test for `ProgressService`**

```java
package com.interviewarena.progress;

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
    void getProgress_aggregatesAcrossAllThreeActivityTypes() {
        UUID userId = UUID.randomUUID();
        when(interviewSessionRepository.findByUserIdAndStatus(userId, InterviewStatus.COMPLETED))
            .thenReturn(List.of(completedSession(80), completedSession(90)));
        when(quizAttemptRepository.findByUserId(userId))
            .thenReturn(List.of(attempt(true), attempt(true), attempt(false), attempt(true)));
        when(flashcardReviewRepository.countByUserId(userId)).thenReturn(12L);

        ProgressService service = new ProgressService(interviewSessionRepository, quizAttemptRepository, flashcardReviewRepository);
        var result = service.getProgress(userId);

        assertThat(result.completedInterviews()).isEqualTo(2);
        assertThat(result.averageInterviewScore()).isEqualTo(85.0);
        assertThat(result.quizAccuracyPercent()).isEqualTo(75.0);
        assertThat(result.cardsReviewedTotal()).isEqualTo(12L);
    }

    @Test
    void getProgress_handlesNoActivityYetWithoutDivisionByZero() {
        UUID userId = UUID.randomUUID();
        when(interviewSessionRepository.findByUserIdAndStatus(userId, InterviewStatus.COMPLETED)).thenReturn(List.of());
        when(quizAttemptRepository.findByUserId(userId)).thenReturn(List.of());
        when(flashcardReviewRepository.countByUserId(userId)).thenReturn(0L);

        ProgressService service = new ProgressService(interviewSessionRepository, quizAttemptRepository, flashcardReviewRepository);
        var result = service.getProgress(userId);

        assertThat(result.completedInterviews()).isZero();
        assertThat(result.averageInterviewScore()).isEqualTo(0.0);
        assertThat(result.quizAccuracyPercent()).isEqualTo(0.0);
    }
}
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=ProgressServiceTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/progress/dto/ProgressResponse.java
package com.interviewarena.progress.dto;

public record ProgressResponse(
    int completedInterviews,
    double averageInterviewScore,
    double quizAccuracyPercent,
    long cardsReviewedTotal
) {}
```

```java
package com.interviewarena.progress;

import com.interviewarena.flashcard.FlashcardReviewRepository;
import com.interviewarena.interview.InterviewSession;
import com.interviewarena.interview.InterviewSessionRepository;
import com.interviewarena.interview.InterviewStatus;
import com.interviewarena.progress.dto.ProgressResponse;
import com.interviewarena.quiz.QuizAttemptRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProgressService {

    private final InterviewSessionRepository interviewSessionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final FlashcardReviewRepository flashcardReviewRepository;

    public ProgressService(
        InterviewSessionRepository interviewSessionRepository,
        QuizAttemptRepository quizAttemptRepository,
        FlashcardReviewRepository flashcardReviewRepository
    ) {
        this.interviewSessionRepository = interviewSessionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.flashcardReviewRepository = flashcardReviewRepository;
    }

    public ProgressResponse getProgress(UUID userId) {
        List<InterviewSession> completed = interviewSessionRepository
            .findByUserIdAndStatus(userId, InterviewStatus.COMPLETED);
        double avgScore = completed.isEmpty() ? 0.0 :
            completed.stream().mapToInt(InterviewSession::getFinalScore).average().orElse(0.0);

        var attempts = quizAttemptRepository.findByUserId(userId);
        double accuracy = attempts.isEmpty() ? 0.0 :
            100.0 * attempts.stream().filter(com.interviewarena.quiz.QuizAttempt::isCorrect).count() / attempts.size();

        long cardsReviewed = flashcardReviewRepository.countByUserId(userId);

        return new ProgressResponse(completed.size(), avgScore, accuracy, cardsReviewed);
    }
}
```

```java
// backend/src/main/java/com/interviewarena/progress/ProgressController.java
package com.interviewarena.progress;

import com.interviewarena.progress.dto.ProgressResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public ProgressResponse get() {
        UUID userId = UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
        return progressService.getProgress(userId);
    }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=ProgressServiceTest`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/java/com/interviewarena/progress backend/src/main/java/com/interviewarena/interview/InterviewSessionRepository.java backend/src/main/java/com/interviewarena/quiz/QuizAttemptRepository.java backend/src/main/java/com/interviewarena/flashcard/FlashcardReviewRepository.java backend/src/test/java/com/interviewarena/progress
git commit -m "feat: add progress dashboard aggregation endpoint"
```

---

### Task 4: Frontend — Progress page + quota-exceeded UX

**Files:**
- Create: `web/src/api/progress.ts`
- Create: `web/src/pages/ProgressPage.tsx`
- Modify: `web/src/pages/InterviewSetupPage.tsx` (handle 429 from `start`)
- Modify: `web/src/App.tsx` (add `/progress` route)
- Test: `web/src/pages/ProgressPage.test.tsx`

**Interfaces:**
- Consumes: `apiClient`, `GET /api/progress`; `ApiError.status === 429`
  from `InterviewSetupPage`'s call to `interviewApi.start` (Phase 5).

- [ ] **Step 1: Write API module**

```typescript
// web/src/api/progress.ts
import { apiClient } from './client'

export interface Progress {
  completedInterviews: number
  averageInterviewScore: number
  quizAccuracyPercent: number
  cardsReviewedTotal: number
}

export const progressApi = {
  get: () => apiClient.get<Progress>('/api/progress'),
}
```

- [ ] **Step 2: Write failing test for `ProgressPage`**

```tsx
// web/src/pages/ProgressPage.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ProgressPage } from './ProgressPage'
import { progressApi } from '../api/progress'

vi.mock('../api/progress', () => ({ progressApi: { get: vi.fn() } }))

describe('ProgressPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders aggregated stats', async () => {
    ;(progressApi.get as any).mockResolvedValueOnce({
      completedInterviews: 4,
      averageInterviewScore: 78.5,
      quizAccuracyPercent: 66.7,
      cardsReviewedTotal: 20,
    })

    render(<ProgressPage />)

    await waitFor(() => expect(screen.getByText('4')).toBeInTheDocument())
    expect(screen.getByText('78.5')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd web && npx vitest run src/pages/ProgressPage.test.tsx`
Expected: FAIL (`./ProgressPage` doesn't exist).

- [ ] **Step 4: Write minimal implementation**

```tsx
// web/src/pages/ProgressPage.tsx
import { useEffect, useState } from 'react'
import { progressApi, Progress } from '../api/progress'

export function ProgressPage() {
  const [progress, setProgress] = useState<Progress | null>(null)

  useEffect(() => {
    progressApi.get().then(setProgress)
  }, [])

  if (!progress) return <p>Đang tải...</p>

  return (
    <div>
      <h1>Tiến độ của bạn</h1>
      <p>Phỏng vấn đã hoàn thành: {progress.completedInterviews}</p>
      <p>Điểm trung bình: {progress.averageInterviewScore}</p>
      <p>Độ chính xác quiz: {progress.quizAccuracyPercent}%</p>
      <p>Tổng thẻ đã ôn: {progress.cardsReviewedTotal}</p>
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npx vitest run src/pages/ProgressPage.test.tsx`
Expected: PASS.

- [ ] **Step 6: Handle quota-exceeded (429) in `InterviewSetupPage`**

Modify `InterviewSetupPage.tsx`'s `start` function:
```tsx
  const [error, setError] = useState<string | null>(null)

  async function start() {
    setError(null)
    try {
      const session = await interviewApi.start(position, technology, level)
      navigate(`/interviews/${session.sessionId}`)
    } catch (e) {
      if (e instanceof ApiError && e.status === 429) {
        setError('Bạn đã dùng hết lượt phỏng vấn AI miễn phí hôm nay. Nâng cấp Pro để tiếp tục.')
      } else {
        setError('Không thể bắt đầu phỏng vấn, thử lại sau.')
      }
    }
  }
```
(add `import { ApiError } from '../api/client'` and render
`{error && <p role="alert">{error}</p>}` in the JSX.)

- [ ] **Step 7: Wire route and commit**

Add `<Route path="/progress" element={<ProgressPage />} />` and its import
to `App.tsx`.

```bash
git add web/src
git commit -m "feat: add progress page and quota-exceeded UX"
```

---

## Definition of done for this phase

- `cd backend && ./mvnw test` passes.
- `cd web && npx vitest run` passes.
- Manual: a free-tier user starting a 4th interview session in the same
  day gets a clear "hết lượt miễn phí" message instead of a raw error;
  `/progress` shows correct aggregated numbers after a few completed
  activities.

---

## MVP-wide definition of done (all 6 phases + CI)

- All phase-level "Definition of done" sections above are satisfied.
- `.github/workflows/ci.yml` is green on the default branch.
- A brand-new user can, end to end in the browser: register → browse the
  question bank → review a due flashcard → answer a quiz → complete a full
  AI mock interview and see a score → view their aggregated progress —
  without touching a terminal.
