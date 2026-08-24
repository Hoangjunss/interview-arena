---
id: quiz-rabbitmq-vi-sao-consumer-doc-tu-rabbitmq-nen-duoc-viet-idempotent
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao consumer đọc từ RabbitMQ nên được viết idempotent?

## Đáp án trắc nghiệm
- [ ] Vì thứ tự message giữa các queue không được đảm bảo
- [ ] Vì fanout exchange nhân bản message tới mọi consumer của một queue
- [ ] Vì broker tự retry mọi message kể cả message đã ack
- [x] Vì at-least-once nghĩa là một message có thể được giao nhiều lần

## Giải thích (VI)
Vì RabbitMQ giao at-least-once : consumer xử lý xong nhưng ack chưa tới broker (chết, mạng đứt) thì message được giao lại và bị xử lý lần hai. Cách chống chuẩn: gắn message id duy nhất khi publish, consumer lưu id đã xử lý và bỏ qua id trùng.

### Giải thích các phương án:
- **Vì thứ tự message giữa các queue không được đảm bảo** (Sai): Thứ tự là vấn đề khác; idempotency giải quyết chuyện xử lý trùng.
- **Vì fanout exchange nhân bản message tới mọi consumer của một queue** (Sai): Fanout nhân bản sang nhiều queue; trong một queue, mỗi message chỉ giao cho một consumer mỗi lần.
- **Vì broker tự retry mọi message kể cả message đã ack** (Sai): Message đã ack bị xoá khỏi queue và không bao giờ được giao lại.
- **Vì at-least-once nghĩa là một message có thể được giao nhiều lần** (Đúng): Consumer chết trước khi ack, hoặc mạng đứt lúc ack đang bay, đều dẫn tới giao lại.
