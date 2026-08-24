---
id: thiet-ke-mot-distributed-key-value-store-cache-co-kha-nang-mo-rong-kieu-dynamo-b
position: system-design
technology: interview-scenarios
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế một distributed key-value store / cache có khả năng mở rộng (kiểu Dynamo). Bạn tổ chức partitioning, replication và consistency thế nào?

## Question (EN)
Design a scalable distributed key-value store / cache (Dynamo-style). How do you handle partitioning, replication, and consistency?

## Đáp án chi tiết (VI)
**Yêu cầu**: get/put theo key, độ trễ thấp, luôn ghi được (high availability), scale ngang, chịu lỗi node.\
\
**Thành phần chính**:\
- **Partitioning**: consistent hashing chia key-space thành một vòng tròn; thêm *virtual node* để cân bằng tải và giảm reshuffle khi thêm/bớt máy.\
- **Replication**: mỗi key nhân bản sang N node kế tiếp trên vòng (preference list).\
- **Quorum**: ghi thành công khi đủ W node ack, đọc khi đủ R node phản hồi; chọn `W + R \u003e N` để đọc luôn thấy bản ghi mới nhất.\
- **Conflict resolution**: vector clock đánh dấu phiên bản; khi phân nhánh thì trả về client hòa giải hoặc last-write-wins.\
- **Membership \u0026 failure detection**: gossip lan truyền trạng thái node; hinted handoff + Merkle tree để đồng bộ lại sau khi node hồi phục.\
\
**Đánh đổi / bottleneck**: `W+R\u003eN` thiên về nhất quán nhưng tăng độ trễ; mô hình AP (eventual consistency) đổi tính nhất quán lấy availability; *hot key* vẫn làm lệch tải dù đã virtual node — cần thêm cache tầng trên hoặc tách key.

## Detailed Answer (EN)
**Requirements**: get/put by key, low latency, always writable (high availability), horizontal scaling, node fault tolerance.\
\
**Core components**:\
- **Partitioning**: consistent hashing maps the key-space onto a ring; *virtual nodes* balance load and reduce reshuffling when machines are added or removed.\
- **Replication**: each key is copied to the next N nodes on the ring (preference list).\
- **Quorum**: a write succeeds once W nodes ack, a read once R nodes reply; choosing `W + R \u003e N` guarantees reads see the latest write.\
- **Conflict resolution**: vector clocks version each value; divergent branches are reconciled by the client or via last-write-wins.\
- **Membership \u0026 failure detection**: gossip propagates node state; hinted handoff plus Merkle trees resync data after a node recovers.\
\
**Trade-offs / bottlenecks**: `W+R\u003eN` favors consistency but raises latency; the AP model trades consistency for availability; a *hot key* still skews load despite virtual nodes — add an upper cache tier or split the key.
