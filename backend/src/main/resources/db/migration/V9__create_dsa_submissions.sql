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
