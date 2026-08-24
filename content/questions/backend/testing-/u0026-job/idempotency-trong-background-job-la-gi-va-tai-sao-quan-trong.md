---
id: idempotency-trong-background-job-la-gi-va-tai-sao-quan-trong
position: backend
technology: testing-\u0026-job
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Idempotency trong background job là gì và tại sao quan trọng?

## Question (EN)
What is idempotency in background jobs and why does it matter?

## Đáp án chi tiết (VI)
Một job **idempotent** là job có thể chạy nhiều lần với cùng arguments mà không gây ra kết quả sai — quan trọng vì Sidekiq/Active Job **đảm bảo \\"at least once\\" delivery**, không phải \\"exactly once\\".\
\
**Không idempotent (nguy hiểm):**\
```ruby\
def perform(user_id)\
  user = User.find(user_id)\
  user.increment!(:login_count)  # chạy 2 lần → đếm sai\
  ChargeService.charge(user)     # charge 2 lần!\
end\
```\
\
**Idempotent (an toàn):**\
```ruby\
def perform(order_id)\
  order = Order.find(order_id)\
  return if order.paid?   # guard: đã xử lý rồi thì bỏ qua\
\
  ActiveRecord::Base.transaction do\
    order.mark_paid!\
    PaymentGateway.charge(order.payment_token)\
  end\
end\
```\
\
Kỹ thuật phổ biến: dùng DB unique constraint / Redis lock / `upsert` để ngăn side effect trùng.

## Detailed Answer (EN)
An **idempotent** job can run multiple times with the same arguments without producing incorrect results — critical because Sidekiq/Active Job guarantees **\\"at least once\\" delivery**, not \\"exactly once\\".\
\
**Not idempotent (dangerous):**\
```ruby\
def perform(user_id)\
  user = User.find(user_id)\
  user.increment!(:login_count)  # runs twice → wrong count\
  ChargeService.charge(user)     # charges twice!\
end\
```\
\
**Idempotent (safe):**\
```ruby\
def perform(order_id)\
  order = Order.find(order_id)\
  return if order.paid?   # guard: already processed, skip\
\
  ActiveRecord::Base.transaction do\
    order.mark_paid!\
    PaymentGateway.charge(order.payment_token)\
  end\
end\
```\
\
Common techniques: DB unique constraints, Redis locks, or `upsert` to prevent duplicate side-effects.
