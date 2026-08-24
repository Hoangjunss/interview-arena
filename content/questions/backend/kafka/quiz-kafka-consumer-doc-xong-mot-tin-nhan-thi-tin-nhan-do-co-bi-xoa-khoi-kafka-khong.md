---
id: quiz-kafka-consumer-doc-xong-mot-tin-nhan-thi-tin-nhan-do-co-bi-xoa-khoi-kafka-khong
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consumer đọc xong một tin nhắn thì tin nhắn đó có bị xoá khỏi Kafka không?

## Đáp án trắc nghiệm
- [x] Không — tin nhắn ở lại tới khi hết thời gian giữ
- [ ] Có, bị xoá sau khi consumer commit offset
- [ ] Có, tin nhắn bị xoá ngay sau khi được giao đi
- [ ] Chỉ bị xoá khi mọi consumer group đã đọc qua

## Giải thích (VI)
Không. Kafka là log giữ theo thời gian (retention.ms, mặc định 7 ngày) hoặc theo dung lượng. Consumer chỉ di chuyển con trỏ offset của mình; dữ liệu vẫn nằm đó cho group khác đọc hoặc để đọc lại.

### Giải thích các phương án:
- **Không — tin nhắn ở lại tới khi hết thời gian giữ** (Đúng): Nhờ đó nhiều group đọc cùng dữ liệu, và đọc lại từ đầu được khi cần.
- **Có, bị xoá sau khi consumer commit offset** (Sai): Commit offset chỉ ghi lại vị trí đọc, không xoá dữ liệu.
- **Có, tin nhắn bị xoá ngay sau khi được giao đi** (Sai): Đó là cách hàng đợi truyền thống làm, không phải Kafka.
- **Chỉ bị xoá khi mọi consumer group đã đọc qua** (Sai): Kafka không theo dõi việc đó để quyết định xoá.
