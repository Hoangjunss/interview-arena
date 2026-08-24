---
id: kraft-mode-trong-kafka-la-gi-tai-sao-kafka-loai-bo-zookeeper
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
KRaft mode trong Kafka là gì? Tại sao Kafka loại bỏ ZooKeeper?

## Question (EN)
What is KRaft mode in Kafka? Why is Kafka removing ZooKeeper?

## Đáp án chi tiết (VI)
Trước Kafka 3.3, ZooKeeper được dùng để manage cluster metadata (broker registration, partition leader election, topic config). ZooKeeper là một external dependency phức tạp, tạo ra operational overhead (phải manage thêm một cluster), giới hạn số partition (~200k partition/cluster vì ZooKeeper bottleneck), và có vấn đề về split-brain scenario. KRaft (Kafka Raft Metadata mode) thay thế ZooKeeper bằng cách dùng Raft consensus protocol ngay trong Kafka cluster — một số broker được bầu làm controller voter. \
\
**Lợi ích:** đơn giản hóa deployment (không cần ZooKeeper), tăng giới hạn partition lên hàng triệu, metadata propagation nhanh hơn, startup/failover time giảm từ phút xuống giây. KRaft trở nên production-ready từ Kafka 3.3 (phát hành 10/2022). Kafka 4.0 (phát hành 3/2025) đã hoàn toàn loại bỏ ZooKeeper — mọi cluster mới phải dùng KRaft. Trong production mới nên bắt đầu với KRaft mode.

## Detailed Answer (EN)
Before Kafka 3.3, ZooKeeper managed cluster metadata (broker registration, partition leader election, topic configuration). ZooKeeper is a complex external dependency that adds operational overhead (managing a separate cluster), limits partition count (~200k partitions per cluster due to ZooKeeper bottlenecks), and is prone to split-brain scenarios. KRaft (Kafka Raft Metadata mode) replaces ZooKeeper by embedding the Raft consensus protocol directly in the Kafka cluster — a subset of brokers are elected as controller voters. \
\
**Benefits:** simplified deployment (no ZooKeeper), partition limits raised to millions, faster metadata propagation, and startup/failover time reduced from minutes to seconds. KRaft became production-ready from Kafka 3.3 (released October 2022). Kafka 4.0 (released March 2025) has fully removed ZooKeeper — all new clusters must use KRaft. New production deployments should start with KRaft mode.
