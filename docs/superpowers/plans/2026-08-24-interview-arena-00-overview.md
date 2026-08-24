# Interview Arena — Implementation Plan Overview

> This file is an **index + shared architecture reference**, not an executable
> plan itself (no checkboxes here). Each phase file below is its own
> executable plan — follow **superpowers:subagent-driven-development** or
> **superpowers:executing-plans** on each phase file, in order.

**Spec:** `docs/superpowers/specs/2026-08-24-interview-arena-design.md`

## Phase plans (execute in this order)

1. `2026-08-24-interview-arena-01-foundation.md` — monorepo scaffold, infra
   (Postgres/Redis/Kafka via docker-compose), Spring Boot skeleton, JWT auth,
   Flyway baseline schema, React skeleton wired to auth.
   **Run `2026-08-24-interview-arena-01b-ci.md` (GitHub Actions CI) right
   after this plan's Task 1 (repo scaffolding), before Task 2** — this is
   an explicit priority so every commit from Task 2 onward is covered by
   CI from the start, not bolted on later.
2. `2026-08-24-interview-arena-02-question-bank.md` — Markdown content
   pipeline (ingest `.md` → DB index), question browsing API + FE.
3. `2026-08-24-interview-arena-03-flashcard-srs.md` — SM-2 spaced
   repetition, Redis due-cards sorted set, FE flashcard review UI.
4. `2026-08-24-interview-arena-04-quiz.md` — Quiz attempts API + FE.
5. `2026-08-24-interview-arena-05-ai-mock-interview.md` — AI Mock Interview:
   sessions/turns entities, Kafka async scoring pipeline, LLM client, FE
   chat UI. **This is the core differentiator feature.**
6. `2026-08-24-interview-arena-06-progress-subscription.md` — progress
   dashboard, Redis quota rate limiting, subscription/freemium gating.

Dependency notes:
- Phases 2-6 all depend on Phase 1 (auth, DB, infra).
- Phase 3 (flashcard) and Phase 4 (quiz) depend on Phase 2 (`questions`
  table must exist and be populated).
- Phase 5 (AI interview) does **not** depend on Phase 2 — it generates its
  own questions live via LLM — but reuses the `position`/`technology`/
  `level` vocabulary established in Phase 1.
- Phase 6 depends on Phase 5 (quota gating wraps the interview-creation
  endpoint) and Phase 1 (subscriptions belong to a user).

## Repository layout (established in Phase 1, referenced by all phases)

```
interview-arena/
  docker-compose.yml
  backend/
    pom.xml
    src/main/java/com/interviewarena/
      InterviewArenaApplication.java
      config/           (SecurityConfig, KafkaConfig, RedisConfig, WebConfig)
      auth/             (JwtService, JwtAuthFilter, AuthController, AuthService)
      user/             (User entity, UserRepository)
      question/         (Question entity/repo/service/controller, content ingest)
      flashcard/        (FlashcardReview entity/repo/service/controller, SM2Calculator)
      quiz/             (QuizAttempt entity/repo/service/controller)
      interview/        (InterviewSession/InterviewTurn entities, service, controller,
                          kafka producer/consumer, LlmClient)
      subscription/     (Subscription entity/repo/service, quota filter)
      common/           (exception handling, ApiResponse envelope)
    src/main/resources/
      application.yml
      db/migration/     (Flyway V1__..., V2__..., ...)
    src/test/java/com/interviewarena/...  (mirrors main package structure)
  web/
    src/
      api/              (fetch client, per-feature api modules)
      auth/             (AuthContext, useAuth)
      pages/            (Login, Register, QuestionBank, Flashcards, Quiz,
                          InterviewSetup, InterviewSession, Progress)
      components/       (shared UI: Button, Card, Layout, MarkdownRenderer)
      types/            (shared TS types mirroring backend DTOs)
    package.json
    vite.config.ts
  content/
    questions/<position>/<technology>/<slug>.md
  docs/
    superpowers/{specs,plans}/
```

## Diagrams

### System architecture

```mermaid
flowchart LR
    subgraph Client
        WEB["React + Vite SPA"]
    end
    subgraph Backend["Spring Boot Backend"]
        API["REST Controllers"]
        SVC["Services / Facades"]
        WORKER["Kafka Consumer: InterviewScoringWorker"]
    end
    subgraph Data
        PG[("PostgreSQL")]
        REDIS[("Redis")]
        KAFKA[("Kafka")]
    end
    subgraph Content
        MD["content/questions/**/*.md (git)"]
    end
    LLM[["LLM API (OpenAI-compatible)"]]

    WEB -- "HTTPS/JSON + JWT" --> API
    API --> SVC
    SVC --> PG
    SVC -- "rate limit / cache / SRS due-set" --> REDIS
    SVC -- "publish interview_answer_submitted" --> KAFKA
    KAFKA --> WORKER
    WORKER -- "chat completion" --> LLM
    WORKER --> PG
    MD -- "ingest CLI/job" --> SVC
```

