---
id: event-emitter-trong-nestjs-onevent-va-eventemitter2
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event Emitter trong NestJS — @OnEvent và EventEmitter2?

## Question (EN)
Event Emitter in NestJS — @OnEvent and EventEmitter2?

## Đáp án chi tiết (VI)
NestJS cung cấp `@nestjs/event-emitter` (wrapper của EventEmitter2) cho internal events — không phải distributed messaging mà là in-process pub/sub.\
\
```typescript\
// Setup\
EventEmitterModule.forRoot({ wildcard: true, delimiter: '.' })\
\
// Emit từ service\
import { EventEmitter2 } from '@nestjs/event-emitter';\
this.eventEmitter.emit('order.created', new OrderCreatedEvent(order));\
\
// Lắng nghe với @OnEvent\
@OnEvent('order.created')\
async handleOrderCreated(event: OrderCreatedEvent) {\
  await this.emailService.sendOrderConfirmation(event.order);\
}\
\
// Wildcard\
@OnEvent('order.*')  // Bắt tất cả order events\
async handleAllOrderEvents(event: any) { ... }\
```\
\
**Async events**: `@OnEvent('order.created', { async: true })` để handler chạy async không block emitter.\
\
Dùng cho: decoupling business logic (sau khi create order, nhiều services cần xử lý), audit logging, notifications. Lưu ý: không dùng cho cross-service communication — dùng Kafka/RabbitMQ thay.

## Detailed Answer (EN)
NestJS provides `@nestjs/event-emitter` for in-process pub/sub.\
\
```typescript\
// Emit\
this.eventEmitter.emit('order.created', new OrderCreatedEvent(order));\
\
// Listen\
@OnEvent('order.created')\
async handleOrderCreated(event: OrderCreatedEvent) {\
  await this.emailService.sendOrderConfirmation(event.order);\
}\
\
// Wildcard\
@OnEvent('order.*') async handleAll(event: any) { ... }\
```\
\
Use for: decoupling business logic, audit logging, notifications. Pitfall: not for cross-service communication — use Kafka/RabbitMQ instead.
