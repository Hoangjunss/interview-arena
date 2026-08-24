---
id: replication-leader-follower-la-gi-va-giai-quyet-van-de-gi
position: backend
technology: replication
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Replication (leader/follower) là gì và giải quyết vấn đề gì?

## Question (EN)
What is replication (leader/follower) and what problem does it solve?

## Đáp án chi tiết (VI)
Replication là **nhân bản dữ liệu ra nhiều node**. Mô hình phổ biến là **leader–follower** (primary–replica):\
\
- **Leader** nhận mọi **ghi** (write), ghi vào WAL rồi **stream** thay đổi tới các follower.\
- **Follower** áp lại thay đổi, phục vụ **đọc** (read).\
\
Giải quyết:\
- **Khả dụng cao (HA)**: leader chết thì **failover** promote một follower lên làm leader.\
- **Mở rộng đọc**: phân tải read sang nhiều replica.\
- **Sao lưu / phục hồi** và đặt dữ liệu gần người dùng theo vùng.\
\
PostgreSQL còn có **logical replication** — chỉ nhân bản một số bảng/thay đổi cụ thể, hợp nâng cấp version không downtime hoặc chép sang schema khác.\
\
Đánh đổi — **replication lag**: follower chậm hơn leader một chút. Nếu bất đồng bộ (async), đọc từ replica có thể ra dữ liệu cũ (eventual consistency). Đồng bộ (sync) thì nhất quán hơn nhưng ghi chậm hơn. Đọc ngay sau khi ghi cần chú ý read-your-writes.

## Detailed Answer (EN)
Replication **copies data across multiple nodes**. The common model is **leader–follower** (primary–replica):\
\
- The **leader** takes all **writes**, records them in the WAL, then **streams** the changes to followers.\
- **Followers** apply the changes and serve **reads**.\
\
It solves:\
- **High availability (HA)**: if the leader dies, **failover** promotes a follower to leader.\
- **Read scaling**: spread reads across many replicas.\
- **Backups / recovery** and placing data near users by region.\
\
PostgreSQL also offers **logical replication** — replicating only specific tables/changes, useful for zero-downtime version upgrades or copying into a different schema.\
\
Trade-off — **replication lag**: a follower trails the leader slightly. With asynchronous replication, reading from a replica may return stale data (eventual consistency). Synchronous replication is more consistent but slows writes. Reading right after a write needs read-your-writes care.
