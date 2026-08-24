---
id: quiz-kafka-khi-nao-nen-chon-kafka-thay-vi-rabbitmq
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên chọn Kafka thay vì RabbitMQ?

## Đáp án trắc nghiệm
- [ ] Khi cần hàng đợi ưu tiên và TTL cho từng tin nhắn
- [ ] Khi cần định tuyến tin nhắn theo pattern phức tạp
- [x] Khi cần giữ và đọc lại lịch sử sự kiện, nhiều consumer độc lập
- [ ] Khi cần độ trễ thấp nhất cho một tin nhắn đơn lẻ

## Giải thích (VI)
Khi dữ liệu là dòng sự kiện cần giữ lại : nhiều consumer độc lập đọc cùng nguồn, cần phát lại lịch sử, thông lượng rất cao. RabbitMQ hợp hơn cho hàng đợi công việc với định tuyến phức tạp, priority, TTL từng tin.

### Giải thích các phương án:
- **Khi cần hàng đợi ưu tiên và TTL cho từng tin nhắn** (Sai): Kafka không có priority queue hay TTL theo từng bản ghi.
- **Khi cần định tuyến tin nhắn theo pattern phức tạp** (Sai): Đó là điểm mạnh của RabbitMQ với exchange và binding key.
- **Khi cần giữ và đọc lại lịch sử sự kiện, nhiều consumer độc lập** (Đúng): RabbitMQ mạnh hơn ở định tuyến phức tạp và hàng đợi công việc từng tin một.
- **Khi cần độ trễ thấp nhất cho một tin nhắn đơn lẻ** (Sai): Kafka tối ưu cho thông lượng theo batch hơn là độ trễ từng tin.
