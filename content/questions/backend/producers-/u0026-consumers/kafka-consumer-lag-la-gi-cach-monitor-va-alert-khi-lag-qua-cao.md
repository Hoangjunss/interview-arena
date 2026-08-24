---
id: kafka-consumer-lag-la-gi-cach-monitor-va-alert-khi-lag-qua-cao
position: backend
technology: producers-\u0026-consumers
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kafka consumer lag là gì? Cách monitor và alert khi lag quá cao?

## Question (EN)
What is Kafka consumer lag? How do you monitor and alert when lag is too high?

## Đáp án chi tiết (VI)
Consumer lag = (Log End Offset của partition) - (Current Offset của consumer group) = số message consumer chưa xử lý. Lag cao đồng nghĩa consumer đang xử lý chậm hơn producer ghi vào, có thể dẫn đến message bị expire (nếu `log.retention.hours` ngắn) hoặc data trễ quá mức chấp nhận. Monitor lag:\
```bash\
# Kafka CLI\
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\\\\
  --describe --group my-group\
\
# Kết quả: TOPIC PARTITION CURRENT-OFFSET LOG-END-OFFSET LAG\
```\
Prometheus stack: Kafka Exporter (`kafka_consumergroup_lag`) + Grafana dashboard. Alert khi: lag vượt threshold (ví dụ \u003e 10,000 records), lag tăng liên tục qua nhiều scrape interval. Nguyên nhân lag cao: consumer xử lý chậm (heavy business logic, DB call), GC pause, rebalancing, downstream bottleneck. Giải pháp: tăng số consumer (nếu còn partition chưa được assign), optimize processing logic, tăng `max.poll.records`, cân nhắc async processing.

## Detailed Answer (EN)
Consumer lag = (Log End Offset of the partition) - (Current Offset of the consumer group) = the number of messages not yet processed by the consumer. High lag means the consumer is processing slower than the producer is writing, which can cause messages to expire (if `log.retention.hours` is short) or data to be delayed beyond acceptable limits. Monitor lag:\
```bash\
# Kafka CLI\
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\\\\
  --describe --group my-group\
\
# Output: TOPIC PARTITION CURRENT-OFFSET LOG-END-OFFSET LAG\
```\
Prometheus stack: Kafka Exporter (`kafka_consumergroup_lag`) + Grafana dashboard. Alert when: lag exceeds a threshold (e.g., \u003e 10,000 records), or lag grows continuously across multiple scrape intervals. Common causes: slow consumer processing (heavy business logic, DB calls), GC pauses, rebalancing, downstream bottlenecks. Solutions: add more consumers (if unassigned partitions exist), optimize processing logic, increase `max.poll.records`, or consider async processing.
