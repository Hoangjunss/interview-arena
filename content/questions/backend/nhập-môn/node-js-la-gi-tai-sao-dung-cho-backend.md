---
id: node-js-la-gi-tai-sao-dung-cho-backend
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Node.js là gì? Tại sao dùng cho backend?

## Question (EN)
What is Node.js? Why use it for backend development?

## Đáp án chi tiết (VI)
Node.js là runtime JavaScript trên server, dùng V8 engine. Ưu điểm: non-blocking I/O xử lý nhiều requests đồng thời, cùng ngôn ngữ với frontend (JS) nên team dùng chung tooling và type definitions, npm ecosystem khổng lồ với hàng triệu packages, fit cho real-time apps (chat, notifications) nhờ event-driven model. Thường dùng cho API servers, microservices, BFF (Backend for Frontend) — không phù hợp CPU-intensive workloads (video encoding, ML inference) vì single-threaded event loop bị block.

## Detailed Answer (EN)
Node.js is a server-side JavaScript runtime powered by the V8 engine. Advantages: non-blocking I/O handles many concurrent requests, same language as the frontend (JS) lets the team share tooling and type definitions, a massive npm ecosystem with millions of packages, and excellent fit for real-time apps (chat, notifications) thanks to its event-driven model. Commonly used for API servers, microservices, and BFF (Backend for Frontend) layers — not suitable for CPU-intensive workloads (video encoding, ML inference) because the single-threaded event loop blocks.
