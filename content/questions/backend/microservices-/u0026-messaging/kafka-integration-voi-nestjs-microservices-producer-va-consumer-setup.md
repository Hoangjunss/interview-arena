---
id: kafka-integration-voi-nestjs-microservices-producer-va-consumer-setup
position: backend
technology: microservices-\u0026-messaging
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kafka integration với NestJS Microservices — producer và consumer setup?

## Question (EN)
Kafka integration with NestJS Microservices — producer and consumer setup?

## Đáp án chi tiết (VI)
Kafka phù hợp cho high-throughput event streaming. NestJS có built-in Kafka transport.\
\
**Consumer (Microservice)**:\
```typescript\
// main.ts\
app.connectMicroservice\u003cMicroserviceOptions\u003e({\
  transport: Transport.KAFKA,\
  options: {\
    client: { brokers: ['kafka:9092'] },\
    consumer: { groupId: 'orders-consumer' },\
  },\
});\
\
// Controller\
@EventPattern('order.created')\
async handleOrderCreated(@Payload() data: OrderCreatedEvent) {\
  await this.ordersService.process(data);\
}\
```\
\
**Producer (API Gateway)**:\
```typescript\
ClientsModule.register([{\
  name: 'KAFKA_SERVICE',\
  transport: Transport.KAFKA,\
  options: {\
    client: { clientId: 'api-gateway', brokers: ['kafka:9092'] },\
    producer: { allowAutoTopicCreation: true },\
  },\
}])\
\
// Service\
this.kafkaClient.emit('order.created', { orderId, userId, items });\
```\
\
Kafka patterns: `@EventPattern` cho pub/sub (fire-and-forget), `@MessagePattern` cho request-reply. Dùng Avro schema registry cho type-safe messages trong production.

## Detailed Answer (EN)
Kafka is ideal for high-throughput event streaming. NestJS has built-in Kafka transport.\
\
**Consumer (Microservice)**:\
```typescript\
app.connectMicroservice\u003cMicroserviceOptions\u003e({\
  transport: Transport.KAFKA,\
  options: { client: { brokers: ['kafka:9092'] }, consumer: { groupId: 'orders-consumer' } },\
});\
\
@EventPattern('order.created')\
async handleOrderCreated(@Payload() data: OrderCreatedEvent) { ... }\
```\
\
**Producer (API Gateway)**:\
```typescript\
this.kafkaClient.emit('order.created', { orderId, userId, items });\
```\
\
Use Avro schema registry for type-safe messages in production.
