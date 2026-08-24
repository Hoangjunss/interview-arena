---
id: nestjs-microservices-hoat-dong-nhu-the-nao-cac-transport-layers-pho-bien
position: backend
technology: microservices-\u0026-messaging
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
NestJS Microservices hoạt động như thế nào? Các transport layers phổ biến?

## Question (EN)
How do NestJS Microservices work? What are the common transport layers?

## Đáp án chi tiết (VI)
NestJS Microservices là pattern giao tiếp giữa services dùng message-passing thay vì HTTP. `NestFactory.createMicroservice()` tạo microservice với transport layer được chọn.\
\
Transport layers: TCP cho internal services latency thấp, Redis cho Pub/Sub và simple messaging, NATS cho lightweight cloud-native messaging, Kafka cho high-throughput event streaming, RabbitMQ cho complex routing với dead-letter queues, gRPC cho strongly-typed high-performance calls.\
\
Hai pattern messaging: `@MessagePattern('event')` cho Request/Response (sender chờ reply), `@EventPattern('event')` cho Fire-and-forget (không chờ reply). API Gateway dùng `ClientsModule.register()` inject `ClientProxy`, gọi `client.send('pattern', data)` cho request/response trả về Observable, `client.emit('pattern', data)` cho fire-and-forget. Hybrid app có thể serve cả HTTP và Microservices cùng lúc với `app.connectMicroservice()`.

## Detailed Answer (EN)
NestJS Microservices use message-passing instead of HTTP for inter-service communication. `NestFactory.createMicroservice()` creates a microservice with the chosen transport layer.\
\
Transport layers: TCP for low-latency internal services, Redis for Pub/Sub and simple messaging, NATS for lightweight cloud-native messaging, Kafka for high-throughput event streaming, RabbitMQ for complex routing with dead-letter queues, gRPC for strongly-typed high-performance calls.\
\
Two messaging patterns: `@MessagePattern('event')` for Request/Response (sender waits for reply), `@EventPattern('event')` for Fire-and-forget (no reply expected). API Gateways use `ClientsModule.register()` to inject a `ClientProxy`, calling `client.send('pattern', data)` for request/response (returns Observable) or `client.emit('pattern', data)` for fire-and-forget. Hybrid apps can serve both HTTP and Microservices simultaneously with `app.connectMicroservice()`.
