---
id: tai-sao-query-co-index-nhung-postgresql-van-sequential-scan
position: backend
technology: indexing-\u0026-query-planning
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao query có index nhưng PostgreSQL vẫn sequential scan?

## Question (EN)
Why might PostgreSQL use a sequential scan even when an index exists?

## Đáp án chi tiết (VI)
Có index không có nghĩa database bắt buộc dùng nó — planner luôn chọn cách nó cho là *rẻ nhất*. Nó sẽ chọn quét toàn bảng (sequential scan) khi: bảng nhỏ (quét cả còn nhanh hơn), điều kiện trả về quá nhiều dòng, thống kê sai, có hàm/ép kiểu trên cột làm index vô hiệu, hoặc chi phí đọc rải rác (random I/O) cao hơn quét tuần tự.\
\
Checklist khi gặp: đọc `EXPLAIN ANALYZE`, so dòng ước lượng vs thực tế, xem điều kiện có khớp index không, có lệch kiểu/collation/cast không, thống kê có cũ không, và thứ tự cột trong index có đúng không. Hiểu nguyên nhân trước, đừng vội ép planner.

## Detailed Answer (EN)
Having an index doesn't force the database to use it — the planner always picks what it thinks is *cheapest*. It will choose a full-table (sequential) scan when: the table is small (scanning all is faster), the condition returns too many rows, statistics are wrong, a function/cast on the column disables the index, or scattered reads (random I/O) cost more than a sequential scan.\
\
Checklist: read `EXPLAIN ANALYZE`, compare estimated vs actual rows, check whether the condition matches the index, look for type/collation/cast mismatches, check for stale statistics, and verify the index column order. Understand the cause first; don't rush to force the planner.