### AI Mock Interview flow (Kafka async)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant API as InterviewController
    participant DB as PostgreSQL
    participant K as Kafka
    participant W as InterviewScoringWorker
    participant LLM as LLM API

    U->>API: POST /api/interviews {position, technology, level}
    API->>DB: insert interview_sessions(status=ACTIVE)
    API->>LLM: chat completion (system prompt, no history)
    LLM-->>API: first question
    API->>DB: insert interview_turns(turn_order=1, question_text)
    API-->>U: {sessionId, firstQuestion}

    U->>API: POST /api/interviews/{id}/answers {answerText}
    API->>DB: update interview_turns SET answer_text WHERE turn_order = current
    API->>K: publish interview_answer_submitted{sessionId, turnOrder}
    API-->>U: 202 Accepted {status: PROCESSING}

    K->>W: consume interview_answer_submitted
    W->>DB: load full turn history for session
    alt more questions remain
        W->>LLM: chat completion (history + latest answer)
        LLM-->>W: follow-up question
        W->>DB: insert next interview_turns row, session.status stays ACTIVE
    else last question answered
        W->>LLM: chat completion (scoring mode)
        LLM-->>W: per-turn scores + feedback + final_score
        W->>DB: update interview_turns.follow_up_feedback,<br/>interview_sessions.final_score/status=COMPLETED
    end

    U->>API: GET /api/interviews/{id} (poll every 2s)
    API->>DB: read session + turns
    API-->>U: current state (next question, or final result if COMPLETED)
```

### Data model (ER diagram)

```mermaid
erDiagram
    USERS ||--o{ INTERVIEW_SESSIONS : has
    USERS ||--o{ FLASHCARD_REVIEWS : has
    USERS ||--o{ QUIZ_ATTEMPTS : has
    USERS ||--o| SUBSCRIPTIONS : has
    QUESTIONS ||--o{ FLASHCARD_REVIEWS : reviewed_via
    QUESTIONS ||--o{ QUIZ_ATTEMPTS : answered_via
    INTERVIEW_SESSIONS ||--o{ INTERVIEW_TURNS : contains

    USERS {
        uuid id PK
        string email
        string password_hash
        string display_name
        timestamp created_at
    }
    QUESTIONS {
        uuid id PK
        string slug
        string position
        string technology
        string level
        string source
        string status
        string content_path
        timestamp synced_at
    }
    FLASHCARD_REVIEWS {
        uuid id PK
        uuid user_id FK
        uuid question_id FK
        int interval_days
        float ease_factor
        int repetitions
        timestamp due_at
        timestamp last_reviewed_at
    }
    QUIZ_ATTEMPTS {
        uuid id PK
        uuid user_id FK
        uuid question_id FK
        string selected_answer
        boolean is_correct
        timestamp answered_at
    }
    INTERVIEW_SESSIONS {
        uuid id PK
        uuid user_id FK
        string position
        string technology
        string level
        string status
        int final_score
        timestamp started_at
        timestamp completed_at
    }
    INTERVIEW_TURNS {
        uuid id PK
        uuid session_id FK
        int turn_order
        text question_text
        text answer_text
        text follow_up_feedback
        timestamp asked_at
        timestamp answered_at
    }
    SUBSCRIPTIONS {
        uuid id PK
        uuid user_id FK
        string plan
        timestamp expires_at
    }
```

### Markdown content ingestion pipeline

```mermaid
flowchart TD
    A["content/questions/&lt;position&gt;/&lt;tech&gt;/&lt;slug&gt;.md"] -->|"CLI: ContentIngestCli"| B["ContentIngestService"]
    B --> C{"Parse YAML frontmatter"}
    C -->|valid| D["Upsert questions row by slug"]
    C -->|"invalid: missing field"| E["Log error, skip file,<br/>exit code 1 if any errors"]
    D --> F[("PostgreSQL questions table")]
    G["Admin UI: Question Management"] -->|"PATCH status DRAFT to ACTIVE"| F
    H["AI generation worker<br/>(prompt in spec Appendix A)"] -->|"writes new .md file"| A
```
