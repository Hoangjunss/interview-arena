---
id: saga-pattern-giai-quyet-van-de-gi-trong-microservices-choreography-vs-orchestrat
position: system-design
technology: architecture-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Saga Pattern giải quyết vấn đề gì trong microservices? Choreography vs Orchestration?

## Question (EN)
What problem does the Saga Pattern solve in microservices? What is the difference between Choreography and Orchestration?

## Đáp án chi tiết (VI)
Trong microservices, mỗi service có database riêng, nên không thể dùng distributed transactions (2PC) – quá phức tạp và tạo tight coupling. Saga Pattern giải quyết bằng cách chia distributed transaction thành chuỗi local transactions, mỗi bước publish event; nếu một bước fail, thực hiện compensating transactions để rollback các bước trước. Ví dụ Order Saga: CreateOrder → ReserveInventory → ProcessPayment → ShipOrder; nếu ProcessPayment fail → UnreserveInventory → CancelOrder.\
\
- Choreography: mỗi service lắng nghe events và tự quyết định hành động tiếp theo – không có coordinator trung tâm, loosely coupled hơn nhưng khó theo dõi flow tổng thể, dễ tạo circular dependencies.\
- Orchestration: có một Saga Orchestrator trung tâm điều phối các bước, gửi commands đến từng service – dễ hiểu và debug flow, nhưng orchestrator có thể trở thành bottleneck và chứa nhiều business logic.\
\
Temporal.io, AWS Step Functions là công cụ hỗ trợ orchestration saga.

## Detailed Answer (EN)
In microservices, each service owns its own database, making distributed transactions (2PC) impractical — too complex and too tightly coupled. The Saga Pattern solves this by breaking a distributed transaction into a sequence of local transactions, each publishing an event; if any step fails, compensating transactions roll back the previous steps. Example Order Saga: CreateOrder → ReserveInventory → ProcessPayment → ShipOrder; if ProcessPayment fails → UnreserveInventory → CancelOrder.\
\
- Choreography: each service listens for events and decides its own next action — no central coordinator, more loosely coupled, but the overall flow is hard to track and prone to circular dependencies.\
- Orchestration: a central Saga Orchestrator coordinates all steps, sending commands to each service — easier to understand and debug, but the orchestrator can become a bottleneck and accumulate too much business logic.\
\
Temporal.io and AWS Step Functions are tools that support orchestration-based sagas.
