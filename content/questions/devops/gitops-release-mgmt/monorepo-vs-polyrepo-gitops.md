---
id: monorepo-vs-polyrepo-gitops
position: devops
technology: gitops-release-mgmt
level: mid
tags: [gitops, repository-structure, scaling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nên tổ chức GitOps config theo mono-repo (1 repo cho tất cả service) hay poly-repo (mỗi service/team 1 repo riêng)? Phân tích trade-off.

## Question (EN)
Should GitOps config be organized as a mono-repo (one repo for all services) or poly-repo (one repo per service/team)? Analyze the trade-offs.

## Đáp án chi tiết (VI)
Đây là quyết định kiến trúc quan trọng ảnh hưởng tới bảo mật, tốc độ vận hành, và khả năng scale của cả tổ chức khi số lượng service tăng lên.

### Mono-repo GitOps
```
gitops-config/
  apps/
    order-service/{dev,staging,prod}/
    payment-service/{dev,staging,prod}/
    notification-service/{dev,staging,prod}/
  clusters/
    prod-cluster/apps.yaml   # ArgoCD ApplicationSet trỏ vào apps/*
```
**Ưu điểm:**
- **Tầm nhìn toàn cục**: một PR có thể thay đổi đồng thời nhiều service liên quan (ví dụ đổi shared ConfigMap dùng chung), dễ review tác động chéo.
- Dễ áp dụng chính sách chung (policy-as-code, CI validate) cho toàn bộ cluster ở một chỗ.
- Ít overhead vận hành hơn — không cần đồng bộ quyền/webhook trên hàng chục repo.

**Nhược điểm:**
- **RBAC khó tách nhỏ**: team A có thể vô tình (hoặc cố ý) xem/sửa config của team B nếu không có CODEOWNERS + branch protection theo path chặt chẽ.
- Repo lớn dần theo số service → clone chậm, CI validate toàn repo tốn thời gian nếu không tối ưu (path-based trigger).
- Một PR sai lầm/broken CI có thể chặn merge của toàn bộ team khác cùng lúc.

### Poly-repo GitOps
```
gitops-order-service/     # repo riêng, team Order sở hữu hoàn toàn
gitops-payment-service/   # repo riêng, team Payment sở hữu hoàn toàn
```
**Ưu điểm:**
- **Cách ly quyền truy cập rõ ràng**: mỗi team toàn quyền quản lý repo của mình, RBAC đơn giản (quyền ở cấp repo, không cần path-based).
- Blast radius nhỏ hơn khi có sự cố CI/lỗi cấu hình — chỉ ảnh hưởng 1 repo/service.
- Team tự chủ về tốc độ release, không bị block bởi thay đổi của team khác.

**Nhược điểm:**
- Khó áp dụng chính sách chung đồng loạt (phải đồng bộ hàng chục repo, dễ lệch pha).
- Khó thấy bức tranh toàn cảnh "cluster đang chạy những gì" — phải tổng hợp từ nhiều repo.
- Overhead vận hành cao hơn: mỗi repo cần webhook, CI riêng, `ApplicationSet`/`GitRepository` riêng.

**Bảng quyết định nhanh:**

| Yếu tố | Nghiêng về Mono-repo | Nghiêng về Poly-repo |
|---|---|---|
| Số lượng team/service | Ít (< ~15 service, 1-2 platform team quản lý chung) | Nhiều, mỗi team lớn tự chủ hoàn toàn |
| Yêu cầu cách ly bảo mật | Thấp/trung bình | Cao (compliance, multi-tenant nghiêm ngặt) |
| Tốc độ release độc lập giữa team | Ít quan trọng | Rất quan trọng |
| Chi phí vận hành chấp nhận được | Thấp | Có ngân sách đầu tư platform engineering |

**Giải pháp lai (phổ biến ở scale lớn):** dùng **ApplicationSet của ArgoCD** với pattern **"app of apps"** hoặc `Git generator` để mỗi team vẫn có repo riêng (poly-repo cho code + config chi tiết), nhưng có một **repo trung tâm nhỏ** chỉ chứa danh sách "cluster nào trỏ tới app nào, ở đâu" — kết hợp được cách ly quyền của poly-repo với tầm nhìn tổng thể của mono-repo.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: team-services
spec:
  generators:
    - git:
        repoURL: https://github.com/company/gitops-registry.git
        files:
          - path: "teams/*/apps.yaml"   # mỗi team khai báo repo riêng của họ
  template:
    metadata:
      name: '{{.name}}'
    spec:
      source:
        repoURL: '{{.repoURL}}'   # trỏ tới poly-repo của từng team
```

**Pitfall:** chuyển từ mono sang poly-repo (hoặc ngược lại) giữa chừng khi tổ chức đã lớn là một cuộc migration tốn kém — nên quyết định sớm dựa trên **quy mô đội ngũ dự kiến trong 1-2 năm tới**, không chỉ nhìn hiện trạng.

## Detailed Answer (EN)
This is a major architectural decision affecting security, operational speed, and organizational scalability as the number of services grows.

### Mono-repo GitOps
```
gitops-config/
  apps/
    order-service/{dev,staging,prod}/
    payment-service/{dev,staging,prod}/
    notification-service/{dev,staging,prod}/
  clusters/
    prod-cluster/apps.yaml   # ArgoCD ApplicationSet pointing into apps/*
```
**Pros:**
- **Global visibility**: a single PR can change multiple related services at once (e.g. updating a shared ConfigMap), making cross-cutting impact easy to review.
- Easy to enforce common policies (policy-as-code, CI validation) across the whole cluster in one place.
- Less operational overhead — no need to sync permissions/webhooks across dozens of repos.

**Cons:**
- **Hard to split RBAC finely**: Team A could accidentally (or deliberately) view/edit Team B's config without strict CODEOWNERS + path-based branch protection.
- The repo grows with the number of services → slower clones, whole-repo CI validation gets expensive if not optimized (path-based triggers).
- One broken PR/CI can block merges for every other team at once.

### Poly-repo GitOps
```
gitops-order-service/     # separate repo, fully owned by the Order team
gitops-payment-service/   # separate repo, fully owned by the Payment team
```
**Pros:**
- **Clear access isolation**: each team fully controls its own repo, simple RBAC (permissions at the repo level, no path-based rules needed).
- Smaller blast radius during a CI failure/config error — affects only one repo/service.
- Teams control their own release speed, not blocked by other teams' changes.

**Cons:**
- Hard to enforce policies uniformly (must sync across dozens of repos, easy for them to drift apart).
- Hard to see the big picture of "what's running in the cluster" — must aggregate from many repos.
- Higher operational overhead: each repo needs its own webhook, CI, `ApplicationSet`/`GitRepository`.

**Quick decision table:**

| Factor | Leans mono-repo | Leans poly-repo |
|---|---|---|
| Number of teams/services | Few (< ~15 services, 1-2 platform teams manage together) | Many, each large team fully autonomous |
| Security isolation requirements | Low/medium | High (compliance, strict multi-tenancy) |
| Independent release speed between teams | Less critical | Very critical |
| Acceptable operational cost | Low | Budget available for platform engineering investment |

**A hybrid solution (common at larger scale):** use ArgoCD's **ApplicationSet** with an **"app of apps"** pattern or a `Git generator` so each team still has its own repo (poly-repo for detailed code + config), but a **small central registry repo** holds only "which cluster points to which app, where" — combining poly-repo's access isolation with mono-repo's overall visibility.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: team-services
spec:
  generators:
    - git:
        repoURL: https://github.com/company/gitops-registry.git
        files:
          - path: "teams/*/apps.yaml"   # each team declares its own repo
  template:
    metadata:
      name: '{{.name}}'
    spec:
      source:
        repoURL: '{{.repoURL}}'   # points to each team's poly-repo
```

**Pitfall:** switching from mono to poly-repo (or vice versa) midway once the organization has grown large is a costly migration — decide early based on the **expected team scale over the next 1-2 years**, not just the current state.
