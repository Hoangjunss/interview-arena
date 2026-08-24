---
id: index-trong-postgresql-giup-gi-va-co-trade-off-gi
position: backend
technology: indexing-\u0026-query-planning
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Index trong PostgreSQL giúp gì và có trade-off gì?

## Question (EN)
What do indexes help with in PostgreSQL and what are the trade-offs?

## Đáp án chi tiết (VI)
Index giống mục lục cuối sách: thay vì lật từng trang để tìm một từ, database nhảy thẳng tới đúng dòng. Nhờ đó các query lọc (`WHERE`), join hay sắp xếp (`ORDER BY`) nhanh hơn hẳn, và việc tìm theo giá trị duy nhất gần như tức thì.\
\
Đánh đổi: index tốn thêm disk và làm ghi chậm hơn — mỗi `INSERT/UPDATE/DELETE` phải cập nhật cả index. Vì vậy đừng index mọi cột; chỉ index cột thật sự hay dùng để tìm kiếm. Đôi khi database còn bỏ qua index nếu nó không lọc bớt được mấy dòng (lọc kém hiệu quả).\
```sql\
CREATE INDEX idx_users_email ON users (email);\
```\
Muốn biết một query có dùng index hay không, chạy `EXPLAIN ANALYZE` để xem kế hoạch thực thi.

## Detailed Answer (EN)
An index is like the index at the back of a book: instead of flipping through every page to find a word, the database jumps straight to the right row. This makes filtering (`WHERE`), joins and sorting (`ORDER BY`) much faster, and unique lookups almost instant.\
\
The trade-off: an index costs extra disk and slows writes — every `INSERT/UPDATE/DELETE` must update the index too. So do not index every column; index only the columns you actually search by. The database may even skip an index if it would not filter out many rows (poor selectivity).\
```sql\
CREATE INDEX idx_users_email ON users (email);\
```\
To see whether a query uses an index, run `EXPLAIN ANALYZE` and read the execution plan.
