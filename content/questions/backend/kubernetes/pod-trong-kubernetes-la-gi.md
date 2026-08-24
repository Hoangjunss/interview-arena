---
id: pod-trong-kubernetes-la-gi
position: backend
technology: kubernetes
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pod trong Kubernetes là gì?

## Question (EN)
What is a Pod in Kubernetes?

## Đáp án chi tiết (VI)
Pod là **đơn vị triển khai nhỏ nhất** của Kubernetes — không phải container đơn lẻ. Một pod bọc **một hoặc nhiều container** dùng chung:\
\
- **Network**: chung một IP và cổng, các container trong pod gọi nhau qua `localhost`.\
- **Storage**: chung volume.\
\
Các container trong pod **luôn được schedule cùng nhau** trên một node. Đa số pod chỉ có 1 container chính; nhiều container thường theo mẫu **sidecar** (log shipper, proxy).\
\
Pod là **phù du (ephemeral)**: khi chết không tự hồi sinh với danh tính cũ. Vì vậy hầu như không tạo pod trực tiếp mà qua **Deployment** để được tự thay thế và scale.

## Detailed Answer (EN)
A Pod is the **smallest deployable unit** in Kubernetes — not a bare container. A pod wraps **one or more containers** that share:\
\
- **Network**: one IP and port space; containers in the pod talk over `localhost`.\
- **Storage**: shared volumes.\
\
Containers in a pod are **always scheduled together** on one node. Most pods have a single main container; multiple containers usually follow the **sidecar** pattern (log shipper, proxy).\
\
Pods are **ephemeral**: a dead pod is not resurrected with the same identity. So you rarely create pods directly — you use a **Deployment** to get automatic replacement and scaling.
