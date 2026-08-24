---
id: quiz-kafka-topic-co-3-partition-consumer-group-co-5-consumer-ket-qua-the-nao
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Topic có 3 partition, consumer group có 5 consumer. Kết quả thế nào?

## Đáp án trắc nghiệm
- [ ] Cả 5 consumer chia đều tin nhắn của 3 partition
- [x] 3 consumer làm việc, 2 consumer rỗi
- [ ] 2 consumer thừa bị group từ chối và báo lỗi
- [ ] Kafka tự tăng số partition lên 5 cho khớp

## Giải thích (VI)
3 consumer nhận mỗi cái một partition, 2 consumer rỗi hoàn toàn . Chúng không lỗi và vẫn ở trong group — hữu ích như bản dự phòng, vì nếu một consumer chết thì rebalance sẽ gán partition cho consumer đang rỗi.

### Giải thích các phương án:
- **Cả 5 consumer chia đều tin nhắn của 3 partition** (Sai): Kafka gán theo partition chứ không chia lẻ tin nhắn trong một partition.
- **3 consumer làm việc, 2 consumer rỗi** (Đúng): Một partition không được chia cho hai consumer trong cùng group.
- **2 consumer thừa bị group từ chối và báo lỗi** (Sai): Chúng vẫn ở trong group hợp lệ, chỉ là không được gán partition nào.
- **Kafka tự tăng số partition lên 5 cho khớp** (Sai): Số partition không tự thay đổi theo số consumer.
