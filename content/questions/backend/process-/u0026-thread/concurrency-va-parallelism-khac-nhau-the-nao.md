---
id: concurrency-va-parallelism-khac-nhau-the-nao
position: backend
technology: process-\u0026-thread
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Concurrency và Parallelism khác nhau thế nào?

## Question (EN)
How do Concurrency and Parallelism differ?

## Đáp án chi tiết (VI)
Concurrency là khả năng xử lý nhiều task đồng thời về mặt logic — các task có thể interleave nhau (chạy một ít rồi nhường, rồi lại chạy) nhưng không nhất thiết cùng lúc trên nhiều CPU. Parallelism là thực sự chạy nhiều task cùng một lúc trên nhiều CPU core. Rob Pike (Go): 'Concurrency là về cấu trúc, Parallelism là về thực thi.' \
\
**Ví dụ:** Node.js event loop là concurrent nhưng không parallel (single-threaded) — handle 10,000 I/O operations concurrently nhờ non-blocking I/O, nhưng chỉ 1 lúc chạy 1 JavaScript callback. Go runtime chạy goroutines concurrently VÀ parallel: GOMAXPROCS goroutines có thể thực sự chạy song song trên nhiều OS thread. Thực tế lập trình: concurrency giải quyết throughput (nhiều I/O operations); parallelism giải quyết CPU-bound tasks (image processing, ML inference). Async/await trong JavaScript/Python là concurrency pattern, không phải parallelism.

## Detailed Answer (EN)
Concurrency is the ability to handle multiple tasks logically at the same time — tasks may interleave (run a bit, yield, then resume) but do not necessarily execute simultaneously on multiple CPUs. Parallelism means actually executing multiple tasks at the same instant on multiple CPU cores. Rob Pike (Go): \\"Concurrency is about structure, parallelism is about execution.\\" \
\
**Example:** the Node.js event loop is concurrent but not parallel (single-threaded) — it handles 10,000 I/O operations concurrently via non-blocking I/O, but only one JavaScript callback runs at a time. The Go runtime runs goroutines both concurrently AND in parallel: up to GOMAXPROCS goroutines can truly run simultaneously across multiple OS threads. In practice: concurrency addresses throughput (many I/O operations); parallelism addresses CPU-bound tasks (image processing, ML inference). Async/await in JavaScript and Python is a concurrency pattern, not parallelism.
