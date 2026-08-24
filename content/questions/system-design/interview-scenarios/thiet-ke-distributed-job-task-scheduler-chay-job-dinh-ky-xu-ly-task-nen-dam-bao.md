---
id: thiet-ke-distributed-job-task-scheduler-chay-job-dinh-ky-xu-ly-task-nen-dam-bao
position: system-design
technology: interview-scenarios
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế distributed job/task scheduler (chạy job định kỳ, xử lý task nền). Đảm bảo mỗi job chạy đúng và không trùng thế nào?

## Question (EN)
Design a distributed job/task scheduler (periodic jobs, background tasks). How do you guarantee each job runs correctly and only once?

## Đáp án chi tiết (VI)
**Yêu cầu**: lên lịch job (cron / one-off), thực thi phân tán, không mất job, không chạy trùng, tự thử lại khi lỗi.\
\
**Thành phần chính**:\
- **Scheduler**: quét lịch, đẩy task đến hạn vào **queue** (Kafka / RabbitMQ / SQS).\
- **Worker pool**: nhiều worker cùng consume, scale ngang; ack sau khi hoàn tất.\
- **Delivery semantics**: at-least-once (mặc định của queue) → task phải **idempotent** để chạy lại an toàn; visibility timeout + retry có backoff, dead-letter queue cho job hỏng.\
- **Chống trùng scheduler**: chỉ một scheduler *active* tại một thời điểm qua **leader election** (Raft / ZooKeeper / lock có TTL); các node khác standby.\
- **State store**: DB lưu định nghĩa job, lịch, lịch sử chạy; DAG cho task phụ thuộc nhau (kiểu Airflow).\
\
**Đánh đổi / bottleneck**: exactly-once rất khó → chọn at-least-once + idempotency thay vì cố ép exactly-once; single leader dễ thành nghẽn khi số job cực lớn → shard không gian job theo key.

## Detailed Answer (EN)
**Requirements**: schedule jobs (cron / one-off), execute across workers, lose no jobs, avoid duplicate runs, retry on failure.\
\
**Core components**:\
- **Scheduler**: scans the schedule and pushes due tasks onto a **queue** (Kafka / RabbitMQ / SQS).\
- **Worker pool**: many workers consume in parallel, scaling horizontally; ack after completion.\
- **Delivery semantics**: at-least-once (the queue default) → tasks must be **idempotent** to be safely re-run; visibility timeout + retry with backoff, and a dead-letter queue for poison jobs.\
- **Scheduler dedup**: only one *active* scheduler at a time via **leader election** (Raft / ZooKeeper / TTL lock); others stay on standby.\
- **State store**: a DB holds job definitions, schedules, and run history; a DAG expresses dependent tasks (Airflow-style).\
\
**Trade-offs / bottlenecks**: exactly-once is very hard → prefer at-least-once + idempotency over forcing exactly-once; a single leader can bottleneck at huge job counts → shard the job space by key.
