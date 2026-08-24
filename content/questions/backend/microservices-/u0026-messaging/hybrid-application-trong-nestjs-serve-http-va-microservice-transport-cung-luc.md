---
id: hybrid-application-trong-nestjs-serve-http-va-microservice-transport-cung-luc
position: backend
technology: microservices-\u0026-messaging
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hybrid application trong NestJS — serve HTTP và Microservice transport cùng lúc?

## Question (EN)
Hybrid application in NestJS — serving HTTP and Microservice transport simultaneously?

## Đáp án chi tiết (VI)
Hybrid app cho phép một NestJS app expose cả HTTP REST endpoints lẫn microservice message handlers — hữu ích khi muốn API Gateway cũng lắng nghe events.\
\
```typescript\
// main.ts\
const app = await NestFactory.create(AppModule);\
\
// Attach microservice\
app.connectMicroservice\u003cMicroserviceOptions\u003e({\
  transport: Transport.TCP,\
  options: { host: '0.0.0.0', port: 3001 },\
});\
\
// Start cả hai\
await app.startAllMicroservices(); // Phải gọi trước listen\
await app.listen(3000);\
```\
\
Controller vừa có `@Get()` cho HTTP vừa có `@MessagePattern()` cho RPC:\
```typescript\
@Controller('orders')\
export class OrdersController {\
  @Get()\
  async findAll() { ... }  // HTTP\
\
  @MessagePattern({ cmd: 'get_orders' })\
  async findAllRpc(@Payload() data: any) { ... }  // TCP/RPC\
}\
```\
\
Use case: API Gateway nhận HTTP từ frontend, đồng thời lắng nghe events từ internal services qua Kafka/TCP để cập nhật cache.

## Detailed Answer (EN)
Hybrid app exposes both HTTP REST endpoints and microservice message handlers in one process.\
\
```typescript\
const app = await NestFactory.create(AppModule);\
app.connectMicroservice\u003cMicroserviceOptions\u003e({ transport: Transport.TCP, options: { port: 3001 } });\
await app.startAllMicroservices(); // Must be called before listen\
await app.listen(3000);\
```\
\
Controllers handle both HTTP and RPC:\
```typescript\
@Get() async findAll() { ... }  // HTTP\
@MessagePattern({ cmd: 'get_orders' }) async findAllRpc() { ... }  // TCP\
```\
\
Use case: API Gateway receives HTTP from frontend while listening to internal service events via Kafka.
