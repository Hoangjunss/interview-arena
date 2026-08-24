---
id: node-js-single-threaded-tai-sao-van-handle-multiple-request-event-loop-explain
position: backend
technology: node.js-thực-tế
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Node.js single-threaded. Tại sao vẫn handle multiple request? Event loop explain.

## Question (EN)
Node.js is single-threaded. Why can it still handle multiple requests? Explain the event loop.

## Đáp án chi tiết (VI)
Node.js chạy JavaScript trên một thread duy nhất, nhưng vẫn xử lý được nhiều request đồng thời nhờ cơ chế non-blocking I/O và event loop. Khi có tác vụ I/O (đọc file, gọi database, HTTP request), Node.js giao cho libuv xử lý trong thread pool riêng và tiếp tục nhận request mới. Khi tác vụ I/O hoàn thành, callback được đưa vào event queue và event loop sẽ đẩy lên call stack khi stack trống.\
\
Tuy nhiên, nếu có tác vụ tính toán nặng (CPU-intensive) thì sẽ block main thread, lúc này cần dùng Worker Threads để chạy song song.

## Detailed Answer (EN)
Node.js runs JavaScript on a single thread but handles many concurrent requests through non-blocking I/O and the event loop. When an I/O task occurs (file read, database call, HTTP request), Node.js delegates it to libuv's thread pool and immediately continues accepting new requests. When the I/O completes, the callback is placed in the event queue; the event loop pushes it onto the call stack when the stack is empty. However, CPU-intensive tasks block the main thread — in those cases, use Worker Threads to run computation in parallel.
