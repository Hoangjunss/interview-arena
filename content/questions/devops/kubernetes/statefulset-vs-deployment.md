---
id: statefulset-vs-deployment
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, statefulset, storage]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
StatefulSet khác Deployment ở điểm nào, và tại sao bạn phải dùng StatefulSet khi triển khai một cụm database như MongoDB hay Kafka?

## Question (EN)
How does a StatefulSet differ from a Deployment, and why must you use a StatefulSet when deploying a database or message-broker cluster like MongoDB or Kafka?

## Đáp án chi tiết (VI)
Deployment coi mọi Pod là **giống hệt nhau, có thể thay thế** (interchangeable) — không quan tâm Pod nào là Pod nào, chỉ cần đủ N replicas chạy healthy. Điều này hoàn hảo cho stateless service (API, web server) nhưng **phá vỡ** với hệ thống có trạng thái cần định danh ổn định.

**StatefulSet** cung cấp 3 đảm bảo mà Deployment không có:

| Đặc điểm | Deployment | StatefulSet |
|---|---|---|
| Tên Pod | Random hash (`api-7f9c-xk2p1`) | Ổn định, có thứ tự (`mongo-0`, `mongo-1`, `mongo-2`) |
| DNS | Không ổn định giữa các Pod | Mỗi Pod có DNS ổn định qua headless Service (`mongo-0.mongo.default.svc.cluster.local`) |
| Storage | PVC dùng chung template, có thể bị trộn giữa các Pod khi scale | Mỗi Pod gắn với **PVC riêng, cố định**, tồn tại xuyên suốt kể cả khi Pod bị xóa/tạo lại |
| Thứ tự triển khai/xóa | Song song, không đảm bảo thứ tự | Tuần tự: `mongo-0` phải Ready trước khi tạo `mongo-1` (mặc định `OrderedReady`) |

**Tại sao database cần điều này**: một cụm MongoDB replica set hay Kafka broker cần:
1. **Định danh ổn định** để các node biết "ai là ai" khi bầu leader/primary (ví dụ Kafka broker ID phải cố định).
2. **Dữ liệu gắn đúng với node đó** — nếu `mongo-1` bị xóa và tạo lại, nó phải gắn lại đúng ổ đĩa cũ (PVC `data-mongo-1`) để giữ replica set state, không được nhận PVC ngẫu nhiên.

Ví dụ StatefulSet với `volumeClaimTemplates`:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongo
spec:
  serviceName: mongo
  replicas: 3
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
        - name: mongo
          image: mongo:6.0
          volumeMounts:
            - name: data
              mountPath: /data/db
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 20Gi
```

**Gotcha thường gặp**: xóa StatefulSet **không** tự xóa PVC (an toàn tránh mất data), nên khi teardown môi trường test bạn phải `kubectl delete pvc -l app=mongo` thủ công, nếu không sẽ tốn storage âm thầm.

**Hai tùy chọn hay bị hỏi thêm**:
- `podManagementPolicy: Parallel` — bỏ ràng buộc tuần tự khi tạo/xóa Pod (mặc định `OrderedReady`), hữu ích khi các Pod không phụ thuộc thứ tự khởi động lẫn nhau (ví dụ Cassandra tự xử lý join cluster), giúp scale nhanh hơn.
- `updateStrategy.rollingUpdate.partition` — cho phép rolling update theo kiểu **canary theo ordinal**: đặt `partition: 2` với 3 replicas thì chỉ `mongo-2` được update, `mongo-0`/`mongo-1` giữ nguyên, dùng để test bản mới trên một node trước khi update toàn bộ.

## Detailed Answer (EN)
A Deployment treats every Pod as **identical and interchangeable** — it doesn't care which specific Pod is which, only that N replicas are healthy. That's perfect for stateless services (APIs, web servers) but **breaks** stateful systems that need stable identity.

A **StatefulSet** provides three guarantees a Deployment doesn't:

| Feature | Deployment | StatefulSet |
|---|---|---|
| Pod naming | Random hash (`api-7f9c-xk2p1`) | Stable, ordinal (`mongo-0`, `mongo-1`, `mongo-2`) |
| DNS | Not stable across Pods | Each Pod gets a stable DNS name via a headless Service (`mongo-0.mongo.default.svc.cluster.local`) |
| Storage | PVC from a shared template, can effectively get mixed up across Pods at scale | Each Pod is bound to its **own fixed PVC**, which persists across Pod deletion/recreation |
| Rollout/teardown order | Parallel, no ordering guarantee | Sequential: `mongo-0` must be Ready before `mongo-1` is created (default `OrderedReady`) |

**Why databases need this**: a MongoDB replica set or Kafka broker cluster needs:
1. **Stable identity** so nodes know "who is who" during leader/primary election (e.g., Kafka broker IDs must be fixed).
2. **Data pinned to the right node** — if `mongo-1` is deleted and recreated, it must reattach to its original disk (PVC `data-mongo-1`) to preserve replica-set state, not receive a random PVC.

Example StatefulSet with `volumeClaimTemplates`:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongo
spec:
  serviceName: mongo
  replicas: 3
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
        - name: mongo
          image: mongo:6.0
          volumeMounts:
            - name: data
              mountPath: /data/db
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 20Gi
```

**Common gotcha**: deleting a StatefulSet does **not** delete its PVCs (a safety measure against data loss), so when tearing down a test environment you must run `kubectl delete pvc -l app=mongo` manually — otherwise you silently waste storage.

**Two options interviewers often probe further**:
- `podManagementPolicy: Parallel` — drops the sequential ordering for create/delete (default is `OrderedReady`), useful when Pods don't depend on each other's startup order (e.g. Cassandra handles cluster join itself), letting you scale faster.
- `updateStrategy.rollingUpdate.partition` — enables **ordinal-based canary** rollouts: setting `partition: 2` with 3 replicas updates only `mongo-2`, leaving `mongo-0`/`mongo-1` untouched, so you can validate a new version on one node before rolling it out everywhere.
