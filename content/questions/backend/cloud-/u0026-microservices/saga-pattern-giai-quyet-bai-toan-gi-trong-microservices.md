---
id: saga-pattern-giai-quyet-bai-toan-gi-trong-microservices
position: backend
technology: cloud-\u0026-microservices
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Saga pattern giải quyết bài toán gì trong microservices?

## Question (EN)
What problem does the Saga pattern solve in microservices?

## Đáp án chi tiết (VI)
**Bài toán:** microservices không chia sẻ DB → không dùng distributed transaction (2PC quá phức tạp) → làm sao đảm bảo consistency khi 1 operation update nhiều service?\
\
**Saga:** chuỗi local transaction, mỗi bước publish event → service kế tiếp xử lý. Bước N fail → chạy **compensating transaction** ngược từ N-1.\
\
```\
1. Order: CREATE (PENDING) → OrderCreated\
2. Inventory: RESERVE items → ItemsReserved\
3. Payment: CHARGE → PaymentCompleted\
4. Order: CONFIRMED\
// Bước 3 fail → Inventory RELEASE (compensate) → Order CANCEL\
```\
\
**2 kiểu:**\
- **Choreography** — mỗi service nghe event và phản ứng (loose coupling, nhưng khó debug, cyclic dependency ngầm).\
- **Orchestration** — 1 orchestrator điều phối (Axon, Temporal, AWS Step Functions) — dễ debug, flow rõ, nhưng thêm component.\
\
**Idempotency bắt buộc:** mỗi step phải idempotent vì message có thể deliver nhiều lần (Kafka at-least-once).

## Detailed Answer (EN)
**Problem:** microservices do not share a DB → distributed transactions are out (2PC is too complex) → how to keep consistency when one operation updates multiple services?\
\
**Saga:** a chain of local transactions, each publishing an event → the next service handles it. If step N fails → run **compensating transactions** backwards from N-1.\
\
```\
1. Order: CREATE (PENDING) → OrderCreated\
2. Inventory: RESERVE items → ItemsReserved\
3. Payment: CHARGE → PaymentCompleted\
4. Order: CONFIRMED\
// Step 3 fails → Inventory RELEASE (compensate) → Order CANCEL\
```\
\
**Two styles:**\
- **Choreography** — each service listens for events and reacts (loose coupling, but harder to debug, hidden cyclic dependencies).\
- **Orchestration** — a central orchestrator coordinates (Axon, Temporal, AWS Step Functions) — easy to debug, clear flow, but an extra component.\
\
**Idempotency is mandatory:** every step must be idempotent since messages may be delivered more than once (Kafka at-least-once).
