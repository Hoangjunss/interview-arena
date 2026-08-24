---
id: service-discovery-la-gi-client-side-va-server-side-khac-nhau-ra-sao
position: system-design
technology: microservices
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service discovery là gì? Client-side và server-side khác nhau ra sao?

## Question (EN)
What is service discovery, and how do client-side and server-side differ?

## Đáp án chi tiết (VI)
Trong hệ động, instance của service **liên tục thay đổi IP/port** (autoscale, deploy, container). Service discovery giúp một service **tìm được địa chỉ** của service khác mà không hardcode.\
\
Thành phần trung tâm là **service registry** (Consul, etcd, Eureka): mỗi instance **đăng ký** khi khởi động, gỡ khi tắt, và có **health check** để loại instance chết.\
\
Hai kiểu:\
- **Client-side discovery**: client hỏi registry rồi **tự chọn** instance và cân bằng tải. Ít hop hơn nhưng logic nằm ở client.\
- **Server-side discovery**: client gọi qua **load balancer/gateway**, thành phần này tra registry và định tuyến. Client đơn giản; phổ biến với Kubernetes (Service + kube-proxy/DNS).

## Detailed Answer (EN)
In a dynamic system, service instances **constantly change IP/port** (autoscaling, deploys, containers). Service discovery lets one service **find the address** of another without hardcoding.\
\
The central piece is a **service registry** (Consul, etcd, Eureka): each instance **registers** on startup, deregisters on shutdown, and has a **health check** to evict dead instances.\
\
Two styles:\
- **Client-side discovery**: the client queries the registry and **picks** an instance, balancing load itself. Fewer hops but the logic lives in the client.\
- **Server-side discovery**: the client calls through a **load balancer/gateway**, which consults the registry and routes. Simpler clients; common with Kubernetes (Service + kube-proxy/DNS).
