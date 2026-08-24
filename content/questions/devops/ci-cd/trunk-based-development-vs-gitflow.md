---
id: trunk-based-development-vs-gitflow
position: devops
technology: ci-cd
level: senior
tags: [branching-strategy, trunk-based-development, gitflow]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh Trunk-based Development và GitFlow. Chiến lược branching nào ảnh hưởng thế nào đến thiết kế CI/CD pipeline?

## Question (EN)
Compare Trunk-based Development and GitFlow. How does each branching strategy shape CI/CD pipeline design?

## Đáp án chi tiết (VI)
Chiến lược branching không chỉ là quy ước Git — nó quyết định **tần suất tích hợp**, **độ phức tạp của merge conflict**, và **kiến trúc pipeline** cần xây dựng.

**GitFlow:**
```
main ← release/1.2 ← develop ← feature/xyz
                   ↖ hotfix/urgent-fix
```
- Nhiều nhánh dài hạn: `develop`, `release/*`, `feature/*`, `hotfix/*`.
- Feature branch sống lâu (nhiều ngày/tuần) trước khi merge vào `develop`.
- Release được cắt thành nhánh riêng, ổn định hóa (bugfix trên chính nhánh release) trước khi merge vào `main`.

**Trunk-based Development (TBD):**
```
main ← feature/xyz (sống ngắn, <1-2 ngày, thường xuyên rebase/merge)
```
- Tất cả dev merge trực tiếp (hoặc gần trực tiếp) vào `main`/`trunk` nhiều lần mỗi ngày.
- Feature branch nếu có thì cực ngắn (giờ, không phải ngày).
- Tính năng lớn chưa hoàn thiện được che bằng **feature flag** thay vì giữ trên branch riêng.

**Ảnh hưởng đến thiết kế CI/CD:**

| Khía cạnh | GitFlow | Trunk-based Development |
|---|---|---|
| **Tần suất chạy CI** | Theo từng nhánh dài hạn, ít lần merge lớn | Chạy liên tục, nhiều lần/ngày trên `main` |
| **Merge conflict** | Lớn và đau đớn — feature branch xa `develop` cả tuần dễ conflict nặng | Nhỏ, thường xuyên, dễ giải quyết vì diff nhỏ |
| **CI phải nhanh cỡ nào** | Có thể chấp nhận chậm hơn vì merge không thường xuyên | BẮT BUỘC phải cực nhanh (dưới 10 phút) vì hàng chục dev merge liên tục — CI chậm sẽ thành nút thắt cổ chai |
| **Continuous Deployment khả thi?** | Khó — code trên `develop` thường chưa release-ready, phải qua nhánh `release/*` ổn định hóa trước | Rất phù hợp — mọi commit trên `main` đều có thể tự động deploy nếu pass pipeline, kết hợp feature flag |
| **Testing** | Test tập trung nhiều vào cuối chu kỳ release (regression trên nhánh release) | Test phải chạy liên tục trên mọi commit; cần test suite đáng tin cậy 100% (không flaky) vì không có giai đoạn "ổn định hóa" riêng |
| **Rollback** | Có nhánh `hotfix` riêng để vá khẩn cấp lên `main` production | Dựa vào feature flag/rollback deploy nhanh, ít cần nhánh hotfix riêng |

**Tại sao TBD phù hợp hơn với CI/CD hiện đại:**
Nguyên lý của Continuous Integration là "tích hợp liên tục, phát hiện conflict sớm". GitFlow với feature branch sống hàng tuần **đi ngược lại tinh thần CI** — về bản chất là "continuous isolation" rồi "big bang integration" cuối kỳ, dẫn đến integration hell. TBD ép buộc tích hợp thường xuyên, giữ pipeline luôn ở trạng thái gần sát production.

