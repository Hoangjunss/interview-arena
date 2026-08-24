---
id: task-va-thread-khac-nhau-nhu-the-nao-trong-c
position: backend
technology: async-\u0026-threading
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Task và Thread khác nhau như thế nào trong C#?

## Question (EN)
What is the difference between Task and Thread in C#?

## Đáp án chi tiết (VI)
Thread là OS construct cấp thấp tiêu tốn tài nguyên đáng kể (~1MB stack). Task là abstraction cấp cao đại diện cho công việc bất đồng bộ, được tối ưu cho I/O. Task dùng thread pool để hiệu quả hơn. `Task.Run()` tạo background task từ thread pool. Dùng Task cho async patterns; dùng Thread khi thực sự cần kiểm soát thread (background worker với state riêng).

## Detailed Answer (EN)
Thread is a low-level OS construct consuming significant resources (~1MB stack). Task is a high-level abstraction representing async work, optimized for I/O operations and backed by the thread pool. `Task.Run()` creates background tasks from the thread pool. Use Task for async patterns; use Thread only when you need explicit thread control.
