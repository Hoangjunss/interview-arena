---
id: immutable-infrastructure-basics
position: devops
technology: gitops-release-mgmt
level: junior
tags: [gitops, infrastructure, kubernetes]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Immutable infrastructure là gì và tại sao nó là nền tảng quan trọng cho GitOps?

## Question (EN)
What is immutable infrastructure, and why is it a foundational concept for GitOps?

## Đáp án chi tiết (VI)
**Immutable infrastructure** là mô hình trong đó **hạ tầng/server/container, sau khi được tạo ra, không bao giờ bị chỉnh sửa tại chỗ (in-place)**. Mọi thay đổi (update code, đổi config, vá lỗi) đều được thực hiện bằng cách **tạo mới hoàn toàn** một phiên bản khác rồi thay thế cái cũ, thay vì SSH vào sửa trực tiếp.

**Trái ngược:** *mutable infrastructure* — SSH vào server, chạy `apt upgrade`, sửa file config tay, restart service. Theo thời gian, mỗi server dần "phân kỳ" khỏi các server khác (config drift), gây ra hiện tượng nổi tiếng "nó chạy được trên máy tôi/server A nhưng lỗi trên server B".

**Ví dụ cụ thể:**

| Mutable (truyền thống) | Immutable (hiện đại) |
|---|---|
| SSH vào VM, `apt-get update && restart nginx` | Build image mới `myapp:1.5.0`, deploy container mới, xoá container cũ |
| Sửa trực tiếp file `application.yaml` trên server | Sửa trong Git, build lại artifact, rollout Deployment mới |
| Rollback = nhớ và sửa ngược tay | Rollback = deploy lại image cũ (`myapp:1.4.2`) |

**Vì sao immutable infra là nền tảng của GitOps:**
1. **Reconciliation cần trạng thái xác định**: ArgoCD/Flux so sánh Git với cluster dựa trên giả định rằng một khi Pod chạy image `X`, nó *chính là* image `X` — không bị chỉnh sửa ngầm bên trong. Nếu hạ tầng mutable, "trạng thái thực tế" sẽ không đáng tin cậy.
2. **Rollback tin cậy**: `git revert` chỉ hoạt động tốt nếu mỗi commit tương ứng với một artifact bất biến (image tag cụ thể) — revert về commit cũ nghĩa là deploy lại đúng y hệt image cũ, không có rủi ro "đã lỡ sửa tay từ trước".
3. **Audit & reproducibility**: muốn tái tạo môi trường (disaster recovery, staging giống prod), immutable + declarative đảm bảo `git checkout <commit> && kubectl apply` cho ra kết quả giống hệt.
4. Kubernetes vốn được thiết kế theo hướng immutable: Pod không sửa được image tại chỗ, mọi thay đổi tạo ra Pod mới (rolling update tạo ReplicaSet mới).

**Ví dụ minh hoạ trong Kubernetes:**
```bash
# SAI (mutable mindset): sửa trực tiếp
kubectl exec -it order-service-pod -- vi /app/config.yaml

# ĐÚNG (immutable): sửa trong Git, tạo image/manifest mới
git commit -am "fix: update config.yaml"
git push  # -> CI build image mới -> ArgoCD rollout Deployment mới
```

**Pitfall:** một số team vẫn giữ thói quen "hotfix" bằng `kubectl exec`/`kubectl edit` trực tiếp khi gấp gáp — về ngắn hạn có vẻ nhanh, nhưng phá vỡ tính bất biến, gây drift so với Git, và nếu `selfHeal` bật, ArgoCD sẽ tự động ghi đè hotfix đó, khiến sự cố "biến mất rồi quay lại".

## Detailed Answer (EN)
**Immutable infrastructure** is a model where **infrastructure/servers/containers, once created, are never modified in place**. Every change (code update, config change, patch) is made by **creating an entirely new version** and replacing the old one, rather than SSHing in to edit directly.

**The opposite:** *mutable infrastructure* — SSH into a server, run `apt upgrade`, hand-edit config files, restart the service. Over time, each server gradually "diverges" from the others (config drift), causing the classic "works on my machine/server A but fails on server B" problem.

**Concrete comparison:**

| Mutable (traditional) | Immutable (modern) |
|---|---|
| SSH into a VM, `apt-get update && restart nginx` | Build a new image `myapp:1.5.0`, deploy a new container, remove the old one |
| Edit `application.yaml` directly on the server | Edit in Git, rebuild the artifact, roll out a new Deployment |
| Rollback = remember and manually undo | Rollback = redeploy the old image (`myapp:1.4.2`) |

**Why immutable infra is foundational to GitOps:**
1. **Reconciliation needs a deterministic state**: ArgoCD/Flux compares Git with the cluster on the assumption that once a Pod runs image `X`, it *is* image `X` — not silently modified inside. With mutable infra, "actual state" becomes unreliable.
2. **Reliable rollback**: `git revert` only works well if each commit maps to an immutable artifact (a specific image tag) — reverting to an old commit means redeploying the exact same old image, with no risk of "someone already hand-patched it since then."
3. **Audit & reproducibility**: to reproduce an environment (disaster recovery, staging mirroring prod), immutable + declarative guarantees that `git checkout <commit> && kubectl apply` produces an identical result.
4. Kubernetes itself is designed around immutability: a Pod's image can't be edited in place — every change spawns a new Pod (a rolling update creates a new ReplicaSet).

**Kubernetes illustration:**
```bash
# WRONG (mutable mindset): editing directly
kubectl exec -it order-service-pod -- vi /app/config.yaml

# CORRECT (immutable): edit in Git, produce a new image/manifest
git commit -am "fix: update config.yaml"
git push  # -> CI builds a new image -> ArgoCD rolls out a new Deployment
```

**Pitfall:** some teams still fall back on "hotfixing" via `kubectl exec`/`kubectl edit` directly under time pressure — it looks fast short-term, but it breaks immutability, creates drift versus Git, and if `selfHeal` is on, ArgoCD will silently overwrite that hotfix, making the incident "disappear and then come back."
