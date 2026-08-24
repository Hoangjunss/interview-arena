---
id: api-gateway-la-gi-vai-tro-va-cac-tinh-nang-chinh-cua-no-trong-microservices-arch
position: system-design
technology: architecture-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
API Gateway là gì? Vai trò và các tính năng chính của nó trong microservices architecture?

## Question (EN)
What is an API Gateway? What is its role and key features in a microservices architecture?

## Đáp án chi tiết (VI)
API Gateway là single entry point cho tất cả client requests đến microservices – hoạt động như reverse proxy với nhiều tính năng bổ sung. Vai trò: routing (forward request đến đúng service), authentication/authorization (centralized auth thay vì mỗi service tự verify), rate limiting, SSL termination, request/response transformation, API versioning, caching. \
\
**Lợi ích:** client chỉ cần biết một endpoint thay vì nhiều service URLs; giảm round trips với request aggregation (BFF pattern – Backend for Frontend); dễ thêm cross-cutting concerns mà không sửa services. Hạn chế: single point of failure nếu không có HA setup; có thể trở thành bottleneck; thêm latency; có thể tạo coupling nếu overloaded với logic. Phân biệt API Gateway vs Service Mesh: API Gateway xử lý North-South traffic (external → internal), Service Mesh xử lý East-West traffic (service → service). Giải pháp phổ biến: AWS API Gateway, Kong, Nginx, Traefik, Envoy.

## Detailed Answer (EN)
$7c
