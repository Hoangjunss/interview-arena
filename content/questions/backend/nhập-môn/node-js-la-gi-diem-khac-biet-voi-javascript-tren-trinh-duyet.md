---
id: node-js-la-gi-diem-khac-biet-voi-javascript-tren-trinh-duyet
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Node.js là gì? Điểm khác biệt với JavaScript trên trình duyệt?

## Question (EN)
What is Node.js? How does it differ from JavaScript in the browser?

## Đáp án chi tiết (VI)
Node.js chạy JS trên server nhờ V8 engine + libuv async I/O — không có DOM/window nhưng có fs/http/crypto; single-threaded event loop xử lý hàng nghìn concurrent connections hiệu quả. Node.js là runtime environment cho phép chạy JavaScript trên server, được xây dựng trên V8 engine của Chrome và thư viện C++ libuv xử lý async I/O. Khác biệt cốt lõi với browser JS: không có DOM, window, document, localStorage — thay vào đó có `fs` (đọc/ghi file), `http` (tạo server), `path`, `os`, `crypto` và hàng nghìn npm packages. Ví dụ thực tế: `const fs = require('fs'); fs.readFile('data.json', 'utf8', (err, data) =\u003e console.log(data))` — đây là code không thể chạy trong browser. Node.js dùng event loop single-threaded nên xử lý hàng nghìn concurrent connections hiệu quả với I/O-heavy workloads như API server, real-time chat. Không phù hợp cho CPU-intensive tasks như video encoding vì block event loop.

## Detailed Answer (EN)
Node.js runs JS on the server via V8 engine + libuv async I/O — no DOM/window but has fs/http/crypto; single-threaded event loop handles thousands of concurrent connections efficiently. Node.js is a runtime environment that allows JavaScript to run on the server, built on Chrome's V8 engine and the C++ library libuv for async I/O. Core differences from browser JS: no DOM, window, document, or localStorage — instead it provides `fs` (file read/write), `http` (create servers), `path`, `os`, `crypto`, and thousands of npm packages. Practical example: `const fs = require('fs'); fs.readFile('data.json', 'utf8', (err, data) =\u003e console.log(data))` — this code cannot run in a browser. Node.js uses a single-threaded event loop, making it efficient at handling thousands of concurrent connections for I/O-heavy workloads like API servers and real-time chat. It is not suitable for CPU-intensive tasks like video encoding because those block the event loop.
