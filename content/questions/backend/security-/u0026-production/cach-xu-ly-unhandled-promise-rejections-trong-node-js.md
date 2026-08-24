---
id: cach-xu-ly-unhandled-promise-rejections-trong-node-js
position: backend
technology: security-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách xử lý unhandled Promise rejections trong Node.js?

## Question (EN)
How do you handle unhandled Promise rejections in Node.js?

## Đáp án chi tiết (VI)
Node.js 14 trở về trước: unhandled rejection chỉ print warning, process tiếp tục — silent failure nguy hiểm. Node.js 15+: mặc định crash process với exit code 1 — breaking change. Hierarchy xử lý đúng: (1) try/catch trong async functions là chính, (2) `.catch()` chain cho fire-and-forget promises, (3) `process.on('unhandledRejection', (reason) =\u003e { logger.error('Unhandled rejection', reason); gracefulShutdown(1); })` là safety net cuối — không phải cơ chế chính. `process.on('uncaughtException', (err) =\u003e { logger.error(err); gracefulShutdown(1); })` cho sync throws. Monitoring: gửi đến Sentry trước khi shutdown — `Sentry.captureException(reason); await Sentry.flush(2000)`. Graceful shutdown: stop accepting requests, wait for in-flight, close DB, exit. Dùng ESLint rule `@typescript-eslint/no-floating-promises` để catch missing awaits lúc compile time — tốt hơn runtime detection.

## Detailed Answer (EN)
Node.js 14 and earlier: unhandled rejections only print a warning and the process continues — silent failures are dangerous. Node.js 15+: crashes the process with exit code 1 by default — a breaking change. Proper handling hierarchy: (1) try/catch inside async functions is the primary mechanism, (2) `.catch()` chaining for fire-and-forget promises, (3) `process.on('unhandledRejection', (reason) =\u003e { logger.error('Unhandled rejection', reason); gracefulShutdown(1); })` as a final safety net — not the primary mechanism. `process.on('uncaughtException', (err) =\u003e { logger.error(err); gracefulShutdown(1); })` for synchronous throws. Monitoring: send to Sentry before shutting down — `Sentry.captureException(reason); await Sentry.flush(2000)`. Graceful shutdown: stop accepting requests, wait for in-flight requests, close DB connections, exit. Use the ESLint rule `@typescript-eslint/no-floating-promises` to catch missing awaits at compile time — better than runtime detection.
