---
id: spring-boot-actuator-dung-de-lam-gi
position: backend
technology: actuator-\u0026-monitoring
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Boot Actuator dùng để làm gì?

## Question (EN)
What is the purpose of Spring Boot Actuator?

## Đáp án chi tiết (VI)
**Actuator** cung cấp endpoint production-ready expose thông tin app qua HTTP/JMX — không cần viết code monitoring. Thêm starter `spring-boot-starter-actuator`, chọn endpoint expose qua `management.endpoints.web.exposure.include: health, metrics, info, prometheus`.\
\
**Endpoint chính:**\
- `/actuator/health` — liveness/readiness probe (Kubernetes).\
- `/actuator/metrics` — CPU, memory, HTTP latency.\
- `/actuator/prometheus` — format cho Prometheus scrape.\
- `/actuator/info` — build info, git commit.\
- `/actuator/loggers` — đổi log level runtime, không restart.\
\
**Dùng cho:** operational visibility, debug production, health check K8s, monitoring Prometheus + Grafana. **Bảo mật:** endpoint nhạy cảm (`/env`, `/heapdump`) phải chặn qua Spring Security hoặc chỉ mở trên port nội bộ (xem câu bảo vệ Actuator).

## Detailed Answer (EN)
**Actuator** provides production-ready endpoints exposing app info via HTTP/JMX — no monitoring code needed. Add the `spring-boot-starter-actuator` starter and choose what to expose via `management.endpoints.web.exposure.include: health, metrics, info, prometheus`.\
\
**Key endpoints:**\
- `/actuator/health` — liveness/readiness probe (Kubernetes).\
- `/actuator/metrics` — CPU, memory, HTTP latency.\
- `/actuator/prometheus` — Prometheus scrape format.\
- `/actuator/info` — build info, git commit.\
- `/actuator/loggers` — change log levels at runtime, no restart.\
\
**Used for:** operational visibility, production debugging, K8s health checks, Prometheus + Grafana monitoring. **Security:** sensitive endpoints (`/env`, `/heapdump`) must be locked behind Spring Security or exposed only on an internal port (see the securing-Actuator item).
