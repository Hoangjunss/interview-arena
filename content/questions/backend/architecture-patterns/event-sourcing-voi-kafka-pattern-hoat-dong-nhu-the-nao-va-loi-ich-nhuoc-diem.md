---
id: event-sourcing-voi-kafka-pattern-hoat-dong-nhu-the-nao-va-loi-ich-nhuoc-diem
position: backend
technology: architecture-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event sourcing với Kafka: pattern hoạt động như thế nào và lợi ích/nhược điểm?

## Question (EN)
Event sourcing with Kafka: how does the pattern work and what are the benefits and drawbacks?

## Đáp án chi tiết (VI)
Event sourcing lưu trữ mọi thay đổi state của domain object dưới dạng immutable event (append-only log) thay vì chỉ lưu state hiện tại. Kafka là storage backend lý tưởng: durable, ordered, replayable. Pattern hoạt động: (1) Mọi action (OrderPlaced, PaymentProcessed, OrderShipped) được publish như event vào Kafka topic; (2) Current state được derive bằng cách replay tất cả event từ đầu hoặc từ snapshot gần nhất; (3) CQRS thường đi kèm: Command side (write) publish event → Kafka → Event handler rebuild read model cho Query side. **Lợi ích:** audit trail đầy đủ, time-travel debugging, eventual consistency tự nhiên, dễ scale read side. **Nhược điểm:** eventual consistency phức tạp hơn strong consistency; query current state cần rebuild từ events (giải quyết bằng snapshot và read model); schema evolution khó (events immutable nên không thể sửa); storage lớn theo thời gian. Dùng log compaction để snapshot state, giảm replay time.

## Detailed Answer (EN)
$89
