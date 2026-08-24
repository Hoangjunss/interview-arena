---
id: middleware-trong-express-la-gi-cach-hoat-dong
position: backend
technology: express
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware trong Express là gì? Cách hoạt động?

## Question (EN)
What is middleware in Express? How does it work?

## Đáp án chi tiết (VI)
Middleware là function signature `(req, res, next)` thực thi tuần tự theo thứ tự đăng ký — thứ tự là tuyệt đối. App-level: `app.use(helmet())` áp dụng cho toàn bộ app. Router-level: `router.use(authMiddleware)` chỉ cho nhóm routes. Error-handling middleware có 4 tham số `(err, req, res, next)` phải đăng ký SAU tất cả routes. Third-party ecosystem: `helmet` (security headers), `morgan` (logging), `compression` (gzip), `passport` (auth strategies). Flow: `next()` chuyển sang middleware tiếp theo, `next(err)` nhảy thẳng tới error handler bỏ qua tất cả non-error middleware, không gọi `next()` và không `res.send()` thì request treo mãi. Lưu ý: đặt `express.json()` sau route handler → `req.body` undefined; đặt `cors()` sau route → preflight OPTIONS request trả 404.

## Detailed Answer (EN)
Middleware is a function with the signature `(req, res, next)` that executes sequentially in the order it is registered — the order is absolute. App-level: `app.use(helmet())` applies to the entire app. Router-level: `router.use(authMiddleware)` applies only to that group of routes. Error-handling middleware has 4 parameters `(err, req, res, next)` and must be registered AFTER all routes. Common third-party middleware: `helmet` (security headers), `morgan` (logging), `compression` (gzip), `passport` (auth strategies). Flow: `next()` passes control to the next middleware, `next(err)` jumps directly to the error handler skipping all non-error middleware, and not calling either `next()` or `res.send()` leaves the request hanging indefinitely. Pitfall: placing `express.json()` after a route handler means `req.body` is undefined for that route; placing `cors()` after routes means preflight OPTIONS requests return 404.
