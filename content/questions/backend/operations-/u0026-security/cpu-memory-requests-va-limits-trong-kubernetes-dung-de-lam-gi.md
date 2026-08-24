---
id: cpu-memory-requests-va-limits-trong-kubernetes-dung-de-lam-gi
position: backend
technology: operations-\u0026-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CPU/memory requests và limits trong Kubernetes dùng để làm gì?

## Question (EN)
What are CPU/memory requests and limits used for in Kubernetes?

## Đáp án chi tiết (VI)
Requests là lượng tài nguyên scheduler dùng để đặt Pod lên node. Limits là trần runtime container được phép dùng. CPU limit có thể gây throttling; memory vượt limit thường bị OOMKilled.\
\
Ví dụ:\
```yaml\
resources:\
  requests:\
    cpu: 250m\
    memory: 256Mi\
  limits:\
    cpu: 1000m\
    memory: 512Mi\
```\
Không đặt requests quá thấp để nhồi node nếu app latency-sensitive. Cần đo thực tế bằng metrics rồi điều chỉnh.

## Detailed Answer (EN)
Requests are the resources the scheduler uses to place a Pod on a node. Limits are the runtime ceiling a container is allowed to use. CPU limits can cause throttling; memory above the limit usually causes OOMKilled.\
\
Example:\
```yaml\
resources:\
  requests:\
    cpu: 250m\
    memory: 256Mi\
  limits:\
    cpu: 1000m\
    memory: 512Mi\
```\
Do not set requests too low just to pack nodes if the app is latency-sensitive. Measure with real metrics and tune.
