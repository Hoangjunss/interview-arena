---
id: sharding-phan-manh-la-gi-co-nhung-cach-phan-manh-nao
position: system-design
technology: database-scaling
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sharding (phân mảnh) là gì? Có những cách phân mảnh nào?

## Question (EN)
What is sharding and what partitioning strategies are there?

## Đáp án chi tiết (VI)
Sharding = **chia ngang** một bảng/DB lớn thành nhiều **shard**, mỗi shard giữ một tập con dữ liệu trên node riêng → scale được **cả ghi lẫn dung lượng** (khác replication chỉ scale đọc).\
\
Cách chọn shard key:\
- **Range-based**: chia theo khoảng (A–M, N–Z) — dễ range query nhưng dễ **hotspot** nếu phân bố lệch.\
- **Hash-based**: hash(key) → phân bố đều, nhưng range query khó.\
- **Consistent hashing**: giảm số dữ liệu phải di chuyển khi thêm/bớt node.\
- **Directory/lookup**: bảng tra cứu ánh xạ key → shard, linh hoạt nhưng thêm một điểm phụ thuộc.\
\
Chi phí: **cross-shard join/transaction phức tạp**, cần chọn shard key khớp mẫu truy vấn để tránh hotspot và **query fan-out**.

## Detailed Answer (EN)
Sharding = **horizontally splitting** a large table/DB into multiple **shards**, each holding a subset of the data on its own node → scales **both writes and storage** (unlike replication, which scales reads).\
\
Choosing a shard key:\
- **Range-based**: split by ranges (A–M, N–Z) — easy range queries but prone to **hotspots** if the distribution skews.\
- **Hash-based**: hash(key) → even distribution, but range queries are hard.\
- **Consistent hashing**: minimizes data movement when adding/removing nodes.\
- **Directory/lookup**: a lookup table maps key → shard, flexible but adds a dependency.\
\
Costs: **cross-shard joins/transactions are hard**; pick a shard key that matches query patterns to avoid hotspots and **query fan-out**.
