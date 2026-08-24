---
id: quiz-rabbitmq-consumer-mat-ket-noi-khi-con-message-chua-ack-chuyen-gi-xay-ra-voi-cac-message-d
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consumer mất kết nối khi còn message chưa ack. Chuyện gì xảy ra với các message đó?

## Đáp án trắc nghiệm
- [x] Broker requeue và giao lại cho consumer khác
- [ ] Chúng được chuyển thẳng vào Dead Letter Exchange
- [ ] Chúng bị mất vì đã được giao đi rồi
- [ ] Broker giữ chúng chờ đúng consumer đó kết nối lại

## Giải thích (VI)
Broker requeue toàn bộ message chưa ack và giao lại cho consumer còn sống. Lần giao lại có cờ redelivered=true — dấu hiệu message này có thể đã được xử lý một phần trước đó.

### Giải thích các phương án:
- **Broker requeue và giao lại cho consumer khác** (Đúng): Message chưa ack thuộc trách nhiệm của broker; mất kết nối là chúng quay lại queue.
- **Chúng được chuyển thẳng vào Dead Letter Exchange** (Sai): Mất kết nối dẫn tới requeue, không phải dead-letter; DLX cần reject/TTL/tràn queue.
- **Chúng bị mất vì đã được giao đi rồi** (Sai): Broker chỉ coi message là xong khi nhận được ack, giao đi chưa phải là xong.
- **Broker giữ chúng chờ đúng consumer đó kết nối lại** (Sai): Broker không gắn message với một consumer cụ thể sau khi kết nối đứt.
