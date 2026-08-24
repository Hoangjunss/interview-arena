---
id: libuv-la-gi-vai-tro-trong-node-js
position: backend
technology: async-\u0026-event-loop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Libuv là gì? Vai trò trong Node.js?

## Question (EN)
What is libuv? What role does it play in Node.js?

## Đáp án chi tiết (VI)
Libuv là C library đa nền tảng cung cấp event loop, async I/O và thread pool cho Node.js. Hai loại operations: (1) OS-native async (không dùng thread pool): network I/O (TCP/UDP) — dùng epoll (Linux), kqueue (macOS), IOCP (Windows), cực efficient; (2) Thread pool operations (dùng 4 threads mặc định vì OS không hỗ trợ async đầy đủ): file system I/O (fs.readFile), DNS lookup (dns.lookup — không phải dns.resolve), crypto operations (pbkdf2, scrypt, randomBytes). Thread pool size: tăng bằng env var `UV_THREADPOOL_SIZE=16` (max 1024) — quan trọng khi app làm nhiều file I/O hoặc crypto đồng thời, 4 threads mặc định tạo bottleneck. Ví dụ vấn đề: app gọi 10 `dns.lookup()` đồng thời, 4 threads xử lý 4 cái, 6 cái còn lại queue — tăng UV_THREADPOOL_SIZE hoặc dùng `dns.resolve()` (network I/O, không dùng thread pool). Libuv abstract sự khác biệt giữa OS — cùng Node.js code chạy trên Linux epoll và Windows IOCP mà không cần sửa.

## Detailed Answer (EN)
libuv is a cross-platform C library providing the event loop, async I/O, and thread pool for Node.js. Two types of operations: (1) OS-native async (no thread pool): network I/O (TCP/UDP) — uses epoll (Linux), kqueue (macOS), IOCP (Windows), extremely efficient; (2) Thread pool operations (uses 4 threads by default because the OS doesn't fully support async): file system I/O (fs.readFile), DNS lookup (dns.lookup — not dns.resolve), crypto operations (pbkdf2, scrypt, randomBytes). Thread pool size: increase via `UV_THREADPOOL_SIZE=16` env var (max 1024) — important when the app does lots of concurrent file I/O or crypto; the default 4 threads creates a bottleneck. Example problem: app makes 10 concurrent `dns.lookup()` calls, 4 threads handle 4, the other 6 are queued — increase UV_THREADPOOL_SIZE or use `dns.resolve()` (network I/O, doesn't use the thread pool). libuv abstracts OS differences — the same Node.js code runs on Linux epoll and Windows IOCP without changes.
