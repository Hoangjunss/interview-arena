---
id: structured-logging-voi-winston-trong-nestjs
position: backend
technology: testing-\u0026-production
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Structured Logging với Winston trong NestJS?

## Question (EN)
Structured logging with Winston in NestJS?

## Đáp án chi tiết (VI)
Logging chuẩn production cần: structured JSON, log levels, request correlation ID, không log sensitive data.\
\
**Setup Winston** với `nest-winston`:\
```typescript\
import { WinstonModule } from 'nest-winston';\
import { transports, format } from 'winston';\
\
WinstonModule.forRoot({\
  level: process.env.LOG_LEVEL || 'info',\
  format: format.combine(\
    format.timestamp(),\
    format.errors({ stack: true }),\
    format.json(),  // Structured JSON cho log aggregation\
  ),\
  transports: [\
    new transports.Console(),\
    new transports.File({ filename: 'error.log', level: 'error' }),\
  ],\
})\
```\
\
**Request correlation** với Middleware:\
```typescript\
app.use((req, res, next) =\u003e {\
  req.correlationId = req.headers['x-correlation-id'] ?? uuid();\
  res.setHeader('x-correlation-id', req.correlationId);\
  next();\
});\
```\
\
Inject `Logger` service và dùng `this.logger.log/error/warn` với context. Lưu ý: không dùng `console.log` trong production code — không structured, không có levels.

## Detailed Answer (EN)
Production logging needs: structured JSON, log levels, request correlation ID, no sensitive data.\
\
**Setup Winston** with `nest-winston`:\
```typescript\
WinstonModule.forRoot({\
  level: process.env.LOG_LEVEL || 'info',\
  format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),\
  transports: [new transports.Console()],\
})\
```\
\
**Request correlation** via Middleware attaches correlation ID to each request and response.\
\
Pitfall: never use `console.log` in production — not structured, no levels.
