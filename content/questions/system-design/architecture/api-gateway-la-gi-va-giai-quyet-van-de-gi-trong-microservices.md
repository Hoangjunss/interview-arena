---
id: api-gateway-la-gi-va-giai-quyet-van-de-gi-trong-microservices
position: system-design
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
API gateway là gì và giải quyết vấn đề gì trong microservices?

## Question (EN)
What is an API gateway and what does it solve in microservices?

## Đáp án chi tiết (VI)
API gateway là **điểm vào duy nhất** đứng trước nhiều dịch vụ; client gọi gateway thay vì gọi trực tiếp từng service.\
\
Nó gánh các mối quan tâm chung (cross-cutting):\
- **Định tuyến \u0026 tổng hợp**: chuyển request tới đúng service, gộp nhiều lời gọi thành một phản hồi.\
- **Xác thực/uỷ quyền** tập trung, **rate limiting**, chống lạm dụng.\
- **TLS termination**, nén, cache, ghi log/metrics/tracing.\
- Che giấu cấu trúc nội bộ, đổi giao thức (ví dụ REST bên ngoài ↔ gRPC bên trong).\
\
Lợi ích: client đơn giản, chính sách bảo mật đồng nhất. Rủi ro: có thể thành **điểm nghẽn/single point of failure** → cần chạy nhiều instance sau load balancer, tránh nhồi business logic vào gateway.

## Detailed Answer (EN)
An API gateway is a **single entry point** in front of many services; clients call the gateway instead of each service directly.\
\
It handles cross-cutting concerns:\
- **Routing \u0026 aggregation**: forward requests to the right service, combine several calls into one response.\
- Centralized **authentication/authorization**, **rate limiting**, abuse protection.\
- **TLS termination**, compression, caching, logging/metrics/tracing.\
- Hides internal topology, translates protocols (e.g. external REST ↔ internal gRPC).\
\
Benefits: simpler clients, uniform security policy. Risks: it can become a **bottleneck/single point of failure** → run multiple instances behind a load balancer and avoid stuffing business logic into the gateway.
