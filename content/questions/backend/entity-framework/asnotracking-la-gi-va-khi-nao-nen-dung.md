---
id: asnotracking-la-gi-va-khi-nao-nen-dung
position: backend
technology: entity-framework
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`AsNoTracking()` là gì và khi nào nên dùng?

## Question (EN)
What is AsNoTracking() in EF Core and when should you use it?

## Đáp án chi tiết (VI)
`AsNoTracking()` tắt change tracking của Entity Framework cho các entity được truy vấn. Mặc định, EF theo dõi mọi entity để phát hiện thay đổi khi `SaveChanges()` được gọi — điều này tiêu tốn bộ nhớ và CPU. Với các query read-only, dùng `.AsNoTracking()` để cải thiện hiệu năng và giảm memory usage. Áp dụng bất cứ khi nào bạn đọc dữ liệu mà không có ý định sửa đổi.

## Detailed Answer (EN)
`AsNoTracking()` disables Entity Framework change tracking for retrieved entities. Default tracking detects modifications during `SaveChanges()` but consumes memory and processing overhead. For read-only queries, add `.AsNoTracking()` to improve performance and reduce memory usage. Use it whenever you read data without intending to modify it.
