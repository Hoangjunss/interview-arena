---
id: sharding-trong-mongodb-hoat-dong-the-nao
position: backend
technology: sharding
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sharding trong MongoDB hoạt động thế nào?

## Question (EN)
How does sharding work in MongoDB?

## Đáp án chi tiết (VI)
Sharding phân phối dữ liệu của một collection ra nhiều **shard** để mở rộng ngang ghi + lưu trữ. Thành phần một sharded cluster:\
\
- **Shard**: mỗi shard (thường là một replica set) giữ **một tập con** dữ liệu.\
- **`mongos`**: router — ứng dụng nối tới mongos, nó định tuyến truy vấn tới shard phù hợp.\
- **Config servers**: giữ metadata về việc ánh xạ dữ liệu → shard.\
\
**Shard key** quyết định cách chia:\
- **Hashed**: rải đều, tránh hot shard, nhưng truy vấn range kém.\
- **Ranged**: theo khoảng, tốt cho range query, dễ lệch.\
\
MongoDB chia dữ liệu thành **chunk** và **cân bằng (balancer)** chuyển chunk giữa các shard cho đều.\
\
Đánh đổi/lưu ý: chọn shard key sai → **hot shard** hoặc truy vấn phải hỏi mọi shard (scatter-gather) rất chậm; nên chọn shard key có độ chọn lọc cao và khớp mẫu truy vấn phổ biến. Thường chỉ shard khi một replica set đã tới giới hạn.

## Detailed Answer (EN)
Sharding distributes a collection's data across multiple **shards** to scale writes + storage horizontally. A sharded cluster has:\
\
- **Shard**: each shard (usually a replica set) holds a **subset** of the data.\
- **`mongos`**: the router — the app connects to mongos, which routes queries to the right shard.\
- **Config servers**: hold metadata mapping data → shards.\
\
The **shard key** decides the split:\
- **Hashed**: spreads evenly, avoids hot shards, but poor for range queries.\
- **Ranged**: by value ranges, good for range queries, prone to skew.\
\
MongoDB divides data into **chunks** and a **balancer** migrates chunks between shards to keep them even.\
\
Trade-offs/notes: a bad shard key → a **hot shard** or queries that must hit every shard (scatter-gather), which is slow; pick a high-selectivity key that matches common query patterns. Usually shard only once a single replica set hits its limit.
