---
id: quiz-rabbitmq-consumer-chay-code-sau-va-crash-gia-luc-dang-xu-ly-mot-message-message-do-ra-sao
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consumer chạy code sau và crash giữa lúc đang xử lý một message. Message đó ra sao?

## Đáp án trắc nghiệm
- [x] Message mất
- [ ] Broker giữ message tới khi consumer khởi động lại
- [ ] Broker giao lại message cho consumer khác trong queue
- [ ] Message được chuyển vào dead-letter queue mặc định

## Giải thích (VI)
Message mất. noAck: true (autoAck) nghĩa là broker coi message đã giao xong ngay khi đẩy ra socket — không chờ consumer xử lý. Consumer crash sau đó thì không còn gì để giao lại. Với việc quan trọng, dùng manual ack: chỉ ch.ack(msg) sau khi xử lý xong.

### Giải thích các phương án:
- **Message mất** (Đúng): Với noAck (autoAck), broker xoá message ngay khi đẩy đi, không chờ xử lý xong.
- **Broker giữ message tới khi consumer khởi động lại** (Sai): Broker không biết consumer crash giữa chừng vì message đã bị đánh dấu giao xong.
- **Broker giao lại message cho consumer khác trong queue** (Sai): Chỉ giao lại khi message chưa được ack; ở đây broker đã coi là giao xong.
- **Message được chuyển vào dead-letter queue mặc định** (Sai): Dead-letter phải cấu hình riêng, và cũng chỉ áp dụng cho message bị reject/hết hạn.
