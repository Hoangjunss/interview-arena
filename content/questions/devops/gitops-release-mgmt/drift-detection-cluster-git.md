---
id: drift-detection-cluster-git
position: devops
technology: gitops-release-mgmt
level: mid
tags: [gitops, kubernetes, monitoring]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Configuration drift trong GitOps là gì? Nguyên nhân thường gặp và cách phát hiện/xử lý?

## Question (EN)
What is configuration drift in a GitOps context? What are the common causes, and how do you detect and handle it?

## Đáp án chi tiết (VI)
**Configuration drift** là hiện tượng **trạng thái thực tế của cluster (live state) không còn khớp với trạng thái khai báo trong Git (desired state)**. Đây là vấn đề trung tâm mà GitOps được sinh ra để giải quyết.

**Nguyên nhân thường gặp:**
1. **Can thiệp thủ công (manual `kubectl edit`/`kubectl apply`/`kubectl scale`)** — hotfix khẩn cấp, debug, hoặc do nhầm lẫn.
2. **Controller khác cùng quản lý resource** — ví dụ HPA thay đổi `replicas`, admission webhook tự inject sidecar (Istio) thay đổi `spec.template`, VPA tự điều chỉnh resource requests.
3. **Thay đổi ngoài phạm vi quản lý của GitOps repo** — ai đó tạo resource trực tiếp bằng Helm CLI song song với ArgoCD quản lý cùng namespace.
4. **外部 process/CronJob tự sinh ra resource** (ví dụ cert-manager tự tạo Secret cho TLS) mà GitOps repo không khai báo.
5. **Lỗi đồng bộ tạm thời** — webhook Git bị miss, network timeout khiến agent chưa kịp reconcile.

**Cách phát hiện:**

*ArgoCD:*
```bash
argocd app get order-service
# Output hiển thị Sync Status: OutOfSync
argocd app diff order-service   # xem chi tiết field nào khác biệt
```
ArgoCD UI hiển thị trực quan resource nào drift, field nào cụ thể bị đổi (màu đỏ/xanh như git diff).

*Flux:*
```bash
flux get kustomizations
flux diff kustomization order-service --path ./apps/order-service
```

**Cách xử lý:**

| Tình huống | Xử lý |
|---|---|
| Drift do lỗi thao tác tay, không mong muốn | Bật `selfHeal: true` để agent tự động sync lại theo Git, hoặc `argocd app sync` thủ công |
| Drift do controller hợp lệ khác quản lý field đó (HPA, VPA) | Dùng `ignoreDifferences` (ArgoCD) hoặc annotation loại trừ field khỏi reconciliation |
| Drift do phát hiện ra Git đang thiếu 1 thay đổi cần thiết (ví dụ ai đó fix đúng ở cluster) | Cập nhật lại Git để khớp thực tế (`kubectl get -o yaml` rồi commit), **không** để nguyên trạng thái ngầm |
| Drift do resource được tạo ngoài phạm vi GitOps quản lý | Cân nhắc đưa vào quản lý GitOps luôn, hoặc dùng `resource.exclusions` để loại trừ khỏi phạm vi so sánh |

```yaml
# Ví dụ loại trừ field bị HPA quản lý khỏi diff của ArgoCD
spec:
  ignoreDifferences:
    - group: apps
      kind: Deployment
      name: order-service
      jsonPointers:
        - /spec/replicas
```

**Giám sát drift chủ động (mid/senior thường được hỏi thêm):**
- Alert khi có Application `OutOfSync` quá X phút liên tục (thường là dấu hiệu selfHeal tắt hoặc conflict với controller khác).
- Dashboard Grafana dùng metric `argocd_app_info{sync_status="OutOfSync"}` từ ArgoCD metrics exporter.
- Policy-as-code (OPA/Kyverno) để **ngăn chặn từ gốc** — chặn `kubectl edit`/`apply` trực tiếp vào production namespace trừ khi qua CI/CD pipeline (dùng RBAC + admission controller).

**Pitfall:** bật `selfHeal: true` cho mọi resource mà không dùng `ignoreDifferences` cho các field do controller khác quản lý (HPA, cert-manager) sẽ gây **xung đột vòng lặp** — hai controller liên tục ghi đè lẫn nhau, gây restart pod liên tục hoặc lãng phí API calls tới control plane.

## Detailed Answer (EN)
**Configuration drift** is when the **cluster's actual (live) state no longer matches the desired state declared in Git**. This is the central problem GitOps was created to solve.

**Common causes:**
1. **Manual intervention (`kubectl edit`/`kubectl apply`/`kubectl scale`)** — emergency hotfixes, debugging, or plain mistakes.
2. **Another controller managing the same resource** — e.g. an HPA changing `replicas`, an admission webhook auto-injecting a sidecar (Istio) that mutates `spec.template`, a VPA auto-adjusting resource requests.
3. **Changes outside the GitOps repo's management scope** — someone creates a resource directly via the Helm CLI in the same namespace ArgoCD manages.
4. **An external process/CronJob auto-generating resources** (e.g. cert-manager auto-creating a TLS Secret) that the GitOps repo never declared.
5. **Temporary sync failures** — a missed Git webhook, network timeout preventing the agent from reconciling in time.

**How to detect it:**

*ArgoCD:*
```bash
argocd app get order-service
# Output shows Sync Status: OutOfSync
argocd app diff order-service   # see exactly which fields differ
```
The ArgoCD UI visually shows which resources are drifting and exactly which fields changed (colored like a git diff).

*Flux:*
```bash
flux get kustomizations
flux diff kustomization order-service --path ./apps/order-service
```

**How to handle it:**

| Situation | Handling |
|---|---|
| Drift from an unwanted manual change | Enable `selfHeal: true` to auto-sync back to Git, or run `argocd app sync` manually |
| Drift from another legitimate controller managing that field (HPA, VPA) | Use `ignoreDifferences` (ArgoCD) or an annotation to exclude the field from reconciliation |
| Drift reveals Git is missing a needed change (e.g. someone applied a correct fix on the cluster) | Update Git to match reality (`kubectl get -o yaml` then commit) — **never** leave the state silently mismatched |
| Drift from resources created outside GitOps's scope | Consider bringing them under GitOps management, or use `resource.exclusions` to exclude them from comparison |

```yaml
# Excluding an HPA-managed field from ArgoCD's diff
spec:
  ignoreDifferences:
    - group: apps
      kind: Deployment
      name: order-service
      jsonPointers:
        - /spec/replicas
```

**Proactive drift monitoring (often a mid/senior follow-up question):**
- Alert when an Application stays `OutOfSync` for more than X minutes (usually a sign selfHeal is off or of a controller conflict).
- A Grafana dashboard using the `argocd_app_info{sync_status="OutOfSync"}` metric from the ArgoCD metrics exporter.
- Policy-as-code (OPA/Kyverno) to **prevent drift at the source** — blocking direct `kubectl edit`/`apply` against production namespaces unless it goes through the CI/CD pipeline (via RBAC + admission controllers).

**Pitfall:** enabling `selfHeal: true` on every resource without `ignoreDifferences` for fields managed by other controllers (HPA, cert-manager) causes a **fighting loop** — two controllers repeatedly overwriting each other, causing constant pod restarts or wasted API calls against the control plane.
