---
id: mirrormaker-2-la-gi-cach-thuc-hien-cross-cluster-replication-trong-kafka
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MirrorMaker 2 là gì? Cách thực hiện cross-cluster replication trong Kafka?

## Question (EN)
What is MirrorMaker 2? How do you perform cross-cluster replication in Kafka?

## Đáp án chi tiết (VI)
MirrorMaker 2 (MM2) là công cụ replication chính thức của Kafka để sao chép data giữa các Kafka cluster (active-passive DR, active-active multi-region, migration). MM2 xây trên Kafka Connect framework: dùng MirrorSourceConnector (replicate messages), MirrorCheckpointConnector (replicate consumer offsets), MirrorHeartbeatConnector (monitor replication lag). Topic được replicate với prefix: topic `orders` trên cluster A trở thành `clusterA.orders` trên cluster B — tránh naming conflict. Offset translation: MM2 translate consumer offsets giữa cluster để consumer có thể failover sang cluster B và tiếp tục từ đúng vị trí. Config cơ bản:\
```properties\
clusters = source, target\
source.bootstrap.servers = source:9092\
target.bootstrap.servers = target:9092\
source-\u003etarget.enabled = true\
source-\u003etarget.topics = .*\
```\
Alternative: Confluent Replicator (commercial), hoặc dùng Kafka application-level replication (consumer từ source, produce sang target).

## Detailed Answer (EN)
MirrorMaker 2 (MM2) is Kafka's official replication tool for copying data between Kafka clusters (active-passive DR, active-active multi-region, migrations). MM2 is built on the Kafka Connect framework: it uses MirrorSourceConnector (replicate messages), MirrorCheckpointConnector (replicate consumer offsets), and MirrorHeartbeatConnector (monitor replication lag). Replicated topics are prefixed: the topic `orders` on cluster A becomes `clusterA.orders` on cluster B — avoiding naming conflicts. Offset translation: MM2 translates consumer offsets between clusters so a consumer can fail over to cluster B and resume from exactly the right position. Basic config:\
```properties\
clusters = source, target\
source.bootstrap.servers = source:9092\
target.bootstrap.servers = target:9092\
source-\u003etarget.enabled = true\
source-\u003etarget.topics = .*\
```\
Alternatives: Confluent Replicator (commercial), or application-level replication (consume from source, produce to target).
