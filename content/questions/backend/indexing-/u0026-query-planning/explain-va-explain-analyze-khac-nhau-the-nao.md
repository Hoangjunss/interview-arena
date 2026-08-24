---
id: explain-va-explain-analyze-khac-nhau-the-nao
position: backend
technology: indexing-\u0026-query-planning
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`EXPLAIN` và `EXPLAIN ANALYZE` khác nhau thế nào?

## Question (EN)
How are `EXPLAIN` and `EXPLAIN ANALYZE` different?

## Đáp án chi tiết (VI)
`EXPLAIN` cho xem kế hoạch database *dự định* chạy, dựa trên ước lượng, mà không thực sự chạy query. `EXPLAIN ANALYZE` thì chạy query thật và báo thời gian/số dòng thực tế — chính xác hơn nhiều, nhưng vì chạy thật nên với câu ghi (INSERT/UPDATE/DELETE) sẽ thay đổi dữ liệu nếu không bọc trong transaction rồi rollback.\
\
Cách chạy an toàn cho câu update:\
```sql\
BEGIN;\
EXPLAIN ANALYZE UPDATE jobs SET status = 'done' WHERE id = 42;\
ROLLBACK;\
```\
Khi đọc kế hoạch: so số dòng ước lượng với số dòng thực tế (lệch nhiều = statistics có vấn đề), xem loại scan, cách join, bộ nhớ sort/hash và node nào tốn thời gian nhất.

## Detailed Answer (EN)
`EXPLAIN` shows the plan the database *intends* to run, based on estimates, without actually running the query. `EXPLAIN ANALYZE` runs the query for real and reports actual time/rows — far more accurate, but because it really runs, a write statement (INSERT/UPDATE/DELETE) will change data unless wrapped in a transaction and rolled back.\
\
Safe way to analyze an update:\
```sql\
BEGIN;\
EXPLAIN ANALYZE UPDATE jobs SET status = 'done' WHERE id = 42;\
ROLLBACK;\
```\
When reading the plan: compare estimated vs actual rows (a big gap means statistics trouble), check the scan type, join method, sort/hash memory and which node costs the most time.
