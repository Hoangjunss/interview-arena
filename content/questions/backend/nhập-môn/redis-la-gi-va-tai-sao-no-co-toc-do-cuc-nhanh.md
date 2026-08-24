---
id: redis-la-gi-va-tai-sao-no-co-toc-do-cuc-nhanh
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis là gì và tại sao nó có tốc độ cực nhanh?

## Question (EN)
What is Redis and why is it extremely fast?

## Đáp án chi tiết (VI)
Redis (Remote Dictionary Server) là in-memory data structure store, thường được dùng làm cache, message broker, và session store. Redis nhanh vì toàn bộ data được lưu trong RAM — tốc độ đọc/ghi RAM nhanh hơn disk hàng nghìn lần. Ngoài ra, Redis dùng I/O multiplexing (epoll/kqueue) với event loop tương tự Node.js, tránh được overhead của context switching và lock contention. Command execution vẫn single-threaded để đảm bảo atomicity. Redis 7.x dùng multi-threaded I/O theo mặc định cho network (đọc/ghi socket), vẫn single-threaded cho command execution để tránh race condition. Benchmark thông thường: Redis đạt 100,000-1,000,000 ops/giây tùy loại operation và hardware.

## Detailed Answer (EN)
Redis (Remote Dictionary Server) is an in-memory data structure store commonly used as a cache, message broker, and session store. It is fast because all data resides in RAM — RAM read/write speeds are thousands of times faster than disk. Additionally, Redis uses I/O multiplexing (epoll/kqueue) with a non-blocking event loop similar to Node.js, avoiding context switching and lock contention overhead. Command execution remains single-threaded to guarantee atomicity. Redis 7.x uses multi-threaded I/O by default for network reads and writes, while keeping command processing single-threaded to prevent race conditions. Typical benchmarks: Redis achieves 100,000–1,000,000 ops/second depending on operation type and hardware.
