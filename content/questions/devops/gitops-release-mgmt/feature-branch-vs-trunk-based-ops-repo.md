---
id: feature-branch-vs-trunk-based-ops-repo
position: devops
technology: gitops-release-mgmt
level: senior
tags: [gitops, branching-strategy, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đối với GitOps config repo (không phải app repo), nên dùng feature branch hay trunk-based? Phân tích sâu các mô hình và lý do lựa chọn ở quy mô lớn.

## Question (EN)
For a GitOps config repo (as opposed to the app repo), should you use feature branches or trunk-based development? Analyze the models in depth and the reasoning behind choosing one at scale.

## Đáp án chi tiết (VI)
Câu hỏi này hay bị nhầm với branching strategy cho **app repo**, nhưng bản chất khác nhau: config repo không chứa "tính năng đang phát triển dở dang", nó chứa **trạng thái mong muốn của hạ tầng tại một thời điểm** — nên tiêu chí lựa chọn branching cần dựa trên **mô hình mapping branch ↔ environment**, không phải feature lifecycle.

### Mô hình 1: Trunk-based thuần (1 branch `main`, directory-per-environment)
```
main (duy nhất)
  apps/order-service/overlays/{dev,staging,prod}/
```
- **Lý do chọn**: Git history tuyến tính, dễ audit "ai đổi gì ở môi trường nào" bằng cách xem diff trong 1 PR. Không có vấn đề merge conflict giữa các branch môi trường (vì tất cả nằm trên `main`).
- **Trade-off ở quy mô lớn**: khi có hàng trăm service và hàng chục người vận hành đồng thời, `main` trở thành điểm nghẽn — mọi PR (kể cả promote lên prod) đều target cùng 1 branch, dễ xảy ra race condition giữa các PR promote khác nhau nếu không có kỷ luật review chặt.
- Phù hợp nhất khi: tổ chức có **platform team tập trung** kiểm soát toàn bộ promote, số lượng thay đổi/ngày không quá lớn.

### Mô hình 2: Branch-per-environment (feature-branch-like nhưng vai trò khác)
```
branch: dev -> staging -> main(=prod)
```
- Đây **không phải feature branch theo nghĩa app repo** (nơi mỗi branch = 1 tính năng), mà là **environment branch** dài hạn, tồn tại vĩnh viễn — bản chất gần với Git Flow hơn trunk-based.
- **Lý do chọn**: mapping trực quan 1-1 branch-environment giúp CD tool (ArgoCD) cấu hình đơn giản — mỗi Application trỏ tới 1 branch cố định thay vì 1 path trong cùng branch.
- **Trade-off nghiêm trọng ở scale lớn**: merge giữa `staging` → `main` có thể mang theo thay đổi không mong muốn nếu `staging` đã lệch khỏi `main` từ trước (do hotfix trực tiếp vào `main` mà quên backport về `staging`) → **drift giữa các branch** (khác với drift Git-cluster đã biết, đây là drift giữa các phiên bản khai báo). Đây là lỗi kinh điển gây incident "promote nhầm thay đổi cũ" hoặc merge conflict phức tạp giữa nhiều PR promote song song.

### Mô hình 3: Short-lived PR branch cho từng thay đổi, không giữ branch môi trường (khuyến nghị cho scale lớn)
```
main (source of truth cho MỌI environment, phân biệt bằng path)
  + mỗi thay đổi (kể cả promote) là 1 short-lived PR branch, review, merge, xoá
```
- Kết hợp trunk-based (không giữ branch dài hạn) với directory-per-environment.
- **Automation hoá việc "promote"**: bot/pipeline tự tạo PR branch ngắn hạn (`promote/order-service-1.4.2-to-prod`), review nhanh, merge, xoá — tránh vấn đề drift giữa các branch dài hạn của mô hình 2.
- Đây là mô hình được khuyến nghị bởi tài liệu chính thức GitOps (Weaveworks, Argo project) cho tổ chức có nhiều service/team.

**Phân tích sâu — vì sao "feature branch" gần như luôn SAI cho ops/config repo ở quy mô lớn:**
1. Feature branch dài hạn giả định có "công việc đang dang dở cần cách ly" — nhưng thay đổi cấu hình hạ tầng hiếm khi cần cách ly kiểu này; ngược lại, **thời gian một PR config tồn tại càng lâu, rủi ro nó bị lệch khỏi thực tế cluster càng cao** (ai đó đã promote version khác trong lúc PR còn mở).
2. Reconciliation loop của ArgoCD/Flux hoạt động tốt nhất khi Git phản ánh **trạng thái hiện tại**, không phải "trạng thái dự kiến trong tương lai xa" — branch dài hạn phá vỡ giả định này.
3. Với nhiều team cùng promote đồng thời lên cùng 1 environment, short-lived branch + merge nhanh giảm thiểu conflict window so với branch sống nhiều ngày.

**Kết luận cho câu trả lời phỏng vấn senior:** khuyến nghị **trunk-based (mô hình 3)** làm mặc định cho GitOps config repo ở quy mô lớn, chỉ dùng branch-per-environment (mô hình 2) khi tổ chức thực sự cần cách ly RBAC theo branch (một số Git provider cho phép branch protection rule chi tiết hơn path protection) và chấp nhận đánh đổi rủi ro drift giữa branch bằng quy trình sync định kỳ nghiêm ngặt.

## Detailed Answer (EN)
This question is often confused with branching strategy for an **app repo**, but the nature is different: a config repo doesn't hold "half-finished features" — it holds the **desired infrastructure state at a point in time** — so the branching choice should be based on the **branch-to-environment mapping model**, not feature lifecycle.

### Model 1: Pure trunk-based (single `main` branch, directory-per-environment)
```
main (only branch)
  apps/order-service/overlays/{dev,staging,prod}/
```
- **Rationale**: linear Git history, easy to audit "who changed what in which environment" via a single PR's diff. No merge conflicts between environment branches (everything lives on `main`).
- **Trade-off at scale**: with hundreds of services and dozens of concurrent operators, `main` becomes a bottleneck — every PR (including prod promotions) targets the same branch, prone to race conditions between concurrent promotion PRs without strict review discipline.
- Best suited when: the organization has a **centralized platform team** controlling all promotions, and the daily change volume isn't too large.

### Model 2: Branch-per-environment (feature-branch-like but a different role)
```
branch: dev -> staging -> main(=prod)
```
- This is **not a feature branch in the app-repo sense** (where each branch = one feature); it's a long-lived **environment branch** — closer in nature to Git Flow than trunk-based.
- **Rationale**: an intuitive 1:1 branch-environment mapping makes the CD tool's (ArgoCD's) configuration simple — each Application points to a fixed branch instead of a path within the same branch.
- **Serious trade-off at scale**: merging `staging` → `main` can carry unwanted changes if `staging` has already diverged from `main` (e.g. a hotfix went directly to `main` and was never backported to `staging`) → **drift between branches** (distinct from the well-known Git-cluster drift, this is drift between declared versions). This is a classic bug causing "promoted a stale change" incidents or complex merge conflicts across parallel promotion PRs.

