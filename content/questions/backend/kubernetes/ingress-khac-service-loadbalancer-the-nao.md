---
id: ingress-khac-service-loadbalancer-the-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ingress khác Service (LoadBalancer) thế nào?

## Question (EN)
How does Ingress differ from a LoadBalancer Service?

## Đáp án chi tiết (VI)
Ingress quản lý **truy cập HTTP/HTTPS từ ngoài** vào cluster ở **tầng 7 (L7)**, định tuyến theo **host và path**.\
\
- Một Ingress có thể route nhiều tên miền/đường dẫn tới **nhiều Service khác nhau** qua **một điểm vào duy nhất** — thay vì mỗi Service một LoadBalancer riêng (tốn IP/chi phí).\
- Hỗ trợ **TLS termination**, virtual host, rewrite.\
- Cần một **Ingress Controller** (nginx, Traefik...) thực sự chạy để rule Ingress có hiệu lực.\
- Kubernetes đang chuẩn hóa **Gateway API** làm thế hệ kế nhiệm của Ingress (Ingress đã đóng băng tính năng mới).\
\
So sánh: Service `LoadBalancer` expose **một** service ở L4; Ingress là **router L7** gom nhiều service sau một LB. Thường dùng cùng nhau.

## Detailed Answer (EN)
Ingress manages **external HTTP/HTTPS access** into the cluster at **layer 7 (L7)**, routing by **host and path**.\
\
- One Ingress can route many hostnames/paths to **different Services** through **a single entry point** — instead of one LoadBalancer per Service (costly on IPs/money).\
- Supports **TLS termination**, virtual hosts, rewrites.\
- Requires an **Ingress Controller** (nginx, Traefik...) actually running for the rules to take effect.\
- Kubernetes is standardizing the **Gateway API** as the successor to Ingress (Ingress is feature-frozen).\
\
Comparison: a `LoadBalancer` Service exposes **one** service at L4; Ingress is an **L7 router** consolidating many services behind one LB. They are often used together.
