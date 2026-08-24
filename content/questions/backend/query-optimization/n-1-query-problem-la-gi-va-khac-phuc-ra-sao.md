---
id: n-1-query-problem-la-gi-va-khac-phuc-ra-sao
position: backend
technology: query-optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
N+1 query problem là gì và khắc phục ra sao?

## Question (EN)
What is the N+1 query problem and how do you fix it?

## Đáp án chi tiết (VI)
N+1 xảy ra khi lấy một danh sách rồi lặp gọi thêm một truy vấn con cho **từng phần tử**: 1 query lấy N bản ghi cha + N query lấy dữ liệu con → **N+1** lần vào DB. Thường gặp với ORM khi truy cập quan hệ trong vòng lặp (lazy loading).\
\
Ví dụ: lấy 100 bài viết (1 query) rồi với mỗi bài lại query tác giả (100 query) = 101 lần round-trip.\
\
Khắc phục:\
- **JOIN**: gộp cha + con trong một truy vấn.\
- **Eager loading**: ORM nạp sẵn quan hệ (Prisma `include`, ActiveRecord `includes`, Hibernate `JOIN FETCH`).\
- **Batch / `WHERE IN (...)`**: gom N id con thành một truy vấn (DataLoader dùng cách này).\
\
Cái giá không nằm ở tính toán mà ở **số lần round-trip mạng tới DB** — giảm số query là chính. Phát hiện bằng log query hoặc APM.\
\
```sql\
-- N+1: 1 + 100 round-trips\
SELECT * FROM posts LIMIT 100;\
SELECT * FROM users WHERE id = ?; -- repeated for each post\
-- Fix: batch into one query\
SELECT * FROM users WHERE id IN (1, 2, ...);\
```

## Detailed Answer (EN)
N+1 happens when you fetch a list then loop, issuing a sub-query for **each element**: 1 query for N parent records + N queries for children → **N+1** round-trips to the DB. Common with ORMs when accessing a relation inside a loop (lazy loading).\
\
Example: fetch 100 posts (1 query) then query each post's author (100 queries) = 101 round-trips.\
\
Fixes:\
- **JOIN**: combine parent + child in one query.\
- **Eager loading**: have the ORM preload relations (Prisma `include`, ActiveRecord `includes`, Hibernate `JOIN FETCH`).\
- **Batch / `WHERE IN (...)`**: collapse the N child ids into one query (DataLoader does this).\
\
The cost is not computation but the **number of network round-trips to the DB** — cutting query count is the point. Detect it via query logs or an APM.\
\
```sql\
-- N+1: 1 + 100 round-trips\
SELECT * FROM posts LIMIT 100;\
SELECT * FROM users WHERE id = ?; -- repeated for each post\
-- Fix: batch into one query\
SELECT * FROM users WHERE id IN (1, 2, ...);\
```
