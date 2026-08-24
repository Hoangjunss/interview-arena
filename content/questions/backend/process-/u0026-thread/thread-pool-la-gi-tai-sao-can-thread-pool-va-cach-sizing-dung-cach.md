---
id: thread-pool-la-gi-tai-sao-can-thread-pool-va-cach-sizing-dung-cach
position: backend
technology: process-\u0026-thread
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thread pool là gì? Tại sao cần thread pool và cách sizing đúng cách?

## Question (EN)
What is a thread pool? Why is it needed and how do you size it correctly?

## Đáp án chi tiết (VI)
Thread pool là tập hợp các worker threads được tạo sẵn và tái sử dụng, thay vì tạo/hủy thread mới cho mỗi task — vì tạo thread tốn ~1MB stack, time để OS allocate, và context switch overhead. Hoạt động: task queue nhận công việc, worker thread nhàn rỗi lấy task từ queue, thực thi, rồi chờ task tiếp theo. ThreadPoolExecutor (Java), `worker_threads` pool (Node.js), Goroutine worker pattern (Go). Sizing là bài toán quan trọng: với CPU-bound tasks, pool size = số CPU cores (thêm thread không giúp, chỉ tốn context switch); với I/O-bound tasks, pool size lớn hơn số CPU (vì thread chờ I/O không chiếm CPU) — formula tham khảo: `threads = cores * (1 + wait_time/service_time)`. Pool quá nhỏ: task queue dài, high latency. Pool quá lớn: memory tốn kém, nhiều context switch, performance giảm. Java Tomcat default pool size 200; Node.js libuv I/O thread pool default 4 (UV_THREADPOOL_SIZE).

## Detailed Answer (EN)
$87
