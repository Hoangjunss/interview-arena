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
