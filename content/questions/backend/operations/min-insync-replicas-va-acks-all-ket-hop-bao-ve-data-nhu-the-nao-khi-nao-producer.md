---
id: min-insync-replicas-va-acks-all-ket-hop-bao-ve-data-nhu-the-nao-khi-nao-producer
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
min.insync.replicas và acks=all kết hợp bảo vệ data như thế nào? Khi nào producer throw NotEnoughReplicasException?

## Question (EN)
How do min.insync.replicas and acks=all work together to protect data? When does a producer throw NotEnoughReplicasException?

## Đáp án chi tiết (VI)
`acks=all` yêu cầu leader đợi tất cả ISR (In-Sync Replicas) ghi xong mới acknowledge producer. `min.insync.replicas` (broker/topic config, default=1) quy định số replica tối thiểu trong ISR để accept write. **Kết hợp tối ưu**: `replication.factor=3`, `min.insync.replicas=2`, `acks=all` → message chỉ acknowledged khi ít nhất 2 replica ghi xong → chịu được 1 broker failure mà không mất data. **NotEnoughReplicasException** xảy ra khi ISR size \u003c `min.insync.replicas` — ví dụ 2 trong 3 broker down, ISR chỉ còn 1 nhưng `min.insync.replicas=2` → producer bị reject. Đây là trade-off giữa availability và durability. Nếu muốn availability hơn durability: giảm `min.insync.replicas=1` (có thể mất data nếu leader fail trước follower sync). Trong production tài chính: `replication.factor=3`, `min.insync.replicas=2`, `acks=all` là cấu hình bắt buộc.

## Detailed Answer (EN)
`acks=all` requires the leader to wait for all ISR (In-Sync Replicas) to write before acknowledging the producer. `min.insync.replicas` (a broker/topic config, default=1) specifies the minimum number of replicas that must be in the ISR to accept a write. **Optimal combination**: `replication.factor=3`, `min.insync.replicas=2`, `acks=all` → a message is only acknowledged once at least 2 replicas have written it → tolerates 1 broker failure without data loss. **NotEnoughReplicasException** occurs when the ISR size drops below `min.insync.replicas` — e.g., 2 of 3 brokers are down, leaving ISR size=1 while `min.insync.replicas=2` → the producer write is rejected. This is a deliberate availability vs durability trade-off. If you prefer availability over durability: lower `min.insync.replicas=1` (risks data loss if the leader fails before a follower syncs). For financial production systems: `replication.factor=3`, `min.insync.replicas=2`, `acks=all` is a mandatory configuration.
