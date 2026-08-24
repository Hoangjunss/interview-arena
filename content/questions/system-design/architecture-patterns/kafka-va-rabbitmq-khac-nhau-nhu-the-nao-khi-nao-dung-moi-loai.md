---
id: kafka-va-rabbitmq-khac-nhau-nhu-the-nao-khi-nao-dung-moi-loai
position: system-design
technology: architecture-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kafka và RabbitMQ khác nhau như thế nào? Khi nào dùng mỗi loại?

## Question (EN)
How do Kafka and RabbitMQ differ? When should you use each?

## Đáp án chi tiết (VI)
RabbitMQ là traditional message broker (queue-based): messages được push đến consumers, sau khi consumer acknowledge thì message bị xóa, hỗ trợ nhiều messaging patterns (pub/sub, point-to-point, routing với exchanges), tốt cho task queues và RPC. Kafka là distributed event log (log-based): messages được append vào log và retained theo thời gian (không xóa sau consume), consumers tự pull và track offset của mình, hỗ trợ replay messages, designed cho high-throughput (hàng triệu messages/second).\
\
Chọn RabbitMQ khi:\
- cần complex routing logic, task distribution, message TTL và priority\
- tích hợp với nhiều protocols (AMQP, STOMP, MQTT)\
- team nhỏ cần dễ ops\
\
Chọn Kafka khi:\
- event streaming và event sourcing, audit log cần retention lâu dài\
- multiple consumers cần đọc cùng message độc lập\
- high throughput analytics pipeline, real-time data integration

## Detailed Answer (EN)
RabbitMQ is a traditional message broker (queue-based): messages are pushed to consumers; once acknowledged, messages are deleted; supports pub/sub, point-to-point, routing with exchanges; well-suited for task queues and RPC. Kafka is a distributed event log (log-based): messages are appended and retained over time; consumers pull and track their own offsets; supports replay; designed for high throughput (millions of messages per second).\
\
Choose RabbitMQ when:\
- complex routing logic, job queues, message TTL and priority are needed\
- multi-protocol integration (AMQP, STOMP, MQTT)\
- small team needing easy operations\
\
Choose Kafka when:\
- event streaming and event sourcing, long-term audit log retention\
- multiple independent consumers need to read the same messages\
- high-throughput analytics pipeline or real-time data integration
