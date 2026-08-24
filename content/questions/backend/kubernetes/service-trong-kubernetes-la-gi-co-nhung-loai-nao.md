---
id: service-trong-kubernetes-la-gi-co-nhung-loai-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service trong Kubernetes là gì? Có những loại nào?

## Question (EN)
What is a Kubernetes Service and what types exist?

## Đáp án chi tiết (VI)
Pod có IP **thay đổi** khi bị tạo lại. Service cung cấp một **địa chỉ ổn định (virtual IP + DNS)** và **load-balance** tới nhóm pod khớp label selector.\
\
Các loại:\
- **ClusterIP** (mặc định): IP nội bộ, chỉ truy cập **trong cluster**.\
- **NodePort**: mở một port cố định trên **mọi node** để truy cập từ ngoài — đơn giản, hợp test.\
- **LoadBalancer**: xin một load balancer của cloud (AWS/GCP) trỏ vào Service — cách chuẩn expose ra internet.\
- **ExternalName**: ánh xạ Service tới một tên DNS bên ngoài.\
\
Service route theo **label selector**, không phụ thuộc IP pod cụ thể → pod scale/replace vẫn gọi được.

## Detailed Answer (EN)
Pod IPs **change** when pods are recreated. A Service provides a **stable address (virtual IP + DNS)** and **load-balances** to the set of pods matching a label selector.\
\
Types:\
- **ClusterIP** (default): internal IP, reachable **within the cluster** only.\
- **NodePort**: opens a fixed port on **every node** for external access — simple, good for testing.\
- **LoadBalancer**: provisions a cloud load balancer (AWS/GCP) pointing at the Service — the standard way to expose to the internet.\
- **ExternalName**: maps the Service to an external DNS name.\
\
A Service routes by **label selector**, not specific pod IPs → scaling/replacing pods still works.
