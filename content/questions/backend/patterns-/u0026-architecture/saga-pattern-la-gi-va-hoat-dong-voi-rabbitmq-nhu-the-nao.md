---
id: saga-pattern-la-gi-va-hoat-dong-voi-rabbitmq-nhu-the-nao
position: backend
technology: patterns-\u0026-architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Saga pattern là gì và hoạt động với RabbitMQ như thế nào?

## Question (EN)
What is the saga pattern and how does it work with RabbitMQ?

## Đáp án chi tiết (VI)
Saga pattern chia distributed transaction thành chuỗi local transaction — mỗi service update DB của mình và publish event qua RabbitMQ. Có 2 cách: (1) **Choreography**: mỗi service lắng nghe event và publish event của mình (phi tập trung, khó trace). (2) **Orchestration**: một coordinator service điều phối từng bước (tập trung, dễ hiểu hơn). Ví dụ order saga: payment service (trừ tiền) → inventory service (giữ hàng) → shipping service (lên lịch giao). Nếu một bước fail, compensating transaction chạy ngược lại.

## Detailed Answer (EN)
The saga pattern breaks distributed transactions into a series of local transactions coordinated via events published to RabbitMQ. Two approaches: (1) Choreography — each service listens for events and publishes its own (decentralized, hard to trace). (2) Orchestration — a central coordinator directs each step (centralized, easier to understand). If any step fails, compensating transactions execute in reverse.
