---
id: monitoring-va-performance-tuning-kafka-cac-metrics-quan-trong-va-cach-toi-uu-thr
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Monitoring và performance tuning Kafka: các metrics quan trọng và cách tối ưu throughput/latency?

## Question (EN)
Kafka monitoring and performance tuning: what are the key metrics and how do you optimize throughput/latency?

## Đáp án chi tiết (VI)
Metrics quan trọng cần monitor: `UnderReplicatedPartitions` (\u003e0 là dấu hiệu vấn đề replication), `OfflinePartitionsCount` (cần alert ngay khi \u003e0), `BytesInPerSec/BytesOutPerSec` (throughput), `RequestHandlerAvgIdlePercent` (\u003c0.2 là broker overloaded), consumer lag (`records-lag-max`) để detect consumer chậm. Tối ưu throughput producer: tăng `batch.size` (16KB→128KB), thêm `linger.ms` (0→20ms), bật `compression.type=lz4` giảm network I/O. Tối ưu throughput consumer: tăng `fetch.min.bytes` và `fetch.max.wait.ms` để fetch theo batch lớn, tăng `max.poll.records`. Tối ưu broker: tăng số thread I/O (`num.io.threads`), dùng dedicated disk cho Kafka log (tránh share với OS), đặt `log.dirs` trên multiple disk để parallel I/O. Dùng Kafka Exporter + Prometheus + Grafana cho observability stack.

## Detailed Answer (EN)
Key metrics to monitor: `UnderReplicatedPartitions` (\u003e 0 signals a replication issue), `OfflinePartitionsCount` (alert immediately if \u003e 0), `BytesInPerSec/BytesOutPerSec` (throughput), `RequestHandlerAvgIdlePercent` (\u003c 0.2 means the broker is overloaded), and consumer lag (`records-lag-max`) to detect slow consumers. Producer throughput tuning: increase `batch.size` (16 KB → 128 KB), add `linger.ms` (0 → 20 ms), enable `compression.type=lz4` to reduce network I/O. Consumer throughput tuning: increase `fetch.min.bytes` and `fetch.max.wait.ms` to fetch in larger batches, increase `max.poll.records`. Broker tuning: increase I/O threads (`num.io.threads`), use a dedicated disk for Kafka logs (avoid sharing with the OS), and configure `log.dirs` across multiple disks for parallel I/O. Use Kafka Exporter + Prometheus + Grafana for the observability stack.
