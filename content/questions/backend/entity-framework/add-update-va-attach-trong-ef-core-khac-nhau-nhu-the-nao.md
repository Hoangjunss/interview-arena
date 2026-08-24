---
id: add-update-va-attach-trong-ef-core-khac-nhau-nhu-the-nao
position: backend
technology: entity-framework
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Add`, `Update`, và `Attach` trong EF Core khác nhau như thế nào?

## Question (EN)
What is the difference between Add, Update, and Attach in EF Core?

## Đáp án chi tiết (VI)
`Add()` đánh dấu entity là mới (INSERT khi SaveChanges). `Update()` đánh dấu là đã sửa đổi (UPDATE). `Attach()` thêm vào context mà không đánh dấu modified — chỉ lưu khi properties thực sự thay đổi. Dùng `Add` cho entity mới, `Update` cho detached entity cần thay thế toàn bộ, `Attach` cho batch updates có chọn lọc.

## Detailed Answer (EN)
`Add()` marks the entity as new (INSERT on SaveChanges). `Update()` marks it as modified (UPDATE). `Attach()` adds to the context without marking modified — only saves when properties actually change. Use `Add` for new entities, `Update` for detached entities you are replacing entirely, `Attach` for selective batch updates.
