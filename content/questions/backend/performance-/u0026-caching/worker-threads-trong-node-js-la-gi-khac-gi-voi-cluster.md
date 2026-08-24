---
id: worker-threads-trong-node-js-la-gi-khac-gi-voi-cluster
position: backend
technology: performance-\u0026-caching
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Worker Threads trong Node.js là gì? Khác gì với Cluster?

## Question (EN)
What are Worker Threads in Node.js? How do they differ from Cluster?

## Đáp án chi tiết (VI)
Worker Threads chạy JS trong separate threads trong cùng process — chia sẻ memory qua SharedArrayBuffer, dùng Atomics để synchronize. Cluster tạo separate OS processes — không share memory, overhead IPC cao hơn. Worker Threads API: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')`. Main thread: `new Worker('./worker.js', { workerData: { input } })`, lắng nghe `worker.on('message', result =\u003e ...)`. Worker thread: `parentPort.postMessage(result)`. Message passing qua `postMessage()` — data được structured clone (deep copy) trừ khi transfer ownership với Transferable (ArrayBuffer). SharedArrayBuffer + Atomics: chia sẻ raw memory không cần copy — dùng cho real-time collaboration, game state. Use cases thực tế: image resizing (sharp library), PDF generation, crypto operations, ML inference, large JSON parsing. Lưu ý: Worker Threads không tăng tốc I/O-bound tasks — Node.js event loop đã xử lý I/O async; chỉ dùng cho CPU-bound tasks chiếm event loop \u003e 10ms.

## Detailed Answer (EN)
$87
