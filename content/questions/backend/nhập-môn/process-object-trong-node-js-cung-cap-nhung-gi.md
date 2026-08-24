---
id: process-object-trong-node-js-cung-cap-nhung-gi
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
process object trong Node.js cung cấp những gì?

## Question (EN)
What does the process object provide in Node.js?

## Đáp án chi tiết (VI)
process là global object không cần require. `process.env`: chứa environment variables — KHÔNG bao giờ log toàn bộ `process.env` vì chứa secrets; validate với zod/envalid ngay startup để fail fast nếu thiếu. `process.argv`: array `[nodePath, scriptPath, ...userArgs]` — dùng `yargs` hoặc `commander` để parse thay vì thủ công. Signal handling: `process.on('SIGTERM', gracefulShutdown)` — xử lý khi container/PM2 dừng process (close DB connections, finish in-flight requests); `SIGINT` = Ctrl+C. `process.memoryUsage()` trả về `{ rss, heapTotal, heapUsed, external }` — monitor memory leaks bằng cách log định kỳ. `process.hrtime.bigint()` cho high-resolution timestamps (nanoseconds) để benchmark code. `process.exit(1)` exit với error code — quan trọng cho CI pipelines biết lệnh fail. `process.on('uncaughtException')` và `process.on('unhandledRejection')` — log error rồi `process.exit(1)`, không recover vì process state có thể corrupt.

## Detailed Answer (EN)
process is a global object requiring no `require`. `process.env`: contains environment variables — NEVER log the entire `process.env` as it contains secrets; validate with zod/envalid at startup to fail fast if anything is missing. `process.argv`: array `[nodePath, scriptPath, ...userArgs]` — use `yargs` or `commander` to parse instead of doing it manually. Signal handling: `process.on('SIGTERM', gracefulShutdown)` — handles when a container/PM2 stops the process (close DB connections, finish in-flight requests); `SIGINT` = Ctrl+C. `process.memoryUsage()` returns `{ rss, heapTotal, heapUsed, external }` — monitor memory leaks by logging periodically. `process.hrtime.bigint()` for high-resolution timestamps (nanoseconds) to benchmark code. `process.exit(1)` exits with an error code — important for CI pipelines to detect failures. `process.on('uncaughtException')` and `process.on('unhandledRejection')` — log the error then `process.exit(1)`, don't try to recover as process state may be corrupted.
