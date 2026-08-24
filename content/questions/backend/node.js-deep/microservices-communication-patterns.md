---
id: microservices-communication-patterns
position: backend
technology: node.js-deep
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Microservices communication patterns?

## Question (EN)
What are the microservices communication patterns?

## Đáp án chi tiết (VI)
Microservices giao tiếp với nhau qua hai cách chính: synchronous và asynchronous. Synchronous dùng REST (đơn giản, phổ biến) hoặc gRPC (nhanh hơn nhờ Protocol Buffers và HTTP/2, type-safe, phù hợp internal services). Asynchronous dùng message queue như RabbitMQ cho task queue đơn giản, Redis pub/sub cho real-time events, hoặc Kafka cho high-throughput event streaming.\
\
Pattern API Gateway đặt ở trước làm single entry point, xử lý routing, authentication, và rate limiting tập trung thay vì mỗi service tự làm.\
\
Circuit breaker pattern rất quan trọng: khi một service lỗi, tạm ngắt kết nối đến service đó thay vì tiếp tục gửi requests gây cascade failure — thư viện opossum cho Node.js hỗ trợ pattern này.

## Detailed Answer (EN)
Microservices communicate in two main ways: synchronous and asynchronous. Synchronous: REST (simple, widely used) or gRPC (faster thanks to Protocol Buffers and HTTP/2, type-safe, ideal for internal services). Asynchronous: message queues like RabbitMQ for simple task queues, Redis pub/sub for real-time events, or Kafka for high-throughput event streaming. The API Gateway pattern sits in front as the single entry point, centralizing routing, authentication, and rate limiting instead of each service doing it independently. The circuit breaker pattern is critical: when a service fails, temporarily stop sending requests to it rather than causing a cascade failure — the opossum library for Node.js implements this pattern.
