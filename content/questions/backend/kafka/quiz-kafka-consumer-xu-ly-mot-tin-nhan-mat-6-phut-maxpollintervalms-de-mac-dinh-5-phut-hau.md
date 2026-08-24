---
id: quiz-kafka-consumer-xu-ly-mot-tin-nhan-mat-6-phut-maxpollintervalms-de-mac-dinh-5-phut-hau
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consumer xử lý một tin nhắn mất 6 phút, max.poll.interval.ms để mặc định 5 phút. Hậu quả?

## Đáp án trắc nghiệm
- [x] Group coi consumer đã chết và rebalance, tin nhắn bị xử lý lại
- [ ] Consumer vẫn giữ partition vì heartbeat chạy ở thread riêng
- [ ] Broker tự tăng thời gian chờ cho consumer đang xử lý chậm
- [ ] Tin nhắn bị chuyển vào dead-letter topic sau khi hết hạn

## Giải thích (VI)
Consumer bị đá khỏi group , group rebalance, và tin nhắn đó được giao cho consumer khác — nên nó bị xử lý lại, có thể lặp vô hạn. Đây là nguyên nhân kinh điển của "rebalance liên tục".

### Giải thích các phương án:
- **Group coi consumer đã chết và rebalance, tin nhắn bị xử lý lại** (Đúng): Không gọi poll đúng hạn nghĩa là consumer bị đá ra khỏi group.
- **Consumer vẫn giữ partition vì heartbeat chạy ở thread riêng** (Sai): Heartbeat còn sống nhưng chính khoảng cách giữa hai lần poll mới là điều kiện bị đá.
- **Broker tự tăng thời gian chờ cho consumer đang xử lý chậm** (Sai): Không có cơ chế tự nới hạn như vậy.
- **Tin nhắn bị chuyển vào dead-letter topic sau khi hết hạn** (Sai): Kafka không có dead-letter topic sẵn; đó là việc ứng dụng tự làm.
