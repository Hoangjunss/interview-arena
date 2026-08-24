---
id: quiz-rabbitmq-publish-message-vao-exchange-nhung-routing-key-khong-khop-binding-nao-mac-dinh-c
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Publish message vào exchange nhưng routing key không khớp binding nào. Mặc định chuyện gì xảy ra?

## Đáp án trắc nghiệm
- [x] Message bị drop âm thầm
- [ ] Broker ném channel exception về phía producer
- [ ] Message rơi vào queue mặc định của exchange
- [ ] Message nằm chờ trong exchange tới khi có binding phù hợp

## Giải thích (VI)
Message bị drop âm thầm — không lỗi, không cảnh báo. Producer muốn biết thì phải bật cờ mandatory (broker trả message về qua basic.return) hoặc cấu hình alternate exchange để hứng message unroutable sang một queue riêng.

### Giải thích các phương án:
- **Message bị drop âm thầm** (Đúng): Không match binding nào thì message biến mất, producer không được báo gì.
- **Broker ném channel exception về phía producer** (Sai): Publish là fire-and-forget; broker không coi unroutable là lỗi.
- **Message rơi vào queue mặc định của exchange** (Sai): Exchange không có queue mặc định đi kèm.
- **Message nằm chờ trong exchange tới khi có binding phù hợp** (Sai): Exchange không lưu trữ message nên không có chỗ để chờ.
