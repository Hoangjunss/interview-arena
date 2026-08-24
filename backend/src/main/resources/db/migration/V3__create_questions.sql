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
