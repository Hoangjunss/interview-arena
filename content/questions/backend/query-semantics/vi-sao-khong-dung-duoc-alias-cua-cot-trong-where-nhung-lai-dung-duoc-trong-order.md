---
id: vi-sao-khong-dung-duoc-alias-cua-cot-trong-where-nhung-lai-dung-duoc-trong-order
position: backend
technology: query-semantics
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không dùng được alias của cột trong `WHERE` nhưng lại dùng được trong `ORDER BY`?

## Question (EN)
Why can't you use a column alias in `WHERE` but you can in `ORDER BY`?

## Đáp án chi tiết (VI)
Vì `WHERE` được đánh giá **trước** `SELECT`, còn `ORDER BY` được đánh giá **sau**. Khi `WHERE` chạy, alias chưa được tạo ra.\
\
```sql\
-- error: column \\"total\\" does not exist\
SELECT price * qty AS total\
FROM order_items\
WHERE total \u003e 100;\
\
-- ok: ORDER BY chạy sau SELECT\
SELECT price * qty AS total\
FROM order_items\
ORDER BY total DESC;\
```\
\
Ba cách sửa cho `WHERE`:\
\
```sql\
-- 1. lặp lại biểu thức\
SELECT price * qty AS total FROM order_items WHERE price * qty \u003e 100;\
\
-- 2. bọc bằng subquery / CTE\
SELECT * FROM (\
  SELECT price * qty AS total FROM order_items\
) t WHERE t.total \u003e 100;\
\
-- 3. LATERAL (PostgreSQL) để tính một lần\
SELECT c.total FROM order_items i\
CROSS JOIN LATERAL (SELECT i.price * i.qty AS total) c\
WHERE c.total \u003e 100;\
```\
\
Lặp lại biểu thức **không** làm chậm truy vấn: optimizer chỉ tính một lần. `GROUP BY` nằm giữa nên tuỳ hệ: MySQL và PostgreSQL cho phép alias trong `GROUP BY`, nhưng đó là phần mở rộng ngoài chuẩn.

## Detailed Answer (EN)
Because `WHERE` is evaluated **before** `SELECT`, while `ORDER BY` is evaluated **after**. When `WHERE` runs, the alias does not exist yet.\
\
```sql\
-- error: column \\"total\\" does not exist\
SELECT price * qty AS total\
FROM order_items\
WHERE total \u003e 100;\
\
-- ok: ORDER BY runs after SELECT\
SELECT price * qty AS total\
FROM order_items\
ORDER BY total DESC;\
```\
\
Three fixes for `WHERE`:\
\
```sql\
-- 1. repeat the expression\
SELECT price * qty AS total FROM order_items WHERE price * qty \u003e 100;\
\
-- 2. wrap in a subquery / CTE\
SELECT * FROM (\
  SELECT price * qty AS total FROM order_items\
) t WHERE t.total \u003e 100;\
\
-- 3. LATERAL (PostgreSQL) to compute it once\
SELECT c.total FROM order_items i\
CROSS JOIN LATERAL (SELECT i.price * i.qty AS total) c\
WHERE c.total \u003e 100;\
```\
\
Repeating the expression does **not** slow the query down: the optimizer evaluates it once. `GROUP BY` sits in between, so it is engine-specific: MySQL and PostgreSQL accept aliases there, but that is a non-standard extension.
