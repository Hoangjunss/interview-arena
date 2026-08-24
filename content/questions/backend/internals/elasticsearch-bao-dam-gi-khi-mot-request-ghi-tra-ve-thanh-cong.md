---
id: elasticsearch-bao-dam-gi-khi-mot-request-ghi-tra-ve-thanh-cong
position: backend
technology: internals
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Elasticsearch bảo đảm gì khi một request ghi trả về thành công?

## Question (EN)
What does Elasticsearch guarantee when a write request returns success?

## Đáp án chi tiết (VI)
Ghi được coi là thành công khi **primary shard và mọi in-sync replica đều đã ghi vào translog và fsync**. Nghĩa là dữ liệu đã bền trên đĩa ở nhiều node, chứ **chưa chắc đã search được** — cái đó phải chờ refresh.\
\
Hai tham số điều khiển đánh đổi:\
\
```bash\
PUT /orders/_doc/1?wait_for_active_shards=2   # doi it nhat 2 shard active truoc khi ghi\
```\
\
```json\
PUT /orders/_settings\
{ \\"index.translog.durability\\": \\"async\\" }   // fsync moi 5s, nhanh hon nhung co the mat 5s cuoi\
```\
\
`durability: async` tăng throughput ghi đáng kể nhưng đổi lấy rủi ro mất dữ liệu khi mất điện — chỉ hợp cho log và metric, không hợp cho dữ liệu đơn hàng.\
\
Điểm phải nói rõ trong phỏng vấn: Elasticsearch **không có transaction đa document**. Bulk 1000 document mà 3 cái lỗi thì 997 cái kia vẫn được ghi. Vì thế **luôn phải kiểm tra field `errors` và từng item trong response bulk** — HTTP 200 không có nghĩa là mọi document đã vào.

## Detailed Answer (EN)
A write succeeds once **the primary and every in-sync replica have written to the translog and fsynced**. That means the data is durable on disk across nodes, but **not necessarily searchable yet** — that waits for a refresh.\
\
Two parameters control the trade-off:\
\
```bash\
PUT /orders/_doc/1?wait_for_active_shards=2   # require 2 active shards before writing\
```\
\
```json\
PUT /orders/_settings\
{ \\"index.translog.durability\\": \\"async\\" }   // fsync every 5s, faster but can lose the last 5s\
```\
\
`durability: async` raises write throughput considerably at the cost of losing data on power failure — fine for logs and metrics, wrong for order data.\
\
A point to state clearly in an interview: Elasticsearch has **no multi-document transactions**. In a bulk of 1000 documents where 3 fail, the other 997 are still written. So **always check the `errors` field and per-item results in a bulk response** — HTTP 200 does not mean every document landed.
