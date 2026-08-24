---
id: n-1-query-voi-postgresql-thuong-xu-ly-the-nao
position: backend
technology: indexing-\u0026-query-planning
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
N+1 query với PostgreSQL thường xử lý thế nào?

## Question (EN)
How do you usually handle N+1 queries with PostgreSQL?

## Đáp án chi tiết (VI)
N+1 là khi app chạy 1 query lấy danh sách, rồi lặp qua từng phần tử và bắn thêm 1 query con cho mỗi phần tử — 100 dòng thành 101 query, chậm nghiêm trọng. Cách xử lý: join/preload, gom thành một batch query với `WHERE id = ANY(...)`, gộp JSON ngay trong SQL nếu cần, hoặc dùng pattern DataLoader ở GraphQL.\
\
Ví dụ lấy gộp một lần:\
```sql\
SELECT * FROM order_items\
WHERE order_id = ANY($1);\
```\
Điều quan trọng là *đo* số query và latency theo mỗi request. Index đúng cũng không cứu nổi nếu app bắn hàng nghìn query nhỏ.

## Detailed Answer (EN)
N+1 is when the app runs 1 query for a list, then loops over each item firing 1 more query per item — 100 rows become 101 queries, terribly slow. Fixes: join/preload, batch into one query with `WHERE id = ANY(...)`, aggregate JSON in SQL when needed, or the DataLoader pattern in GraphQL.\
\
Batched example:\
```sql\
SELECT * FROM order_items\
WHERE order_id = ANY($1);\
```\
The key is to *measure* query count and latency per request. Correct indexes still can't save an app that fires thousands of tiny queries.