### Model 3: Short-lived PR branches per change, no persistent environment branches (recommended at scale)
```
main (source of truth for EVERY environment, distinguished by path)
  + every change (including promotion) is a short-lived PR branch, reviewed, merged, deleted
```
- Combines trunk-based (no persistent long-lived branches) with directory-per-environment.
- **Automates "promotion"**: a bot/pipeline auto-creates a short-lived PR branch (`promote/order-service-1.4.2-to-prod`), quick review, merge, delete — avoiding the branch-drift problem of Model 2.
- This is the model recommended by official GitOps documentation (Weaveworks, the Argo project) for organizations with many services/teams.

**Deep analysis — why "feature branch" is nearly always WRONG for an ops/config repo at scale:**
1. A long-lived feature branch assumes there's "work in progress that needs isolation" — but infrastructure config changes rarely need this kind of isolation; conversely, **the longer a config PR stays open, the higher the risk it drifts from the actual cluster state** (someone else promoted a different version while the PR was still open).
2. ArgoCD/Flux's reconciliation loop works best when Git reflects the **current** state, not "a state planned far in the future" — a long-lived branch breaks this assumption.
3. With multiple teams promoting concurrently to the same environment, short-lived branches with fast merges minimize the conflict window compared to branches living for days.

**Conclusion for a senior interview answer:** recommend **trunk-based (Model 3)** as the default for a GitOps config repo at scale, using branch-per-environment (Model 2) only when the organization genuinely needs branch-level RBAC isolation (some Git providers support finer-grained branch protection rules than path protection), while accepting the branch-drift risk in exchange for a strict periodic sync process.
