---
id: quiz-kafka-consumer-lag-do-cai-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consumer lag đo cái gì?

## Đáp án trắc nghiệm
- [x] Khoảng cách giữa offset mới nhất và offset consumer đã đọc
- [ ] Số tin nhắn bị lỗi mà consumer chưa xử lý được
- [ ] Độ trễ mạng giữa consumer và broker
- [ ] Thời gian trung bình để xử lý xong một tin nhắn

## Giải thích (VI)
Số bản ghi giữa offset cuối của partition và offset consumer đã commit — tức consumer đang chậm bao nhiêu bản ghi. Đây là chỉ số sức khoẻ quan trọng nhất của một pipeline Kafka.

### Giải thích các phương án:
- **Khoảng cách giữa offset mới nhất và offset consumer đã đọc** (Đúng): Lag tăng đều nghĩa là consumer xử lý chậm hơn tốc độ ghi vào.
- **Số tin nhắn bị lỗi mà consumer chưa xử lý được** (Sai): Bản ghi lỗi không được tính riêng trong chỉ số lag.
- **Độ trễ mạng giữa consumer và broker** (Sai): Lag đo bằng số bản ghi, không đo độ trễ đường truyền.
- **Thời gian trung bình để xử lý xong một tin nhắn** (Sai): Đó là thời gian xử lý, một chỉ số khác.
