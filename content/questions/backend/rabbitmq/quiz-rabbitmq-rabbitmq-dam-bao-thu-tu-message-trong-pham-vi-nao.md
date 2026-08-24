---
id: quiz-rabbitmq-rabbitmq-dam-bao-thu-tu-message-trong-pham-vi-nao
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RabbitMQ đảm bảo thứ tự message trong phạm vi nào?

## Đáp án trắc nghiệm
- [ ] Trong một consumer group, giống cơ chế của Kafka
- [ ] Không có phạm vi nào được đảm bảo thứ tự
- [ ] Trong toàn bộ exchange, theo thời điểm publish
- [x] Trong một queue, khi chỉ có một consumer

## Giải thích (VI)
Chỉ trong một queue với một consumer . Nhiều consumer cùng đọc một queue thì message được chia round-robin, mỗi consumer xử lý nhanh chậm khác nhau nên thứ tự hoàn thành không còn được đảm bảo.

### Giải thích các phương án:
- **Trong một consumer group, giống cơ chế của Kafka** (Sai): RabbitMQ không có khái niệm consumer group; nhiều consumer trên một queue chia nhau message.
- **Không có phạm vi nào được đảm bảo thứ tự** (Sai): Trong một queue, message được giao theo đúng thứ tự vào hàng.
- **Trong toàn bộ exchange, theo thời điểm publish** (Sai): Exchange chỉ định tuyến; message toả ra nhiều queue nên không có thứ tự chung.
- **Trong một queue, khi chỉ có một consumer** (Đúng): Nhiều consumer trên cùng queue nhận round-robin và ack lệch nhau nên thứ tự xử lý không còn.
