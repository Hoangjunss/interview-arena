---
id: gitops-la-gi
position: devops
technology: gitops-release-mgmt
level: junior
tags: [gitops, fundamentals, git]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GitOps là gì? Nó khác gì so với cách deploy truyền thống (CI/CD push-based truyền thống)?

## Question (EN)
What is GitOps? How does it differ from a traditional CI/CD push-based deployment approach?

## Đáp án chi tiết (VI)
**GitOps** là một phương pháp vận hành hệ thống (đặc biệt phổ biến với Kubernetes) trong đó:

- **Git là single source of truth**: toàn bộ trạng thái mong muốn (desired state) của hệ thống — manifest Kubernetes, Helm values, Kustomize overlay — được lưu trong Git repository.
- Một **agent/controller** (như ArgoCD, Flux) chạy trong cluster, liên tục **so sánh trạng thái thực tế (live state)** với trạng thái khai báo trong Git, và **tự động đồng bộ (reconcile)** khi có sai khác.
- Mọi thay đổi hệ thống đều đi qua Git — nghĩa là qua `git commit`, code review (Pull Request), và có lịch sử audit đầy đủ.

**So sánh với CI/CD push-based truyền thống:**

| Tiêu chí | Push-based CI/CD truyền thống | GitOps (Pull-based) |
|---|---|---|
| Cơ chế | Pipeline CI chạy `kubectl apply`/`helm upgrade` trực tiếp vào cluster | Agent trong cluster tự kéo (pull) thay đổi từ Git về |
| Credentials cluster | CI server cần quyền truy cập cluster (rủi ro bảo mật cao, phải quản lý secret ở nhiều nơi) | Chỉ agent trong cluster cần quyền, không lộ credential ra ngoài |
| Nguồn sự thật | Nằm rải rác: pipeline script, biến môi trường CI, đôi khi chạy tay | Tập trung 100% ở Git |
| Drift detection | Không có cơ chế phát hiện tự động khi ai đó `kubectl edit` trực tiếp | Tự động phát hiện và có thể tự sửa (self-healing) |
| Rollback | Chạy lại pipeline cũ hoặc deploy tay | `git revert` rồi để controller tự đồng bộ |
| Audit trail | Log CI rời rạc, khó truy vết "ai đổi gì" | Lịch sử Git đầy đủ, gắn với PR/review |

**Ví dụ thực tế với ArgoCD:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payment-service
spec:
  source:
    repoURL: https://github.com/company/gitops-configs.git
    path: apps/payment-service/prod
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
    namespace: payment-prod
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```
Khi merge PR thay đổi `image.tag` trong repo `gitops-configs`, ArgoCD sẽ tự phát hiện sai khác và đồng bộ vào cluster mà không cần ai chạy `kubectl` thủ công.

**Lợi ích chính:** an toàn hơn (không cần expose kubeconfig cho CI), có audit trail, rollback dễ (chỉ cần revert commit), dễ tái tạo môi trường (disaster recovery = apply lại repo Git).

**Pitfall thường gặp:** nhóm mới áp dụng GitOps hay quên rằng **Git phải phản ánh đúng thực tế** — nếu ai đó `kubectl edit` trực tiếp để "fix nhanh" production, sẽ tạo drift, và tuỳ theo `selfHeal` config mà thay đổi đó có thể bị agent tự động ghi đè (rollback ngược) — gây bối rối nếu team không hiểu rõ cơ chế.

## Detailed Answer (EN)
**GitOps** is an operational methodology (most popular with Kubernetes) where:

- **Git is the single source of truth**: the entire desired state of the system — Kubernetes manifests, Helm values, Kustomize overlays — lives in a Git repository.
- A **controller/agent** (ArgoCD, Flux) runs inside the cluster, continuously **compares the live state** against what's declared in Git, and **automatically reconciles** any drift.
- Every system change flows through Git — meaning `git commit`, code review (Pull Request), and a full audit trail.

**Comparison with traditional push-based CI/CD:**

| Criteria | Traditional push-based CI/CD | GitOps (pull-based) |
|---|---|---|
| Mechanism | CI pipeline runs `kubectl apply`/`helm upgrade` directly against the cluster | An in-cluster agent pulls changes from Git |
| Cluster credentials | CI server needs cluster access (higher security risk, secrets spread across systems) | Only the in-cluster agent needs access; no credentials exposed externally |
| Source of truth | Scattered: pipeline scripts, CI env vars, sometimes manual runs | 100% centralized in Git |
| Drift detection | No automatic mechanism when someone `kubectl edit`s directly | Automatically detected and can self-heal |
| Rollback | Re-run an old pipeline or deploy manually | `git revert`, let the controller reconcile |
| Audit trail | Scattered CI logs, hard to trace "who changed what" | Full Git history tied to PRs/reviews |

**Real-world example with ArgoCD:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payment-service
spec:
  source:
    repoURL: https://github.com/company/gitops-configs.git
    path: apps/payment-service/prod
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
    namespace: payment-prod
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```
When a PR changing `image.tag` in the `gitops-configs` repo is merged, ArgoCD detects the drift and syncs it into the cluster — no one runs `kubectl` manually.

**Key benefits:** stronger security posture (CI never needs a kubeconfig), full audit trail, easy rollback (just revert the commit), and easy environment reproduction (disaster recovery = re-apply the Git repo).

**Common pitfall:** teams new to GitOps often forget that **Git must reflect reality**. If someone `kubectl edit`s production directly for a "quick fix," it creates drift — and depending on the `selfHeal` setting, that manual change might get silently reverted by the agent's next reconciliation, confusing the team if they don't understand the mechanism.
