---
id: environment-promotion-strategy
position: devops
technology: gitops-release-mgmt
level: mid
tags: [gitops, release-management, kubernetes]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế một chiến lược promote release qua các môi trường dev → staging → production bằng Git. Có những cách tiếp cận nào và trade-off ra sao?

## Question (EN)
Design a strategy for promoting a release across dev → staging → production environments using Git. What approaches exist and what are the trade-offs?

## Đáp án chi tiết (VI)
Mục tiêu của **environment promotion** trong GitOps: cùng một artifact (image) phải được test qua nhiều môi trường trước khi tới production, và **Git phải ghi lại chính xác version nào đang chạy ở môi trường nào**.

**Ba cách tiếp cận phổ biến:**

### 1. Branch-per-environment
```
branch: dev     -> auto-sync vào cluster dev
branch: staging -> auto-sync vào cluster staging
branch: main    -> sync vào production (có approval gate)
```
Promote = merge branch `dev` → `staging` → `main` (thường qua PR).
- **Ưu điểm**: dễ hiểu, mapping trực quan branch-environment.
- **Nhược điểm**: dễ merge conflict khi nhiều thay đổi song song; lịch sử Git rối vì mỗi merge tạo commit trộn lẫn nhiều thay đổi.

### 2. Directory-per-environment (khuyến nghị phổ biến nhất hiện nay)
```
apps/order-service/
  base/            # manifest chung
  overlays/
    dev/
    staging/
    prod/
```
Promote = copy giá trị (image tag) từ `overlays/staging/kustomization.yaml` sang `overlays/prod/kustomization.yaml` qua PR, cùng branch `main`.
- **Ưu điểm**: một nguồn sự thật duy nhất (`main`), không có branch riêng dễ lệch; diff PR rõ ràng "chỉ đổi tag ở prod".
- **Nhược điểm**: cần kỷ luật để tránh promote nhầm field khác ngoài ý muốn (ví dụ copy nhầm cả resource limits của staging vào prod).

### 3. Repo-per-environment
Mỗi environment có repo GitOps riêng hoàn toàn, promote = pipeline copy file/tạo PR cross-repo.
- **Ưu điểm**: cách ly quyền truy cập rất mạnh (RBAC riêng cho từng repo, ai được approve prod repo).
- **Nhược điểm**: phức tạp vận hành, khó nhìn tổng quan, dễ đồng bộ sai lệch giữa các repo.

**Cơ chế promote tự động phổ biến (kết hợp với directory-per-environment):**
```yaml
# .github/workflows/promote.yml (đơn giản hoá)
on:
  workflow_dispatch:
    inputs:
      target_env: {type: choice, options: [staging, prod]}
jobs:
  promote:
    steps:
      - run: |
          TAG=$(yq '.image.tag' apps/order-service/overlays/staging/values.yaml)
          yq -i ".image.tag = \"$TAG\"" apps/order-service/overlays/${{ inputs.target_env }}/values.yaml
      - run: |
          git commit -am "promote order-service $TAG to ${{ inputs.target_env }}"
          git push
      # Nếu target_env == prod: pipeline chỉ tạo PR, cần approval thủ công thay vì push thẳng
```

**Nguyên tắc quan trọng — "promote artifact, không rebuild":**
Image được build **một lần duy nhất** ở CI (từ commit trên `main` của app-repo), rồi **cùng một image tag** được promote qua dev → staging → prod. Tuyệt đối không build lại image riêng cho từng môi trường — nếu build lại, dù cùng source code, có thể cho ra binary khác (dependency version trôi, timestamp khác) → phá vỡ nguyên tắc "test cái gì, deploy đúng cái đó" (test cái gì thì chạy đúng cái đó ở prod).

**Approval gate theo môi trường:**
- Dev: auto-sync, không cần approval — tối ưu tốc độ feedback.
- Staging: auto-sync nhưng có thể yêu cầu smoke test pass.
- Production: **luôn có approval gate thủ công** (PR review + có thể thêm ArgoCD `manual sync` thay vì automated) — đây là điểm kiểm soát rủi ro cuối cùng trước khi ảnh hưởng khách hàng thật.

**Pitfall:** promote "theo thời gian" (cron tự động promote staging → prod mỗi đêm) mà không gắn với kết quả test/QA sign-off dễ đưa bug ra production đúng lúc không ai theo dõi (ví dụ đêm khuya, cuối tuần).

## Detailed Answer (EN)
The goal of **environment promotion** in GitOps: the same artifact (image) must pass through multiple environments before reaching production, and **Git must accurately record which version is running in which environment**.

**Three common approaches:**

### 1. Branch-per-environment
```
branch: dev     -> auto-syncs into the dev cluster
branch: staging -> auto-syncs into the staging cluster
branch: main    -> syncs into production (with an approval gate)
```
Promotion = merging branch `dev` → `staging` → `main` (usually via PR).
- **Pros**: intuitive, direct branch-environment mapping.
- **Cons**: prone to merge conflicts with parallel changes; Git history gets noisy since each merge mixes multiple changes.

### 2. Directory-per-environment (the most commonly recommended today)
```
apps/order-service/
  base/            # shared manifests
  overlays/
    dev/
    staging/
    prod/
```
Promotion = copying the value (image tag) from `overlays/staging/kustomization.yaml` to `overlays/prod/kustomization.yaml` via a PR, all on `main`.
- **Pros**: a single source of truth (`main`), no separate branches to drift out of sync; PR diffs clearly show "only the prod tag changed."
- **Cons**: requires discipline to avoid accidentally promoting unrelated fields (e.g. accidentally copying staging's resource limits into prod).

### 3. Repo-per-environment
Each environment gets its own fully separate GitOps repo; promotion = a pipeline copying files/opening cross-repo PRs.
- **Pros**: very strong access isolation (separate RBAC per repo, controlling who can approve the prod repo).
- **Cons**: operationally complex, harder to see the big picture, prone to drift between repos.

**A common automated promotion mechanism (paired with directory-per-environment):**
```yaml
# .github/workflows/promote.yml (simplified)
on:
  workflow_dispatch:
    inputs:
      target_env: {type: choice, options: [staging, prod]}
jobs:
  promote:
    steps:
      - run: |
          TAG=$(yq '.image.tag' apps/order-service/overlays/staging/values.yaml)
          yq -i ".image.tag = \"$TAG\"" apps/order-service/overlays/${{ inputs.target_env }}/values.yaml
      - run: |
          git commit -am "promote order-service $TAG to ${{ inputs.target_env }}"
          git push
      # If target_env == prod: the pipeline only opens a PR, requiring manual
      # approval instead of pushing directly
```

**Key principle — "promote the artifact, don't rebuild it":**
The image is built **exactly once** in CI (from a commit on the app-repo's `main`), then the **same image tag** is promoted through dev → staging → prod. Never rebuild a separate image per environment — even from identical source, a rebuild can produce a different binary (dependency drift, different timestamps) → breaking the principle of "what you test is exactly what you deploy."

**Approval gates per environment:**
- Dev: auto-sync, no approval needed — optimizes feedback speed.
- Staging: auto-sync but may require smoke tests to pass first.
- Production: **always has a manual approval gate** (PR review, possibly ArgoCD `manual sync` instead of automated) — the final risk-control checkpoint before affecting real customers.

**Pitfall:** "time-based" promotion (a cron job auto-promoting staging → prod every night) without tying it to test results/QA sign-off can ship a bug to production exactly when no one is watching (e.g. late at night, weekends).
