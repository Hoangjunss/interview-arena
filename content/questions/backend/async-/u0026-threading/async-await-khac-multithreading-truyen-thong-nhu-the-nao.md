---
id: async-await-khac-multithreading-truyen-thong-nhu-the-nao
position: backend
technology: async-\u0026-threading
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Async/await khác multithreading truyền thống như thế nào?

## Question (EN)
What is the difference between async/await and traditional multithreading?

## Đáp án chi tiết (VI)
Async/await xử lý I/O operations hiệu quả mà không block thread — thread được giải phóng trong lúc chờ và được trả lại thread pool. Multithreading tạo thread mới (tốn khoảng 1MB stack mỗi thread). Async phù hợp và scalable hơn cho I/O-bound work (web request, database calls). Dùng threading cho CPU-bound work cần song song hóa thực sự.

## Detailed Answer (EN)
Async/await handles I/O operations efficiently without blocking threads — threads are freed during waits and returned to the thread pool. Multithreading creates new threads (~1MB stack each). Async is cleaner and more scalable for I/O-bound workloads (web requests, database calls). Use multithreading for CPU-bound work requiring true parallelism.
