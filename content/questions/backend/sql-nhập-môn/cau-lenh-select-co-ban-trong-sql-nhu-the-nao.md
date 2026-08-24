---
id: cau-lenh-select-co-ban-trong-sql-nhu-the-nao
position: backend
technology: sql-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Câu lệnh SELECT cơ bản trong SQL như thế nào?

## Question (EN)
What does a basic SELECT statement look like in SQL?

## Đáp án chi tiết (VI)
Mẹo hiểu SELECT: SQL không chạy theo thứ tự bạn viết, mà theo thứ tự thực thi:\
\
`FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT`\
\
Hệ quả quan trọng: alias đặt trong `SELECT` (vd `price * 0.9 AS discounted`) **không dùng được trong `WHERE`** vì lúc WHERE chạy thì SELECT chưa tính — nhưng dùng được trong `ORDER BY` (chạy sau SELECT).\
\
Một query đầy đủ:\
```sql\
SELECT u.name, COUNT(o.id) AS order_count\
FROM users u LEFT JOIN orders o ON u.id = o.user_id\
WHERE u.created_at \u003e '2024-01-01'\
GROUP BY u.id, u.name\
HAVING COUNT(o.id) \u003e 5\
ORDER BY order_count DESC LIMIT 20;\
```\
Lưu ý hay bị hỏi: `LIMIT` mà không có `ORDER BY` cho kết quả không xác định (mỗi lần chạy ra hàng khác nhau). Và đừng `SELECT *` ở production — lấy thừa dữ liệu, vỡ khi thêm cột, không tận dụng được covering index.

## Detailed Answer (EN)
Key to understanding SELECT: SQL does not run in the order you write it, but in this execution order:\
\
`FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT`\
\
Important consequence: an alias defined in `SELECT` (e.g. `price * 0.9 AS discounted`) **cannot be used in `WHERE`** because WHERE runs before SELECT is computed — but it can be used in `ORDER BY` (which runs after SELECT).\
\
A full query:\
```sql\
SELECT u.name, COUNT(o.id) AS order_count\
FROM users u LEFT JOIN orders o ON u.id = o.user_id\
WHERE u.created_at \u003e '2024-01-01'\
GROUP BY u.id, u.name\
HAVING COUNT(o.id) \u003e 5\
ORDER BY order_count DESC LIMIT 20;\
```\
Common interview pitfall: `LIMIT` without `ORDER BY` gives non-deterministic results (different rows each run). And avoid `SELECT *` in production — it fetches extra data, breaks when columns are added, and can't use a covering index.
