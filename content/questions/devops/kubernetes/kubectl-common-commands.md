---
id: kubectl-common-commands
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, kubectl, tooling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kể tên và giải thích các lệnh `kubectl` bạn dùng hàng ngày để kiểm tra và debug một ứng dụng đang chạy trên Kubernetes.

## Question (EN)
Name and explain the `kubectl` commands you use daily to inspect and debug an application running on Kubernetes.

## Đáp án chi tiết (VI)
**Nhóm xem trạng thái**:
```bash
kubectl get pods -n my-ns -o wide          # liệt kê Pod, kèm node, IP
kubectl get pods --watch                   # theo dõi realtime khi Pod thay đổi trạng thái
kubectl get deploy,svc,ingress -n my-ns    # xem nhiều loại resource cùng lúc
kubectl get events --sort-by=.lastTimestamp -n my-ns   # xem event gần nhất (rất hữu ích khi debug)
```

**Nhóm debug chi tiết**:
```bash
kubectl describe pod <pod>      # xem event, trạng thái container, lý do fail (OOMKilled, ImagePullBackOff...)
kubectl logs <pod>               # log container hiện tại
kubectl logs <pod> --previous    # log của instance TRƯỚC khi bị restart — quan trọng khi debug CrashLoopBackOff
kubectl logs <pod> -c <container> -f   # theo dõi log realtime của 1 container cụ thể trong Pod multi-container
kubectl exec -it <pod> -- sh      # vào shell bên trong container để kiểm tra trực tiếp
kubectl exec -it <pod> -c <container> -- printenv   # kiểm tra biến môi trường đã inject đúng chưa
```

**Nhóm thao tác/khôi phục**:
```bash
kubectl rollout status deploy/api          # theo dõi tiến trình rolling update
kubectl rollout history deploy/api         # xem lịch sử revision
kubectl rollout undo deploy/api            # rollback về revision trước
kubectl scale deploy/api --replicas=5      # scale thủ công
kubectl port-forward pod/<pod> 8080:8080   # forward port để test local mà không cần expose Service
kubectl top pod -n my-ns                   # xem CPU/memory usage thực tế (cần metrics-server)
```

**Nhóm apply/diff an toàn**:
```bash
kubectl diff -f deployment.yaml    # xem trước những gì sẽ thay đổi TRƯỚC khi apply — rất nên dùng trong CI/CD
kubectl apply -f deployment.yaml --dry-run=server   # validate với apiserver mà không thực sự apply
kubectl explain pod.spec.containers.resources   # tra cứu schema field ngay trong terminal, không cần mở doc
```

**Mẹo hay bị hỏi**: `kubectl edit` thực chất lấy resource hiện tại qua apiserver, cho phép sửa YAML/JSON tại chỗ, rồi PUT lại qua apiserver để áp dụng. Chỉ nên dùng để debug nhanh, **không nên dùng trong production** vì thay đổi không được lưu lại trong Git (mất traceability), nên ưu tiên sửa file YAML rồi `kubectl apply` (GitOps).

## Detailed Answer (EN)
**Inspecting state**:
```bash
kubectl get pods -n my-ns -o wide          # list Pods with node and IP
kubectl get pods --watch                   # watch Pod state changes in real time
kubectl get deploy,svc,ingress -n my-ns    # view multiple resource types at once
kubectl get events --sort-by=.lastTimestamp -n my-ns   # most recent events (very useful for debugging)
```

**Detailed debugging**:
```bash
kubectl describe pod <pod>      # events, container status, failure reasons (OOMKilled, ImagePullBackOff, ...)
kubectl logs <pod>               # current container logs
kubectl logs <pod> --previous    # logs of the instance BEFORE it restarted — key for CrashLoopBackOff debugging
kubectl logs <pod> -c <container> -f   # tail logs of a specific container in a multi-container Pod
kubectl exec -it <pod> -- sh      # shell into the container to inspect directly
kubectl exec -it <pod> -c <container> -- printenv   # verify env vars were injected correctly
```

**Operations/recovery**:
```bash
kubectl rollout status deploy/api          # watch a rolling update's progress
kubectl rollout history deploy/api         # view revision history
kubectl rollout undo deploy/api            # roll back to the previous revision
kubectl scale deploy/api --replicas=5      # manual scaling
kubectl port-forward pod/<pod> 8080:8080   # forward a port to test locally without exposing a Service
kubectl top pod -n my-ns                   # real CPU/memory usage (requires metrics-server)
```

**Safe apply/diff**:
```bash
kubectl diff -f deployment.yaml    # preview what would change BEFORE applying — recommended in CI/CD
kubectl apply -f deployment.yaml --dry-run=server   # validate against the apiserver without actually applying
kubectl explain pod.spec.containers.resources   # look up field schemas right in the terminal, no docs needed
```

**A point often probed**: `kubectl edit` actually retrieves the current resource via the apiserver, allows editing the YAML/JSON in-place, and PUTs it back via the apiserver to apply changes. It's fine for quick debugging, but **should not be used in production** because changes aren't tracked in Git (no traceability). Prefer editing the YAML file and running `kubectl apply` (GitOps).
