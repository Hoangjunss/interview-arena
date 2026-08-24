# Pro Plan Billing (Stripe) — Design Spec

Date: 2026-08-24
Status: Approved for planning

## Problem

`SubscriptionService.isPro(userId)` already exists and already gates
the free daily AI-interview quota in `InterviewQuotaService`, but
there is no way for a user to actually become Pro — no checkout, no
payment gateway integration, no self-serve upgrade path, and no way to
cancel. Today `Plan.PRO` can only be set by hand in the database. This
spec adds real payment (Stripe), a webhook-driven subscription
lifecycle, and an in-app page to manage it.

It also generalizes what "Pro" gates: currently only the AI-interview
quota checks `isPro()`. The freshly-planned DSA submission quota
(`DsaSubmissionQuotaService`, from
`docs/superpowers/plans/2026-08-24-dsa-practice.md`, not yet built)
should be gated the same way, and future per-feature free-tier limits
should not require new hardcoded config each time — this spec
introduces a `plan_limits` table so a limit is a data row, not a code
change.

## Non-goals

- No VND pricing/display — price is $5/month, USD, charged via Stripe.
- No Stripe Customer Portal — subscription management (cancel/resume)
  is a custom in-app page, not a Stripe-hosted redirect (explicitly
  chosen over the portal).
- No new Question Bank view-limit feature — the "Free users see only
  5 questions" example that motivated the `plan_limits` table is
  illustrative of the mechanism, not a feature being built now. The
  table ships with exactly two seeded features: `ai_interview` and
  `dsa_submission`.
- No annual billing tier, no free trial period, no proration logic
  beyond what Stripe handles automatically for a single fixed price.
- No multi-currency, no invoicing/tax handling beyond what Stripe
  Checkout provides by default.

## Data model

### Extend `subscriptions`

```sql
ALTER TABLE subscriptions
    ADD COLUMN stripe_customer_id VARCHAR(255),
    ADD COLUMN stripe_subscription_id VARCHAR(255),
    ADD COLUMN cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN current_period_end TIMESTAMPTZ;
```

`plan` (`FREE`/`PRO`) and `expires_at` (existing column) stay as the
source of truth `isPro()` reads; `current_period_end` is the
Stripe-reported renewal/expiry date shown to the user and is kept in
sync with `expires_at` by the webhook handler (both represent the same
instant — `expires_at` is reused rather than duplicated in meaning,
`current_period_end` exists as the field name the frontend DTO uses
for clarity in a billing context).

### New `plan_limits` table

```sql
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
```

`daily_limit IS NULL` means unlimited. A new `PlanLimitService` reads
this table:

```java
public Optional<Integer> getDailyLimit(Plan plan, String featureKey);
```

`InterviewQuotaService` is refactored to call
`subscriptionService.getPlan(userId)` (a new method returning `Plan`,
alongside the existing `isPro`) then
`planLimitService.getDailyLimit(plan, "ai_interview")`, replacing its
current hardcoded `@Value("${app.interview.free-daily-quota:3}")`.
Redis is still where the per-user-per-day counter lives (unchanged);
only where the *ceiling* comes from changes — a database row instead
of a config constant.

**Integration note for the DSA plan:** `DsaSubmissionQuotaService`
(task 8 of `2026-08-24-dsa-practice.md`, not yet implemented) should
be built or adjusted to call `PlanLimitService.getDailyLimit(plan,
"dsa_submission")` the same way, rather than its originally-specified
flat `app.dsa.free-daily-quota` value — this spec supersedes that one
detail of the DSA design (the daily-quota *ceiling* becomes
plan-aware; the Redis counter mechanism and the 429
`QuotaExceededException` behavior are unchanged).

## Stripe integration

Uses the official `com.stripe:stripe-java` SDK (a deliberate exception
to this codebase's usual plain-`RestClient` pattern for external APIs
— see `OpenAiLlmClient`/`DsaJudgeClient` — because webhook signature
verification is a real security boundary and Stripe's SDK
(`Webhook.constructEvent`) is the correct, audited way to do it;
hand-rolling HMAC verification here would be a needless risk for a
payment flow).

Config (`application.yml`, following the existing `app.*` convention):

```yaml
app:
  stripe:
    secret-key: ${STRIPE_SECRET_KEY:}
    webhook-secret: ${STRIPE_WEBHOOK_SECRET:}
    price-id: ${STRIPE_PRICE_ID:}
    success-url: ${STRIPE_SUCCESS_URL:http://localhost:5173/billing?checkout=success}
    cancel-url: ${STRIPE_CANCEL_URL:http://localhost:5173/billing?checkout=cancelled}
```

`price-id` references a Stripe Price object ($5.00/month, recurring)
created once in the Stripe Dashboard (or via the Stripe CLI) — not
created by application code, matching how the LLM `model` name is
externally configured rather than programmatically registered.

### Endpoints (new `com.interviewarena.billing` module)

- `POST /api/billing/checkout-session` (authenticated) — creates a
  Stripe Customer for the user if `subscriptions.stripe_customer_id`
  is null (persisting the id), then a Stripe Checkout Session
  (`mode=subscription`, the configured `price-id`, `success_url`/
  `cancel_url`). Returns `{ url: string }` for the frontend to
  redirect the browser to.
