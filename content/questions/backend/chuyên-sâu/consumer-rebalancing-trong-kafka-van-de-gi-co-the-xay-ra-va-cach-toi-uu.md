---
id: consumer-rebalancing-trong-kafka-van-de-gi-co-the-xay-ra-va-cach-toi-uu
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Consumer rebalancing trong Kafka: vấn đề gì có thể xảy ra và cách tối ưu?

## Question (EN)
Consumer rebalancing in Kafka: what issues can occur and how do you optimize it?

## Đáp án chi tiết (VI)
Rebalancing xảy ra khi consumer group thay đổi (thêm/xóa consumer, consumer crash, hoặc subscription thay đổi). Trong quá trình rebalance, toàn bộ group dừng consume (stop-the-world), có thể gây latency spike. Vấn đề phổ biến: `session.timeout.ms` quá ngắn → consumer bị kick ra group vì GC pause dài; `max.poll.interval.ms` quá ngắn → consumer xử lý lâu bị coi là dead. Tối ưu: tăng `session.timeout.ms` và `heartbeat.interval.ms`, giảm `max.poll.records`, dùng incremental cooperative rebalancing (`partition.assignment.strategy=CooperativeStickyAssignor`) thay vì eager rebalancing — chỉ revoke partition thực sự cần chuyển, không dừng toàn bộ group. Static group membership (`group.instance.id`) giúp tránh rebalance khi restart consumer (reuse partition assignment cũ trong vòng `session.timeout.ms`).

## Detailed Answer (EN)
Rebalancing occurs when the consumer group changes (consumers added or removed, a consumer crashes, or subscriptions change). During a rebalance the entire group stops consuming (stop-the-world), potentially causing a latency spike. Common problems: `session.timeout.ms` set too low causes consumers to be ejected due to long GC pauses; `max.poll.interval.ms` set too low causes slow consumers to be considered dead. Optimizations: increase `session.timeout.ms` and `heartbeat.interval.ms`, reduce `max.poll.records`, and use incremental cooperative rebalancing (`partition.assignment.strategy=CooperativeStickyAssignor`) instead of eager rebalancing — only the partitions that truly need to move are revoked, avoiding a full group stop. Static group membership (`group.instance.id`) prevents rebalancing on consumer restarts by reusing the previous partition assignment within `session.timeout.ms`.
