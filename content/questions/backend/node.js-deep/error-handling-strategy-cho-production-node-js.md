---
id: error-handling-strategy-cho-production-node-js
position: backend
technology: node.js-deep
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error handling strategy cho production Node.js?

## Question (EN)
What is the error handling strategy for a production Node.js app?

## Đáp án chi tiết (VI)
Trong production Node.js, cần phân biệt rõ hai loại lỗi để xử lý khác nhau. Operational errors là lỗi dự kiến được như user gửi data sai (400), không có quyền (401), hoặc resource không tồn tại (404) — xử lý gracefully bằng cách trả HTTP status phù hợp và message rõ ràng.\
\
Programming errors là bugs thật sự như TypeError hay null reference — cách tốt nhất là để process crash rồi tự restart bằng PM2 hoặc Docker, vì app đang ở trạng thái không xác định. Cần có global handlers `process.on('uncaughtException')` và `process.on('unhandledRejection')` để log lỗi trước khi crash.\
\
Kết hợp logging library như Winston hoặc Pino với log levels (error, warn, info, debug) và format JSON để dễ parse bởi log aggregators.

## Detailed Answer (EN)
In production Node.js, distinguish between two types of errors. Operational errors are expected failures like invalid user input (400), unauthorized (401), or missing resource (404) — handle gracefully by returning the appropriate HTTP status and a clear message. Programming errors are real bugs like TypeError or null reference — the best approach is to let the process crash and auto-restart via PM2 or Docker, since the app is in an indeterminate state and continuing to run may cause worse problems. Add global handlers `process.on('uncaughtException')` and `process.on('unhandledRejection')` to log errors before crashing. Use a logging library like Winston or Pino with log levels (error, warn, info, debug) and JSON format for easy parsing by log aggregators.
