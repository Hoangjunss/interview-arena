---
id: at-least-once-vs-at-most-once-vs-exactly-once-trong-kafka-phan-biet-va-cach-dat
position: backend
technology: producers-\u0026-consumers
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
At-least-once vs at-most-once vs exactly-once trong Kafka: phân biệt và cách đạt được mỗi loại?

## Question (EN)
At-least-once vs at-most-once vs exactly-once in Kafka: differences and how to achieve each?

## Đáp án chi tiết (VI)
**At-most-once** (fire-and-forget): producer `acks=0`, consumer commit offset trước khi xử lý — message có thể mất, không bao giờ duplicate. Dùng cho metrics/log không cần chính xác tuyệt đối. **At-least-once**: producer `acks=all` + retries, consumer commit sau khi xử lý thành công — không mất message nhưng có thể xử lý trùng (duplicate) khi consumer crash sau xử lý nhưng trước commit. Yêu cầu consumer logic phải idempotent. **Exactly-once**: khó nhất, cần cả producer và consumer phối hợp. Producer: bật `enable.idempotence=true` + Kafka Transactions (`transactional.id`). Consumer: `isolation.level=read_committed` + đặt offset commit trong cùng transaction với business logic (nếu write ra DB phải là transactional outbox). Kafka Streams với `processing.guarantee=exactly_once_v2` tự handle toàn bộ. Exactly-once có overhead ~20-30% latency — chỉ dùng cho billing, financial transactions.

## Detailed Answer (EN)
**At-most-once** (fire-and-forget): producer `acks=0`, consumer commits offset before processing — messages can be lost but are never duplicated. Use for metrics or logs where absolute accuracy is not required. **At-least-once**: producer `acks=all` + retries, consumer commits after successful processing — no message loss but possible duplicates when a consumer crashes after processing but before committing the offset. Consumer logic must be idempotent. **Exactly-once**: the hardest to achieve, requiring cooperation between producer and consumer. Producer: enable `enable.idempotence=true` + Kafka Transactions (`transactional.id`). Consumer: `isolation.level=read_committed` + include the offset commit in the same transaction as the business logic (if writing to a DB, use the transactional outbox pattern). Kafka Streams with `processing.guarantee=exactly_once_v2` handles this automatically. Exactly-once incurs ~20-30% latency overhead — reserve it for billing and financial transactions.
