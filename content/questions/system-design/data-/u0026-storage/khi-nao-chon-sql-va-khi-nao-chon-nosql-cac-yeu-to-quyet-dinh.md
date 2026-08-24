---
id: khi-nao-chon-sql-va-khi-nao-chon-nosql-cac-yeu-to-quyet-dinh
position: system-design
technology: data-\u0026-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào chọn SQL và khi nào chọn NoSQL? Các yếu tố quyết định?

## Question (EN)
When should you choose SQL vs NoSQL? What are the deciding factors?

## Đáp án chi tiết (VI)
SQL (Relational DB): dùng khi cần ACID transactions (tài chính, đặt hàng), data có structure rõ ràng và ổn định, cần complex queries với JOINs. PostgreSQL, MySQL là lựa chọn mặc định tốt cho hầu hết applications.\
\
NoSQL chia thành nhiều loại:\
- Document DB (MongoDB, Firestore) – flexible schema, tốt cho content management, user profiles\
- Key-Value (Redis, DynamoDB) – cực nhanh, tốt cho caching, session, leaderboards\
- Column-family (Cassandra, HBase) – write-heavy workloads, time-series, IoT data ở scale lớn\
- Graph DB (Neo4j) – relationship-heavy queries, social networks, fraud detection\
\
Quyết định không chỉ là SQL vs NoSQL mà là chọn đúng database cho use case. Polyglot persistence – dùng nhiều database types trong cùng hệ thống – là approach của các hệ thống lớn (Netflix dùng MySQL + Cassandra + Elasticsearch + Redis).

## Detailed Answer (EN)
SQL (Relational DB): use when ACID transactions are required (finance, order management), data has a clear and stable structure, or complex JOINs are needed. PostgreSQL and MySQL are good defaults for most applications.\
\
NoSQL types:\
- Document DB (MongoDB, Firestore) — flexible schema, great for content management and user profiles\
- Key-Value (Redis, DynamoDB) — extremely fast, ideal for caching, sessions, leaderboards\
- Column-family (Cassandra, HBase) — write-heavy workloads, time-series data, IoT at large scale\
- Graph DB (Neo4j) — relationship-heavy queries, social networks, fraud detection\
\
The decision is choosing the right database for the use case, not just SQL vs NoSQL. Polyglot persistence — using multiple database types in the same system — is how large-scale systems operate (Netflix uses MySQL + Cassandra + Elasticsearch + Redis simultaneously).
