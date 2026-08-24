# Interview Arena — Phase 3: Flashcard Spaced Repetition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Flashcard review with SM-2 spaced repetition, backed by Redis for
fast "what's due today" lookups.

**Architecture:** `FlashcardReview` is a per-(user, question) row storing
SM-2 state (`interval_days`, `ease_factor`, `repetitions`, `due_at`).
Reviewing a card runs the SM-2 algorithm to compute the next `due_at`, and
also updates a Redis sorted set `srs:due:{userId}` (score = due epoch
seconds) so "cards due today" is an O(log n) `ZRANGEBYSCORE`, not a table
scan. Postgres remains the source of truth; Redis is a derived cache
rebuilt from Postgres on read-miss.

**Tech Stack:** Same as Phase 1/2, plus `spring-boot-starter-data-redis`
(already a Phase 1 pom dependency).

**Spec:** `docs/superpowers/specs/2026-08-24-interview-arena-design.md` (§3.2)
**Overview/diagrams:** `docs/superpowers/plans/2026-08-24-interview-arena-00-overview.md`

## Global Constraints

- Depends on Phase 1 (auth) and Phase 2 (`questions` table must exist —
  `flashcard_reviews.question_id` is a FK to it).
- SM-2 parameters: `ease_factor` starts at `2.5`, floor `1.3`; ratings are
  `AGAIN=0, HARD=1, GOOD=2, EASY=3` (per spec §3.2's "Again/Hard/Good/
  Easy").
- Redis is a cache, never the source of truth — every write path updates
  Postgres first, then Redis.

---

### Task 1: `FlashcardReview` entity + migration

**Files:**
- Create: `backend/src/main/resources/db/migration/V4__create_flashcard_reviews.sql`
- Create: `backend/src/main/java/com/interviewarena/flashcard/FlashcardReview.java`
- Create: `backend/src/main/java/com/interviewarena/flashcard/FlashcardReviewRepository.java`
- Test: `backend/src/test/java/com/interviewarena/flashcard/FlashcardReviewRepositoryTest.java`

**Interfaces:**
- Produces: `FlashcardReview` (`id: UUID`, `userId: UUID`,
  `questionId: UUID`, `intervalDays: int`, `easeFactor: double`,
  `repetitions: int`, `dueAt: Instant`, `lastReviewedAt: Instant`).
  `FlashcardReviewRepository` with
  `Optional<FlashcardReview> findByUserIdAndQuestionId(UUID, UUID)` and
  `List<FlashcardReview> findByUserIdAndDueAtLessThanEqual(UUID, Instant)`.
  Consumed by Task 2 (`Sm2Calculator`-driven service).

- [ ] **Step 1: Write migration**

```sql
-- V4__create_flashcard_reviews.sql
CREATE TABLE flashcard_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    question_id UUID NOT NULL REFERENCES questions(id),
    interval_days INT NOT NULL DEFAULT 0,
    ease_factor DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    repetitions INT NOT NULL DEFAULT 0,
    due_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_reviewed_at TIMESTAMPTZ,
    UNIQUE (user_id, question_id)
);

CREATE INDEX idx_flashcard_reviews_due ON flashcard_reviews (user_id, due_at);
```

- [ ] **Step 2: Write failing repository test**

```java
package com.interviewarena.flashcard;

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
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class FlashcardReviewRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private FlashcardReviewRepository repository;
    @Autowired
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    private UUID insertUser() {
        UUID id = UUID.randomUUID();
        jdbcTemplate.update(
            "INSERT INTO users (id, email, password_hash, display_name) VALUES (?, ?, 'x', 'x')",
            id, id + "@example.com");
        return id;
    }

    private UUID insertQuestion() {
        UUID id = UUID.randomUUID();
        jdbcTemplate.update(
            "INSERT INTO questions (id, slug, position, technology, level, source, status, content_path) " +
            "VALUES (?, ?, 'frontend', 'react', 'mid', 'MANUAL', 'ACTIVE', 'x.md')",
            id, "slug-" + id);
        return id;
    }

    @Test
    void findByUserIdAndDueAtLessThanEqual_returnsOnlyDueCards() {
        UUID userId = insertUser();
        UUID dueQuestionId = insertQuestion();
        UUID futureQuestionId = insertQuestion();

        FlashcardReview due = new FlashcardReview();
        due.setUserId(userId);
        due.setQuestionId(dueQuestionId);
        due.setDueAt(Instant.now().minus(1, ChronoUnit.DAYS));
        repository.save(due);

        FlashcardReview future = new FlashcardReview();
        future.setUserId(userId);
        future.setQuestionId(futureQuestionId);
        future.setDueAt(Instant.now().plus(5, ChronoUnit.DAYS));
        repository.save(future);

        List<FlashcardReview> result = repository.findByUserIdAndDueAtLessThanEqual(userId, Instant.now());

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getQuestionId()).isEqualTo(dueQuestionId);
    }
}
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=FlashcardReviewRepositoryTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/flashcard/FlashcardReview.java
package com.interviewarena.flashcard;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "flashcard_reviews")
public class FlashcardReview {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "question_id", nullable = false)
    private UUID questionId;

    @Column(name = "interval_days", nullable = false)
    private int intervalDays = 0;

    @Column(name = "ease_factor", nullable = false)
    private double easeFactor = 2.5;

    @Column(nullable = false)
    private int repetitions = 0;

    @Column(name = "due_at", nullable = false)
    private Instant dueAt = Instant.now();

    @Column(name = "last_reviewed_at")
    private Instant lastReviewedAt;

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
    public UUID getQuestionId() { return questionId; }
    public void setQuestionId(UUID questionId) { this.questionId = questionId; }
    public int getIntervalDays() { return intervalDays; }
    public void setIntervalDays(int intervalDays) { this.intervalDays = intervalDays; }
    public double getEaseFactor() { return easeFactor; }
    public void setEaseFactor(double easeFactor) { this.easeFactor = easeFactor; }
    public int getRepetitions() { return repetitions; }
    public void setRepetitions(int repetitions) { this.repetitions = repetitions; }
    public Instant getDueAt() { return dueAt; }
    public void setDueAt(Instant dueAt) { this.dueAt = dueAt; }
    public Instant getLastReviewedAt() { return lastReviewedAt; }
    public void setLastReviewedAt(Instant lastReviewedAt) { this.lastReviewedAt = lastReviewedAt; }
}
```

```java
// backend/src/main/java/com/interviewarena/flashcard/FlashcardReviewRepository.java
package com.interviewarena.flashcard;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FlashcardReviewRepository extends JpaRepository<FlashcardReview, UUID> {
    Optional<FlashcardReview> findByUserIdAndQuestionId(UUID userId, UUID questionId);
    List<FlashcardReview> findByUserIdAndDueAtLessThanEqual(UUID userId, Instant now);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=FlashcardReviewRepositoryTest`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/resources/db/migration/V4__create_flashcard_reviews.sql backend/src/main/java/com/interviewarena/flashcard backend/src/test/java/com/interviewarena/flashcard
git commit -m "feat: add FlashcardReview entity, migration, and repository"
```

---

### Task 2: `Sm2Calculator`

**Files:**
- Create: `backend/src/main/java/com/interviewarena/flashcard/ReviewRating.java`
- Create: `backend/src/main/java/com/interviewarena/flashcard/Sm2Calculator.java`
- Test: `backend/src/test/java/com/interviewarena/flashcard/Sm2CalculatorTest.java`

**Interfaces:**
- Produces: `Sm2Calculator.apply(FlashcardReview current, ReviewRating
  rating): Sm2Result` where `Sm2Result` is a record
  `(int intervalDays, double easeFactor, int repetitions, Instant dueAt)`.
  Pure function, no I/O — consumed by `FlashcardService` (Task 3).

- [ ] **Step 1: Write failing test**

```java
package com.interviewarena.flashcard;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;

class Sm2CalculatorTest {

    private final Sm2Calculator calculator = new Sm2Calculator();

    @Test
    void again_resetsRepetitionsAndIntervalToOneDay() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(3);
        card.setIntervalDays(10);
        card.setEaseFactor(2.5);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.AGAIN);

        assertThat(result.repetitions()).isZero();
        assertThat(result.intervalDays()).isEqualTo(1);
    }

    @Test
    void firstGoodReview_setsIntervalToOneDay() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(0);
        card.setIntervalDays(0);
        card.setEaseFactor(2.5);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.GOOD);

        assertThat(result.repetitions()).isEqualTo(1);
        assertThat(result.intervalDays()).isEqualTo(1);
    }

    @Test
    void secondGoodReview_setsIntervalToSixDays() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(1);
        card.setIntervalDays(1);
        card.setEaseFactor(2.5);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.GOOD);

        assertThat(result.repetitions()).isEqualTo(2);
        assertThat(result.intervalDays()).isEqualTo(6);
    }

    @Test
    void thirdPlusGoodReview_multipliesByEaseFactor() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(2);
        card.setIntervalDays(6);
        card.setEaseFactor(2.5);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.GOOD);

        assertThat(result.repetitions()).isEqualTo(3);
        assertThat(result.intervalDays()).isEqualTo(15); // round(6 * 2.5)
    }

    @Test
    void easeFactor_neverDropsBelowFloor() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(2);
        card.setIntervalDays(6);
        card.setEaseFactor(1.35);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.AGAIN);

        assertThat(result.easeFactor()).isCloseTo(1.3, within(0.001));
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=Sm2CalculatorTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 3: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/flashcard/ReviewRating.java
package com.interviewarena.flashcard;

