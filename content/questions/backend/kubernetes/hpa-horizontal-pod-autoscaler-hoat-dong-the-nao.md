---
id: hpa-horizontal-pod-autoscaler-hoat-dong-the-nao
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HPA (Horizontal Pod Autoscaler) hoạt động thế nào?

## Question (EN)
How does the Horizontal Pod Autoscaler (HPA) work?

## Đáp án chi tiết (VI)
HPA **tự động tăng/giảm số replica** của một Deployment/StatefulSet dựa trên tải quan sát được.\
\
- Đọc metric (mặc định **CPU/memory** qua metrics-server; hoặc **custom/external** metric như request/giây).\
- So với **ngưỡng mục tiêu** đã đặt (vd giữ CPU ~60%). Vượt → thêm pod; dưới → bớt pod, trong khoảng `min`–`max` replica.\
- Là **horizontal scaling** (thêm pod), khác **VPA** (vertical — chỉnh CPU/RAM cho từng pod).\
\
Điều kiện cần: pod phải khai báo **resource `requests`** để HPA tính % sử dụng. Có cơ chế ổn định (stabilization) để tránh giật (flapping).

## Detailed Answer (EN)
The HPA **automatically scales the replica count** of a Deployment/StatefulSet based on observed load.\
\
- It reads metrics (default **CPU/memory** via metrics-server; or **custom/external** metrics like requests/second).\
- Compares against a **target threshold** (e.g. keep CPU ~60%). Above → add pods; below → remove pods, within `min`–`max` replicas.\
- This is **horizontal scaling** (more pods), unlike **VPA** (vertical — adjusting per-pod CPU/RAM).\
\
Prerequisite: pods must declare resource **`requests`** so the HPA can compute utilization %. It has stabilization logic to avoid flapping.
