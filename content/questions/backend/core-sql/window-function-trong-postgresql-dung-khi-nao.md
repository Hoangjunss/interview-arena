---
id: window-function-trong-postgresql-dung-khi-nao
position: backend
technology: core-sql
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Window function trong PostgreSQL dùng khi nào?

## Question (EN)
When should you use window functions in PostgreSQL?

## Đáp án chi tiết (VI)
Window function tính toán dựa trên một nhóm dòng liên quan nhưng *không gộp* các dòng lại như `GROUP BY` — bạn vẫn giữ từng dòng và có thêm cột tính toán. Hợp với xếp hạng, cộng dồn (running total), trung bình trượt, khử trùng lặp, hay so dòng hiện tại với dòng trước.\
\
Ví dụ lấy đơn mới nhất của mỗi user (đánh số trong từng nhóm rồi giữ số 1):\
```sql\
SELECT * FROM (\
  SELECT orders.*, row_number() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn\
  FROM orders\
) t\
WHERE rn = 1;\
```\
Nó thường giúp tránh query N+1 hoặc phải xử lý xếp hạng thủ công ở tầng app.

## Detailed Answer (EN)
A window function computes over a group of related rows but does *not* collapse them like `GROUP BY` — you keep every row and gain a computed column. It fits ranking, running totals, moving averages, deduplication, or comparing the current row with a previous one.\
\
Example getting each user's latest order (number rows within each group, keep number 1):\
```sql\
SELECT * FROM (\
  SELECT orders.*, row_number() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn\
  FROM orders\
) t\
WHERE rn = 1;\
```\
It often avoids N+1 queries or doing ranking logic by hand in app code.
