---
id: threading-vs-multiprocessing-vs-asyncio-khi-nao-dung-cai-nao
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Threading vs Multiprocessing vs Asyncio — khi nào dùng cái nào?

## Question (EN)
Threading vs Multiprocessing vs Asyncio — when to use each?

## Đáp án chi tiết (VI)
Dùng `asyncio` cho I/O-bound với nhiều concurrent operations (web APIs, DB queries) — single thread, cooperative concurrency, overhead thấp nhất. Dùng `threading` cho I/O-bound với thư viện blocking không hỗ trợ async. Dùng `multiprocessing` cho CPU-bound (ML training, image processing, data transformation) — bypass GIL, chạy trên nhiều CPU cores thực sự, nhưng overhead cao hơn (IPC, memory). Lưu ý: `asyncio` không giúp gì cho CPU-bound — dùng `ProcessPoolExecutor` kết hợp với asyncio.

## Detailed Answer (EN)
Use `asyncio` for I/O-bound with many concurrent ops (web APIs, DB) — single thread, lowest overhead. Use `threading` for I/O-bound with blocking libraries. Use `multiprocessing` for CPU-bound (ML, image processing) — bypasses GIL, true parallelism. Pitfall: asyncio does not help CPU-bound work — combine with ProcessPoolExecutor.
