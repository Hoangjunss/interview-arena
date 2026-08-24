---
id: retry-va-dead-queue-trong-sidekiq-hoat-dong-nhu-the-nao
position: backend
technology: testing-\u0026-job
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Retry và dead queue trong Sidekiq hoạt động như thế nào?

## Question (EN)
How do retry and the dead queue work in Sidekiq?

## Đáp án chi tiết (VI)
Khi Sidekiq job raise exception, nó tự động **retry** với exponential backoff:\
\
| Lần thử | Chờ (xấp xỉ) |\
|---|---|\
| 1st retry | 15 giây |\
| 2nd retry | 5 phút |\
| 3rd retry | 30 phút |\
| ... | ... |\
| 25th retry | ~21 ngày |\
\
Sau 25 lần retry không thành, job vào **Dead Set** (dead queue) — lưu 6 tháng, có thể retry thủ công qua Web UI.\
\
```ruby\
class PaymentJob \u003c ApplicationJob\
  sidekiq_options retry: 5, dead: false  # tối đa 5 lần; không vào dead queue\
\
  retry_on Stripe::RateLimitError, wait: :exponentially_longer, attempts: 10\
  discard_on Stripe::InvalidRequestError  # lỗi không thể retry → bỏ luôn\
\
  def perform(charge_id)\
    # ...\
  end\
end\
```\
\
Dùng `discard_on` cho lỗi không thể recover (invalid data). Dùng `retry_on` cho lỗi transient (rate limit, timeout).

## Detailed Answer (EN)
When a Sidekiq job raises an exception, it is automatically **retried** with exponential backoff:\
\
| Attempt | Wait (approx.) |\
|---|---|\
| 1st retry | 15 seconds |\
| 2nd retry | 5 minutes |\
| 3rd retry | 30 minutes |\
| ... | ... |\
| 25th retry | ~21 days |\
\
After 25 retries, the job is moved to the **Dead Set** (dead queue) — retained for 6 months, manually retryable via the Web UI.\
\
```ruby\
class PaymentJob \u003c ApplicationJob\
  sidekiq_options retry: 5, dead: false  # max 5 retries; skip dead queue\
\
  retry_on Stripe::RateLimitError, wait: :exponentially_longer, attempts: 10\
  discard_on Stripe::InvalidRequestError  # unrecoverable error → discard\
\
  def perform(charge_id)\
    # ...\
  end\
end\
```\
\
Use `discard_on` for unrecoverable errors (invalid data). Use `retry_on` for transient errors (rate limits, timeouts).
