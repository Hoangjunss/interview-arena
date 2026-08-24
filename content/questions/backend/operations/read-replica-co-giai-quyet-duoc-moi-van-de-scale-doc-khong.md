---
id: read-replica-co-giai-quyet-duoc-moi-van-de-scale-doc-khong
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Read replica có giải quyết được mọi vấn đề scale đọc không?

## Question (EN)
Do read replicas solve every read scaling problem?

## Đáp án chi tiết (VI)
Không. Read replica giúp san tải đọc, nhưng kèm theo: replication lag (dữ liệu trên replica trễ hơn primary một chút), đánh đổi về consistency, bản thân replica cũng chịu tải connection/query, và nó *không* giúp gì cho nút thắt ghi (write). Đặc biệt, đọc ngay sau khi ghi mà đọc từ replica thì có thể thấy dữ liệu cũ.\
\
Dùng replica cho dashboard/báo cáo/endpoint đọc nhiều mà chấp nhận eventual consistency. Với request cần \\"đọc thấy ngay cái mình vừa ghi\\" (read-your-writes), hãy đọc từ primary hoặc định tuyến theo thời điểm vừa ghi. Và nhớ: tối ưu query/index trước đã, đừng vội thêm replica.

## Detailed Answer (EN)
No. Read replicas offload read traffic, but they come with: replication lag (the replica trails the primary slightly), consistency trade-offs, their own connection/query load, and they do *not* help the write bottleneck. In particular, reading right after a write from a replica may show stale data.\
\
Use replicas for dashboards/reporting/read-heavy endpoints that accept eventual consistency. For requests needing \\"read what I just wrote\\" (read-your-writes), read from the primary or route based on recent write time. And remember: optimize queries/indexes first, don't rush to add replicas.
