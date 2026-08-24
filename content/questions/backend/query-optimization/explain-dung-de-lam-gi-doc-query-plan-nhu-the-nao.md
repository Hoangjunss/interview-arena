---
id: explain-dung-de-lam-gi-doc-query-plan-nhu-the-nao
position: backend
technology: query-optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
EXPLAIN dùng để làm gì? Đọc query plan như thế nào?

## Question (EN)
What is EXPLAIN for and how do you read a query plan?

## Đáp án chi tiết (VI)
`EXPLAIN` cho xem **kế hoạch thực thi** mà planner chọn cho một truy vấn; `EXPLAIN ANALYZE` còn **chạy thật** và báo thời gian + số hàng thực tế (cẩn thận với `UPDATE`/`DELETE` trên production — nó thực sự ghi). `cost` chỉ là ước lượng tương đối, không phải mili-giây; `actual time` mới là thời gian thật.\
\
Đọc plan (từ trong ra ngoài, node lá chạy trước):\
- **Loại truy cập**: `Seq Scan` (quét toàn bảng), `Index Scan`, `Index Only Scan`, `Bitmap Heap Scan`.\
- **Kiểu join**: `Nested Loop`, `Hash Join`, `Merge Join`.\
- **Chi phí**: `cost=start..total` (ước lượng), `rows` (ước lượng số hàng), và với ANALYZE là `actual time` + `rows`.\
\
Dấu hiệu cần tối ưu:\
- `Seq Scan` trên bảng lớn khi đáng lẽ nên dùng index.\
- **Lệch lớn giữa `rows` ước lượng và thực tế** → thống kê cũ, cần `ANALYZE`.\
- Sort/hash tràn ra đĩa (`external merge Disk`).\
\
Dùng EXPLAIN là bước đầu tiên khi chẩn đoán truy vấn chậm.

## Detailed Answer (EN)
`EXPLAIN` shows the **execution plan** the planner chose for a query; `EXPLAIN ANALYZE` also **actually runs it** and reports real timing + row counts (careful with `UPDATE`/`DELETE` on production — it really writes). `cost` is only a relative estimate, not milliseconds; `actual time` is the real timing.\
\
Reading a plan (inside-out, leaf nodes run first):\
- **Access method**: `Seq Scan` (full table), `Index Scan`, `Index Only Scan`, `Bitmap Heap Scan`.\
- **Join type**: `Nested Loop`, `Hash Join`, `Merge Join`.\
- **Cost**: `cost=start..total` (estimate), `rows` (estimated row count), and with ANALYZE the `actual time` + `rows`.\
\
Signs you need to optimize:\
- `Seq Scan` on a large table where an index should be used.\
- A **big gap between estimated and actual `rows`** → stale statistics, run `ANALYZE`.\
- Sort/hash spilling to disk (`external merge Disk`).\
\
EXPLAIN is the first step when diagnosing a slow query.
