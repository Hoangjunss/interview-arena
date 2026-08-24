---
id: error-handling-va-dead-letter-queue-dlq-trong-nestjs-microservices
position: backend
technology: microservices-\u0026-messaging
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error handling và Dead Letter Queue (DLQ) trong NestJS Microservices?

## Question (EN)
Error handling and Dead Letter Queue (DLQ) in NestJS Microservices?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
**Error handling in microservices** differs from HTTP — no response to throw directly.\
\
**TCP transport** — use `RpcException`:\
```typescript\
@MessagePattern({ cmd: 'get_user' })\
async getUser(@Payload() data: { id: number }) {\
  const user = await this.usersService.findOne(data.id);\
  if (!user) throw new RpcException({ status: 404, message: 'Not found' });\
  return user;\
}\
\
// Client — catch RpcException (use lastValueFrom, .toPromise() deprecated in RxJS 7+)\
import { lastValueFrom } from 'rxjs';\
await lastValueFrom(\
  this.client.send({ cmd: 'get_user' }, { id })\
    .pipe(catchError(err =\u003e throwError(() =\u003e new NotFoundException(err.message))))\
);\
```\
\
**DLQ with RabbitMQ**: configure `deadLetterExchange` in queue options — failed messages route to DLQ after retries. Monitor DLQ depth and implement manual replay.
