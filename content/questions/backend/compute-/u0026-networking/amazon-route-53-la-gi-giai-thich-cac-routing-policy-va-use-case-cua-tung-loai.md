---
id: amazon-route-53-la-gi-giai-thich-cac-routing-policy-va-use-case-cua-tung-loai
position: backend
technology: compute-\u0026-networking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Amazon Route 53 là gì? Giải thích các routing policy và use case của từng loại.

## Question (EN)
What is Amazon Route 53? Explain the routing policies and the use case for each.

## Đáp án chi tiết (VI)
Amazon Route 53 là dịch vụ DNS (Domain Name System) managed, highly available của AWS với SLA 100% uptime; tên gọi từ cổng DNS TCP/UDP 53.\
\
Các routing policy:\
- Simple routing — map domain tới một IP/resource, không có logic\
- Weighted routing — phân phối traffic theo tỷ lệ phần trăm (vd: 90% v1, 10% v2 cho canary deployment)\
- Latency-based routing — route đến region AWS có latency thấp nhất so với client\
- Geolocation routing — route theo quốc gia/châu lục của client (dùng cho content localization, compliance data residency)\
- Geoproximity routing — tương tự geolocation nhưng có thể shift traffic theo bias\
- Failover routing — primary/secondary, tự động chuyển sang secondary khi health check fail\
- Multi-value routing — trả về nhiều IP ngẫu nhiên, client tự chọn (load balancing cơ bản phía DNS)\
\
Health Checks tích hợp cho phép Route 53 detect endpoint unhealthy và tự động failover. Route 53 Resolver cung cấp DNS resolution giữa on-premise và VPC qua Direct Connect/VPN.

## Detailed Answer (EN)
$83
