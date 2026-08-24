---
id: ingress-trong-kubernetes-dung-de-lam-gi
position: backend
technology: workloads-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ingress trong Kubernetes dùng để làm gì?

## Question (EN)
What is Ingress used for in Kubernetes?

## Đáp án chi tiết (VI)
Ingress định nghĩa rule HTTP/HTTPS để traffic từ ngoài cluster đi vào Services bên trong, thường dựa trên host/path. Ingress chỉ là Kubernetes resource; cần Ingress Controller như nginx, Traefik hoặc cloud controller để thực thi rule.\
\
Khác với Service `LoadBalancer` expose một Service trực tiếp, Ingress thường gom nhiều route/domain qua một entrypoint và xử lý TLS, path routing, host routing. Cần cấu hình DNS, certificate và controller đúng thì traffic mới vào được app.

## Detailed Answer (EN)
Ingress defines HTTP/HTTPS rules for traffic from outside the cluster to Services inside the cluster, usually based on host/path. Ingress is only a Kubernetes resource; an Ingress Controller such as nginx, Traefik or a cloud controller is needed to enforce the rules.\
\
Unlike a `LoadBalancer` Service that exposes one Service directly, Ingress commonly groups many routes/domains behind one entrypoint and handles TLS, path routing and host routing. DNS, certificates and the controller must be configured correctly for traffic to reach the app.
