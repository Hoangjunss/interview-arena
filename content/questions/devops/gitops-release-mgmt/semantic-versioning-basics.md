---
id: semantic-versioning-basics
position: devops
technology: gitops-release-mgmt
level: junior
tags: [versioning, release-management]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Semantic Versioning (SemVer) là gì? Khi nào tăng MAJOR, MINOR, PATCH? Cho ví dụ với image tag của một service.

## Question (EN)
What is Semantic Versioning (SemVer)? When should you bump MAJOR, MINOR, and PATCH? Give an example with a service's image tag.

## Đáp án chi tiết (VI)
**Semantic Versioning (SemVer)** là quy ước đặt số phiên bản theo định dạng **`MAJOR.MINOR.PATCH`** (ví dụ `2.4.1`), giúp mọi người (và tool tự động) hiểu được **mức độ ảnh hưởng** của một bản release chỉ bằng cách nhìn số phiên bản.

- **MAJOR** (`X.0.0`): tăng khi có **breaking change** — thay đổi không tương thích ngược (ví dụ đổi API contract, xoá field response, đổi format database).
- **MINOR** (`x.Y.0`): tăng khi **thêm tính năng mới** nhưng vẫn tương thích ngược (backward-compatible).
- **PATCH** (`x.y.Z`): tăng khi **sửa lỗi (bugfix)**, không thêm tính năng, không breaking.

Ngoài ra còn có **pre-release** và **build metadata**:
- `2.0.0-rc.1` — release candidate, chưa chính thức.
- `2.0.0-beta.3+build.20260824` — beta kèm metadata build.

**Ví dụ thực tế với image tag trong GitOps repo:**
```yaml
# apps/order-service/values.yaml
image:
  repository: registry.company.vn/order-service
  tag: "1.4.2"   # PATCH bump: fix lỗi race condition khi tạo order
```
Khi thêm API mới (không phá vỡ client cũ) → `1.5.0`. Khi đổi hoàn toàn schema database và client cũ không dùng được nữa → `2.0.0`.

**Vì sao quan trọng trong GitOps/Release Management:**
- Giúp **rollback chính xác**: biết `1.5.0` an toàn để revert về từ `2.0.0` (không mất tính năng quan trọng) trong khi revert về MAJOR cũ hơn có thể phá vỡ tương thích với các service khác.
- Kết hợp với **changelog tự động** (conventional commits: `feat:`, `fix:`, `BREAKING CHANGE:`) để tool như `semantic-release` tự tính version tiếp theo.
- Trong Kubernetes/Helm, version của chart và version của app (`appVersion`) nên tách biệt: chart version theo SemVer riêng cho thay đổi cấu trúc chart, `appVersion` theo version của ứng dụng.

**Pitfall thường gặp:**
- Dùng tag `latest` cho production — vi phạm nguyên tắc immutable release, rất khó biết chính xác cluster đang chạy version nào, và ArgoCD sẽ không phát hiện thay đổi (vì tag không đổi) → không tự động re-deploy khi image mới được push với cùng tag.
- Không tuân thủ nghiêm ngặt quy tắc → team khác dựa vào version number để quyết định có nâng cấp an toàn hay không, nếu sai quy tắc sẽ gây breaking không lường trước.

## Detailed Answer (EN)
**Semantic Versioning (SemVer)** is a convention for numbering versions in the format **`MAJOR.MINOR.PATCH`** (e.g. `2.4.1`), letting people (and automated tools) understand a release's **impact level** just by reading the version number.

- **MAJOR** (`X.0.0`): bump on a **breaking change** — a backward-incompatible change (e.g. changed API contract, removed a response field, changed database format).
- **MINOR** (`x.Y.0`): bump when **adding a new feature** that remains backward-compatible.
- **PATCH** (`x.y.Z`): bump for a **bugfix** — no new features, nothing breaking.

There's also **pre-release** and **build metadata**:
- `2.0.0-rc.1` — release candidate, not yet official.
- `2.0.0-beta.3+build.20260824` — beta with build metadata.

**Real example with an image tag in a GitOps repo:**
```yaml
# apps/order-service/values.yaml
image:
  repository: registry.company.vn/order-service
  tag: "1.4.2"   # PATCH bump: fixed a race condition when creating orders
```
Adding a new API (without breaking existing clients) → `1.5.0`. Completely changing the database schema so old clients can no longer work → `2.0.0`.

**Why it matters for GitOps/Release Management:**
- Enables **precise rollback**: you know `1.5.0` is safe to revert to from `2.0.0` (no important feature lost), while reverting to an even older MAJOR version could break compatibility with other services.
- Pairs with **automated changelogs** (conventional commits: `feat:`, `fix:`, `BREAKING CHANGE:`) so a tool like `semantic-release` can auto-compute the next version.
- In Kubernetes/Helm, the chart version and the app version (`appVersion`) should be tracked separately: chart version follows its own SemVer for structural chart changes, `appVersion` tracks the application's version.

**Common pitfalls:**
- Using the `latest` tag in production — violates the immutable-release principle, makes it nearly impossible to know exactly which version is running in the cluster, and ArgoCD won't detect a change (since the tag string never changes) → it won't auto-redeploy when a new image is pushed under the same tag.
- Not strictly following the convention — other teams rely on the version number to decide whether an upgrade is safe, and violating the convention causes unforeseen breakage.
