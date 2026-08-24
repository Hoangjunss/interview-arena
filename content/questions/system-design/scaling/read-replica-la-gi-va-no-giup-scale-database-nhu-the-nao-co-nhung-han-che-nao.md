---
id: read-replica-la-gi-va-no-giup-scale-database-nhu-the-nao-co-nhung-han-che-nao
position: system-design
technology: scaling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Read Replica là gì và nó giúp scale database như thế nào? Có những hạn chế nào?

## Question (EN)
What are Read Replicas and how do they help scale a database? What are the limitations?

## Đáp án chi tiết (VI)
Read Replica là bản sao của primary database, chỉ nhận read queries trong khi primary (master) nhận tất cả write queries – asynchronous replication đồng bộ dữ liệu từ primary sang replica. \
\
**Lợi ích:** giảm read load trên primary (80-90% workload thường là read), cho phép scale read throughput bằng cách thêm replicas, dùng replica cho analytics/reporting mà không ảnh hưởng production. AWS RDS, PostgreSQL, MySQL đều hỗ trợ read replicas dễ dàng. Hạn chế quan trọng: replication lag – replica có thể chậm hơn primary vài ms đến vài giây, nên có thể đọc stale data (eventual consistency); cần application-level logic để route read vs write queries; failover tự động cần configuration thêm; write vẫn là bottleneck vì chỉ có một primary. Giải pháp cho write bottleneck là sharding hoặc multi-master replication (phức tạp hơn vì conflict resolution).

## Detailed Answer (EN)
A Read Replica is a copy of the primary database that only accepts read queries while the primary (master) handles all writes — asynchronous replication keeps the replica in sync with the primary. \
\
**Benefits:** reduces read load on the primary (80–90% of workloads are typically reads), allows scaling read throughput by adding more replicas, and enables analytics/reporting queries on replicas without impacting production. AWS RDS, PostgreSQL, and MySQL all support read replicas easily. Key limitations: replication lag — replicas may be behind the primary by milliseconds to seconds, meaning you may read stale data (eventual consistency); application-level logic is needed to route reads vs writes; automatic failover requires additional configuration; writes remain a bottleneck since there is only one primary. Solutions for write bottlenecks include sharding or multi-master replication (more complex due to conflict resolution).
