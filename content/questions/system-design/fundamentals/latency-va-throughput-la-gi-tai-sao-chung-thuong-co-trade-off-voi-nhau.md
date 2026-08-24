---
id: latency-va-throughput-la-gi-tai-sao-chung-thuong-co-trade-off-voi-nhau
position: system-design
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Latency và Throughput là gì? Tại sao chúng thường có trade-off với nhau?

## Question (EN)
What are Latency and Throughput? Why do they often trade off against each other?

## Đáp án chi tiết (VI)
Latency là thời gian để hoàn thành một request đơn lẻ (đo bằng ms) – thấp là tốt, thể hiện độ nhanh nhạy của hệ thống. Throughput là số lượng requests/operations hệ thống xử lý được trong một đơn vị thời gian (requests/second, transactions/second) – cao là tốt, thể hiện năng lực của hệ thống.\
\
Trade-off xảy ra khi: batching tăng throughput nhưng tăng latency; caching tăng throughput nhưng có thể tăng latency cho cache miss; thêm queue buffer tăng throughput nhưng tăng latency. Trong thực tế, cần xác định SLA: hệ thống real-time gaming cần latency thấp dưới 50ms; hệ thống ETL batch cần throughput cao hơn. Benchmarking nên đo P50, P95, P99 latency để hiểu tail latency, không chỉ average.

## Detailed Answer (EN)
Latency is the time to complete a single request (measured in ms) — lower is better. Throughput is the number of requests the system handles per unit of time — higher is better.\
\
The trade-off arises when: batching increases throughput but raises latency; caching increases throughput but may raise latency on misses; adding queue buffers increases throughput but raises latency. In practice, define your SLA: real-time gaming needs sub-50ms latency; nightly ETL prioritizes throughput. Benchmark P50, P95, P99 latency to understand tail latency, not just averages.
