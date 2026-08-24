---
id: kafka-streams-la-gi-khac-gi-so-voi-viec-consume-message-thong-thuong
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kafka Streams là gì? Khác gì so với việc consume message thông thường?

## Question (EN)
What is Kafka Streams? How does it differ from regular message consumption?

## Đáp án chi tiết (VI)
Kafka Streams là thư viện Java/Scala để xây dựng ứng dụng stream processing trực tiếp trên Kafka, không cần external cluster như Spark hay Flink. Kafka Streams cung cấp các operation high-level như `filter`, `map`, `groupBy`, `aggregate`, `join` giữa các stream. Điểm khác biệt: consumer thông thường chỉ đọc và xử lý message, còn Kafka Streams có khái niệm KStream (unbounded stream of events) và KTable (changelog stream, represents current state), cho phép stateful processing với local state store (RocksDB). Kafka Streams tự động handle partitioning, scaling, và fault recovery — khi thêm instance, Kafka tự rebalance partition. \
\
**Ví dụ:** tính tổng doanh thu mỗi 5 phút từ stream order events, join stream clicks với stream purchases để tính conversion rate.

## Detailed Answer (EN)
Kafka Streams is a Java/Scala library for building stream-processing applications directly on top of Kafka, without needing an external cluster like Spark or Flink. It provides high-level operations such as `filter`, `map`, `groupBy`, `aggregate`, and `join` between streams. The key difference from regular consumers: a plain consumer just reads and processes messages, whereas Kafka Streams introduces KStream (an unbounded stream of events) and KTable (a changelog stream representing current state), enabling stateful processing backed by a local state store (RocksDB). Kafka Streams automatically handles partitioning, scaling, and fault recovery — adding a new instance triggers Kafka to rebalance partitions automatically. Examples: computing total revenue every 5 minutes from an order-events stream, or joining a click stream with a purchase stream to calculate conversion rates.
