---
id: forward-proxy-va-reverse-proxy-khac-nhau-nhu-the-nao-moi-loai-dung-trong-truong
position: system-design
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Forward Proxy và Reverse Proxy khác nhau như thế nào? Mỗi loại dùng trong trường hợp nào?

## Question (EN)
How do Forward Proxy and Reverse Proxy differ? When is each used?

## Đáp án chi tiết (VI)
Forward Proxy đứng phía trước client, đại diện cho client gửi request ra ngoài – client biết về proxy, nhưng server ngoài không biết request thực sự đến từ đâu. Dùng để: bypass geo-restriction, ẩn IP client, filter nội dung trong corporate network, caching outbound requests (giảm bandwidth). Reverse Proxy đứng phía trước server, đại diện cho server nhận request từ client – client nghĩ mình đang nói chuyện với server thực, không biết có proxy ở giữa. Dùng để: load balancing, SSL termination, caching, rate limiting, authentication, ẩn cấu trúc internal network. Nginx và HAProxy thường đóng vai trò reverse proxy trong production; Squid là forward proxy phổ biến. API Gateway về bản chất là một reverse proxy chuyên biệt với thêm tính năng như auth, routing, transformation.

## Detailed Answer (EN)
A Forward Proxy sits in front of clients, acting on behalf of clients when sending requests out — the client is aware of the proxy, but the external server does not know the true origin of the request. Use cases: bypassing geo-restrictions, hiding client IPs, content filtering in corporate networks, and caching outbound requests to reduce bandwidth. A Reverse Proxy sits in front of servers, acting on behalf of servers when receiving client requests — the client thinks it is communicating directly with the server and is unaware of the proxy. Use cases: load balancing, SSL termination, caching, rate limiting, authentication, and hiding internal network topology. Nginx and HAProxy commonly serve as reverse proxies in production; Squid is a popular forward proxy. An API Gateway is essentially a specialized reverse proxy with additional features like authentication, routing, and request/response transformation.
