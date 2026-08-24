---
id: quiz-kafka-hai-consumer-group-khac-nhau-cung-dang-ky-mot-topic-thi-d-lieu-duoc-chia-the-nao
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai consumer group khác nhau cùng đăng ký một topic thì dữ liệu được chia thế nào?

## Đáp án trắc nghiệm
- [ ] Group đăng ký trước nhận hết, group sau phải chờ
- [ ] Hai group chia đôi số tin nhắn cho nhau
- [ ] Group nào commit offset nhanh hơn thì nhận nhiều hơn
- [x] Mỗi group nhận đầy đủ toàn bộ tin nhắn của topic

## Giải thích (VI)
Mỗi group nhận toàn bộ tin nhắn, độc lập nhau, vì offset lưu riêng theo group. Chia việc chỉ xảy ra giữa các consumer trong cùng một group — đây là cơ chế để Kafka làm được cả pub/sub lẫn hàng đợi.

### Giải thích các phương án:
- **Group đăng ký trước nhận hết, group sau phải chờ** (Sai): Không có thứ tự ưu tiên giữa các group.
- **Hai group chia đôi số tin nhắn cho nhau** (Sai): Việc chia chỉ diễn ra giữa các consumer trong cùng một group.
- **Group nào commit offset nhanh hơn thì nhận nhiều hơn** (Sai): Tốc độ commit không ảnh hưởng tới việc phân phối dữ liệu.
- **Mỗi group nhận đầy đủ toàn bộ tin nhắn của topic** (Đúng): Offset được lưu riêng cho từng group nên các group hoàn toàn độc lập.
