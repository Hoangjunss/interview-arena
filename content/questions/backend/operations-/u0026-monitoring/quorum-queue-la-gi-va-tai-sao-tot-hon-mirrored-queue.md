---
id: quorum-queue-la-gi-va-tai-sao-tot-hon-mirrored-queue
position: backend
technology: operations-\u0026-monitoring
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quorum queue là gì và tại sao tốt hơn mirrored queue?

## Question (EN)
What are quorum queues and why are they better than mirrored queues?

## Đáp án chi tiết (VI)
Quorum queue dùng thuật toán Raft để replicate: message được replicate đến nhiều node, nhưng leader chỉ chờ quorum (đa số, thường n/2+1 node) xác nhận trước khi ack cho producer. An toàn hơn (ngăn split-brain), performance tốt hơn, ổn định hơn mirrored classic queue. Benchmark: quorum queue đạt 30k msg/s trên 3 node so với 10k cho mirrored queue. Mirrored queue đã deprecated và bị remove trong RabbitMQ 4.0+; nên migrate sang quorum queue.

## Detailed Answer (EN)
Quorum queues use the Raft consensus algorithm — messages replicate to multiple nodes, but the leader waits for a quorum (n/2+1) to confirm before acking the producer. Safer (prevents split-brain), more performant, more stable than mirrored queues. Benchmarks: 30k msg/sec on 3 nodes vs 10k for mirrored. Mirrored queues are deprecated and removed in RabbitMQ 4.0+; migrate existing queues to quorum queues.
