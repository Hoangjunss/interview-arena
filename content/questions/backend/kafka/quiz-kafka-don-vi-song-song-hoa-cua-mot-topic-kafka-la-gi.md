---
id: quiz-kafka-don-vi-song-song-hoa-cua-mot-topic-kafka-la-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đơn vị song song hoá của một topic Kafka là gì?

## Đáp án trắc nghiệm
- [ ] Broker — thêm broker là tăng được mức song song
- [ ] Consumer group — mỗi group chạy song song với nhau
- [x] Partition
- [ ] Topic — mỗi topic được một consumer xử lý riêng biệt

## Giải thích (VI)
Partition. Trong một consumer group, mỗi partition chỉ được một consumer đọc. Nên topic có 6 partition thì tối đa 6 consumer làm việc; consumer thứ 7 sẽ ngồi không.

### Giải thích các phương án:
- **Broker — thêm broker là tăng được mức song song** (Sai): Thêm broker giúp phân tán tải nhưng không tăng số consumer đọc song song.
- **Consumer group — mỗi group chạy song song với nhau** (Sai): Các group độc lập nhau nhưng đều đọc lại toàn bộ dữ liệu, không chia việc.
- **Partition** (Đúng): Mỗi partition được đúng một consumer trong group đọc, nên số partition chặn trên mức song song.
- **Topic — mỗi topic được một consumer xử lý riêng biệt** (Sai): Một topic có nhiều partition và nhiều consumer cùng đọc được.
