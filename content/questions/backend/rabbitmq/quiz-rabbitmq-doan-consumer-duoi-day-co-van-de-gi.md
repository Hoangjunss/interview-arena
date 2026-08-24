---
id: quiz-rabbitmq-doan-consumer-duoi-day-co-van-de-gi
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn consumer dưới đây có vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Thiếu waitForConfirms nên broker có thể chưa nhận được ack
- [ ] Phải ack trước khi xử lý để broker không giao trùng
- [ ] Nên bật auto-ack để không phải gọi ack thủ công
- [x] Message hỏng bị requeue và fail lặp vô hạn

## Giải thích (VI)
Mọi lỗi đều bị nack(msg, false, true) — tức requeue vô điều kiện . Message hỏng dữ liệu (JSON sai) sẽ lỗi lại y hệt, tạo vòng lặp poison message chiếm CPU và chặn queue. Cần tách lỗi vĩnh viễn (requeue=false, đi DLX) khỏi lỗi tạm thời.

### Giải thích các phương án:
- **Thiếu waitForConfirms nên broker có thể chưa nhận được ack** (Sai): waitForConfirms thuộc phía producer (publisher confirm), không liên quan tới consumer ack.
- **Phải ack trước khi xử lý để broker không giao trùng** (Sai): Ack trước xử lý đổi at-least-once thành at-most-once: consumer chết là mất message.
- **Nên bật auto-ack để không phải gọi ack thủ công** (Sai): Auto-ack làm mất message khi consumer chết giữa chừng — tệ hơn hiện trạng.
- **Message hỏng bị requeue và fail lặp vô hạn** (Đúng): nack với requeue=true đưa message lỗi parse quay lại queue, và nó sẽ lỗi y hệt lần sau.
