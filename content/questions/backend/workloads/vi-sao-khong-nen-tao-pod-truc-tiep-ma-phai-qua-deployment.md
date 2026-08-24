---
id: vi-sao-khong-nen-tao-pod-truc-tiep-ma-phai-qua-deployment
position: backend
technology: workloads
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không nên tạo Pod trực tiếp mà phải qua Deployment?

## Question (EN)
Why create a Deployment instead of a Pod directly?

## Đáp án chi tiết (VI)
Pod là đơn vị chạy **không có khả năng tự phục hồi**. Tạo Pod trần (bare Pod) thì khi node chết hoặc Pod bị xóa, **không ai tạo lại** — ứng dụng biến mất.\
\
Deployment thêm vào bốn thứ mà Pod trần không có:\
- **Self-healing**: qua ReplicaSet, luôn giữ đủ số replica mong muốn.\
- **Scale**: `kubectl scale deployment/app --replicas=5`.\
- **Rolling update + rollback**: đổi image thì Deployment thay Pod theo lô, hỏng thì `kubectl rollout undo`.\
- **Lịch sử revision** để biết đang chạy version nào.\
\
```bash\
kubectl set image deployment/api api=myrepo/api:v2\
kubectl rollout status deployment/api\
kubectl rollout undo deployment/api      # ve revision truoc\
```\
\
Pod trần chỉ hợp lý cho việc debug tạm (`kubectl run -it --rm`) hoặc pod one-shot; workload thật luôn dùng controller (Deployment, StatefulSet, DaemonSet, Job).

## Detailed Answer (EN)
A Pod has **no self-healing** on its own. If you create a bare Pod and the node dies or the Pod is deleted, **nothing recreates it** — the application is simply gone.\
\
A Deployment adds four things a bare Pod lacks:\
- **Self-healing**: through a ReplicaSet, it always maintains the desired replica count.\
- **Scaling**: `kubectl scale deployment/app --replicas=5`.\
- **Rolling update + rollback**: changing the image replaces Pods in batches; if it breaks, `kubectl rollout undo`.\
- **Revision history** so you know which version is live.\
\
```bash\
kubectl set image deployment/api api=myrepo/api:v2\
kubectl rollout status deployment/api\
kubectl rollout undo deployment/api      # back to the previous revision\
```\
\
Bare Pods make sense only for throwaway debugging (`kubectl run -it --rm`) or one-shot pods; real workloads always run under a controller (Deployment, StatefulSet, DaemonSet, Job).
