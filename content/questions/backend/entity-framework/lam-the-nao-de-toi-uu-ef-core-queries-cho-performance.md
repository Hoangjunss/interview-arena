---
id: lam-the-nao-de-toi-uu-ef-core-queries-cho-performance
position: backend
technology: entity-framework
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để tối ưu EF Core queries cho performance?

## Question (EN)
How do you optimize EF Core queries for performance?

## Đáp án chi tiết (VI)
Tối ưu EF Core query xoay quanh giảm overhead tracking, giảm dữ liệu trả về và tránh N+1.\
\
- Dùng `.AsNoTracking()` cho read-only queries để tắt change tracking\
- Dùng `.Select()` projection thay vì load toàn bộ entity\
- Batch updates với `ExecuteUpdate()` và `ExecuteDelete()` thay vì load-modify-save\
- Dùng `.Include()` đúng chỗ để tránh N+1\
- Monitor SQL thực tế qua logging để phát hiện query xấu\
- Tạo index trên các cột được filter/sort thường xuyên

## Detailed Answer (EN)
EF Core optimization centers on reducing tracking overhead, returned data, and N+1 patterns.\
\
- Use `.AsNoTracking()` for read-only queries to disable change tracking\
- Use `.Select()` projections instead of loading entire entities\
- Batch updates with `ExecuteUpdate()` and `ExecuteDelete()` instead of load-modify-save\
- Use `.Include()` appropriately to avoid N+1\
- Monitor generated SQL via logging to spot bad queries\
- Add database indexes on frequently filtered or sorted columns
