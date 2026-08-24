---
id: vi-sao-can-orchestration-kubernetes-no-giai-quyet-van-de-gi
position: backend
technology: kubernetes
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao cần orchestration (Kubernetes)? Nó giải quyết vấn đề gì?

## Question (EN)
Why do you need orchestration (Kubernetes) and what problem does it solve?

## Đáp án chi tiết (VI)
Chạy vài container trên một máy thì Docker là đủ. Nhưng khi có **nhiều container trải qua nhiều host** trong production, xuất hiện hàng loạt việc phải làm **tự động** — đó là lý do cần một orchestrator.\
\
Kubernetes lo giúp:\
- **Scheduling**: xếp container lên node phù hợp (đủ CPU/RAM).\
- **Self-healing**: container/pod chết thì tự tạo lại; node hỏng thì reschedule.\
- **Scaling**: tăng/giảm số bản sao theo tải (thủ công hoặc HPA).\
- **Service discovery + load balancing**: địa chỉ ổn định và chia tải tới nhóm pod.\
- **Rolling update / rollback**: phát hành không downtime, quay lui khi lỗi.\
- **Config/secret**: tách cấu hình khỏi image.\
\
Cốt lõi là mô hình **desired state**: bạn khai báo \\"muốn gì\\

## Detailed Answer (EN)
Running a few containers on one machine, Docker is enough. But with **many containers across many hosts** in production, a lot of work must happen **automatically** — that is why you need an orchestrator.\
\
Kubernetes handles:\
- **Scheduling**: place containers on suitable nodes (enough CPU/RAM).\
- **Self-healing**: recreate dead containers/pods; reschedule off failed nodes.\
- **Scaling**: scale replicas up/down with load (manually or via HPA).\
- **Service discovery + load balancing**: stable addresses and load spread across pods.\
- **Rolling update / rollback**: zero-downtime releases, revert on failure.\
- **Config/secret**: decouple configuration from the image.\
\
The core is the **desired state** model: you declare \\"what you want\\
