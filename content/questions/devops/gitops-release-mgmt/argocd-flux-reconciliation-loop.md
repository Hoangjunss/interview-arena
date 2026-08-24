---
id: argocd-flux-reconciliation-loop
position: devops
technology: gitops-release-mgmt
level: mid
tags: [argocd, flux, kubernetes, gitops]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích cơ chế reconciliation loop trong ArgoCD/Flux hoạt động như thế nào? Điều gì xảy ra khi có sự khác biệt giữa Git và cluster?

## Question (EN)
Explain how the reconciliation loop works in ArgoCD/Flux. What happens when there's a difference between Git and the cluster?

## Đáp án chi tiết (VI)
**Reconciliation loop** là vòng lặp cốt lõi của bất kỳ GitOps controller nào (ArgoCD, Flux), mô phỏng đúng triết lý **control loop** của Kubernetes controller pattern: liên tục **quan sát (observe) → so sánh (diff) → hành động (act)**.

**Các bước cụ thể (lấy ArgoCD làm ví dụ):**

1. **Fetch desired state**: ArgoCD định kỳ (mặc định 3 phút, hoặc ngay khi có webhook từ Git provider) clone/pull Git repo, render manifest (qua Helm/Kustomize/raw YAML).
2. **Fetch live state**: ArgoCD query Kubernetes API server để lấy trạng thái thực tế của các resource (Deployment, Service, ConfigMap...) trong namespace được quản lý.
3. **Diff**: so sánh desired state (từ Git) với live state (từ cluster), tính ra sự khác biệt ở cấp field-level (dùng thuật toán tương tự `kubectl diff`).
4. **Sync (nếu cần)**:
   - Nếu `syncPolicy.automated` bật → tự động áp dụng thay đổi (`kubectl apply`) để đưa cluster về khớp Git.
   - Nếu tắt automated sync → chỉ hiển thị trạng thái `OutOfSync`, chờ người vận hành bấm "Sync" thủ công.
5. Lặp lại liên tục.

**Trạng thái Application trong ArgoCD:**
```
Sync Status:   Synced | OutOfSync
Health Status: Healthy | Progressing | Degraded | Missing | Suspended
```

**Khi có drift (ai đó sửa trực tiếp cluster, ví dụ `kubectl scale --replicas=10`):**
- Lần reconcile tiếp theo, ArgoCD phát hiện live state (`replicas: 10`) khác Git (`replicas: 3`) → đánh dấu `OutOfSync`.
- Nếu `selfHeal: true` → ArgoCD **tự động ghi đè** về `replicas: 3` theo Git (đảm bảo Git luôn là nguồn sự thật tuyệt đối).
- Nếu `selfHeal: false` → chỉ cảnh báo, chờ con người quyết định (sync về Git, hoặc cập nhật Git để khớp thực tế mới).

```yaml
spec:
  syncPolicy:
    automated:
      prune: true      # xoá resource không còn khai báo trong Git
      selfHeal: true    # tự động sửa drift bất cứ khi nào phát hiện
    syncOptions:
      - CreateNamespace=true
```

**Điểm khác biệt ArgoCD vs Flux về reconciliation:**
- ArgoCD có UI trực quan hiển thị diff resource-by-resource, dễ debug bằng mắt.
- Flux (kiến trúc controller thuần Kubernetes CRD: `GitRepository`, `Kustomization`, `HelmRelease`) reconcile theo interval cấu hình riêng cho từng CRD, không có UI mặc định (cần Weave GitOps hoặc Grafana để trực quan hoá).
- Cả hai đều hỗ trợ **webhook** để giảm độ trễ reconcile xuống gần real-time thay vì chờ polling interval.

**Pitfall/edge case:**
- **Resource bị resource khác ghi đè** (ví dụ HPA tự scale `replicas`, nhưng Git khai báo `replicas: 3` cố định) → ArgoCD sẽ liên tục coi là drift và tự sync ngược lại, xung đột với HPA gây "flapping". Cách xử lý: dùng `ignoreDifferences` trong ArgoCD Application để bỏ qua field `spec.replicas` khi có HPA quản lý.
```yaml
spec:
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jsonPointers:
        - /spec/replicas
```

## Detailed Answer (EN)
The **reconciliation loop** is the core mechanism of any GitOps controller (ArgoCD, Flux), mirroring the Kubernetes controller pattern's philosophy: continuously **observe → diff → act**.

**Concrete steps (using ArgoCD as an example):**

1. **Fetch desired state**: ArgoCD periodically (default ~3 minutes, or immediately via a Git provider webhook) clones/pulls the Git repo and renders manifests (via Helm/Kustomize/raw YAML).
2. **Fetch live state**: ArgoCD queries the Kubernetes API server for the actual state of managed resources (Deployment, Service, ConfigMap...) in its namespace.
3. **Diff**: compares desired state (from Git) against live state (from the cluster) at the field level (similar to `kubectl diff`'s algorithm).
4. **Sync (if needed)**:
   - If `syncPolicy.automated` is enabled → automatically applies (`kubectl apply`) to bring the cluster in line with Git.
   - If automated sync is off → simply shows `OutOfSync`, waiting for an operator to click "Sync" manually.
5. Repeats continuously.

**ArgoCD Application status fields:**
```
Sync Status:   Synced | OutOfSync
Health Status: Healthy | Progressing | Degraded | Missing | Suspended
```

**When drift occurs (someone edits the cluster directly, e.g. `kubectl scale --replicas=10`):**
- On the next reconcile, ArgoCD detects live state (`replicas: 10`) differs from Git (`replicas: 3`) → marks it `OutOfSync`.
- If `selfHeal: true` → ArgoCD **automatically overwrites** it back to `replicas: 3` per Git (guaranteeing Git remains the absolute source of truth).
- If `selfHeal: false` → it only warns, waiting for a human decision (sync to Git, or update Git to match the new reality).

```yaml
spec:
  syncPolicy:
    automated:
      prune: true      # delete resources no longer declared in Git
      selfHeal: true    # automatically fix drift whenever detected
    syncOptions:
      - CreateNamespace=true
```

**ArgoCD vs Flux reconciliation differences:**
- ArgoCD has a visual UI showing resource-by-resource diffs, making it easy to debug visually.
- Flux (a pure Kubernetes CRD-based controller architecture: `GitRepository`, `Kustomization`, `HelmRelease`) reconciles at a configurable interval per CRD, with no default UI (Weave GitOps or Grafana are needed for visualization).
- Both support **webhooks** to reduce reconcile latency to near real-time instead of waiting for the polling interval.

**Pitfall/edge case:**
- **A resource overwritten by another controller** (e.g. an HPA auto-scaling `replicas`, while Git declares a fixed `replicas: 3`) → ArgoCD will keep seeing it as drift and repeatedly sync it back, fighting the HPA and causing "flapping." Fix: use `ignoreDifferences` in the ArgoCD Application to ignore the `spec.replicas` field when an HPA manages it.
```yaml
spec:
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jsonPointers:
        - /spec/replicas
```
