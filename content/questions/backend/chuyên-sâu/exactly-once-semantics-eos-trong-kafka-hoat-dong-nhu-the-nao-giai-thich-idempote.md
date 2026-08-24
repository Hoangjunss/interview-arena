---
id: exactly-once-semantics-eos-trong-kafka-hoat-dong-nhu-the-nao-giai-thich-idempote
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Exactly-once semantics (EOS) trong Kafka hoạt động như thế nào? Giải thích idempotent producers và transactions.

## Question (EN)
How does exactly-once semantics (EOS) work in Kafka? Explain idempotent producers and transactions.

## Đáp án chi tiết (VI)
Kafka hỗ trợ 3 delivery semantics: at-most-once (có thể mất message), at-least-once (có thể duplicate), và exactly-once. Idempotent producer (`enable.idempotence=true`) đảm bảo mỗi message chỉ được ghi đúng một lần vào một partition kể cả khi retry — producer được gán `PID` và mỗi message có `sequence number`, broker reject duplicate. Kafka Transactions cho phép atomic write across multiple partitions/topics: producer dùng `initTransactions()`, `beginTransaction()`, write messages, `commitTransaction()` hoặc `abortTransaction()`. Consumer dùng `isolation.level=read_committed` để chỉ đọc message từ committed transaction. EOS trong Kafka Streams được bật bằng `processing.guarantee=exactly_once_v2`. \
\
**Lưu ý:** EOS có overhead về latency và throughput (~20-30%), chỉ dùng khi thực sự cần thiết (tài chính, billing).

## Detailed Answer (EN)
Kafka supports three delivery semantics: at-most-once (messages may be lost), at-least-once (messages may be duplicated), and exactly-once. An idempotent producer (`enable.idempotence=true`) ensures each message is written exactly once to a partition even on retries — the producer is assigned a `PID` and each message carries a `sequence number`; the broker rejects duplicates. Kafka Transactions enable atomic writes across multiple partitions/topics: the producer calls `initTransactions()`, `beginTransaction()`, writes messages, then `commitTransaction()` or `abortTransaction()`. Consumers set `isolation.level=read_committed` to only read messages from committed transactions. EOS in Kafka Streams is enabled via `processing.guarantee=exactly_once_v2`. \
\
**Note:** EOS adds ~20-30% latency and throughput overhead, so use it only when truly necessary (e.g., financial or billing systems).
