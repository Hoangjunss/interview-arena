---
id: leader-election-va-consensus-la-gi-mot-cluster-thong-nhat-mot-leader-duy-nhat-nh
position: system-design
technology: interview-scenarios
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Leader election và consensus là gì? Một cluster thống nhất một leader duy nhất như thế nào (Raft / Paxos)?

## Question (EN)
What are leader election and consensus? How does a cluster agree on a single leader (Raft / Paxos)?

## Đáp án chi tiết (VI)
**Vấn đề**: nhiều node cần đồng thuận về một giá trị / một leader duy nhất, dù có node lỗi hoặc mạng trễ.\
\
**Raft (dễ hiểu hơn Paxos)**:\
- Mỗi node ở một trong ba vai: **follower, candidate, leader**.\
- Thời gian chia thành **term** (nhiệm kỳ). Follower không nghe heartbeat sau timeout → thành candidate, tăng term, đi xin phiếu.\
- Mỗi node chỉ bỏ **một phiếu / term**; candidate nhận **đa số (quorum)** phiếu → trở thành leader.\
- Leader gửi heartbeat để giữ quyền; mọi ghi đi qua leader rồi replicate log sang follower, commit khi đa số đã ghi.\
\
**Vì sao cần đa số (`N/2 + 1`)**: hai đa số bất kỳ luôn giao nhau → không thể có hai leader cùng term (chống split-brain).\
\
**Đánh đổi**: cần ≥ 3 (thường số lẻ) node để chịu 1 lỗi; leader là điểm ghi tập trung nên giới hạn write throughput; randomized election timeout để tránh vote lặp vô hạn.

## Detailed Answer (EN)
**Problem**: many nodes must agree on a single value / single leader despite node failures and network delays.\
\
**Raft (more understandable than Paxos)**:\
- Each node is in one of three roles: **follower, candidate, leader**.\
- Time is divided into **terms**. A follower that hears no heartbeat before its timeout becomes a candidate, increments the term, and requests votes.\
- Each node casts **one vote per term**; a candidate that gets a **majority (quorum)** becomes leader.\
- The leader sends heartbeats to hold power; all writes go through the leader, which replicates its log to followers and commits once a majority has stored it.\
\
**Why a majority (`N/2 + 1`)**: any two majorities always overlap → there can never be two leaders in the same term (prevents split-brain).\
\
**Trade-offs**: needs ≥ 3 (usually odd) nodes to tolerate 1 failure; the leader is a centralized write point that caps write throughput; randomized election timeouts avoid endless split votes.
