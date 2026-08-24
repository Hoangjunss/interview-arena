---
id: sync-waves-hooks-argocd
position: devops
technology: gitops-release-mgmt
level: mid
tags: [argocd, kubernetes, gitops]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sync Waves và Resource Hooks trong ArgoCD là gì? Khi nào cần dùng và cho ví dụ cụ thể (ví dụ chạy DB migration trước khi deploy app).

## Question (EN)
What are Sync Waves and Resource Hooks in ArgoCD? When do you need them, with a concrete example (e.g. running a DB migration before deploying the app)?

## Đáp án chi tiết (VI)
Mặc định, ArgoCD apply **tất cả resource trong một Application gần như đồng thời**, không đảm bảo thứ tự. Nhưng nhiều tình huống thực tế cần **thứ tự deploy nghiêm ngặt** — ví dụ phải chạy DB migration xong mới được rollout Deployment mới. **Sync Waves** và **Resource Hooks** là hai cơ chế ArgoCD cung cấp để giải quyết việc này.

### Sync Waves — kiểm soát thứ tự apply resource
Gán annotation `argocd.argoproj.io/sync-wave` cho từng resource; ArgoCD apply theo thứ tự wave tăng dần (mặc định wave = 0), **chờ wave trước Healthy rồi mới apply wave sau**.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: db-config
  annotations:
    argocd.argoproj.io/sync-wave: "-1"   # apply trước
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  annotations:
    argocd.argoproj.io/sync-wave: "0"    # apply sau ConfigMap
```
Dùng cho các trường hợp đơn giản: CRD phải tạo trước Custom Resource dùng CRD đó, namespace phải tạo trước resource nằm trong namespace, ConfigMap/Secret phải có trước Deployment tham chiếu tới nó.

### Resource Hooks — chạy Job tại các điểm cụ thể trong vòng đời sync
Hook gắn vào một **thời điểm** trong quá trình sync (`PreSync`, `Sync`, `PostSync`, `SyncFail`), thường dùng để chạy Job một lần (migration, smoke test, cleanup):

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: registry.company.vn/order-service-migrate:1.4.2
          command: ["./migrate.sh"]
      restartPolicy: Never
```
- `PreSync`: chạy **trước** khi apply các resource chính — dùng cho DB migration, chuẩn bị dữ liệu.
- `Sync`: chạy song song với apply chính (ít dùng hơn).
- `PostSync`: chạy **sau** khi mọi resource Healthy — dùng cho smoke test, gửi thông báo Slack, warm-up cache.
- `SyncFail`: chạy khi sync thất bại — dùng cho rollback logic tự động hoặc gửi alert.
- `hook-delete-policy`: `HookSucceeded` (xoá Job sau khi thành công) tránh rác tích luỹ qua nhiều lần sync.

**Kết hợp cả hai cho tình huống migration thực tế:**
```yaml
# 1. PreSync hook: chạy migration trước
metadata:
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/sync-wave: "-1"
# 2. Nếu migration fail -> ArgoCD dừng sync, không apply Deployment mới
#    (Deployment cũ vẫn chạy, tránh downtime do migration lỗi)
# 3. Nếu migration pass -> tiếp tục apply Deployment (wave 0)
```

**Vì sao quan trọng trong Release Management:**
- Đảm bảo **zero-downtime migration**: schema DB thay đổi phải tương thích ngược với cả code cũ và code mới trong một khoảng thời gian ngắn (kỹ thuật "expand-contract migration"), và Sync Waves/Hooks giúp tự động hoá đúng thứ tự này thay vì làm tay.
- Cho phép **health check trung gian**: nếu `PreSync` hook fail, ArgoCD dừng lại, không rollout code mới lên DB chưa sẵn sàng — tránh lỗi runtime nghiêm trọng.

**Pitfall:**
- Hook Job không set `activeDeadlineSeconds` → nếu migration bị treo (deadlock), sync sẽ chờ vô thời hạn, chặn toàn bộ pipeline release.
- Quên `hook-delete-policy` → mỗi lần sync tạo một Job mới, tích luỹ hàng trăm Job "Completed" gây rác namespace, tốn `etcd` storage.
- Dùng Sync Wave cho toàn bộ resource một cách máy móc thay vì chỉ dùng khi thực sự cần thứ tự — làm chậm sync không cần thiết (mỗi wave phải chờ Healthy mới qua wave tiếp theo).

## Detailed Answer (EN)
By default, ArgoCD applies **all resources in an Application nearly simultaneously**, with no ordering guarantee. But many real scenarios require **strict deploy ordering** — e.g. a DB migration must finish before the new Deployment rolls out. **Sync Waves** and **Resource Hooks** are the two mechanisms ArgoCD provides to handle this.

### Sync Waves — controlling resource apply order
Assign the `argocd.argoproj.io/sync-wave` annotation to each resource; ArgoCD applies them in ascending wave order (default wave = 0), **waiting for the previous wave to become Healthy before applying the next.**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: db-config
  annotations:
    argocd.argoproj.io/sync-wave: "-1"   # applied first
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  annotations:
    argocd.argoproj.io/sync-wave: "0"    # applied after the ConfigMap
```
Used for simpler cases: a CRD must be created before a Custom Resource using it, a namespace must exist before resources inside it, a ConfigMap/Secret must exist before the Deployment referencing it.

### Resource Hooks — running a Job at specific lifecycle points
A hook attaches to a **moment** in the sync process (`PreSync`, `Sync`, `PostSync`, `SyncFail`), typically used for one-off Jobs (migrations, smoke tests, cleanup):

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: registry.company.vn/order-service-migrate:1.4.2
          command: ["./migrate.sh"]
      restartPolicy: Never
```
- `PreSync`: runs **before** applying the main resources — used for DB migrations, data prep.
- `Sync`: runs alongside the main apply (used less often).
- `PostSync`: runs **after** every resource is Healthy — used for smoke tests, Slack notifications, cache warm-up.
- `SyncFail`: runs when the sync fails — used for automatic rollback logic or alerting.
- `hook-delete-policy`: `HookSucceeded` (delete the Job after success) prevents debris accumulating across syncs.

**Combining both for a real migration scenario:**
```yaml
# 1. PreSync hook: run the migration first
metadata:
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/sync-wave: "-1"
# 2. If the migration fails -> ArgoCD stops the sync, doesn't apply the new Deployment
#    (the old Deployment keeps running, avoiding downtime from a broken migration)
# 3. If the migration passes -> proceed to apply the Deployment (wave 0)
```

**Why this matters for Release Management:**
- Ensures **zero-downtime migrations**: DB schema changes must stay backward-compatible with both old and new code for a short overlap window (the "expand-contract migration" technique), and Sync Waves/Hooks automate this ordering instead of doing it by hand.
- Enables **intermediate health checks**: if a `PreSync` hook fails, ArgoCD halts, never rolling out new code against a DB that isn't ready — avoiding a serious runtime failure.

**Pitfalls:**
- A hook Job without `activeDeadlineSeconds` set → if the migration hangs (deadlock), the sync waits indefinitely, blocking the entire release pipeline.
- Forgetting `hook-delete-policy` → every sync creates a new Job, accumulating hundreds of "Completed" Jobs, cluttering the namespace and wasting `etcd` storage.
- Mechanically applying Sync Waves to every resource instead of only where ordering truly matters — unnecessarily slowing down syncs (each wave must reach Healthy before the next proceeds).
