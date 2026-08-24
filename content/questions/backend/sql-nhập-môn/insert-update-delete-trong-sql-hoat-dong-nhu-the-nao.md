---
id: insert-update-delete-trong-sql-hoat-dong-nhu-the-nao
position: backend
technology: sql-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
INSERT, UPDATE, DELETE trong SQL hoạt động như thế nào?

## Question (EN)
How do INSERT, UPDATE, and DELETE work in SQL?

## Đáp án chi tiết (VI)
Ba lệnh cốt lõi để thay đổi dữ liệu. Vài kỹ thuật hữu ích:\
\
- **Bulk INSERT** (một round-trip thay vì N, nhanh hơn nhiều với lượng lớn):\
```sql\
INSERT INTO users (name, email) VALUES ('A', 'a@x.com'), ('B', 'b@x.com');\
```\
- **RETURNING** (PostgreSQL): lấy giá trị vừa sinh ra ngay, khỏi query lại — `INSERT INTO users (name) VALUES ('Dinh') RETURNING id, created_at`.\
- **ON CONFLICT** (upsert atomic, tránh race condition):\
```sql\
INSERT INTO settings (user_id, key, value) VALUES (1, 'theme', 'dark')\
ON CONFLICT (user_id, key) DO UPDATE SET value = EXCLUDED.value;\
```\
\
Quy tắc an toàn quan trọng nhất: **luôn chạy `SELECT` với cùng `WHERE` trước khi `UPDATE`/`DELETE`**. Một lệnh `UPDATE users SET active = false` quên `WHERE` sẽ cập nhật TOÀN BỘ bảng và không undo được nếu không có backup. Có thể dry run trong transaction: `BEGIN; DELETE ...; SELECT count(*); ROLLBACK;`.

## Detailed Answer (EN)
The three core commands for changing data. A few useful techniques:\
\
- **Bulk INSERT** (one round-trip instead of N, much faster at volume):\
```sql\
INSERT INTO users (name, email) VALUES ('A', 'a@x.com'), ('B', 'b@x.com');\
```\
- **RETURNING** (PostgreSQL): grab generated values immediately, no extra query — `INSERT INTO users (name) VALUES ('Dinh') RETURNING id, created_at`.\
- **ON CONFLICT** (atomic upsert, avoids race conditions):\
```sql\
INSERT INTO settings (user_id, key, value) VALUES (1, 'theme', 'dark')\
ON CONFLICT (user_id, key) DO UPDATE SET value = EXCLUDED.value;\
```\
\
The most important safety rule: **always run a `SELECT` with the same `WHERE` before an `UPDATE`/`DELETE`**. A `UPDATE users SET active = false` that forgets `WHERE` updates the ENTIRE table and cannot be undone without a backup. You can dry-run inside a transaction: `BEGIN; DELETE ...; SELECT count(*); ROLLBACK;`.
