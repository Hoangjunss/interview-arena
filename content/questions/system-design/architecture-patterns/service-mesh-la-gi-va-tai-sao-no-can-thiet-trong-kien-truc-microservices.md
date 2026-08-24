---
id: service-mesh-la-gi-va-tai-sao-no-can-thiet-trong-kien-truc-microservices
position: system-design
technology: architecture-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service Mesh là gì và tại sao nó cần thiết trong kiến trúc microservices?

## Question (EN)
What is a Service Mesh and why is it needed in a microservices architecture?

## Đáp án chi tiết (VI)
Service Mesh là infrastructure layer xử lý service-to-service communication trong microservices, thường được implement qua sidecar proxy pattern (mỗi service pod có một proxy container đi kèm). Service Mesh cung cấp: mTLS (mutual TLS) cho encrypted communication giữa services, load balancing, circuit breaking, retry logic, timeout, distributed tracing, metrics collection – tất cả mà không cần sửa application code. Vấn đề Service Mesh giải quyết: khi có hàng chục microservices, implement networking concerns trong mỗi service (bằng library) rất khó maintain, tốn công, dễ inconsistent. Service Mesh chuyển những concerns này ra infrastructure layer. Istio (với Envoy sidecar) và Linkerd là hai giải pháp phổ biến nhất. Đánh đổi: operational complexity rất cao, Istio đặc biệt nặng và có learning curve lớn – chỉ phù hợp khi có đủ platform engineering team. Nhiều tổ chức chọn giải pháp đơn giản hơn như Consul Connect hoặc AWS App Mesh.

## Detailed Answer (EN)
$89
