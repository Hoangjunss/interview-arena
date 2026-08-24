---
id: circuit-breaker-pattern-ap-dung-voi-rabbitmq-nhu-the-nao
position: backend
technology: patterns-\u0026-architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Circuit breaker pattern áp dụng với RabbitMQ như thế nào?

## Question (EN)
How do you implement circuit breaker pattern with RabbitMQ?

## Đáp án chi tiết (VI)
Circuit breaker ngăn cascading failure khi downstream service unhealthy: consumer theo dõi failure rate, nếu vượt threshold (ví dụ 50%), \\"mở\\" circuit — requeue tất cả message không cố xử lý (fast fail); sau timeout thì \\"half-open\\" thử một message xem service đã phục hồi chưa; nếu thành công thì resume. Trong RabbitMQ: track failure per message với retry count trong header, kết hợp DLX để inspect message stubborn. Ngăn lãng phí CPU xử lý hopeless request và cảnh báo operator fix service hỏng.

## Detailed Answer (EN)
Circuit breaker prevents cascading failures: consumer tracks failure rates; above threshold (e.g., 50%), it \\"opens\\" — requeues all messages without attempting processing (fast fail); after a timeout, it \\"half-opens\\" testing one message; if successful, resumes normal operation. Combine with dead-letter queues for stubborn failures. Prevents wasting CPU on hopeless processing and signals operators to fix downstream services.
