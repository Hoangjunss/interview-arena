---
id: pod-vs-deployment
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, workloads, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pod là gì, và tại sao trong thực tế người ta hầu như không tạo Pod trực tiếp mà lại dùng Deployment?

## Question (EN)
What is a Pod, and why do you almost never create a Pod directly in practice, using a Deployment instead?

## Đáp án chi tiết (VI)
**Pod** là đơn vị triển khai nhỏ nhất trong Kubernetes — một hoặc nhiều container chia sẻ chung network namespace (cùng IP, cùng `localhost`) và có thể chia sẻ volume. Pod là "ephemeral" (phù du): khi Pod chết (node crash, bị evict, lỗi container), nó **không tự hồi sinh** — Kubernetes không tạo lại Pod đó, nó biến mất vĩnh viễn.

**Vấn đề nếu tạo Pod trực tiếp** (`kubectl run` hoặc apply một Pod spec trần):
- Không có cơ chế tự phục hồi (self-healing) ở cấp cụm — nếu node hỏng, Pod mất luôn, không ai tạo lại.
- Không hỗ trợ scale (không thể "tăng số lượng Pod giống nhau" một cách khai báo).
- Không hỗ trợ rolling update — muốn đổi image phải xóa và tạo lại Pod thủ công, gây downtime.

**Deployment** giải quyết việc này bằng cách quản lý một **ReplicaSet**, và ReplicaSet quản lý các Pod:

```
Deployment → ReplicaSet → Pod(s)
```

- Deployment khai báo trạng thái mong muốn (desired state): image nào, bao nhiêu replicas, chiến lược update.
- Controller loop liên tục so sánh trạng thái thực tế với desired state, tự tạo lại Pod nếu thiếu.
- Hỗ trợ rolling update/rollback có kiểm soát (giữ lịch sử ReplicaSet cũ để rollback).

Ví dụ tối thiểu:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: myrepo/api:1.4.0
          ports:
            - containerPort: 8080
```

**Khi nào dùng Pod trần?** Gần như chỉ để debug nhanh (`kubectl run debug --image=busybox -it --rm -- sh`) hoặc chạy job một lần không cần đảm bảo tính bền vững — thực tế production luôn dùng qua Deployment/StatefulSet/DaemonSet/Job.

**Gotcha thường gặp khi phỏng vấn hỏi sâu thêm**:
- `spec.selector.matchLabels` của Deployment là **immutable** sau khi tạo — muốn đổi selector phải xóa và tạo lại Deployment (ReplicaSet cũ sẽ bị bỏ rơi "orphan" nếu selector không còn khớp).
- Rolling update được điều khiển bởi `strategy.rollingUpdate.maxSurge`/`maxUnavailable` (mặc định 25%/25%): `maxSurge` cho phép tạo thêm Pod mới vượt số replicas trong lúc update, `maxUnavailable` cho phép bao nhiêu Pod cũ được phép "down" cùng lúc. Set `maxUnavailable: 0` nếu cần zero-downtime tuyệt đối (đổi lại cần thêm capacity tạm thời).
- Xóa nhầm label khỏi Pod template khiến Deployment "mất kiểm soát" Pod cũ (chúng thành orphan) và tạo Pod mới song song — là nguyên nhân phổ biến gây "tại sao có gấp đôi số Pod sau khi apply?".

## Detailed Answer (EN)
A **Pod** is the smallest deployable unit in Kubernetes — one or more containers sharing a network namespace (same IP, same `localhost`) and optionally volumes. Pods are **ephemeral**: if a Pod dies (node crash, eviction, container failure), Kubernetes does **not** resurrect that specific Pod — it is gone permanently.

**Problems with creating bare Pods**:
- No self-healing at the cluster level — if the node fails, the Pod is simply lost; nothing recreates it.
- No declarative scaling ("run N identical copies").
- No rolling update support — changing the image means manually deleting and recreating the Pod, causing downtime.

A **Deployment** solves this by managing a **ReplicaSet**, which in turn manages Pods:

```
Deployment → ReplicaSet → Pod(s)
```

- The Deployment declares the desired state: which image, how many replicas, what update strategy.
- The controller loop continuously reconciles actual state against desired state, recreating Pods when they're missing.
- It supports controlled rolling updates and rollbacks (old ReplicaSets are kept around for rollback history).

Minimal example:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: myrepo/api:1.4.0
          ports:
            - containerPort: 8080
```

**When would you use a bare Pod?** Mostly for quick debugging (`kubectl run debug --image=busybox -it --rm -- sh`) or a one-off task that doesn't need durability guarantees. In production, workloads are always run through a Deployment, StatefulSet, DaemonSet, or Job.

**Deeper gotchas an interviewer may probe**:
- `spec.selector.matchLabels` on a Deployment is **immutable** after creation — changing it requires deleting and recreating the Deployment (the old ReplicaSet becomes orphaned if the selector no longer matches).
- Rolling updates are controlled by `strategy.rollingUpdate.maxSurge`/`maxUnavailable` (default 25%/25%): `maxSurge` allows extra Pods beyond the replica count during rollout, `maxUnavailable` caps how many old Pods can be down at once. Set `maxUnavailable: 0` for strict zero-downtime (at the cost of needing temporary extra capacity).
- Accidentally removing a label from the Pod template makes the Deployment "lose" its old Pods (they become orphans) while it spins up new ones in parallel — a common cause of "why did my Pod count double after apply?".
