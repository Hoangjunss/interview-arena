---
id: load-balancing-hoat-dong-nhu-the-nao-cac-thuat-toan-load-balancing-pho-bien-la-g
position: system-design
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Load Balancing hoạt động như thế nào? Các thuật toán load balancing phổ biến là gì?

## Question (EN)
How does Load Balancing work? What are the common load balancing algorithms?

## Đáp án chi tiết (VI)
Load Balancer là thành phần đứng giữa client và các server, phân phối incoming requests để không có server nào bị quá tải, đồng thời tăng availability bằng cách redirect traffic khi có server bị lỗi. Các thuật toán phổ biến: Round Robin (luân phiên tuần tự – đơn giản nhưng không quan tâm trọng tải thực tế), Weighted Round Robin (gán trọng số theo capacity), Least Connections (gửi đến server ít connection nhất – tốt khi request có thời gian xử lý khác nhau), IP Hash (hash IP client để cùng client luôn đến cùng server – hữu ích cho session stickiness), Least Response Time (chọn server nhanh nhất). Layer 4 LB hoạt động ở transport layer (TCP/UDP), nhanh hơn nhưng ít thông minh hơn; Layer 7 LB hoạt động ở application layer, có thể route dựa trên URL, header, cookie – linh hoạt hơn nhưng overhead cao hơn. AWS ALB, Nginx, HAProxy là các giải pháp phổ biến.

## Detailed Answer (EN)
A Load Balancer sits between clients and servers, distributing incoming requests so no single server is overwhelmed, and improving availability by redirecting traffic when a server fails. Common algorithms: Round Robin (sequential rotation — simple but ignores actual load), Weighted Round Robin (assigns weights based on server capacity), Least Connections (routes to the server with fewest active connections — good when request processing times vary), IP Hash (hashes the client IP so the same client always reaches the same server — useful for session stickiness), and Least Response Time (routes to the fastest server). Layer 4 load balancers operate at the transport layer (TCP/UDP) — faster but less intelligent; Layer 7 load balancers operate at the application layer and can route based on URLs, headers, or cookies — more flexible but with higher overhead. AWS ALB, Nginx, and HAProxy are popular solutions.
