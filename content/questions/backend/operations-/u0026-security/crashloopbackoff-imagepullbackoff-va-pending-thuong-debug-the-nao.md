---
id: crashloopbackoff-imagepullbackoff-va-pending-thuong-debug-the-nao
position: backend
technology: operations-\u0026-security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CrashLoopBackOff, ImagePullBackOff và Pending thường debug thế nào?

## Question (EN)
How do you debug CrashLoopBackOff, ImagePullBackOff and Pending?

## Đáp án chi tiết (VI)
`CrashLoopBackOff` thường là app crash hoặc liveness probe giết container; xem logs hiện tại/previous và events. `ImagePullBackOff` thường do image tag sai, registry auth, network hoặc rate limit. `Pending` thường do thiếu resources, PVC chưa bind, node selector/taints hoặc quota.\
\
Checklist: `kubectl describe pod`, `kubectl logs --previous`, kiểm image/tag/secret, requests/limits, events namespace, PVC, node capacity và rollout history. Không chỉ restart Pod nếu chưa hiểu root cause.

## Detailed Answer (EN)
`CrashLoopBackOff` usually means the app crashes or a liveness probe kills the container; inspect current/previous logs and events. `ImagePullBackOff` often comes from a wrong image tag, registry auth, network or rate limit. `Pending` often comes from insufficient resources, unbound PVC, node selector/taints or quota.\
\
Checklist: `kubectl describe pod`, `kubectl logs --previous`, image/tag/secret, requests/limits, namespace events, PVC, node capacity and rollout history. Do not just restart Pods without understanding root cause.
