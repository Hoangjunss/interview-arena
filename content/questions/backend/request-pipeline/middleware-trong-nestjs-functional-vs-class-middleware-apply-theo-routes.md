---
id: middleware-trong-nestjs-functional-vs-class-middleware-apply-theo-routes
position: backend
technology: request-pipeline
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware trong NestJS — functional vs class middleware, apply theo routes?

## Question (EN)
Middleware in NestJS — functional vs class middleware, apply by routes?

## Đáp án chi tiết (VI)
Middleware thực thi trước Guards, có access vào raw `req`/`res`/`next` giống Express. Dùng cho logging, CORS, session, body parsing, request tracking.\
\
Functional middleware là function đơn giản `(req, res, next) =\u003e { next() }` — dùng khi không cần DI. Class middleware implement `NestMiddleware` với method `use(req, res, next)` và `@Injectable()` — dùng khi cần inject services.\
\
Apply middleware trong module `implements NestModule` với `configure(consumer: MiddlewareConsumer)`. `consumer.apply(Middleware).forRoutes('*')` apply cho tất cả. `.forRoutes({ path: 'users', method: RequestMethod.GET })` hoặc `.forRoutes(UsersController)` cho specific routes/controllers. `.exclude()` loại trừ routes cụ thể. Có thể chain nhiều middleware: `.apply(M1, M2, M3)`. Global middleware (Express-style) dùng `app.use(helmet(), cors(), express.json())` trong `main.ts` trước khi listen.

## Detailed Answer (EN)
Middleware executes before Guards and has access to raw `req`/`res`/`next` like Express. Used for logging, CORS, session, body parsing, and request tracking.\
\
Functional middleware is a simple function `(req, res, next) =\u003e { next() }` — use when DI is not needed. Class middleware implements `NestMiddleware` with a `use(req, res, next)` method and `@Injectable()` — use when services need to be injected.\
\
Apply middleware in a module `implements NestModule` with `configure(consumer: MiddlewareConsumer)`. `consumer.apply(Middleware).forRoutes('*')` applies to all. `.forRoutes({ path: 'users', method: RequestMethod.GET })` or `.forRoutes(UsersController)` targets specific routes/controllers. `.exclude()` exempts certain routes. Chain multiple middleware: `.apply(M1, M2, M3)`. Global middleware (Express-style) uses `app.use(helmet(), cors(), express.json())` in `main.ts` before listening.
