---
id: lam-the-nao-de-cau-hinh-resource-limits-trong-rabbitmq
position: backend
technology: operations-\u0026-monitoring
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để cấu hình resource limits trong RabbitMQ?

## Question (EN)
How do you configure resource limits in RabbitMQ?

## Đáp án chi tiết (VI)
RabbitMQ hỗ trợ nhiều loại limit: (1) **Connection limits** — max connection per node; (2) **Channel limits** — max channel per connection hoặc per user; (3) **Memory limits** — % RAM trước khi block publisher; (4) **Queue limits** — max length (số message hoặc bytes) trước khi drop/reject; (5) **Per-user limits** — connection, channel per user. Cấu hình trong rabbitmq.conf (global), qua rabbitmqctl (runtime), hoặc management UI. \
\
**Ví dụ:** memory limit 60%, max queue length 1M message, user \\"app1\\" giới hạn 100 connection. Limit quá thấp gây failure, quá cao rủi ro node outage.

## Detailed Answer (EN)
RabbitMQ supports: connection limits (max per node), channel limits (per connection or per user), memory limits (% of RAM before blocking publishers), queue limits (max messages or bytes), and per-user limits. Configure in rabbitmq.conf (global), via rabbitmqctl (runtime), or the management UI. Start conservative and relax based on monitoring — too low causes failures, too high risks node outages.
