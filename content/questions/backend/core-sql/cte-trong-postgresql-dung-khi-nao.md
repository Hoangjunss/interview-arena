---
id: cte-trong-postgresql-dung-khi-nao
position: backend
technology: core-sql
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CTE trong PostgreSQL dùng khi nào?

## Question (EN)
When should you use CTEs in PostgreSQL?

## Đáp án chi tiết (VI)
CTE (mệnh đề `WITH`) cho phép đặt tên cho một subquery, để chẻ một query phức tạp thành từng bước dễ đọc — hoặc dùng kèm câu lệnh sửa dữ liệu. PostgreSQL hiện đại (từ bản 12) thường tự \\"inline\\" CTE để tối ưu, nhưng vẫn nên biết về việc materialization khi cần tinh chỉnh hiệu năng.\
```sql\
WITH paid_orders AS (\
  SELECT * FROM orders WHERE status = 'paid'\
)\
SELECT user_id, count(*) FROM paid_orders GROUP BY user_id;\
```\
Dùng CTE chủ yếu để query dễ đọc hơn; nếu hiệu năng quan trọng, hãy kiểm tra lại kế hoạch bằng `EXPLAIN`.

## Detailed Answer (EN)
A CTE (the `WITH` clause) lets you name a subquery to split a complex query into readable steps — or to participate in data-modifying statements. Modern PostgreSQL (since v12) usually \\"inlines\\" CTEs for optimization, but it's still worth knowing about materialization when tuning performance.\
```sql\
WITH paid_orders AS (\
  SELECT * FROM orders WHERE status = 'paid'\
)\
SELECT user_id, count(*) FROM paid_orders GROUP BY user_id;\
```\
Use CTEs mainly for readability; when performance matters, recheck the plan with `EXPLAIN`.
