---
id: config-repo-structure-multi-environment
position: devops
technology: gitops-release-mgmt
level: senior
tags: [gitops, architecture, kubernetes, scaling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế cấu trúc GitOps config repo cho một tổ chức có ~50 microservice, 4 môi trường (dev/staging/uat/prod), nhiều team sở hữu service khác nhau. Nêu rõ trade-off của thiết kế.

## Question (EN)
Design a GitOps config repo structure for an organization with ~50 microservices, 4 environments (dev/staging/uat/prod), and multiple teams owning different services. Explain the design trade-offs.

## Đáp án chi tiết (VI)
Ở quy mô này, thiết kế cấu trúc repo phải cân bằng 4 lực căng: **khả năng scale (không nghẽn khi nhiều team commit đồng thời)**, **cách ly bảo mật (RBAC theo team)**, **khả năng tái sử dụng (tránh lặp YAML)**, và **khả năng audit/observability (nhìn được tổng thể)**.

**Cấu trúc đề xuất — kết hợp "app of apps" + base/overlays + registry tập trung:**

```
gitops-platform/                      # repo trung tâm, platform team sở hữu
  clusters/
    prod/
      root-app.yaml                   # ArgoCD "app of apps" cho cluster prod
    staging/
      root-app.yaml
  bootstrap/
    argocd-install.yaml
    cert-manager.yaml                 # infra add-on chung, không phải app team

team-order/gitops-configs/            # repo riêng, team Order sở hữu
  apps/order-service/
    base/
      deployment.yaml
      service.yaml
      kustomization.yaml
    overlays/
      dev/kustomization.yaml          # replicas: 1, resource thấp
      staging/kustomization.yaml
      uat/kustomization.yaml
      prod/kustomization.yaml         # replicas: 5, HPA, PodDisruptionBudget

team-payment/gitops-configs/          # repo riêng, team Payment sở hữu
  apps/payment-service/
    base/...
    overlays/{dev,staging,uat,prod}/...
```

**`root-app.yaml` dùng ArgoCD `ApplicationSet` với Git generator quét toàn bộ repo team:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: prod-apps
spec:
  generators:
    - git:
        repoURL: https://github.com/company/gitops-registry.git
        files:
          - path: "teams/*.yaml"   # mỗi file khai báo 1 team + repo của họ
  template:
    metadata:
      name: '{{.team}}-{{.service}}'
    spec:
      project: '{{.team}}'          # ArgoCD Project riêng theo team -> RBAC
      source:
        repoURL: '{{.repoURL}}'
        path: 'apps/{{.service}}/overlays/prod'
      destination:
        namespace: '{{.team}}-prod'
```

**Quyết định thiết kế then chốt và lý do:**

1. **Poly-repo theo team, không phải theo service riêng lẻ**: 50 service nhưng có thể chỉ ~8-10 team → mỗi team 1 repo config là điểm cân bằng hợp lý giữa cách ly RBAC (không cần 50 repo, quá tải vận hành) và tự chủ team (không gộp chung 1 mono-repo gây nghẽn).
2. **ArgoCD Project theo team**: giới hạn `sourceRepos`, `destinations`, `clusterResourceWhitelist` theo Project — đảm bảo team Order không thể (dù vô tình) deploy resource vào namespace của team Payment, ngay cả khi ArgoCD dùng chung 1 control plane.
3. **`base/` + `overlays/` (Kustomize) trong từng team-repo**: tối thiểu hoá lặp code giữa 4 môi trường, đồng thời diff của PR promote luôn rõ ràng ("chỉ đổi image tag ở overlays/prod").
4. **Repo trung tâm (`gitops-platform`) tách biệt khỏi config của team**: chỉ chứa "registry" khai báo team nào có repo nào, và infra add-on dùng chung (cert-manager, ingress, monitoring) — không để platform team trở thành bottleneck approve mọi thay đổi ứng dụng.
5. **4 môi trường nhưng không nhất thiết 4 cluster vật lý**: cân nhắc dev/staging dùng chung cluster (namespace riêng) để tiết kiệm chi phí, chỉ uat/prod tách cluster riêng để cách ly rủi ro — quyết định này ảnh hưởng tới cấu trúc `destination` trong Application.

**Trade-off cần nêu rõ khi phỏng vấn:**

| Quyết định | Đánh đổi |
|---|---|
| Poly-repo theo team | Cần tự động hoá đăng ký repo mới vào registry trung tâm (không thể thủ công khi có 8-10 team, mỗi team thêm service liên tục) |
| ApplicationSet Git generator | Thêm một tầng gián tiếp — debug lỗi sync đôi khi phải trace qua 2 lớp (ApplicationSet -> Application -> resource) |
| ArgoCD Project theo team | Cần platform team duy trì và review khi team cần mở rộng quyền (ví dụ deploy CRD mới) — không hoàn toàn tự chủ 100% |
| Base/overlays Kustomize | Team phải học Kustomize, và khi base thay đổi breaking, ảnh hưởng đồng loạt tới cả 4 overlays — cần test kỹ trước khi đổi base |

**Câu hỏi mở rộng thường gặp:** "Làm sao audit nhanh 'service X đang chạy version gì ở prod' khi có 50 repo?" — Giải pháp: dashboard tổng hợp (ArgoCD UI đã có sẵn danh sách Application, hoặc script định kỳ query ArgoCD API/`argocd app list -o json` tổng hợp version tất cả app theo team, đẩy vào một dashboard trung tâm hoặc Slack digest).

## Detailed Answer (EN)
At this scale, the repo structure design must balance 4 competing forces: **scalability (no bottleneck with many teams committing concurrently)**, **security isolation (team-level RBAC)**, **reusability (avoiding YAML duplication)**, and **auditability/observability (seeing the whole picture)**.

**Proposed structure — combining "app of apps" + base/overlays + a central registry:**

```
gitops-platform/                      # central repo, owned by the platform team
  clusters/
    prod/
      root-app.yaml                   # ArgoCD "app of apps" for the prod cluster
    staging/
      root-app.yaml
  bootstrap/
    argocd-install.yaml
    cert-manager.yaml                 # shared infra add-ons, not a team app

team-order/gitops-configs/            # separate repo, owned by the Order team
  apps/order-service/
    base/
      deployment.yaml
      service.yaml
      kustomization.yaml
    overlays/
      dev/kustomization.yaml          # replicas: 1, low resources
      staging/kustomization.yaml
      uat/kustomization.yaml
      prod/kustomization.yaml         # replicas: 5, HPA, PodDisruptionBudget

team-payment/gitops-configs/          # separate repo, owned by the Payment team
  apps/payment-service/
    base/...
    overlays/{dev,staging,uat,prod}/...
```

**`root-app.yaml` uses an ArgoCD `ApplicationSet` with a Git generator scanning across team repos:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: prod-apps
spec:
  generators:
    - git:
        repoURL: https://github.com/company/gitops-registry.git
        files:
          - path: "teams/*.yaml"   # each file declares one team + their repo
  template:
    metadata:
      name: '{{.team}}-{{.service}}'
    spec:
      project: '{{.team}}'          # a dedicated ArgoCD Project per team -> RBAC
      source:
        repoURL: '{{.repoURL}}'
        path: 'apps/{{.service}}/overlays/prod'
      destination:
        namespace: '{{.team}}-prod'
```

**Key design decisions and rationale:**

1. **Poly-repo per team, not per individual service**: 50 services but perhaps only ~8-10 teams → one config repo per team is a reasonable balance between RBAC isolation (not needing 50 repos, which would be operationally overwhelming) and team autonomy (not merging into a single mono-repo that becomes a bottleneck).
2. **ArgoCD Project per team**: restricting `sourceRepos`, `destinations`, `clusterResourceWhitelist` per Project — ensures the Order team can't (even accidentally) deploy resources into the Payment team's namespace, even though ArgoCD shares a single control plane.
3. **`base/` + `overlays/` (Kustomize) inside each team repo**: minimizes code duplication across the 4 environments, while a promotion PR's diff stays clear ("only the image tag in overlays/prod changed").
4. **Central repo (`gitops-platform`) kept separate from team config**: only holds the "registry" declaring which team has which repo, plus shared infra add-ons (cert-manager, ingress, monitoring) — preventing the platform team from becoming a bottleneck approving every application change.
5. **4 environments doesn't necessarily mean 4 physical clusters**: consider dev/staging sharing a cluster (separate namespaces) to save cost, only separating uat/prod into dedicated clusters for risk isolation — this decision affects the `destination` structure in the Application.

**Trade-offs to call out explicitly in an interview:**

| Decision | Trade-off |
|---|---|
| Poly-repo per team | Requires automating new-repo registration in the central registry (can't be manual with 8-10 teams constantly adding services) |
| ApplicationSet Git generator | Adds a layer of indirection — debugging sync issues sometimes requires tracing through 2 layers (ApplicationSet -> Application -> resource) |
| ArgoCD Project per team | Requires the platform team to maintain and review when teams need expanded permissions (e.g. deploying a new CRD) — not 100% fully autonomous |
| Base/overlays Kustomize | Teams must learn Kustomize, and a breaking change to base impacts all 4 overlays simultaneously — needs careful testing before changing base |

**A common follow-up question:** "How do you quickly audit 'what version is service X running in prod' across 50 repos?" — Solution: a consolidated dashboard (the ArgoCD UI already lists Applications, or a periodic script querying the ArgoCD API/`argocd app list -o json` to aggregate every app's version by team, feeding a central dashboard or a Slack digest).
