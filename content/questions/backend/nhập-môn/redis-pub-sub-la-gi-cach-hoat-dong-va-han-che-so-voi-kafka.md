---
id: redis-pub-sub-la-gi-cach-hoat-dong-va-han-che-so-voi-kafka
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis Pub/Sub là gì? Cách hoạt động và hạn chế so với Kafka?

## Question (EN)
What is Redis Pub/Sub? How does it work and what are its limitations compared to Kafka?

## Đáp án chi tiết (VI)
Redis Pub/Sub cho phép publisher gửi message đến một channel và tất cả subscriber đang lắng nghe channel đó nhận được message ngay lập tức. Lệnh: `SUBSCRIBE news`, `PUBLISH news 'Hello World'`. Pub/Sub của Redis là fire-and-forget — message không được lưu trữ, nếu không có subscriber nào online khi publish thì message bị mất; subscriber mới không nhận được message cũ. Hạn chế so với Kafka: không có message persistence, không replay, không consumer group với offset management, không đảm bảo delivery. Pub/Sub phù hợp cho: real-time notification, chat message, live dashboard update, cache invalidation signal. Nếu cần reliable messaging với durability và replay, dùng Redis Streams (thêm vào Redis 5.0) hoặc Kafka. Redis Keyspace Notifications là biến thể của Pub/Sub để lắng nghe events từ Redis chính nó (key expired, key set, etc.).

## Detailed Answer (EN)
Redis Pub/Sub allows a publisher to send a message to a channel, and all subscribers currently listening on that channel receive it instantly. Commands: `SUBSCRIBE news`, `PUBLISH news 'Hello World'`. Redis Pub/Sub is fire-and-forget — messages are not stored; if no subscribers are online when a message is published, it is lost, and new subscribers cannot receive past messages. Limitations compared to Kafka: no message persistence, no replay, no consumer groups with offset management, no delivery guarantees. Pub/Sub suits real-time notifications, chat messages, live dashboard updates, and cache invalidation signals. For reliable messaging with durability and replay, use Redis Streams (added in Redis 5.0) or Kafka. Redis Keyspace Notifications are a variant of Pub/Sub that lets you listen to Redis-internal events (key expired, key set, etc.).
