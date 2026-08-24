---
id: database-replication-va-read-replica-giai-quyet-van-de-gi
position: system-design
technology: database-scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Database replication và read replica giải quyết vấn đề gì?

## Question (EN)
What problems do database replication and read replicas solve?

## Đáp án chi tiết (VI)
Replication tạo **nhiều bản sao** dữ liệu trên các node để tăng **độ sẵn sàng** và **khả năng đọc**.\
\
- **Leader–follower (master–replica)**: mọi ghi vào leader, được sao chép sang các follower; **đọc phân tán cho follower** → chịu tải đọc cao. Khi leader chết, promote một follower (failover).\
- **Đồng bộ vs bất đồng bộ**: sync đảm bảo không mất dữ liệu nhưng chậm; async nhanh nhưng follower có **replication lag** → đọc có thể thấy dữ liệu cũ (nghiệp vụ cần \\"read-your-writes\\" phải đọc từ leader).\
- **Multi-leader / leaderless**: cho ghi nhiều nơi, nhưng phải xử lý **xung đột ghi**.\
\
Replication chủ yếu scale **đọc** và tăng HA; muốn scale **ghi** thì cần sharding.

## Detailed Answer (EN)
Replication keeps **multiple copies** of the data across nodes to improve **availability** and **read capacity**.\
\
- **Leader–follower (master–replica)**: all writes go to the leader and replicate to followers; **reads spread across followers** → handle high read load. If the leader dies, promote a follower (failover).\
- **Sync vs async**: sync avoids data loss but is slower; async is fast but followers have **replication lag** → reads may be stale (a \\"read-your-writes\\" need must read from the leader).\
- **Multi-leader / leaderless**: allow writes in several places, but you must resolve **write conflicts**.\
\
Replication mainly scales **reads** and boosts HA; to scale **writes** you need sharding.
