---
id: deployment-rolling-update-and-rollback
position: devops
technology: kubernetes
level: mid
tags: [kubernetes, deployment, release-management]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích cơ chế rolling update của Deployment hoạt động như thế nào, và cách bạn rollback an toàn khi phát hiện bản mới bị lỗi ở production.

## Question (EN)
Explain how a Deployment's rolling update mechanism works internally, and how you'd safely roll back when a bad release is discovered in production.

## Đáp án chi tiết (VI)
Khi bạn đổi `image` trong Deployment và `apply`, Kubernetes thực hiện **RollingUpdate** (strategy mặc định, còn có `Recreate` — xóa hết Pod cũ rồi mới tạo Pod mới, gây downtime, chỉ dùng khi app không chịu được 2 version chạy song song):

**Cơ chế**:
1. Deployment controller tạo một **ReplicaSet mới** (revision mới) với template mới, giữ nguyên ReplicaSet cũ (revision cũ, scale về 0 dần).
2. Tăng dần số replica của ReplicaSet mới, giảm dần ReplicaSet cũ, tuân theo:
   - `maxSurge` (mặc định 25%): số Pod **thêm** tối đa vượt quá `replicas` được phép tồn tại tạm thời.
   - `maxUnavailable` (mặc định 25%): số Pod cũ được phép "biến mất" cùng lúc.
3. Chỉ tính Pod mới là "sẵn sàng" khi **vượt qua readiness probe** VÀ đủ `minReadySeconds` (nếu set) — đây là lý do readiness probe cấu hình đúng cực kỳ quan trọng khi rolling update, nếu không app lỗi vẫn được coi là "Ready" và tiếp tục scale up trong khi user đã nhận lỗi.
4. Deployment giữ lại lịch sử các ReplicaSet cũ (giới hạn bởi `revisionHistoryLimit`, mặc định 10) để phục vụ rollback.

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0     # zero-downtime: không cho phép mất Pod nào trong lúc update
  revisionHistoryLimit: 5
  minReadySeconds: 10        # Pod phải Ready ổn định 10s mới tính là "available"
```

**Rollback an toàn** — quy trình thực tế:
```bash
kubectl rollout status deploy/api                 # xác nhận rollout hiện tại đang chạy/stuck
kubectl rollout history deploy/api                # xem các revision, kèm CHANGE-CAUSE nếu có
kubectl rollout history deploy/api --revision=4    # xem chi tiết 1 revision cụ thể (image, env...)
kubectl rollout undo deploy/api                    # rollback về revision liền trước
kubectl rollout undo deploy/api --to-revision=3    # rollback về đúng revision chỉ định
kubectl rollout status deploy/api                  # theo dõi rollback hoàn tất
```

**Lưu ý quan trọng khi phỏng vấn hay hỏi sâu**:
- `rollout undo` thực chất tạo ra **revision mới** trỏ lại config cũ, **không phải "quay ngược thời gian"** — lịch sử revision luôn tăng dần.
- Nếu rolling update đang **stuck giữa chừng** (Pod mới CrashLoopBackOff), Deployment sẽ không tự rollback — bạn phải chủ động `kubectl rollout undo`. Có thể set `progressDeadlineSeconds` để Deployment tự đánh dấu `ProgressDeadlineExceeded` (không tự rollback, chỉ đổi status để alerting phát hiện).
- Rollback **không rollback được database migration** đã chạy trong bản mới — đây là lý do schema migration cần backward-compatible (expand/contract pattern) để rollback code an toàn mà không cần rollback DB.
- ConfigMap/Secret không được Kubernetes tự động versioning theo Deployment — nếu bản mới đổi cả code lẫn ConfigMap, rollback Deployment **không tự rollback ConfigMap**, phải quản lý riêng (ví dụ đặt tên ConfigMap theo version, mount qua reference thay vì sửa tại chỗ).

## Detailed Answer (EN)
When you change the `image` in a Deployment and `apply`, Kubernetes performs a **RollingUpdate** (the default strategy; the other option is `Recreate` — kills all old Pods before creating new ones, causing downtime, used only when the app can't tolerate two versions running side by side):

**Mechanism**:
1. The Deployment controller creates a **new ReplicaSet** (new revision) with the new template, keeping the old ReplicaSet around (old revision, gradually scaled to 0).
2. It scales the new ReplicaSet up and the old one down, governed by:
   - `maxSurge` (default 25%): the max number of **extra** Pods allowed above `replicas` temporarily.
   - `maxUnavailable` (default 25%): how many old Pods can disappear at once.
3. A new Pod only counts as "available" once it **passes its readiness probe** AND satisfies `minReadySeconds` (if set) — this is why a correctly configured readiness probe matters so much during rollouts; without it a broken app can still be counted "Ready" and the rollout keeps proceeding while users are already seeing errors.
4. The Deployment keeps a history of old ReplicaSets (bounded by `revisionHistoryLimit`, default 10) to support rollback.

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0     # zero-downtime: no Pod may be lost during the rollout
  revisionHistoryLimit: 5
  minReadySeconds: 10        # a Pod must stay Ready for 10s before counting as "available"
```

**Safe rollback** — a real-world workflow:
```bash
kubectl rollout status deploy/api                 # check whether the rollout is progressing or stuck
kubectl rollout history deploy/api                # list revisions, with CHANGE-CAUSE if recorded
kubectl rollout history deploy/api --revision=4    # inspect a specific revision (image, env, ...)
kubectl rollout undo deploy/api                    # roll back to the previous revision
kubectl rollout undo deploy/api --to-revision=3    # roll back to a specific revision
kubectl rollout status deploy/api                  # confirm the rollback completed
```

**Key points interviewers often dig into**:
- `rollout undo` actually creates a **new revision** pointing back to the old config — it's not literally "going back in time"; revision numbers always increase.
- If a rollout gets **stuck mid-way** (new Pods CrashLoopBackOff), the Deployment does **not** auto-rollback — you must run `kubectl rollout undo` yourself. You can set `progressDeadlineSeconds` so the Deployment marks itself `ProgressDeadlineExceeded` (it doesn't auto-rollback, just flags status so alerting can catch it).
- Rolling back **cannot undo a database migration** that already ran in the new version — this is why schema migrations need to be backward-compatible (expand/contract pattern) so code can be rolled back safely without also rolling back the DB.
- Kubernetes doesn't auto-version ConfigMaps/Secrets alongside Deployments — if a release changes both code and a ConfigMap, rolling back the Deployment does **not** roll back the ConfigMap; you must manage that separately (e.g. name ConfigMaps by version and reference them rather than editing in place).
