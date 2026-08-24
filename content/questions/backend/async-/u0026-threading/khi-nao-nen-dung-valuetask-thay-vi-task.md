---
id: khi-nao-nen-dung-valuetask-thay-vi-task
position: backend
technology: async-\u0026-threading
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng `ValueTask` thay vì `Task`?

## Question (EN)
When should you use ValueTask instead of Task?

## Đáp án chi tiết (VI)
Dùng `ValueTask\u003cT\u003e` khi method thường xuyên hoàn thành synchronously — tránh được allocation overhead của heap-allocated Task object và giảm GC pressure. Ít hữu ích hơn cho I/O-bound work luôn async. Hãy benchmark để xác nhận cải thiện thực sự trước khi áp dụng. `ValueTask` cần xử lý cẩn thận — không được await nhiều lần và không được dùng trong các context phức tạp.

## Detailed Answer (EN)
Use `ValueTask\u003cT\u003e` when methods frequently complete synchronously — it eliminates the allocation overhead of heap-allocated Task objects, reducing GC pressure. It is less beneficial for I/O-bound work that is always async. Benchmark to confirm real gains before adopting. `ValueTask` requires careful handling: never await it more than once or use it in complex shared contexts.
