---
id: observability-cho-fastapi-production-can-nhung-gi
position: backend
technology: testing-\u0026-production
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Observability cho FastAPI production cần những gì?

## Question (EN)
What does production observability for FastAPI need?

## Đáp án chi tiết (VI)
Production cần structured logs, request id/correlation id, metrics, tracing, error reporting và health endpoints. Log nên ra stdout/stderr để container runtime thu thập.\
\
Các metric quan trọng: request count, latency percentile, error rate, dependency latency, DB pool usage, background task failures. Với tracing, dùng OpenTelemetry để nối FastAPI request với database, HTTP client và message broker. Health check nên tách liveness đơn giản với readiness kiểm dependency quan trọng.

## Detailed Answer (EN)
Production needs structured logs, request ids/correlation ids, metrics, tracing, error reporting and health endpoints. Logs should go to stdout/stderr so the container runtime can collect them.\
\
Important metrics: request count, latency percentiles, error rate, dependency latency, DB pool usage and background task failures. For tracing, use OpenTelemetry to connect FastAPI requests with database, HTTP client and message broker spans. Health checks should separate simple liveness from readiness that checks critical dependencies.