- `POST /api/billing/webhook` (unauthenticated — added to
  `SecurityConfig`'s `permitAll()` list; Stripe's signature is the
  actual authentication) — verifies `Stripe-Signature` via
  `Webhook.constructEvent(payload, signatureHeader, webhookSecret)`,
  rejecting with 400 on failure, then handles:
  - `checkout.session.completed` → look up the user by
    `stripe_customer_id` (set during checkout-session creation),
    set `plan=PRO`, store `stripe_subscription_id` and
    `current_period_end` from the session's subscription object.
  - `customer.subscription.updated` → sync `cancel_at_period_end` and
    `current_period_end` from the event payload (covers both a
    pending cancellation and Stripe's automatic renewal).
  - `customer.subscription.deleted` → set `plan=FREE`, clear
    `stripe_subscription_id`, `cancel_at_period_end=false`.
  - `invoice.payment_failed` → no immediate downgrade; Stripe's own
    retry schedule and eventual `customer.subscription.deleted` (if
    all retries fail) drive the actual downgrade, avoiding a
    dual-source-of-truth race between this handler and Stripe's
    dunning logic.
- `GET /api/billing/subscription` (authenticated) → `{ plan,
  currentPeriodEnd, cancelAtPeriodEnd }` for the current user (`FREE`
  users get `currentPeriodEnd: null, cancelAtPeriodEnd: false`).
- `POST /api/billing/cancel` (authenticated) — calls Stripe's
  Subscription Update API to set `cancel_at_period_end=true` on the
  user's `stripe_subscription_id`. The DB row is **not** updated
  optimistically here — the following `customer.subscription.updated`
  webhook is the source of truth, keeping exactly one write path into
  `subscriptions` for anything Stripe-driven.
- `POST /api/billing/resume` (authenticated) — same mechanism in
  reverse (`cancel_at_period_end=false`), for a user who changes their
  mind before the period ends.

## Frontend

- New `BillingPage` (`/billing`), linked from `AppShell`'s user menu
  (next to the existing "Đăng xuất" action) and from the existing "❌
  Nâng cấp Pro để tiếp tục" copy in `InterviewSetupPage`'s 429 handler
  (becomes a `Link` to `/billing` instead of plain text) plus the
  equivalent DSA 429 message once that quota service exists.
- `BillingPage` states:
  - **Free**: shows current plan, a "$5/tháng" price line, and a
    "Nâng cấp Pro" button that calls `POST /api/billing/checkout-session`
    and redirects `window.location.href` to the returned URL.
  - **Pro, active**: shows "Gia hạn vào {currentPeriodEnd}" and a "Hủy
    gói" button (`POST /api/billing/cancel`, confirm dialog first).
  - **Pro, pending cancellation**: shows "Gói sẽ kết thúc vào
    {currentPeriodEnd}" and a "Tiếp tục gói" button
    (`POST /api/billing/resume`).
  - The `?checkout=success` / `?checkout=cancelled` query params
    (from Stripe's redirect) drive a one-time `toast` on page load —
    success/cancelled feedback, since the actual plan flip only lands
    a moment later via webhook, not synchronously on redirect.

## Security

- Webhook signature verification is mandatory and is the sole
  authentication for `/api/billing/webhook` — never trust an
  unsigned or badly-signed payload, and never let the frontend report
  "I paid" directly (there is deliberately no endpoint that lets a
  client set `plan=PRO` other than the webhook handler).
- Stripe secret key and webhook secret are supplied via environment
  variables only (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`),
  never committed, matching how `JWT_SECRET`/`LLM_API_KEY` are already
  handled.
- `POST /api/billing/cancel` and `/resume` operate only on the
  authenticated user's own `stripe_subscription_id` — looked up
  server-side from the JWT-derived `userId`, never accepted as a
  request parameter, so one user can never act on another's
  subscription.

## Testing strategy

- `PlanLimitServiceTest` — unit test over a mocked repository,
  covering "row exists with a limit," "row exists with NULL (
  unlimited)," and "no row for this plan/feature" (should not happen
  given seeded data, but the code must not throw — treat as
  unlimited, fail open rather than locking out a paying user on a
  data gap).
- `InterviewQuotaServiceTest` — updated to mock `PlanLimitService`
  instead of a hardcoded quota value, covering FREE-under-limit,
  FREE-over-limit, and PRO-unlimited.
- `BillingServiceTest` — unit tests over a mocked Stripe SDK call
  surface (the SDK's static `Webhook.constructEvent` and
  `Subscription`/`Checkout.Session` calls are wrapped behind a small
  `StripeClient` interface specifically so `BillingService` itself
  stays testable without hitting Stripe), covering: checkout session
  creation persists a customer id, each of the four webhook event
  types updates `subscriptions` correctly, and an invalid signature
  is rejected before any event is processed.
- No live-Stripe integration test in CI (unlike the DSA plan's
  live-Judge0 test) — Stripe provides a well-documented test-mode and
  CLI-driven webhook simulator (`stripe trigger checkout.session.completed`)
  for manual verification during implementation instead; asserting
  against a real Stripe test account in an automated suite would tie
  CI runs to external account state and secrets in a way the other
  live-service integration test (self-hosted Judge0, fully local)
  does not.

## Rollout

1. `plan_limits` table + `PlanLimitService` + refactor
   `InterviewQuotaService` to consult it (this alone is independently
   shippable and testable, with no Stripe dependency yet).
2. Stripe checkout-session creation + `checkout.session.completed`
   webhook handling — the minimum slice that lets a user actually
   become Pro.
3. Remaining webhook events (`customer.subscription.updated`,
   `customer.subscription.deleted`, `invoice.payment_failed`) +
   `/cancel` and `/resume` endpoints.
4. `BillingPage` frontend + wiring the "Nâng cấp Pro" links from the
   existing 429 error copy.
