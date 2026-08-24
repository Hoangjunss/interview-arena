---
id: partitioning-trong-postgresql-dung-khi-nao
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Partitioning trong PostgreSQL dùng khi nào?

## Question (EN)
When should you use partitioning in PostgreSQL?

## Đáp án chi tiết (VI)
Partitioning chia một bảng lớn thành nhiều bảng con (partition) theo khoảng/danh sách/băm — hay dùng cho time-series, event, hay bảng order khổng lồ. Lợi ích: \\"partition pruning\\" (query chỉ đụng partition liên quan), quản lý retention dễ (xóa nguyên một tháng cũ = drop một partition), và bảo trì từng phần nhẹ hơn.\
```sql\
CREATE TABLE events (\
  id bigint,\
  created_at timestamptz NOT NULL\
) PARTITION BY RANGE (created_at);\
```\
Lưu ý quan trọng: partitioning KHÔNG tự làm query nhanh nếu query không lọc theo cột phân vùng hoặc index sai. Nó cũng làm migration và vận hành phức tạp hơn — chỉ dùng khi bảng thật sự lớn.

## Detailed Answer (EN)
Partitioning splits one large table into child tables (partitions) by range/list/hash — common for time-series, events, or huge order tables. Benefits: \\"partition pruning\\" (a query only touches relevant partitions), easy retention (dropping a whole old month = dropping one partition), and lighter per-part maintenance.\
```sql\
CREATE TABLE events (\
  id bigint,\
  created_at timestamptz NOT NULL\
) PARTITION BY RANGE (created_at);\
```\
Key caveat: partitioning does NOT make queries faster by itself if they don't filter by the partition key or the indexes are wrong. It also makes migration and operations more complex — use it only when the table is truly large.
