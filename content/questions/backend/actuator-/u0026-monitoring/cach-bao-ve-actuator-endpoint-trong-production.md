---
id: cach-bao-ve-actuator-endpoint-trong-production
position: backend
technology: actuator-\u0026-monitoring
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách bảo vệ Actuator endpoint trong production?

## Question (EN)
How do you secure Actuator endpoints in production?

## Đáp án chi tiết (VI)
Endpoint Actuator nhạy cảm (`/env`, `/heapdump`, `/loggers`) phải được bảo vệ — không để public.\
\
**3 lớp (kết hợp được):**\
\
1. **Chỉ expose cái cần + port riêng:**\
```yaml\
management:\
  server.port: 8081                # Actuator trên port riêng\
  server.address: 127.0.0.1        # chỉ localhost / mạng nội bộ\
  endpoints.web.exposure.include: health, info, prometheus\
  endpoint.health.show-details: when-authorized\
```\
K8s probe/Prometheus vẫn gọi được trong cluster; internet không vào được port 8081.\
\
2. **Spring Security:** `permitAll()` cho `/actuator/health` + `/actuator/info`; `hasRole(\\"ADMIN\\")` cho `/actuator/**` còn lại (rule trong SecurityFilterChain).\
\
3. **`/actuator/shutdown`** — luôn để tắt (`endpoint.shutdown.enabled: false` cũng là default); bật lên mà không auth = ai cũng tắt được app.

## Detailed Answer (EN)
Sensitive Actuator endpoints (`/env`, `/heapdump`, `/loggers`) must be protected — never public.\
\
**3 layers (combinable):**\
\
1. **Expose only what is needed + separate port:**\
```yaml\
management:\
  server.port: 8081                # Actuator on its own port\
  server.address: 127.0.0.1        # localhost / internal network only\
  endpoints.web.exposure.include: health, info, prometheus\
  endpoint.health.show-details: when-authorized\
```\
K8s probes/Prometheus still reach it inside the cluster; the internet cannot reach port 8081.\
\
2. **Spring Security:** `permitAll()` for `/actuator/health` + `/actuator/info`; `hasRole(\\"ADMIN\\")` for the remaining `/actuator/**` (rules in the SecurityFilterChain).\
\
3. **`/actuator/shutdown`** — keep disabled (`endpoint.shutdown.enabled: false`, also the default); enabling it without auth = anyone can shut the app down.
