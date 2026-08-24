---
id: reverse-proxy-forward-proxy-va-load-balancer-khac-nhau-the-nao
position: system-design
technology: networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reverse proxy, forward proxy và load balancer khác nhau thế nào?

## Question (EN)
How do a reverse proxy, a forward proxy and a load balancer differ?

## Đáp án chi tiết (VI)
- **Forward proxy**: đứng **trước client**, đại diện cho client đi ra ngoài. Client cấu hình để mọi request đi qua nó → dùng cho lọc/kiểm soát truy cập, ẩn danh client, cache đầu ra. Ví dụ: proxy công ty, VPN gateway.\
- **Reverse proxy**: đứng **trước server**, đại diện cho server nhận request từ Internet. Client không biết có bao nhiêu server phía sau. Nhiệm vụ: **TLS termination**, cache, nén, chặn tấn công, định tuyến theo path. Ví dụ: Nginx, Cloudflare.\
- **Load balancer**: một **vai trò chuyên biệt** thường do reverse proxy (L7) hoặc thiết bị L4 đảm nhận — **phân phối traffic** cho nhiều server backend theo thuật toán + health check.\
\
Góc nhìn gọn: forward proxy phục vụ **client**, reverse proxy phục vụ **server**; load balancer là một chức năng cân bằng tải thường nằm trong reverse proxy.

## Detailed Answer (EN)
- **Forward proxy**: sits **in front of clients**, acting on their behalf to reach the outside. Clients configure it so all requests go through it → used for filtering/access control, client anonymity, egress caching. E.g. a corporate proxy, VPN gateway.\
- **Reverse proxy**: sits **in front of servers**, acting on their behalf to receive Internet requests. Clients do not know how many servers are behind it. Duties: **TLS termination**, caching, compression, attack blocking, path-based routing. E.g. Nginx, Cloudflare.\
- **Load balancer**: a **specialized role** usually played by a reverse proxy (L7) or an L4 appliance — **distributing traffic** across backend servers by an algorithm + health checks.\
\
Quick view: a forward proxy serves the **client**, a reverse proxy serves the **server**; a load balancer is a balancing function typically living inside a reverse proxy.
