---
id: rabbitmq-va-kafka-khac-nhau-nhu-the-nao
position: backend
technology: operations-\u0026-monitoring
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RabbitMQ và Kafka khác nhau như thế nào?

## Question (EN)
What is the difference between RabbitMQ and Kafka?

## Đáp án chi tiết (VI)
RabbitMQ và Kafka giải quyết vấn đề khác nhau: RabbitMQ tối ưu cho routing linh hoạt và low-latency messaging, Kafka tối ưu cho high-throughput event streaming với khả năng replay message.\
\
**RabbitMQ**: message broker truyền thống — định tuyến message đến queue cụ thể, xóa sau khi consume, broker thông minh với consumer đơn giản. Tốt cho low-latency messaging, complex routing, microservice task queue. **Kafka**: distributed append-only log — message persist vô thời hạn (tùy retention), consumer đọc từ bất kỳ điểm nào trong lịch sử. Tốt cho high-throughput event streaming, audit trail, event sourcing. Nhiều team dùng cả hai: Kafka cho event streaming backbone, RabbitMQ cho task queue và inter-service command.

## Detailed Answer (EN)
RabbitMQ and Kafka solve different problems: RabbitMQ is optimized for flexible routing and low-latency task queues; Kafka is optimized for high-throughput event streaming with message replay.\
\
RabbitMQ: traditional message broker — routes to specific queues, deletes after consumption, smart broker with simple consumers. Kafka: distributed append-only log — messages persist by retention policy, consumers read from any history point. Many teams use both: Kafka for the event streaming backbone, RabbitMQ for task queues and inter-service commands.
