---
id: rolling-update-trong-kubernetes-can-cau-hinh-gi-de-it-downtime
position: backend
technology: workloads-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rolling update trong Kubernetes cần cấu hình gì để ít downtime?

## Question (EN)
What should be configured for low-downtime Kubernetes rolling updates?

## Đáp án chi tiết (VI)
Deployment rolling update thay Pods cũ bằng Pods mới dần dần. Để ít downtime cần readiness probe đúng, `maxUnavailable` thấp, `maxSurge` phù hợp, graceful shutdown và app xử lý SIGTERM.\
\
Ví dụ:\
```yaml\
strategy:\
  type: RollingUpdate\
  rollingUpdate:\
    maxUnavailable: 0\
    maxSurge: 1\
```\
Nếu readiness probe báo ready quá sớm hoặc shutdown không drain request, rolling update vẫn có thể gây lỗi dù Kubernetes strategy nhìn đúng.

## Detailed Answer (EN)
A Deployment rolling update gradually replaces old Pods with new Pods. Low downtime needs a correct readiness probe, low `maxUnavailable`, suitable `maxSurge`, graceful shutdown and app SIGTERM handling.\
\
Example:\
```yaml\
strategy:\
  type: RollingUpdate\
  rollingUpdate:\
    maxUnavailable: 0\
    maxSurge: 1\
```\
If readiness reports ready too early or shutdown does not drain requests, a rolling update can still cause errors even when the Kubernetes strategy looks correct.
