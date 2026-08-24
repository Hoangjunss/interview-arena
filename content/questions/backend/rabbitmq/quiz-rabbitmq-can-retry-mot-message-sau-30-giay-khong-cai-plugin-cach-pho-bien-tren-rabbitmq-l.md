---
id: quiz-rabbitmq-can-retry-mot-message-sau-30-giay-khong-cai-plugin-cach-pho-bien-tren-rabbitmq-l
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần retry một message sau 30 giây (không cài plugin). Cách phổ biến trên RabbitMQ là gì?

## Đáp án trắc nghiệm
- [ ] Nack với requeue=true và cấu hình broker delay 30 giây trước khi giao lại
- [x] Đẩy vào queue chờ có TTL 30s, DLX của nó trỏ về queue chính
- [ ] Consumer giữ message, chờ 30 giây bằng setTimeout rồi xử lý lại và ack
- [ ] Gắn header x-delay 30000 khi publish vào queue thường

## Giải thích (VI)
Dùng delay queue : một queue chờ không có consumer, đặt x-message-ttl=30000 và x-dead-letter-exchange trỏ về exchange của queue chính. Message lỗi được publish vào queue chờ, nằm đó 30 giây, hết TTL thì broker tự dead-letter nó quay về queue chính.

### Giải thích các phương án:
- **Nack với requeue=true và cấu hình broker delay 30 giây trước khi giao lại** (Sai): Requeue giao lại gần như ngay lập tức; broker không có tham số delay cho requeue.
- **Đẩy vào queue chờ có TTL 30s, DLX của nó trỏ về queue chính** (Đúng): Message nằm im trong queue chờ, hết TTL thì tự quay về queue chính để xử lý lại.
- **Consumer giữ message, chờ 30 giây bằng setTimeout rồi xử lý lại và ack** (Sai): Message unacked chiếm slot prefetch suốt thời gian chờ, làm nghẽn các message khác.
- **Gắn header x-delay 30000 khi publish vào queue thường** (Sai): x-delay chỉ hoạt động với delayed-message exchange plugin, không có sẵn trong broker.
