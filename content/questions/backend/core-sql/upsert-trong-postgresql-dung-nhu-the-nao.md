---
id: upsert-trong-postgresql-dung-nhu-the-nao
position: backend
technology: core-sql
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`UPSERT` trong PostgreSQL dùng như thế nào?

## Question (EN)
How do you use UPSERT in PostgreSQL?

## Đáp án chi tiết (VI)
UPSERT = \\"update nếu đã có, insert nếu chưa\\". Trong PostgreSQL viết bằng `INSERT ... ON CONFLICT`: khi câu insert đụng một unique constraint/index, bạn bảo nó update thay vì báo lỗi (hoặc bỏ qua).\
```sql\
INSERT INTO users (email, name)\
VALUES ('a@example.com', 'Ada')\
ON CONFLICT (email) DO UPDATE\
SET name = EXCLUDED.name;\
```\
`EXCLUDED` là dòng đáng lẽ được insert. Cần chỉ rõ cột gây xung đột (conflict target). Với logic phức tạp, để ý race condition, trigger phụ và việc cập nhật `updated_at`.

## Detailed Answer (EN)
UPSERT = \\"update if it exists, insert if not\\". In PostgreSQL you write it as `INSERT ... ON CONFLICT`: when the insert hits a unique constraint/index, you tell it to update instead of erroring (or to do nothing).\
```sql\
INSERT INTO users (email, name)\
VALUES ('a@example.com', 'Ada')\
ON CONFLICT (email) DO UPDATE\
SET name = EXCLUDED.name;\
```\
`EXCLUDED` is the row that would have been inserted. You must name the conflicting column (the conflict target). For complex logic, watch race conditions, extra triggers and updating `updated_at`.
