---
id: producer-batching-trong-kafka-linger-ms-va-batch-size-hoat-dong-the-nao-de-toi-u
position: backend
technology: producers-\u0026-consumers
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Producer batching trong Kafka: linger.ms và batch.size hoạt động thế nào để tối ưu throughput?

## Question (EN)
How does Kafka producer batching work? How do linger.ms and batch.size optimize throughput?

## Đáp án chi tiết (VI)
Mặc định Kafka producer gửi message ngay lập tức (linger.ms=0), nhưng cách này kém hiệu quả khi throughput cao vì mỗi request chứa ít record. `batch.size` (default 16384 bytes = 16KB) là kích thước tối đa của một batch per-partition — khi batch đầy, gửi ngay. `linger.ms` (default 0ms) là thời gian producer chờ thêm message trước khi gửi dù batch chưa đầy — tương tự Nagle's algorithm của TCP. Tuning throughput: tăng `batch.size` lên 128KB–1MB, thêm `linger.ms=10–50ms` để gom nhiều message hơn, bật `compression.type=lz4` hoặc `snappy`. Kết quả: throughput tăng 3-5x, latency tăng nhẹ (chấp nhận được cho non-realtime). Với low-latency use case (trading, alerting) thì giữ `linger.ms=0`.\
\
**Đánh đổi:** linger.ms cao → throughput tốt, latency cao; linger.ms=0 → latency thấp nhất, throughput thấp hơn.

## Detailed Answer (EN)
By default, the Kafka producer sends messages immediately (linger.ms=0), but this is inefficient at high throughput because each request contains very few records. `batch.size` (default 16384 bytes = 16KB) is the maximum size of a batch per partition — when a batch is full it is sent immediately. `linger.ms` (default 0ms) is the time the producer waits to accumulate more messages before sending even if the batch is not full — analogous to TCP's Nagle algorithm. Throughput tuning: increase `batch.size` to 128KB–1MB, add `linger.ms=10–50ms` to gather more messages per batch, and enable `compression.type=lz4` or `snappy`. Result: 3-5x throughput improvement with a small, acceptable latency increase for non-realtime use cases. For low-latency scenarios (trading, alerting) keep `linger.ms=0`.\
\
**Trade-off:** higher linger.ms → better throughput, higher latency; linger.ms=0 → lowest latency, lower throughput.
