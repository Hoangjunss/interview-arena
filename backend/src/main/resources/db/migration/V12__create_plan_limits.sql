-- V12__create_plan_limits.sql
CREATE TABLE plan_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan VARCHAR(10) NOT NULL,
    feature_key VARCHAR(50) NOT NULL,
    daily_limit INT,
    UNIQUE (plan, feature_key)
);

INSERT INTO plan_limits (plan, feature_key, daily_limit) VALUES
    ('FREE', 'ai_interview', 3),
    ('PRO', 'ai_interview', NULL),
    ('FREE', 'dsa_submission', 20),
    ('PRO', 'dsa_submission', NULL);
