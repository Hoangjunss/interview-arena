---
id: dead-letter-queue-dlq-trong-kafka-la-gi-cach-implement-xu-ly-message-loi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dead Letter Queue (DLQ) trong Kafka là gì? Cách implement xử lý message lỗi?

## Question (EN)
What is a Dead Letter Queue (DLQ) in Kafka? How do you implement error message handling?

## Đáp án chi tiết (VI)
Kafka không có DLQ built-in như RabbitMQ, nhưng pattern DLQ được implement bằng cách: khi consumer fail xử lý một message sau N lần retry, thay vì block toàn bộ partition, message được forward sang một topic DLQ riêng (ví dụ: `orders.DLT`) kèm theo metadata (exception, timestamp, original topic, partition, offset). Kafka có Spring Kafka `@RetryableTopic` và `@DltHandler` để implement pattern này tự động với exponential backoff. Cần cân nhắc: nếu dừng xử lý để retry, các message sau sẽ bị delay (ordering preserved nhưng throughput giảm); nếu skip và gửi DLQ, ordering bị phá vỡ nhưng throughput không bị ảnh hưởng. Monitoring DLQ là critical — nên alert khi DLQ có message, có team xử lý manual hoặc replay sau khi fix bug. Một best practice khác là dùng retry topic với tên `topic.RETRY-1`, `topic.RETRY-2` với delay tăng dần.

## Detailed Answer (EN)
Kafka does not have a built-in DLQ like RabbitMQ, but the pattern is implemented as follows: when a consumer fails to process a message after N retries, instead of blocking the entire partition, the message is forwarded to a dedicated DLQ topic (e.g., `orders.DLT`) along with metadata (exception, timestamp, original topic, partition, offset). Spring Kafka provides `@RetryableTopic` and `@DltHandler` to implement this pattern automatically with exponential backoff. Trade-offs to consider: pausing consumption for retries preserves ordering but reduces throughput; skipping to a DLQ preserves throughput but breaks ordering. Monitoring the DLQ is critical — alert when messages arrive, and have a process for manual review or replay after fixing bugs. Another best practice is using named retry topics like `topic.RETRY-1`, `topic.RETRY-2` with increasing delays.
