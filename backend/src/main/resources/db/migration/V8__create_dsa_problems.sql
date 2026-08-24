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
