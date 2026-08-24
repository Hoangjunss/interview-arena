---
id: replication-va-isr-in-sync-replicas-trong-kafka-la-gi-cach-kafka-dam-bao-fault-t
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Replication và ISR (In-Sync Replicas) trong Kafka là gì? Cách Kafka đảm bảo fault tolerance?

## Question (EN)
What are Replication and ISR (In-Sync Replicas) in Kafka? How does Kafka ensure fault tolerance?

## Đáp án chi tiết (VI)
Mỗi partition có một leader và nhiều follower replica trên các broker khác nhau. Leader xử lý tất cả read/write, follower chủ động pull data từ leader để sync. ISR (In-Sync Replicas) là tập hợp các replica đang sync kịp với leader (không bị lag quá `replica.lag.time.max.ms`). Khi leader broker bị lỗi, một replica trong ISR sẽ được bầu làm leader mới. Cấu hình `replication.factor=3` và `min.insync.replicas=2` kết hợp với `acks=all` đảm bảo message chỉ được acknowledge khi ít nhất 2 replica đã ghi — bảo vệ khỏi mất data kể cả khi 1 broker bị lỗi. Trong production nên dùng `replication.factor \u003e= 3` để chịu được lỗi của 2 broker đồng thời.

## Detailed Answer (EN)
Each partition has one leader and multiple follower replicas spread across different brokers. The leader handles all reads and writes; followers actively pull data from the leader to stay in sync. The ISR (In-Sync Replicas) is the set of replicas that are caught up with the leader (not lagging beyond `replica.lag.time.max.ms`). If the leader broker fails, one replica in the ISR is elected as the new leader. Setting `replication.factor=3` and `min.insync.replicas=2` combined with `acks=all` ensures a message is only acknowledged after at least 2 replicas have written it — protecting against data loss even when 1 broker fails. In production, use `replication.factor \u003e= 3` to tolerate simultaneous failure of 2 brokers.
