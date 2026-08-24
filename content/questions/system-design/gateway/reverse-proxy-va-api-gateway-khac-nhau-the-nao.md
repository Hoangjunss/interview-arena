---
id: reverse-proxy-va-api-gateway-khac-nhau-the-nao
position: system-design
technology: gateway
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reverse proxy và API gateway khác nhau thế nào?

## Question (EN)
What is the difference between a reverse proxy and an API gateway?

## Đáp án chi tiết (VI)
**Reverse proxy** (vd Nginx, HAProxy) đứng trước server, nhận request thay cho chúng và chuyển tiếp. Chức năng hạ tầng chung: **TLS termination**, load balancing, cache, nén, che giấu topology nội bộ.\
\
**API gateway** là một reverse proxy **chuyên cho API**, thêm các mối lo tầng ứng dụng ở một điểm vào duy nhất cho hệ (thường microservices):\
- **Định tuyến** request tới đúng service.\
- **Authentication/authorization** tập trung.\
- **Rate limiting**, quota, API key.\
- **Aggregation** (gộp nhiều service call), chuyển đổi giao thức, logging/metrics.\
\
Chốt: mọi API gateway đều là reverse proxy, nhưng reverse proxy thuần chỉ lo chuyển tiếp/hạ tầng; API gateway gánh thêm **logic API cross-cutting**. Hệ nhỏ dùng reverse proxy là đủ; nhiều microservice thì gateway giúp gom các mối lo chung.

## Detailed Answer (EN)
A **reverse proxy** (e.g. Nginx, HAProxy) sits in front of servers, receives requests on their behalf and forwards them. Shared infrastructure duties: **TLS termination**, load balancing, caching, compression, hiding internal topology.\
\
An **API gateway** is a reverse proxy **specialized for APIs**, adding application-layer concerns at a single entry point for the system (usually microservices):\
- **Routing** requests to the right service.\
- Centralized **authentication/authorization**.\
- **Rate limiting**, quotas, API keys.\
- **Aggregation** (fanning out to several services), protocol translation, logging/metrics.\
\
Bottom line: every API gateway is a reverse proxy, but a plain reverse proxy only forwards/handles infrastructure; an API gateway also carries **cross-cutting API logic**. A small system needs only a reverse proxy; many microservices benefit from a gateway to centralize shared concerns.
