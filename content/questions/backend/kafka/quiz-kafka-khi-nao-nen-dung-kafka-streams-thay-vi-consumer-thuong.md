---
id: quiz-kafka-khi-nao-nen-dung-kafka-streams-thay-vi-consumer-thuong
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng Kafka Streams thay vì consumer thường?

## Đáp án trắc nghiệm
- [ ] Khi cần thông lượng cao hơn consumer thường
- [ ] Khi muốn tránh phải quản lý offset thủ công
- [x] Khi cần xử lý có trạng thái: join, tổng hợp theo cửa sổ thời gian
- [ ] Khi cần ghi dữ liệu ra hệ thống ngoài như Elasticsearch

## Giải thích (VI)
Khi xử lý có trạng thái : đếm theo cửa sổ, join hai luồng, tổng hợp theo key. Tự làm những việc đó với consumer thường nghĩa là tự xây state store bền vững, phục hồi sau sự cố, và xử lý dữ liệu tới muộn.

### Giải thích các phương án:
- **Khi cần thông lượng cao hơn consumer thường** (Sai): Streams chạy trên chính consumer nên không nhanh hơn về bản chất.
- **Khi muốn tránh phải quản lý offset thủ công** (Sai): Consumer thường cũng commit offset tự động được.
- **Khi cần xử lý có trạng thái: join, tổng hợp theo cửa sổ thời gian** (Đúng): Streams lo state store, fault tolerance và exactly-once thay cho bạn.
- **Khi cần ghi dữ liệu ra hệ thống ngoài như Elasticsearch** (Sai): Việc đó là của sink connector trong Kafka Connect.
