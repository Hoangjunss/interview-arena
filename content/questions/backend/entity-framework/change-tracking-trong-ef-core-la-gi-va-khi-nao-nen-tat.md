---
id: change-tracking-trong-ef-core-la-gi-va-khi-nao-nen-tat
position: backend
technology: entity-framework
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Change tracking trong EF Core là gì và khi nào nên tắt?

## Question (EN)
What is change tracking in EF Core and when should you disable it?

## Đáp án chi tiết (VI)
Change tracking theo dõi các entity đã tải, phát hiện sửa đổi trong quá trình `SaveChanges()`. Tính năng này tiêu tốn bộ nhớ và xử lý. Tắt bằng `.AsNoTracking()` khi đọc dữ liệu mà không có ý định sửa. Cho bulk operations, dùng `ExecuteUpdate()` và `ExecuteDelete()` để bypass tracking hoàn toàn. Cân bằng giữa overhead của tracking và sự tiện lợi của `SaveChanges()`.

## Detailed Answer (EN)
Change tracking monitors loaded entities, detecting modifications during `SaveChanges()`. It consumes memory and processing overhead. Disable it with `.AsNoTracking()` when reading data without intending to modify it. For bulk operations, use `ExecuteUpdate()` and `ExecuteDelete()` which bypass tracking entirely. Balance the tracking overhead against the convenience of automatic `SaveChanges()`.
