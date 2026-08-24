---
id: replica-set-trong-mongodb-la-gi
position: backend
technology: replication
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Replica set trong MongoDB là gì?

## Question (EN)
What is a replica set in MongoDB?

## Đáp án chi tiết (VI)
Replica set là nhóm các node MongoDB **giữ cùng dữ liệu** để đảm bảo khả dụng cao:\
\
- **Primary**: node duy nhất nhận **ghi**; ghi được ghi vào **oplog** (operation log).\
- **Secondary**: sao chép oplog của primary và áp lại → giữ bản sao, có thể phục vụ **đọc** (tùy read preference).\
- **Arbiter** (tùy chọn): không giữ dữ liệu, chỉ **bỏ phiếu** để phá thế hòa khi bầu chọn.\
\
Cơ chế:\
- **Automatic failover**: primary chết → các node **bầu (election)** một secondary lên làm primary → hệ tự phục hồi.\
- **Read preference**: `primary` (mặc định, nhất quán mạnh hơn) hoặc `secondary`/`nearest` để chia tải đọc, đổi lại có thể đọc dữ liệu hơi cũ (replication lag).\
- **Write concern**: quy định ghi cần được xác nhận bởi bao nhiêu node (`w: majority`) → cân giữa an toàn và độ trễ.\
\
Về bản chất giống leader–follower của DB quan hệ, có thêm bầu chọn tự động.

## Detailed Answer (EN)
A replica set is a group of MongoDB nodes **holding the same data** for high availability:\
\
- **Primary**: the single node that takes **writes**; writes are recorded in the **oplog** (operation log).\
- **Secondary**: replicates the primary's oplog and applies it → keeps a copy and can serve **reads** (per read preference).\
- **Arbiter** (optional): holds no data, only **votes** to break ties during elections.\
\
Mechanics:\
- **Automatic failover**: if the primary dies, nodes **elect** a secondary as the new primary → the system self-heals.\
- **Read preference**: `primary` (default, stronger consistency) or `secondary`/`nearest` to spread read load, at the cost of possibly stale reads (replication lag).\
- **Write concern**: how many nodes must acknowledge a write (`w: majority`) → balances safety vs latency.\
\
Conceptually it mirrors relational leader–follower replication, plus automatic elections.
