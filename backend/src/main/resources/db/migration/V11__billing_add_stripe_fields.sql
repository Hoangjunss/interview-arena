-- V11__billing_add_stripe_fields.sql
ALTER TABLE subscriptions
    ADD COLUMN stripe_customer_id VARCHAR(255),
    ADD COLUMN stripe_subscription_id VARCHAR(255),
    ADD COLUMN cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN current_period_end TIMESTAMPTZ;
