---
id: rabbitmq-lien-quan-den-event-sourcing-nhu-the-nao
position: backend
technology: patterns-\u0026-architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RabbitMQ liên quan đến event sourcing như thế nào?

## Question (EN)
What is the relationship between RabbitMQ and event sourcing?

## Đáp án chi tiết (VI)
Event sourcing lưu mọi thay đổi state dưới dạng immutable event thay vì lưu state hiện tại. RabbitMQ phù hợp tự nhiên: (1) event publish lên RabbitMQ streams khi xảy ra, (2) consumer subscribe để cập nhật read model/cache, (3) replay event để rebuild state sau failure hoặc audit. RabbitMQ Streams cung cấp durable, replayable event log tương tự event store. RabbitMQ không thay thế dedicated event store (EventStoreDB, PostgreSQL) nhưng bổ sung tốt vai trò event bus trong toàn hệ thống.

## Detailed Answer (EN)
Event sourcing persists state changes as immutable events. RabbitMQ fits naturally: events are published to streams as they occur, consumers subscribe to update read models, and streams support replay to rebuild state for audit or failure recovery. RabbitMQ Streams provide durable, replayable event logs similar to event stores. RabbitMQ complements but doesn't replace dedicated event stores like EventStoreDB.
