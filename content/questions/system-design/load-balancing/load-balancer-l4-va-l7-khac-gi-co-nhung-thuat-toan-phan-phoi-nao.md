---
id: load-balancer-l4-va-l7-khac-gi-co-nhung-thuat-toan-phan-phoi-nao
position: system-design
technology: load-balancing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Load balancer L4 và L7 khác gì? Có những thuật toán phân phối nào?

## Question (EN)
How do L4 and L7 load balancers differ, and what balancing algorithms exist?

## Đáp án chi tiết (VI)
Load balancer chia traffic cho nhiều server để tránh quá tải và loại bỏ single point of failure.\
\
- **L4 (transport)**: định tuyến theo IP/port, không đọc nội dung → **nhanh, throughput cao**, nhưng ít linh hoạt.\
- **L7 (application)**: đọc HTTP (path, header, cookie) → định tuyến theo nội dung, **TLS termination**, sticky session, nhưng tốn CPU hơn.\
\
Thuật toán phổ biến:\
- **Round robin** / **weighted round robin**.\
- **Least connections** (server ít kết nối nhất).\
- **IP hash / consistent hashing** (giữ client về đúng server).\
\
Load balancer cần **health check** để tự loại server hỏng khỏi pool.

## Detailed Answer (EN)
A load balancer spreads traffic across servers to avoid overload and remove single points of failure.\
\
- **L4 (transport)**: routes by IP/port without reading content → **fast, high throughput**, but less flexible.\
- **L7 (application)**: reads HTTP (path, header, cookie) → content-based routing, **TLS termination**, sticky sessions, but more CPU.\
\
Common algorithms:\
- **Round robin** / **weighted round robin**.\
- **Least connections** (fewest active connections).\
- **IP hash / consistent hashing** (pin a client to a server).\
\
A load balancer needs **health checks** to drop unhealthy servers from the pool automatically.
