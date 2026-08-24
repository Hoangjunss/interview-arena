-- V7__create_subscriptions.sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id),
    plan VARCHAR(10) NOT NULL DEFAULT 'FREE',
    expires_at TIMESTAMPTZ
);
