---
id: error-handling-middleware-trong-express-hoat-dong-nhu-the-nao
position: backend
technology: express
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error handling middleware trong Express hoạt động như thế nào?

## Question (EN)
How does error handling middleware work in Express?

## Đáp án chi tiết (VI)
Error handling middleware có 4 tham số `(err, req, res, next)` — phải đăng ký CUỐI CÙNG sau tất cả routes. Pattern tốt nhất: tạo custom AppError class `class AppError extends Error { constructor(public statusCode: number, message: string, public isOperational = true) { super(message) } }` — phân biệt operational errors (404, validation fail — dự đoán được) vs programming errors (null reference — bugs). Async error wrapper để tránh try/catch lặp lại: `const asyncHandler = (fn) =\u003e (req, res, next) =\u003e Promise.resolve(fn(req, res, next)).catch(next)`. Centralized error handler kiểm tra `err.isOperational`: nếu true thì gửi message cho client, nếu false thì log và trả 500 generic. Express 5 async routes tự động forward error nên không cần wrapper nữa. Lưu ý: quên `next` tham số thứ 4 → Express không nhận ra là error handler. Không gọi `next()` sau `res.json()` trong error handler → double response error.

## Detailed Answer (EN)
Error handling middleware has 4 parameters `(err, req, res, next)` — it MUST be registered LAST, after all routes. Best pattern: create a custom AppError class `class AppError extends Error { constructor(public statusCode: number, message: string, public isOperational = true) { super(message) } }` — distinguishes operational errors (404, validation fail — expected) from programming errors (null reference — bugs). Async error wrapper to avoid repeated try/catch: `const asyncHandler = (fn) =\u003e (req, res, next) =\u003e Promise.resolve(fn(req, res, next)).catch(next)`. The centralized error handler checks `err.isOperational`: if true, send the message to the client; if false, log it and return a generic 500. Express 5 automatically forwards async errors so no wrapper is needed. Pitfall: forgetting the 4th `next` parameter means Express won't recognize it as an error handler. Not calling `next()` after `res.json()` in the error handler leads to a double-response error.
