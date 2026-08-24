---
id: partial-index-dung-khi-nao
position: backend
technology: indexing-\u0026-query-planning
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Partial index dùng khi nào?

## Question (EN)
When should you use a partial index?

## Đáp án chi tiết (VI)
Partial index chỉ index những dòng thỏa một điều kiện, thay vì cả bảng. Rất hợp khi query thường chỉ quan tâm một phần nhỏ: bản ghi đang active, job chưa xử lý, hay dòng chưa bị xóa mềm.\
\
Ví dụ ép email duy nhất, nhưng chỉ với user chưa bị xóa mềm:\
```sql\
CREATE UNIQUE INDEX idx_users_email_active\
ON users (email)\
WHERE deleted_at IS NULL;\
```\
Vì nhỏ hơn nên nó nhanh và rẻ hơn index toàn bảng — nhưng database chỉ dùng được nó khi điều kiện trong query khớp với điều kiện `WHERE` của index.

## Detailed Answer (EN)
A partial index indexes only rows matching a condition instead of the whole table. It fits well when queries usually care about a small subset: active records, unprocessed jobs, or rows not yet soft-deleted.\
\
Example — enforce unique email, but only for non-soft-deleted users:\
```sql\
CREATE UNIQUE INDEX idx_users_email_active\
ON users (email)\
WHERE deleted_at IS NULL;\
```\
Being smaller, it is faster and cheaper than a full-table index — but the database can only use it when the query's condition matches the index's `WHERE` clause.
