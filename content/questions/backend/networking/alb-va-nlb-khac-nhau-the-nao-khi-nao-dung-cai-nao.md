---
id: alb-va-nlb-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ALB và NLB khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do ALB and NLB differ, and when do you use each?

## Đáp án chi tiết (VI)
Cả hai là load balancer của AWS ELB nhưng làm việc ở tầng khác nhau:\
\
- **ALB (Application Load Balancer)** — **tầng 7 (HTTP/HTTPS)**. Định tuyến theo **path, host, header**; hỗ trợ TLS termination, WebSocket, **gRPC (HTTP/2 end-to-end)**, redirect, target là instance/IP/Lambda. Hợp cho **web app, microservice, API**.\
- **NLB (Network Load Balancer)** — **tầng 4 (TCP/UDP)**. **Throughput rất cao, độ trễ cực thấp**, giữ **static/Elastic IP**, chịu hàng triệu kết nối. Hợp cho traffic **không phải HTTP**, cần hiệu năng cao hoặc IP cố định (game, IoT, giao thức TCP/UDP thuần).\
\
Chọn: cần **định tuyến L7 theo nội dung HTTP** → ALB; cần **L4 hiệu năng cao / IP tĩnh / non-HTTP** → NLB. (Còn CLB là loại cũ, ít dùng.)

## Detailed Answer (EN)
Both are AWS ELB load balancers but operate at different layers:\
\
- **ALB (Application Load Balancer)** — **layer 7 (HTTP/HTTPS)**. Routes by **path, host, header**; supports TLS termination, WebSocket, **gRPC (end-to-end HTTP/2)**, redirects, targets of instance/IP/Lambda. Fits **web apps, microservices, APIs**.\
- **NLB (Network Load Balancer)** — **layer 4 (TCP/UDP)**. **Very high throughput, ultra-low latency**, keeps a **static/Elastic IP**, handles millions of connections. Fits **non-HTTP** traffic, high performance, or a fixed IP (gaming, IoT, raw TCP/UDP protocols).\
\
Choose: need **L7 content-based routing** → ALB; need **high-performance L4 / static IP / non-HTTP** → NLB. (The Classic LB is legacy, rarely used.)
