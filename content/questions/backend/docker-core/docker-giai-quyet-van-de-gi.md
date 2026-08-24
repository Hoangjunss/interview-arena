---
id: docker-giai-quyet-van-de-gi
position: backend
technology: docker-core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker giải quyết vấn đề gì?

## Question (EN)
What problem does Docker solve?

## Đáp án chi tiết (VI)
Docker đóng gói app cùng runtime, dependencies và cấu hình cần thiết vào container image để chạy nhất quán giữa local, CI và production. Nó giảm lỗi kiểu chạy được trên máy tôi nhưng lỗi trên server.\
\
Điểm cần hiểu trong interview: Docker không phải VM nhẹ. Container chia sẻ kernel host, khởi động nhanh hơn VM, nhưng vẫn cần quản lý image size, security, secrets, network, storage và lifecycle rõ ràng.

## Detailed Answer (EN)
Docker packages an app with its runtime, dependencies and required configuration into a container image so it runs consistently across local, CI and production. It reduces environment drift.\
\
Interview point: Docker is not just a lightweight VM. Containers share the host kernel and start faster than VMs, but still need clear management for image size, security, secrets, networking, storage and lifecycle.
