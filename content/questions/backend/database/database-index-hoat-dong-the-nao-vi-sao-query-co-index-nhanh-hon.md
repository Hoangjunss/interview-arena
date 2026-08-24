---
id: database-index-hoat-dong-the-nao-vi-sao-query-co-index-nhanh-hon
position: backend
technology: database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Database index hoạt động thế nào? Vì sao query có index nhanh hơn?

## Question (EN)
How does a database index work and why does it speed up queries?

## Đáp án chi tiết (VI)
Index là **cấu trúc dữ liệu riêng, có thứ tự** (thường là **B-tree**) giữ bản sao cột được đánh index + con trỏ tới hàng. Nhờ có thứ tự, DB tìm bằng cách đi cây thay vì **quét toàn bảng** (full table scan) → tra cứu nhanh trên `WHERE`, `JOIN`, `ORDER BY` của cột đó.\
\
**Đánh đổi**: tốn thêm dung lượng và **làm chậm ghi** (mỗi `INSERT`/`UPDATE`/`DELETE` phải cập nhật index).\
\
Liên quan hay hỏi — **N+1 query**: lặp query con cho từng bản ghi (1 query cha + N query con). Khắc phục bằng `JOIN`/eager loading/batch thay vì gọi trong vòng lặp. Dùng `EXPLAIN` để xem query có dùng index không.

## Detailed Answer (EN)
An index is a **separate, ordered data structure** (usually a **B-tree**) holding a copy of the indexed column plus pointers to the rows. Being ordered, the DB traverses the tree instead of doing a **full table scan** → fast lookups on that column in `WHERE`, `JOIN`, `ORDER BY`.\
\
**Trade-off**: extra storage and **slower writes** (every `INSERT`/`UPDATE`/`DELETE` must maintain the index).\
\
A common follow-up — the **N+1 query problem**: running a sub-query per record (1 parent query + N child queries). Fix with `JOIN`/eager loading/batching instead of querying inside a loop. Use `EXPLAIN` to check whether a query uses an index.
