---
id: idempotent-producer-trong-kafka-la-gi-cach-bat-va-hoat-dong-nhu-the-nao
position: backend
technology: producers-\u0026-consumers
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Idempotent producer trong Kafka là gì? Cách bật và hoạt động như thế nào?

## Question (EN)
What is an idempotent producer in Kafka? How do you enable it and how does it work?

## Đáp án chi tiết (VI)
Idempotent producer đảm bảo rằng dù producer retry gửi message bao nhiêu lần (do network error, timeout), mỗi message chỉ được ghi đúng một lần vào partition. Cách hoạt động: Kafka assign cho mỗi producer một `Producer ID (PID)` duy nhất và mỗi message có `sequence number` tăng dần per-partition. Broker reject nếu thấy message có sequence number đã nhận hoặc không liên tiếp. Bật bằng cách set `enable.idempotence=true` — tự động set `acks=all`, `max.in.flight.requests.per.connection=5`, `retries=Integer.MAX_VALUE`. Idempotence chỉ trong một producer session — nếu producer restart, PID mới và sequence reset. Để exactly-once across sessions và multiple partitions, cần Kafka Transactions.\
\
**Ví dụ:**\
```\
props.put(\\"enable.idempotence\\

## Detailed Answer (EN)
An idempotent producer guarantees that no matter how many times a producer retries (due to network errors or timeouts), each message is written exactly once to a partition. How it works: Kafka assigns each producer a unique `Producer ID (PID)`, and every message carries a `sequence number` that increments per-partition. The broker rejects messages whose sequence number has already been received or is not consecutive. Enable it by setting `enable.idempotence=true` — this automatically sets `acks=all`, `max.in.flight.requests.per.connection=5`, and `retries=Integer.MAX_VALUE`. Idempotence only applies within a single producer session — if the producer restarts, it receives a new PID and the sequence resets. For exactly-once semantics across sessions and multiple partitions, Kafka Transactions are required.\
\
**Example:**\
```\
props.put(\\"enable.idempotence\\
