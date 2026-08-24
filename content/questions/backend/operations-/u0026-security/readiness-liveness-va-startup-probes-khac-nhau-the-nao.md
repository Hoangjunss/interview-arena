---
id: readiness-liveness-va-startup-probes-khac-nhau-the-nao
position: backend
technology: operations-\u0026-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Readiness, liveness và startup probes khác nhau thế nào?

## Question (EN)
How are readiness, liveness and startup probes different?

## Đáp án chi tiết (VI)
Readiness probe quyết định Pod đã sẵn sàng nhận traffic chưa. Liveness probe quyết định container có cần restart không. Startup probe bảo vệ app khởi động chậm để liveness không giết quá sớm.\
\
Ví dụ:\
```yaml\
readinessProbe:\
  httpGet:\
    path: /ready\
    port: 8000\
livenessProbe:\
  httpGet:\
    path: /health\
    port: 8000\
startupProbe:\
  httpGet:\
    path: /health\
    port: 8000\
  failureThreshold: 30\
  periodSeconds: 2\
```\
Không dùng liveness để check dependency xa như database nếu lỗi tạm thời sẽ khiến app restart liên tục.

## Detailed Answer (EN)
Readiness decides whether a Pod is ready to receive traffic. Liveness decides whether a container should be restarted. Startup protects slow-starting apps so liveness does not kill them too early.\
\
Example:\
```yaml\
readinessProbe:\
  httpGet:\
    path: /ready\
    port: 8000\
livenessProbe:\
  httpGet:\
    path: /health\
    port: 8000\
startupProbe:\
  httpGet:\
    path: /health\
    port: 8000\
  failureThreshold: 30\
  periodSeconds: 2\
```\
Do not use liveness to check distant dependencies such as a database if a temporary outage would make the app restart repeatedly.
