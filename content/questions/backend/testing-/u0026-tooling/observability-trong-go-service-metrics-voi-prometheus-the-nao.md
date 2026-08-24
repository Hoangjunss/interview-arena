---
id: observability-trong-go-service-metrics-voi-prometheus-the-nao
position: backend
technology: testing-\u0026-tooling
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Observability trong Go service: metrics với Prometheus thế nào?

## Question (EN)
How do you add Prometheus metrics observability to a Go service?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
Observability has 3 pillars: logs, metrics, traces. Prometheus is the de facto standard for Go metrics.\
\
```go\
httpRequests := prometheus.NewCounterVec(prometheus.CounterOpts{\
    Name: \\"http_requests_total\\