**Khi nào GitFlow vẫn hợp lý:**
- Sản phẩm cần hỗ trợ **nhiều phiên bản song song** (ví dụ phần mềm đóng gói bán cho khách hàng on-premise, mỗi khách một version khác nhau, cần patch riêng biệt cho version cũ).
- Team lớn, chưa có văn hóa test tự động đủ mạnh để tự tin merge liên tục vào `main` — cần giai đoạn ổn định hóa thủ công trước release.
- Release theo lịch cố định (quý/tháng) thay vì liên tục, ví dụ do yêu cầu compliance hoặc release note phải duyệt trước.

**Pitfall khi áp dụng TBD mà chưa sẵn sàng:** đội chưa có CI đủ nhanh/đáng tin cậy hoặc chưa quen dùng feature flag mà chuyển thẳng sang TBD sẽ liên tục đẩy code lỗi vào `main`, phá vỡ trạng thái "luôn releasable" — mất hết lợi ích của TBD, còn tệ hơn GitFlow vì không có nhánh cách ly để bảo vệ.

## Detailed Answer (EN)
Branching strategy isn't just a Git convention — it dictates **integration frequency**, **merge conflict complexity**, and the **pipeline architecture** you need to build.

**GitFlow:**
```
main ← release/1.2 ← develop ← feature/xyz
                   ↖ hotfix/urgent-fix
```
- Multiple long-lived branches: `develop`, `release/*`, `feature/*`, `hotfix/*`.
- Feature branches live long (days/weeks) before merging into `develop`.
- Releases are cut into their own branch, stabilized (bugfixes committed directly on the release branch) before merging into `main`.

**Trunk-based Development (TBD):**
```
main ← feature/xyz (short-lived, <1-2 days, frequently rebased/merged)
```
- All developers merge directly (or nearly so) into `main`/`trunk` multiple times a day.
- Feature branches, if used at all, are extremely short (hours, not days).
- Large incomplete features are hidden behind **feature flags** instead of living on a separate branch.

**Impact on CI/CD design:**

| Aspect | GitFlow | Trunk-based Development |
|---|---|---|
| **CI run frequency** | Per long-lived branch, fewer large merges | Continuous, many times a day against `main` |
| **Merge conflicts** | Large and painful — a feature branch a week behind `develop` conflicts heavily | Small, frequent, easy to resolve since diffs are small |
| **How fast must CI be** | Can tolerate being slower since merges are infrequent | MUST be extremely fast (under 10 minutes) since dozens of devs merge continuously — a slow CI becomes a bottleneck |
| **Is Continuous Deployment feasible?** | Hard — code on `develop` usually isn't release-ready, needs a `release/*` stabilization branch first | Very well-suited — every commit on `main` can auto-deploy if it passes the pipeline, combined with feature flags |
| **Testing** | Testing concentrates heavily at the end of the release cycle (regression on the release branch) | Tests must run continuously on every commit; requires a 100% reliable (non-flaky) test suite since there's no separate "stabilization" phase |
| **Rollback** | Has a dedicated `hotfix` branch for urgent patches to production `main` | Relies on feature flags/fast deploy rollback, less need for a separate hotfix branch |

**Why TBD suits modern CI/CD better:**
The core principle of Continuous Integration is "integrate continuously, catch conflicts early". GitFlow's week-long feature branches actually **contradict the spirit of CI** — it's effectively "continuous isolation" followed by a "big bang integration" at cycle end, leading to integration hell. TBD forces frequent integration, keeping the pipeline in a state close to production at all times.

**When GitFlow still makes sense:**
- The product must support **multiple parallel versions** (e.g. packaged on-premise software sold to customers, each on a different version, needing separate patches for old versions).
- A large team without a strong enough automated-testing culture to confidently merge continuously into `main` — needing a manual stabilization phase before release.
- Releases on a fixed schedule (quarterly/monthly) rather than continuously, e.g. due to compliance requirements or release notes needing prior approval.

**Pitfall of adopting TBD before you're ready:** a team without a fast/reliable enough CI, or without feature-flag habits, jumping straight into TBD will continuously push broken code into `main`, destroying the "always releasable" property — losing all of TBD's benefits while being worse than GitFlow, since there's no isolation branch to protect against it.