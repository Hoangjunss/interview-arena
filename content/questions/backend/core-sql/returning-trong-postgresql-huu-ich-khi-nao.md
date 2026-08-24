---
id: returning-trong-postgresql-huu-ich-khi-nao
position: backend
technology: core-sql
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`RETURNING` trong PostgreSQL hữu ích khi nào?

## Question (EN)
When is `RETURNING` useful in PostgreSQL?

## Đáp án chi tiết (VI)
`RETURNING` cho phép `INSERT`, `UPDATE`, `DELETE`, `MERGE` trả về luôn các dòng vừa bị tác động, khỏi cần query lại lần nữa. Rất tiện để lấy id vừa sinh, ghi log dòng vừa đổi, hoặc cập nhật xong trả thẳng response cho client.\
```sql\
UPDATE orders\
SET status = 'paid'\
WHERE id = 42\
RETURNING id, status, updated_at;\
```\
Lợi ích kép: giảm số lần đi-về với DB, và tránh race condition — vì nếu ghi xong rồi query lại, dòng đó có thể đã bị transaction khác sửa trong khoảng giữa.

## Detailed Answer (EN)
`RETURNING` lets `INSERT`, `UPDATE`, `DELETE` and `MERGE` hand back the affected rows directly, with no second query. Handy for grabbing a generated id, logging the changed rows, or updating and returning the response straight to the client.\
```sql\
UPDATE orders\
SET status = 'paid'\
WHERE id = 42\
RETURNING id, status, updated_at;\
```\
Double benefit: fewer round trips to the DB, and it avoids a race condition — because if you write and then re-query, another transaction may have changed that row in between.
