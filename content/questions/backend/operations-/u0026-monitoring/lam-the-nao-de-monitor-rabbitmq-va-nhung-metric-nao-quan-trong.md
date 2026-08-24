---
id: lam-the-nao-de-monitor-rabbitmq-va-nhung-metric-nao-quan-trong
position: backend
technology: operations-\u0026-monitoring
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để monitor RabbitMQ và những metric nào quan trọng?

## Question (EN)
How do you monitor RabbitMQ and what metrics matter?

## Đáp án chi tiết (VI)
Monitor các metric chính bằng Prometheus + Grafana: (1) **Queue depth** — tăng liên tục báo hiệu consumer lag; (2) **Consumer count** — bằng 0 là vấn đề; (3) **Unacked messages** — message bị stuck; (4) **Publish/consume rate** — throughput; (5) **Memory usage** — backpressure ở 40% mặc định; (6) **Connection/channel count** — phát hiện leak; (7) **Node health** — disk space, GC pauses. Alert: queue depth tăng \u003e 1000/phút, zero consumer \u003e 5 phút, memory \u003e 70%, connection churn \u003e 100/giây. Dùng plugin rabbitmq_prometheus tích hợp sẵn.

## Detailed Answer (EN)
Monitor with Prometheus + Grafana: (1) Queue depth (growing = consumer lag); (2) Consumer count (zero = problem); (3) Unacked messages (stuck messages); (4) Publish/consume rates (throughput); (5) Memory usage (backpressure at 40% default); (6) Connection/channel counts (leaks); (7) Node health (disk, GC). Alert thresholds: queue depth growing \u003e1k/min, zero consumers \u003e5 min, memory \u003e70%. Use the built-in rabbitmq_prometheus plugin.
