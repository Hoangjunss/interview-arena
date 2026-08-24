---
id: linux-signals-la-gi-cac-signal-quan-trong-va-cach-handle-graceful-shutdown
position: backend
technology: memory-\u0026-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Linux signals là gì? Các signal quan trọng và cách handle graceful shutdown?

## Question (EN)
What are Linux signals? What are the important signals and how do you implement graceful shutdown?

## Đáp án chi tiết (VI)
Signal là cơ chế notification asynchronous mà OS hoặc process khác gửi đến process: SIGTERM (15, terminate request — default cho `kill PID`), SIGKILL (9, force kill — không thể catch/ignore), SIGINT (2, Ctrl+C), SIGHUP (1, terminal closed/reload config), SIGUSR1/SIGUSR2 (user-defined, Node.js dùng SIGUSR1 để enable debugger), SIGCHLD (child process terminated), SIGPIPE (write to broken pipe).\
\
Graceful shutdown là critical trong production: khi nhận SIGTERM, server stop accepting new connections, drain in-flight requests, close DB connections, flush logs — rồi mới exit. Node.js graceful shutdown: `process.on('SIGTERM', async () =\u003e { await server.close(); await db.disconnect(); process.exit(0); })`.\
\
Kubernetes gửi SIGTERM trước khi terminationGracePeriodSeconds (default 30s), sau đó gửi SIGKILL — phải handle SIGTERM để zero-downtime deploy. Go: `signal.NotifyContext(ctx, syscall.SIGTERM)` để propagate cancellation đến tất cả goroutines khi nhận signal.

## Detailed Answer (EN)
$83
