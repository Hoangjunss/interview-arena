---
id: debug-pod-loi-thuong-dung-lenh-nao
position: backend
technology: operations-\u0026-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Debug Pod lỗi thường dùng lệnh nào?

## Question (EN)
Which commands are commonly used to debug a failing Pod?

## Đáp án chi tiết (VI)
Các lệnh cơ bản: xem Pod, describe events, logs container, exec vào container nếu có shell, xem rollout và endpoints Service. Thứ tự tốt là kiểm status, events, logs, config, network, resource.\
\
Ví dụ:\
```bash\
kubectl get pods -n app\
kubectl describe pod api-123 -n app\
kubectl logs api-123 -n app --previous\
kubectl get endpoints api -n app\
```\
`--previous` hữu ích khi container restart. Nếu image tối giản không có shell, dùng ephemeral debug container khi policy cho phép.

## Detailed Answer (EN)
Basic commands: list Pods, describe events, inspect container logs, exec into a container if it has a shell, check rollout and Service endpoints. A good order is status, events, logs, config, network and resources.\
\
Example:\
```bash\
kubectl get pods -n app\
kubectl describe pod api-123 -n app\
kubectl logs api-123 -n app --previous\
kubectl get endpoints api -n app\
```\
`--previous` helps when a container restarts. If the image is minimal and has no shell, use an ephemeral debug container when policy allows.
