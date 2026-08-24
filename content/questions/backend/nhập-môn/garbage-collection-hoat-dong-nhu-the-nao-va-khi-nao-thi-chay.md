---
id: garbage-collection-hoat-dong-nhu-the-nao-va-khi-nao-thi-chay
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Garbage collection hoạt động như thế nào và khi nào thì chạy?

## Question (EN)
What is garbage collection and when does it run?

## Đáp án chi tiết (VI)
Garbage collection tự động giải phóng bộ nhớ của các object không còn được tham chiếu. GC chạy khi áp lực bộ nhớ tăng cao, hệ thống sắp hết RAM, hoặc khi gọi tường minh `GC.Collect()`. Các object không còn accessible từ root references (stack, static fields) sẽ trở nên eligible để thu gom. GC là non-deterministic — dùng `IDisposable` cho tài nguyên cần cleanup ngay lập tức.

## Detailed Answer (EN)
Garbage collection automatically frees memory from unreachable objects. The GC runs when memory pressure increases, system memory runs low, or `GC.Collect()` is called explicitly. Objects unreachable from root references become eligible for collection. GC is non-deterministic — use `IDisposable` for resources requiring immediate cleanup.
