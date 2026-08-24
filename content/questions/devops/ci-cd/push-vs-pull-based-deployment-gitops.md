---
id: push-vs-pull-based-deployment-gitops
position: devops
technology: ci-cd
level: senior
tags: [gitops, kubernetes, deployment-strategy, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh mô hình CD kiểu push (CI pipeline chủ động deploy) với mô hình pull-based GitOps (ArgoCD/Flux). Vì sao nhiều tổ chức lớn chuyển sang GitOps cho Kubernetes?

## Question (EN)
Compare push-based CD (the CI pipeline actively deploys) with pull-based GitOps (ArgoCD/Flux). Why have many large organizations moved to GitOps for Kubernetes?

## Đáp án chi tiết (VI)
Đây là hai kiến trúc khác nhau về **ai chủ động khởi tạo hành động deploy** và **đâu là nguồn sự thật (source of truth)** cho trạng thái hạ tầng.

**Push-based CD (truyền thống):**
```yaml
# CI pipeline (GitHub Actions) trực tiếp chạy lệnh deploy
deploy:
  steps:
    - run: kubectl set image deployment/app app=myrepo/app:${{ github.sha }} -n production
      env:
        KUBECONFIG: ${{ secrets.PROD_KUBECONFIG }}
```
CI server cần **credential để truy cập trực tiếp vào cluster production** và chủ động "đẩy" thay đổi vào đó.

**Pull-based GitOps (ArgoCD/Flux):**
```yaml
# CI chỉ cập nhật manifest trong Git repo (không hề đụng vào cluster)
- run: |
    yq -i '.spec.template.spec.containers[0].image = "myrepo/app:'${{ github.sha }}'"' k8s/deployment.yaml
    git commit -am "deploy: bump image to ${{ github.sha }}"
    git push
```
Một **agent chạy bên trong cluster** (ArgoCD/Flux) liên tục poll (hoặc nhận webhook) từ Git repo, tự phát hiện khác biệt giữa state mong muốn (trong Git) và state thực tế (trong cluster), rồi tự **kéo** thay đổi về áp dụng.

**So sánh chi tiết:**

| Tiêu chí | Push-based | Pull-based (GitOps) |
|---|---|---|
| **Ai giữ credential cluster** | CI server (bên ngoài cluster) cần credential admin | Chỉ agent trong cluster mới cần quyền — CI không bao giờ có credential cluster |
| **Bề mặt tấn công** | Lớn hơn — CI compromised = cluster compromised | Nhỏ hơn — CI compromised chỉ có thể sửa Git, không trực tiếp chạm cluster |
| **Drift detection** | Không có — nếu ai đó `kubectl edit` thủ công, không ai biết cho đến khi deploy tiếp theo ghi đè | Có — ArgoCD liên tục so sánh Git vs cluster, tự cảnh báo/tự sửa drift (self-healing) |
| **Nguồn sự thật** | Nằm rải rác — vừa trong Git, vừa trong lịch sử CI run, vừa trong trạng thái cluster | Chỉ 1 nơi: Git repo — "declarative, auditable, single source of truth" |
| **Rollback** | Chạy lại pipeline cũ hoặc lệnh `kubectl rollout undo` | `git revert` commit, ArgoCD tự đồng bộ lại — rollback = thao tác Git thuần túy |
| **Đa cluster** | Cần CI có network access đến từng cluster (VPN, bastion...) | Mỗi cluster tự có agent kéo về, CI không cần biết cluster nằm ở đâu |
| **Độ phức tạp vận hành** | Đơn giản hơn để bắt đầu | Cần thêm hạ tầng (ArgoCD/Flux), learning curve ban đầu cao hơn |

**Vì sao tổ chức lớn chuyển sang GitOps:**

1. **Bảo mật:** loại bỏ hoàn toàn nhu cầu cấp credential cluster production cho CI server bên ngoài — giảm đáng kể bề mặt tấn công (một trong những nguyên nhân hàng đầu gây sự cố bảo mật CI/CD là lộ credential cluster từ CI).
2. **Self-healing:** nếu ai đó vô tình/cố ý sửa trực tiếp trên cluster (`kubectl edit` khẩn cấp không qua review), ArgoCD tự phát hiện drift và có thể tự động đồng bộ lại theo Git — đảm bảo cluster luôn khớp với trạng thái khai báo.
3. **Audit trail hoàn chỉnh:** mọi thay đổi hạ tầng đều là 1 Git commit — biết chính xác ai, khi nào, thay đổi gì, dễ dàng review qua PR trước khi áp dụng.
4. **Đa cluster/đa region dễ quản lý hơn:** chỉ cần trỏ agent ở mỗi cluster về đúng Git path, không cần CI phải "biết" cách kết nối tới hàng chục cluster khác nhau.

**Trade-off/nhược điểm của GitOps:**
- Thêm một tầng hạ tầng cần vận hành (ArgoCD/Flux server, cần HA, upgrade).
- Độ trễ giữa lúc merge và lúc thực sự deploy phụ thuộc chu kỳ poll/sync (dù có thể giảm bằng webhook để gần real-time).
- Với thay đổi cần rollback tức thời trong sự cố nghiêm trọng, một số team vẫn giữ khả năng `kubectl` trực tiếp (break-glass access) — nhưng phải đảm bảo access này được audit và đồng bộ lại Git ngay sau đó để tránh drift vĩnh viễn.

## Detailed Answer (EN)
These are two different architectures around **who initiates the deploy action** and **where the source of truth** for infrastructure state lives.

**Push-based CD (traditional):**
```yaml
# The CI pipeline (GitHub Actions) directly runs the deploy command
deploy:
  steps:
    - run: kubectl set image deployment/app app=myrepo/app:${{ github.sha }} -n production
      env:
        KUBECONFIG: ${{ secrets.PROD_KUBECONFIG }}
```
The CI server needs **credentials with direct access to the production cluster** and actively "pushes" the change into it.

**Pull-based GitOps (ArgoCD/Flux):**
```yaml
# CI only updates the manifest in the Git repo (never touches the cluster)
- run: |
    yq -i '.spec.template.spec.containers[0].image = "myrepo/app:'${{ github.sha }}'"' k8s/deployment.yaml
    git commit -am "deploy: bump image to ${{ github.sha }}"
    git push
```
An **agent running inside the cluster** (ArgoCD/Flux) continuously polls (or receives a webhook) from the Git repo, automatically detects drift between the desired state (in Git) and the actual state (in the cluster), and **pulls** the change to apply it itself.

**Detailed comparison:**

| Criterion | Push-based | Pull-based (GitOps) |
|---|---|---|
| **Who holds cluster credentials** | The CI server (external to the cluster) needs admin credentials | Only the in-cluster agent needs access — CI never holds cluster credentials |
| **Attack surface** | Larger — a compromised CI equals a compromised cluster | Smaller — a compromised CI can only tamper with Git, never touches the cluster directly |
| **Drift detection** | None — if someone manually `kubectl edit`s, no one knows until the next deploy overwrites it | Yes — ArgoCD continuously diffs Git vs cluster and can alert/self-heal drift automatically |
| **Source of truth** | Scattered — partly in Git, partly in CI run history, partly in cluster state | A single place: the Git repo — "declarative, auditable, single source of truth" |
| **Rollback** | Re-run an old pipeline or `kubectl rollout undo` | `git revert` the commit; ArgoCD auto-syncs — rollback is a pure Git operation |
| **Multi-cluster** | CI needs network access to every cluster (VPN, bastion...) | Each cluster has its own pulling agent; CI doesn't need to know where clusters live |
| **Operational complexity** | Simpler to start with | Requires extra infrastructure (ArgoCD/Flux), steeper initial learning curve |

**Why large organizations moved to GitOps:**

1. **Security:** completely eliminates the need to grant production cluster credentials to an external CI server — significantly reducing the attack surface (leaked cluster credentials from CI is a leading cause of CI/CD security incidents).
2. **Self-healing:** if someone accidentally/deliberately edits the cluster directly (an emergency `kubectl edit` bypassing review), ArgoCD detects the drift and can automatically resync it back to match Git — ensuring the cluster always matches the declared state.
3. **Complete audit trail:** every infrastructure change is a Git commit — you know exactly who changed what, when, and can review it via PR before it's applied.
4. **Easier multi-cluster/multi-region management:** just point each cluster's agent at the right Git path — CI doesn't need to "know" how to connect to dozens of different clusters.

**GitOps trade-offs/downsides:**
- An additional infrastructure layer to operate (ArgoCD/Flux server, needs HA, upgrades).
- Latency between merge and actual deployment depends on the poll/sync cycle (though this can be reduced to near-real-time via webhooks).
- For changes that need instant rollback during a severe incident, some teams still retain direct `kubectl` capability (break-glass access) — but must ensure it's audited and re-synced back to Git immediately to avoid permanent drift.