public enum ReviewRating {
    AGAIN, HARD, GOOD, EASY
}
```

```java
// backend/src/main/java/com/interviewarena/flashcard/Sm2Calculator.java
package com.interviewarena.flashcard;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class Sm2Calculator {

    private static final double EASE_FLOOR = 1.3;

    public record Sm2Result(int intervalDays, double easeFactor, int repetitions, Instant dueAt) {}

    public Sm2Result apply(FlashcardReview current, ReviewRating rating) {
        double quality = switch (rating) {
            case AGAIN -> 0;
            case HARD -> 3;
            case GOOD -> 4;
            case EASY -> 5;
        };

        if (rating == ReviewRating.AGAIN) {
            int interval = 1;
            double ease = adjustEase(current.getEaseFactor(), quality);
            return new Sm2Result(interval, ease, 0, dueIn(interval));
        }

        double ease = adjustEase(current.getEaseFactor(), quality);
        int repetitions = current.getRepetitions() + 1;
        int interval;
        if (repetitions == 1) {
            interval = 1;
        } else if (repetitions == 2) {
            interval = 6;
        } else {
            interval = (int) Math.round(current.getIntervalDays() * ease);
        }
        return new Sm2Result(interval, ease, repetitions, dueIn(interval));
    }

    private double adjustEase(double currentEase, double quality) {
        double newEase = currentEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        return Math.max(EASE_FLOOR, newEase);
    }

    private Instant dueIn(int days) {
        return Instant.now().plus(days, ChronoUnit.DAYS);
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=Sm2CalculatorTest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/flashcard/ReviewRating.java backend/src/main/java/com/interviewarena/flashcard/Sm2Calculator.java backend/src/test/java/com/interviewarena/flashcard/Sm2CalculatorTest.java
git commit -m "feat: add SM-2 spaced repetition calculator"
```

---

### Task 3: `FlashcardService` with Redis due-set + `FlashcardController`

**Files:**
- Create: `backend/src/main/java/com/interviewarena/config/RedisConfig.java`
- Create: `backend/src/main/java/com/interviewarena/flashcard/dto/ReviewCardRequest.java`
- Create: `backend/src/main/java/com/interviewarena/flashcard/dto/DueCardResponse.java`
- Create: `backend/src/main/java/com/interviewarena/flashcard/FlashcardService.java`
- Create: `backend/src/main/java/com/interviewarena/flashcard/FlashcardController.java`
- Test: `backend/src/test/java/com/interviewarena/flashcard/FlashcardServiceTest.java`

**Interfaces:**
- Consumes: `FlashcardReviewRepository` (Task 1), `Sm2Calculator` (Task 2),
  `StringRedisTemplate` (Spring Boot auto-configured bean).
- Produces: `GET /api/flashcards/due` → `200 List<DueCardResponse>{
  questionId, slug}` (current user, from Phase 1 `SecurityContextHolder`);
  `POST /api/flashcards/{questionId}/review {rating}` → `200` updates SM-2
  state and removes/re-adds the Redis due-set entry.

- [ ] **Step 1: Write `RedisConfig`**

```java
package com.interviewarena.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;

@Configuration
public class RedisConfig {

    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory factory) {
        return new StringRedisTemplate(factory);
    }
}
```

- [ ] **Step 2: Write failing unit test for `FlashcardService`**

```java
package com.interviewarena.flashcard;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlashcardServiceTest {

    @Mock
    private FlashcardReviewRepository repository;
    @Mock
    private StringRedisTemplate redisTemplate;
    @Mock
    private ZSetOperations<String, String> zSetOperations;

    @Test
    void reviewCard_persistsSm2StateAndUpdatesRedisDueSet() {
        when(redisTemplate.opsForZSet()).thenReturn(zSetOperations);
        UUID userId = UUID.randomUUID();
        UUID questionId = UUID.randomUUID();

        FlashcardReview existing = new FlashcardReview();
        existing.setUserId(userId);
        existing.setQuestionId(questionId);
        existing.setRepetitions(0);
        existing.setIntervalDays(0);
        existing.setEaseFactor(2.5);

        when(repository.findByUserIdAndQuestionId(userId, questionId)).thenReturn(Optional.of(existing));
        when(repository.save(any(FlashcardReview.class))).thenAnswer(inv -> inv.getArgument(0));

        FlashcardService service = new FlashcardService(repository, new Sm2Calculator(), redisTemplate);
        service.reviewCard(userId, questionId, ReviewRating.GOOD);

        assertThat(existing.getRepetitions()).isEqualTo(1);
        assertThat(existing.getIntervalDays()).isEqualTo(1);
        verify(zSetOperations).add(eq("srs:due:" + userId), eq(questionId.toString()), anyDouble());
    }

    @Test
    void reviewCard_createsNewFlashcardReviewWhenNoneExists() {
        when(redisTemplate.opsForZSet()).thenReturn(zSetOperations);
        UUID userId = UUID.randomUUID();
        UUID questionId = UUID.randomUUID();

        when(repository.findByUserIdAndQuestionId(userId, questionId)).thenReturn(Optional.empty());
        when(repository.save(any(FlashcardReview.class))).thenAnswer(inv -> inv.getArgument(0));

        FlashcardService service = new FlashcardService(repository, new Sm2Calculator(), redisTemplate);
        service.reviewCard(userId, questionId, ReviewRating.EASY);

        verify(repository).save(argThat(review ->
            review.getUserId().equals(userId) && review.getQuestionId().equals(questionId)));
    }
}
```

(add `import static org.mockito.ArgumentMatchers.eq;` and
`import static org.mockito.ArgumentMatchers.argThat;`)

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=FlashcardServiceTest`
Expected: FAIL (classes don't exist).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/flashcard/dto/ReviewCardRequest.java
package com.interviewarena.flashcard.dto;

import com.interviewarena.flashcard.ReviewRating;
import jakarta.validation.constraints.NotNull;

public record ReviewCardRequest(@NotNull ReviewRating rating) {}
```

```java
// backend/src/main/java/com/interviewarena/flashcard/dto/DueCardResponse.java
package com.interviewarena.flashcard.dto;

import java.util.UUID;

public record DueCardResponse(UUID questionId, String slug) {}
```

```java
// backend/src/main/java/com/interviewarena/flashcard/FlashcardService.java
package com.interviewarena.flashcard;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class FlashcardService {

    private final FlashcardReviewRepository repository;
    private final Sm2Calculator sm2Calculator;
    private final StringRedisTemplate redisTemplate;

    public FlashcardService(FlashcardReviewRepository repository, Sm2Calculator sm2Calculator, StringRedisTemplate redisTemplate) {
        this.repository = repository;
        this.sm2Calculator = sm2Calculator;
        this.redisTemplate = redisTemplate;
    }

    public void reviewCard(UUID userId, UUID questionId, ReviewRating rating) {
        FlashcardReview review = repository.findByUserIdAndQuestionId(userId, questionId)
            .orElseGet(() -> {
                FlashcardReview created = new FlashcardReview();
                created.setUserId(userId);
                created.setQuestionId(questionId);
                return created;
            });

        Sm2Calculator.Sm2Result result = sm2Calculator.apply(review, rating);
        review.setIntervalDays(result.intervalDays());
        review.setEaseFactor(result.easeFactor());
        review.setRepetitions(result.repetitions());
        review.setDueAt(result.dueAt());
        review.setLastReviewedAt(Instant.now());
        repository.save(review);

        redisTemplate.opsForZSet().add(
            "srs:due:" + userId, questionId.toString(), (double) result.dueAt().getEpochSecond());
    }
}
```

```java
// backend/src/main/java/com/interviewarena/flashcard/FlashcardController.java
package com.interviewarena.flashcard;

import com.interviewarena.flashcard.dto.ReviewCardRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    private final FlashcardService flashcardService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @PostMapping("/{questionId}/review")
    public void review(@PathVariable UUID questionId, @Valid @RequestBody ReviewCardRequest request) {
        UUID userId = currentUserId();
        flashcardService.reviewCard(userId, questionId, request.rating());
    }

    private UUID currentUserId() {
        return UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=FlashcardServiceTest`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/java/com/interviewarena/config/RedisConfig.java backend/src/main/java/com/interviewarena/flashcard backend/src/test/java/com/interviewarena/flashcard/FlashcardServiceTest.java
git commit -m "feat: add flashcard review service with SM-2 and Redis due-set"
```

---

### Task 4: Frontend — Flashcard review page

**Files:**
- Create: `web/src/api/flashcards.ts`
- Create: `web/src/pages/FlashcardsPage.tsx`
- Modify: `web/src/App.tsx` (add `/flashcards` route)
- Test: `web/src/pages/FlashcardsPage.test.tsx`

**Interfaces:**
- Consumes: `apiClient`, `GET /api/flashcards/due`,
  `POST /api/flashcards/{id}/review`.

- [ ] **Step 1: Write API module**

```typescript
// web/src/api/flashcards.ts
import { apiClient } from './client'

export interface DueCard {
  questionId: string
  slug: string
}

export type ReviewRating = 'AGAIN' | 'HARD' | 'GOOD' | 'EASY'

export const flashcardsApi = {
  due: () => apiClient.get<DueCard[]>('/api/flashcards/due'),
  review: (questionId: string, rating: ReviewRating) =>
    apiClient.post<void>(`/api/flashcards/${questionId}/review`, { rating }),
}
```

Note: `GET /api/flashcards/due` is not yet implemented in Task 3's backend
scope — add it now as part of this step for symmetry:

Add to `FlashcardController`:
```java
    @GetMapping("/due")
    public java.util.List<com.interviewarena.flashcard.dto.DueCardResponse> due() {
        return flashcardService.dueCards(currentUserId());
    }
```

Add to `FlashcardService` (reads straight from Postgres for correctness;
Redis due-set exists for future high-throughput read paths but the MVP
endpoint stays simple and correct):
```java
    public java.util.List<com.interviewarena.flashcard.dto.DueCardResponse> dueCards(UUID userId) {
        return repository.findByUserIdAndDueAtLessThanEqual(userId, java.time.Instant.now())
            .stream()
            .map(r -> new com.interviewarena.flashcard.dto.DueCardResponse(r.getQuestionId(), r.getQuestionId().toString()))
            .toList();
    }
```

- [ ] **Step 2: Write failing test for `FlashcardsPage`**

```tsx
// web/src/pages/FlashcardsPage.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { FlashcardsPage } from './FlashcardsPage'
import { flashcardsApi } from '../api/flashcards'

vi.mock('../api/flashcards', () => ({
  flashcardsApi: { due: vi.fn(), review: vi.fn() },
}))

describe('FlashcardsPage', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows the first due card and advances after rating', async () => {
    ;(flashcardsApi.due as any).mockResolvedValueOnce([
      { questionId: 'q1', slug: 'react-q1' },
      { questionId: 'q2', slug: 'react-q2' },
    ])
    ;(flashcardsApi.review as any).mockResolvedValueOnce(undefined)

    render(<FlashcardsPage />)

    await waitFor(() => expect(screen.getByText('react-q1')).toBeInTheDocument())

    fireEvent.click(screen.getByText('Good'))

    await waitFor(() => expect(screen.getByText('react-q2')).toBeInTheDocument())
    expect(flashcardsApi.review).toHaveBeenCalledWith('q1', 'GOOD')
  })

  it('shows a completion message when there are no due cards', async () => {
    ;(flashcardsApi.due as any).mockResolvedValueOnce([])

    render(<FlashcardsPage />)

    await waitFor(() => expect(screen.getByText(/Không còn thẻ/)).toBeInTheDocument())
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd web && npx vitest run src/pages/FlashcardsPage.test.tsx`
Expected: FAIL (`./FlashcardsPage` doesn't exist).

- [ ] **Step 4: Write minimal implementation**

```tsx
// web/src/pages/FlashcardsPage.tsx
import { useEffect, useState } from 'react'
import { flashcardsApi, DueCard, ReviewRating } from '../api/flashcards'

export function FlashcardsPage() {
  const [cards, setCards] = useState<DueCard[] | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    flashcardsApi.due().then(setCards)
  }, [])

  async function rate(rating: ReviewRating) {
    if (!cards) return
    await flashcardsApi.review(cards[index].questionId, rating)
    setIndex(i => i + 1)
  }

  if (cards === null) return <p>Đang tải...</p>
  if (index >= cards.length) return <p>Không còn thẻ nào cần ôn hôm nay 🎉</p>

  const card = cards[index]
  return (
    <div>
      <h1>{card.slug}</h1>
      <button onClick={() => rate('AGAIN')}>Again</button>
      <button onClick={() => rate('HARD')}>Hard</button>
      <button onClick={() => rate('GOOD')}>Good</button>
      <button onClick={() => rate('EASY')}>Easy</button>
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npx vitest run src/pages/FlashcardsPage.test.tsx`
Expected: PASS.

- [ ] **Step 6: Wire route into `App.tsx` and commit**

Add `<Route path="/flashcards" element={<FlashcardsPage />} />` and its
import.

```bash
git add backend/src/main/java/com/interviewarena/flashcard web/src
git commit -m "feat: add flashcard review page and due-cards endpoint"
```

---

## Definition of done for this phase

- `cd backend && ./mvnw test` passes.
- `cd web && npx vitest run` passes.
- Manual: reviewing a card with "Good" twice pushes its due date out to 6
  days (verify via a direct DB query on `flashcard_reviews.due_at`).
