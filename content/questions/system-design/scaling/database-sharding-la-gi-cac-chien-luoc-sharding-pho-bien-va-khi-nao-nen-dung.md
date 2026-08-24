---
id: database-sharding-la-gi-cac-chien-luoc-sharding-pho-bien-va-khi-nao-nen-dung
position: system-design
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Database Sharding là gì? Các chiến lược sharding phổ biến và khi nào nên dùng?

## Question (EN)
What is Database Sharding? What are common sharding strategies and when should you use it?

## Đáp án chi tiết (VI)
Sharding là kỹ thuật chia dữ liệu của một database thành nhiều phần nhỏ hơn (shards), mỗi shard nằm trên một database server riêng, cho phép scale ngang khi dữ liệu vượt quá capacity của một server.\
\
Các chiến lược:\
- Range-based sharding: chia theo range của key (user_id 1-1M trên shard 1) – dễ implement nhưng dễ tạo hot spot.\
- Hash-based sharding: hash key để phân phối đều – tránh hot spot nhưng khó range query.\
- Directory-based sharding: lookup table ánh xạ key → shard – linh hoạt nhất nhưng thêm lookup overhead.\
- Geographic sharding: chia theo region – tốt cho compliance và latency.\
\
Thách thức: cross-shard joins tốn kém, distributed transactions phức tạp, rebalancing khi thêm shard khó. Dùng sharding khi đã tối ưu hết cách khác (index, caching, read replicas) và dataset thực sự vượt quá TB.

## Detailed Answer (EN)
Sharding splits a database into smaller pieces (shards), each on a separate server, enabling horizontal scaling when data exceeds a single server's capacity.\
\
Common strategies:\
- Range-based: split by key ranges — easy but prone to hot spots.\
- Hash-based: hash the key for even distribution — avoids hot spots but complicates range queries.\
- Directory-based: a lookup table maps keys to shards — most flexible but adds lookup overhead.\
- Geographic: split by region — good for compliance and latency.\
\
Challenges: cross-shard joins are expensive, distributed transactions are complex, rebalancing when adding shards is difficult. Use only after exhausting other options (indexes, caching, read replicas) and dataset genuinely exceeds terabytes.
