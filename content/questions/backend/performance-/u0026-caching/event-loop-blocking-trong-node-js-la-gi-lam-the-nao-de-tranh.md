---
id: event-loop-blocking-trong-node-js-la-gi-lam-the-nao-de-tranh
position: backend
technology: performance-\u0026-caching
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event loop blocking trong Node.js là gì? Làm thế nào để tránh?

## Question (EN)
What is event loop blocking in Node.js? How do you avoid it?

## Đáp án chi tiết (VI)
Event loop blocking: synchronous code chiếm CPU lâu khiến event loop không xử lý được I/O callbacks, timers, requests khác. Ví dụ thực tế: (1) `JSON.parse(fs.readFileSync('huge.json'))` — 200MB JSON parse tốn ~2s block hoàn toàn; (2) regex backtracking — `/^(a+)+$/.test('aaaaaaaaab')` chạy exponential time với input độc hại (ReDoS); (3) crypto sync — `crypto.pbkdf2Sync()` trong request handler; (4) nested loops O(n²) trên large arrays. Đo blocking: `node --prof app.js` tạo V8 profile; `clinic doctor -- node app.js` từ clinic.js package hiển thị event loop lag rõ ràng; `perf_hooks` API đo `eventLoopUtilization()`. Fix: chia nhỏ task với `setImmediate()` để yield event loop gi"])</script><script>self.__next_f.push([1,"ữa chunks; offload sang Worker Threads cho CPU-intensive; dùng streaming thay vì load toàn bộ vào memory; `safe-regex` package detect ReDoS vulnerable patterns. Threshold: bất kỳ synchronous operation \u003e 10ms trong request handler là vấn đề cần xem xét.

## Detailed Answer (EN)
$86
