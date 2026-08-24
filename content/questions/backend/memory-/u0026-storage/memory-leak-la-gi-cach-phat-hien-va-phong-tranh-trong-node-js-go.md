---
id: memory-leak-la-gi-cach-phat-hien-va-phong-tranh-trong-node-js-go
position: backend
technology: memory-\u0026-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Memory leak là gì? Cách phát hiện và phòng tránh trong Node.js/Go?

## Question (EN)
What is a memory leak? How do you detect and prevent it in Node.js/Go?

## Đáp án chi tiết (VI)
Memory leak xảy ra khi program allocate memory nhưng không release, dần dần RSS tăng cho đến khi OOM.\
\
Nguyên nhân phổ biến:\
- global/module-level variables tích lũy data.\
- event listeners không được removeListener.\
- closures capture large objects.\
- circular references (trong ngôn ngữ reference-counted).\
- unbounded cache/map.\
- timer setInterval không clearInterval.\
\
Trong Node.js: dùng `node --inspect` + Chrome DevTools Memory tab để heap snapshot và so sánh; `clinic.js heapprofiler` cho production; `process.memoryUsage().heapUsed` monitor; `WeakMap`/`WeakRef` cho cache để GC tự thu dọn khi key không còn reference.\
\
Trong Go: goroutine leak (goroutine blocked trên channel mãi mãi, không bao giờ exit) là phổ biến hơn memory leak; dùng `pprof` heap/goroutine profiler; `runtime.ReadMemStats` để monitor.\
\
Best practice: giới hạn size của in-memory cache; dùng context cancellation để goroutines tự cleanup; integration test monitor memory growth theo thời gian.

## Detailed Answer (EN)
$88
