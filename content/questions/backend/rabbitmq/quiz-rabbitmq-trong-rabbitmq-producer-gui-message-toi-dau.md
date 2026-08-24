---
id: quiz-rabbitmq-trong-rabbitmq-producer-gui-message-toi-dau
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong RabbitMQ, producer gửi message tới đâu?

## Đáp án trắc nghiệm
- [ ] Trực tiếp tới consumer qua kết nối TCP riêng
- [ ] Gửi thẳng vào queue mà consumer đang đọc
- [ ] Vào broker, broker tự chọn một queue ngẫu nhiên
- [x] Vào một exchange

## Giải thích (VI)
Producer luôn publish vào exchange , không bao giờ vào queue trực tiếp. Exchange nhìn routing key của message và các binding để quyết định chuyển sang queue nào. Ngay cả khi code có vẻ "gửi vào queue", thực chất là gửi qua default exchange với routing key trùng tên queue.

### Giải thích các phương án:
- **Trực tiếp tới consumer qua kết nối TCP riêng** (Sai): Producer và consumer không bao giờ nói chuyện trực tiếp; broker đứng giữa.
- **Gửi thẳng vào queue mà consumer đang đọc** (Sai): Producer không biết queue nào tồn tại; ngay cả publish "vào queue" thực chất đi qua default exchange.
- **Vào broker, broker tự chọn một queue ngẫu nhiên** (Sai): Việc chọn queue theo quy tắc binding, không ngẫu nhiên.
- **Vào một exchange** (Đúng): Exchange nhận message rồi định tuyến sang các queue theo binding.
