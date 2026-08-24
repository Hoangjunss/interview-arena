---
id: ci-cd-vs-gitops-pipeline
position: devops
technology: gitops-release-mgmt
level: junior
tags: [ci-cd, gitops, kubernetes]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong một mô hình GitOps hoàn chỉnh, CI và CD được tách vai trò như thế nào? Vẽ luồng từ lúc commit code tới lúc chạy trên production.

## Question (EN)
In a full GitOps model, how are CI and CD responsibilities split? Walk through the flow from code commit to running in production.

## Đáp án chi tiết (VI)
Điểm mấu chốt của GitOps là **tách biệt rõ ràng CI (Continuous Integration) và CD (Continuous Delivery/Deployment)** thành hai repo và hai trách nhiệm khác nhau:

- **CI** (thường ở app repo): build code, chạy test, build & push Docker image, **không** có quyền động vào cluster.
- **CD** (thường ở config/GitOps repo): chỉ chứa manifest/Helm values khai báo trạng thái mong muốn; agent trong cluster (ArgoCD/Flux) đọc repo này và tự deploy.

**Luồng đầy đủ:**
```
1. Dev push code lên app-repo (feature branch) → mở PR
2. CI chạy: unit test, lint, build image
3. PR được review, merge vào main
4. CI (trigger bởi tag hoặc merge) build image chính thức:
     registry.company.vn/order-service:1.4.2
   và push lên container registry
5. CI (hoặc tool như Argo CD Image Updater / Renovate) mở PR
   vào gitops-config-repo, cập nhật:
     apps/order-service/staging/values.yaml -> tag: "1.4.2"
6. PR ở gitops-config-repo được review (thường tự động cho staging,
   cần approval thủ công cho production) và merge
7. ArgoCD (chạy trong cluster, poll hoặc nhận webhook) phát hiện
   sai khác giữa Git và live state -> tự động `sync`
8. Pod mới với image 1.4.2 được rollout vào cluster
9. ArgoCD tiếp tục reconciliation loop, đảm bảo live state luôn
   khớp với Git
```

**Vì sao tách 2 repo (app-repo và gitops-config-repo) thay vì gộp chung:**
- **Bảo mật**: CI pipeline build code không cần bất kỳ quyền truy cập cluster nào — chỉ cần quyền push image và mở PR vào config repo.
- **Tách biệt vòng đời**: thay đổi code (feature, bugfix) có nhịp độ khác với thay đổi hạ tầng/cấu hình (replicas, resource limits, network policy).
- **Audit rõ ràng**: lịch sử "cái gì đang chạy ở đâu" nằm gọn trong 1 repo (config repo), không lẫn với lịch sử code.
- **Đa môi trường**: config repo dễ dàng tổ chức theo cấu trúc `apps/<service>/<env>/` để quản lý dev/staging/prod độc lập.

**Biến thể mono-repo:** một số team gộp cả code và config trong 1 repo (dùng thư mục `/k8s` hoặc `/deploy`), chấp nhận đánh đổi đơn giản hoá quy trình để lấy sự tách biệt về bảo mật/audit thấp hơn — phù hợp với team nhỏ, ít service.

**Pitfall:** nhầm lẫn giữa "CI đẩy trực tiếp vào cluster" (không phải GitOps thật) và "CI chỉ update Git rồi để agent tự pull" (đúng GitOps). Nhiều pipeline gọi là "GitOps" nhưng thực chất vẫn `helm upgrade` trực tiếp từ CI — đây là push-based giả danh GitOps, mất đi lợi ích drift-detection và bảo mật.

## Detailed Answer (EN)
The core idea of GitOps is **clearly separating CI (Continuous Integration) and CD (Continuous Delivery/Deployment)** into two repos with two distinct responsibilities:

- **CI** (usually the app repo): builds code, runs tests, builds & pushes the Docker image — **never** has direct access to the cluster.
- **CD** (usually the config/GitOps repo): holds only manifests/Helm values declaring desired state; an in-cluster agent (ArgoCD/Flux) reads this repo and deploys automatically.

**The full flow:**
```
1. Dev pushes code to the app-repo (feature branch) -> opens a PR
2. CI runs: unit tests, lint, image build
3. PR is reviewed, merged into main
4. CI (triggered by a tag or the merge) builds the official image:
     registry.company.vn/order-service:1.4.2
   and pushes it to the container registry
5. CI (or a tool like Argo CD Image Updater / Renovate) opens a PR
   against the gitops-config-repo, updating:
     apps/order-service/staging/values.yaml -> tag: "1.4.2"
6. The PR in gitops-config-repo is reviewed (often auto-approved for
   staging, requiring manual approval for production) and merged
7. ArgoCD (running inside the cluster, polling or webhook-triggered)
   detects the drift between Git and live state -> auto `sync`
8. New pods with image 1.4.2 roll out into the cluster
9. ArgoCD continues its reconciliation loop, keeping live state
   aligned with Git
```

**Why split into two repos (app-repo and gitops-config-repo) instead of merging them:**
- **Security**: the CI pipeline building code needs no cluster access at all — only permission to push images and open PRs against the config repo.
- **Lifecycle separation**: code changes (features, bugfixes) move at a different cadence than infrastructure/config changes (replicas, resource limits, network policy).
- **Clear audit trail**: the history of "what's running where" lives cleanly in one repo (config repo), not mixed with code history.
- **Multi-environment**: the config repo can be organized as `apps/<service>/<env>/` to manage dev/staging/prod independently.

**Mono-repo variant:** some teams combine code and config in a single repo (using a `/k8s` or `/deploy` folder), trading off some security/audit separation for a simpler workflow — reasonable for small teams with few services.

**Pitfall:** confusing "CI pushes directly into the cluster" (not real GitOps) with "CI only updates Git and lets the agent pull" (real GitOps). Many pipelines call themselves "GitOps" but still `helm upgrade` directly from CI — this is push-based deployment disguised as GitOps, losing the drift-detection and security benefits.
