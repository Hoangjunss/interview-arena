---
id: sidekiq-la-gi-va-khac-active-job-nhu-the-nao
position: backend
technology: testing-\u0026-job
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sidekiq là gì và khác Active Job như thế nào?

## Question (EN)
What is Sidekiq and how does it differ from Active Job?

## Đáp án chi tiết (VI)
**Active Job** là abstraction layer — định nghĩa interface chung, Rails tích hợp sẵn.\
**Sidekiq** là backend cụ thể dùng Redis để store và process job — nổi tiếng nhất cho Rails.\
\
```ruby\
# config/application.rb\
config.active_job.queue_adapter = :sidekiq\
```\
\
Sidekiq dùng multi-threading (concurrency ~25 mặc định) → xử lý nhiều job song song. Resque dùng multi-process (chậm hơn, tốn RAM hơn). Sidekiq tự retry khi job fail với exponential backoff, và có Web UI tích hợp (`mount Sidekiq::Web`) để xem queue, failed jobs, workers.

## Detailed Answer (EN)
**Active Job** is an abstraction layer — it defines a common interface that Rails ships with.\
**Sidekiq** is a concrete backend using Redis to store and process jobs — the most popular choice for Rails.\
\
```ruby\
# config/application.rb\
config.active_job.queue_adapter = :sidekiq\
```\
\
Sidekiq uses multi-threading (concurrency ~25 by default) → processes many jobs concurrently. Resque uses multi-process (slower, higher RAM usage). Sidekiq auto-retries on failure with exponential backoff and ships a built-in Web UI (`mount Sidekiq::Web`) to inspect queues, failed jobs, and workers.
