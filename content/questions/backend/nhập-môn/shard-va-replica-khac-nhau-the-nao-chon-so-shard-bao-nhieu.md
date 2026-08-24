---
id: shard-va-replica-khac-nhau-the-nao-chon-so-shard-bao-nhieu
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Shard và replica khác nhau thế nào? Chọn số shard bao nhiêu?

## Question (EN)
What is the difference between shards and replicas, and how many shards should you choose?

## Đáp án chi tiết (VI)
**Primary shard** chia dữ liệu để scale ngang; **replica** là bản sao của primary, phục vụ HA và tăng throughput đọc.\
\
```json\
PUT /products\
{ \\"settings\\": { \\"number_of_shards\\": 3, \\"number_of_replicas\\": 1 } }\
// 3 primary + 3 replica = 6 shard, chiu duoc mat 1 node\
```\
\
**`number_of_shards` không đổi được sau khi tạo index** — muốn đổi phải reindex. `number_of_replicas` thì đổi nóng được.\
\
Guideline của Elastic: mỗi shard **10–50 GB**, và giữ dưới ~20 shard trên mỗi GB heap của node.\
\
Lỗi phổ biến nhất là **over-sharding**: index 2 GB mà để 20 shard. Mỗi shard là một Lucene index tốn heap và file handle riêng, nên chia nhỏ quá làm cluster chậm hẳn chứ không nhanh hơn.\
\
Với dữ liệu tăng theo thời gian (log, event), đừng chỉnh shard count mà dùng data stream + ILM để tự rollover sang index mới.

## Detailed Answer (EN)
**Primary shards** split data for horizontal scale; **replicas** are copies of primaries serving HA and extra read throughput.\
\
```json\
PUT /products\
{ \\"settings\\": { \\"number_of_shards\\": 3, \\"number_of_replicas\\": 1 } }\
// 3 primaries + 3 replicas = 6 shards, survives losing one node\
```\
\
**`number_of_shards` cannot change after index creation** — changing it means a reindex. `number_of_replicas` can change live.\
\
Elastic guidance: aim for **10–50 GB per shard**, and stay under roughly 20 shards per GB of node heap.\
\
The most common mistake is **over-sharding**: 20 shards for a 2 GB index. Each shard is a separate Lucene index with its own heap and file handles, so over-splitting makes the cluster slower, not faster.\
\
For time-based data (logs, events), do not tune shard count — use data streams with ILM to roll over into new indices automatically.
