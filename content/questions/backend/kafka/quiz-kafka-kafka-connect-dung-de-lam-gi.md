---
id: quiz-kafka-kafka-connect-dung-de-lam-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kafka Connect dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Biến đổi dữ liệu trong luồng bằng phép join và tổng hợp
- [ ] Kết nối nhiều cluster Kafka lại thành một cluster lớn
- [x] Đưa dữ liệu vào và ra Kafka bằng connector cấu hình sẵn
- [ ] Quản lý kết nối của client tới broker cho hiệu quả hơn

## Giải thích (VI)
Chuyển dữ liệu vào/ra Kafka bằng connector khai báo qua cấu hình: source connector đọc từ Postgres/MySQL/S3 ghi vào topic, sink connector đọc topic ghi ra Elasticsearch/S3/data warehouse.

### Giải thích các phương án:
- **Biến đổi dữ liệu trong luồng bằng phép join và tổng hợp** (Sai): Xử lý luồng có trạng thái là việc của Kafka Streams.
- **Kết nối nhiều cluster Kafka lại thành một cluster lớn** (Sai): Việc nhân bản giữa cluster là của MirrorMaker 2.
- **Đưa dữ liệu vào và ra Kafka bằng connector cấu hình sẵn** (Đúng): Tránh phải viết producer/consumer riêng cho từng hệ thống nguồn và đích.
- **Quản lý kết nối của client tới broker cho hiệu quả hơn** (Sai): Client tự quản kết nối của mình, không qua Connect.
