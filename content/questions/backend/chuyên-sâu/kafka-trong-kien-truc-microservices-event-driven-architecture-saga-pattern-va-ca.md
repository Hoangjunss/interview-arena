---
id: kafka-trong-kien-truc-microservices-event-driven-architecture-saga-pattern-va-ca
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kafka trong kiến trúc microservices: event-driven architecture, saga pattern, và các lỗi cần tránh?

## Question (EN)
Kafka in microservices architecture: event-driven design, the saga pattern, and pitfalls to avoid?

## Đáp án chi tiết (VI)
Kafka là backbone của event-driven microservices: service A publish event (OrderCreated), service B và C subscribe để thực hiện action tương ứng (PaymentService charge, InventoryService deduct). Saga pattern dùng Kafka để coordinate distributed transaction: choreography-based saga — mỗi service lắng nghe event và publish event tiếp theo, không có central coordinator; orchestration-based saga — Saga Orchestrator gửi command đến từng service qua Kafka và lắng nghe response. Lưu ý cần tránh: event schema thay đổi breaking consumer (dùng Schema Registry + Avro để enforce backward/forward compatibility); consumer idempotency — cùng event có thể arrive nhiều lần, mọi handler phải idempotent; transaction outbox pattern để đảm bảo atomicity giữa database write và Kafka publish (tránh case: DB write thành công nhưng Kafka publish fail hoặc ngược lại).

## Detailed Answer (EN)
Kafka is the backbone of event-driven microservices: Service A publishes an event (OrderCreated), and Services B and C subscribe to take corresponding actions (PaymentService charges, InventoryService deducts). The saga pattern uses Kafka to coordinate distributed transactions: choreography-based sagas — each service listens for events and publishes the next event, with no central coordinator; orchestration-based sagas — a Saga Orchestrator sends commands to each service via Kafka and listens for responses. Pitfalls to avoid: breaking schema changes in events (use Schema Registry + Avro to enforce backward/forward compatibility); consumer idempotency — the same event may arrive multiple times, so every handler must be idempotent; the transactional outbox pattern to guarantee atomicity between a database write and a Kafka publish (preventing scenarios where the DB write succeeds but the Kafka publish fails, or vice versa).
