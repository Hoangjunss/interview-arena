---
id: reverse-proxy-va-forward-proxy-khac-nhau-the-nao-tai-sao-reverse-proxy-quan-tron
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reverse proxy và forward proxy khác nhau thế nào? Tại sao reverse proxy quan trọng trong production?

## Question (EN)
How do reverse proxy and forward proxy differ? Why is reverse proxy important in production?

## Đáp án chi tiết (VI)
Forward proxy đứng giữa client và internet: client cấu hình proxy, mọi request đi qua proxy — dùng để ẩn danh tính client, bypass geo-restriction, corporate filtering.\
\
Reverse proxy đứng trước server: client không biết server thật sự, mọi request qua reverse proxy trước — dùng để load balancing, SSL termination, caching, compression, security (ẩn internal architecture). Reverse proxy quan trọng trong production vì: (1) SSL termination — giải mã HTTPS một lần tại proxy, backend dùng HTTP thuần; (2) Load balancing giữa các server instances; (3) Caching static assets, giảm load backend; (4) Rate limiting và WAF protection; (5) Gzip/Brotli compression. Nginx là reverse proxy phổ biến nhất; Caddy tự động HTTPS; Cloudflare là reverse proxy CDN toàn cầu. Trong Next.js/Vercel, Edge Network đóng vai trò reverse proxy trước Next.js server.

## Detailed Answer (EN)
A forward proxy sits between the client and the internet: the client is configured to route all requests through it — used to hide the client's identity, bypass geo-restrictions, or enforce corporate filtering.\
\
A reverse proxy sits in front of servers: the client is unaware of the actual servers and all requests pass through the proxy first — used for load balancing, SSL termination, caching, compression, and security (hiding the internal architecture). Reverse proxies are critical in production because: (1) SSL termination — HTTPS is decrypted once at the proxy, so backends communicate over plain HTTP; (2) load balancing across server instances; (3) caching of static assets, reducing backend load; (4) rate limiting and WAF protection; (5) Gzip/Brotli compression. Nginx is the most popular reverse proxy; Caddy handles HTTPS automatically; Cloudflare acts as a global CDN reverse proxy. In Next.js/Vercel, the Edge Network acts as a reverse proxy in front of the Next.js server.
