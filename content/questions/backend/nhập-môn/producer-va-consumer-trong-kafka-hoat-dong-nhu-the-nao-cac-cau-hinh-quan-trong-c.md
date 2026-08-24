---
id: producer-va-consumer-trong-kafka-hoat-dong-nhu-the-nao-cac-cau-hinh-quan-trong-c
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Producer và Consumer trong Kafka hoạt động như thế nào? Các cấu hình quan trọng cần biết?

## Question (EN)
How do Producers and Consumers work in Kafka? What are the key configurations to know?

## Đáp án chi tiết (VI)
Producer gửi message đến một topic và Kafka tự động phân phối message vào các partition (theo key hash, round-robin, hoặc custom partitioner). Cấu hình quan trọng của producer: `acks` (0=fire-and-forget, 1=leader ack, all=tất cả ISR ack), `retries`, `batch.size` và `linger.ms` để tối ưu throughput. Consumer đọc message từ partition theo offset và có thể commit offset tự động (`enable.auto.commit=true`) hoặc thủ công. Cấu hình quan trọng của consumer: `auto.offset.reset` (earliest/latest), `max.poll.records`, `session.timeout.ms`. Trong thực tế, nên dùng manual commit để tránh mất message khi consumer crash trước khi xử lý xong.

## Detailed Answer (EN)
Producers send messages to a topic and Kafka automatically distributes them across partitions (by key hash, round-robin, or a custom partitioner). Key producer configs: `acks` (0=fire-and-forget, 1=leader ack, all=all ISR ack), `retries`, `batch.size`, and `linger.ms` for throughput tuning. Consumers read messages from partitions by offset and can commit offsets automatically (`enable.auto.commit=true`) or manually. Key consumer configs: `auto.offset.reset` (earliest/latest), `max.poll.records`, `session.timeout.ms`. In practice, manual commit is recommended to avoid message loss if a consumer crashes before finishing processing.
