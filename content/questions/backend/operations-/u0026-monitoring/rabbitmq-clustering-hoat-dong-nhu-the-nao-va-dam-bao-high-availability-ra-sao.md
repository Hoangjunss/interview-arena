---
id: rabbitmq-clustering-hoat-dong-nhu-the-nao-va-dam-bao-high-availability-ra-sao
position: backend
technology: operations-\u0026-monitoring
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RabbitMQ clustering hoạt động như thế nào và đảm bảo high availability ra sao?

## Question (EN)
Explain RabbitMQ clustering and how it provides high availability.

## Đáp án chi tiết (VI)
RabbitMQ clustering kết nối nhiều broker node thành một logical cluster: mỗi node handle connection và queue operation, cluster replicate metadata (exchanges, bindings, user permissions) qua tất cả node. Để high availability, dùng **quorum queues** — một leader node giữ queue, các follower replicate mỗi message bằng thuật toán Raft, follower tự bầu leader mới khi leader fail. **Mirrored classic queues đã bị xóa hoàn toàn trong RabbitMQ 4.x** (deprecated từ 3.13); quorum queues là lựa chọn HA duy nhất trong 4.x. Setup cần connectivity giữa các node và cấu hình quorum size cẩn thận.

## Detailed Answer (EN)
RabbitMQ clustering connects multiple nodes into a logical cluster sharing metadata (exchanges, bindings, permissions). For high availability, use quorum queues — a leader holds the queue, followers replicate each message, and followers elect a new leader on failure. \
\
**Benefits:** no single point of failure, load distribution, zero-downtime upgrades. Use odd numbers of nodes (3, 5, 7) for clean quorum math.
