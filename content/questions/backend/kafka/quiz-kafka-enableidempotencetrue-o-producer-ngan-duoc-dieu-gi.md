---
id: quiz-kafka-enableidempotencetrue-o-producer-ngan-duoc-dieu-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
enable.idempotence=true ở producer ngăn được điều gì?

## Đáp án trắc nghiệm
- [x] Bản ghi trùng khi producer retry sau lỗi mạng
- [ ] Hai producer khác nhau ghi cùng một nội dung vào topic
- [ ] Consumer xử lý trùng một tin nhắn đã đọc trước đó
- [ ] Tin nhắn bị mất khi leader của partition đổi vai

## Giải thích (VI)
Trùng lặp do producer retry : mạng lỗi sau khi broker đã ghi nhưng phản hồi không về, producer gửi lại và tạo bản ghi thứ hai. Idempotent producer gắn id producer + số thứ tự nên broker loại được bản trùng.

### Giải thích các phương án:
- **Bản ghi trùng khi producer retry sau lỗi mạng** (Đúng): Broker nhận diện số thứ tự của mỗi producer nên bỏ qua bản ghi đã ghi.
- **Hai producer khác nhau ghi cùng một nội dung vào topic** (Sai): Kafka không so sánh nội dung giữa các producer khác nhau.
- **Consumer xử lý trùng một tin nhắn đã đọc trước đó** (Sai): Phía consumer là chuyện khác, cần idempotent trong logic xử lý.
- **Tin nhắn bị mất khi leader của partition đổi vai** (Sai): Chống mất tin nhắn thuộc về acks và min.insync.replicas.
