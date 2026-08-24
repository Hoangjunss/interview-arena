---
id: trunk-based-development-basics
position: devops
technology: gitops-release-mgmt
level: junior
tags: [git, branching-strategy, ci-cd]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trunk-based development là gì? So sánh nhanh với Git Flow.

## Question (EN)
What is trunk-based development? Give a quick comparison with Git Flow.

## Đáp án chi tiết (VI)
**Trunk-based development (TBD)** là chiến lược branching trong đó **tất cả developer commit trực tiếp (hoặc qua short-lived branch) vào một nhánh chính duy nhất** (`main`/`trunk`), với tần suất merge cao (thường ít nhất 1 lần/ngày), tránh các long-lived feature branch.

**Đặc điểm chính:**
- Feature branch (nếu có) chỉ sống **vài giờ đến 1-2 ngày**, merge nhanh qua PR nhỏ.
- Tính năng chưa hoàn thiện được ẩn bằng **feature flag** thay vì để trên branch riêng chờ "đủ lớn" mới merge.
- `main` luôn ở trạng thái **deployable** (CI phải pass 100% trên `main`).

**So sánh với Git Flow:**

| | Git Flow | Trunk-based |
|---|---|---|
| Branch chính | `develop` + `main`, cộng `feature/*`, `release/*`, `hotfix/*` | Chỉ `main`, branch ngắn hạn nếu cần |
| Vòng đời branch | Feature branch có thể sống nhiều tuần | Vài giờ - vài ngày |
| Tích hợp tính năng dở dang | Giữ trên branch riêng | Feature flag, merge liên tục |
| Độ phức tạp merge | Cao (merge conflict lớn do gộp trễ) | Thấp (merge nhỏ, thường xuyên) |
| Phù hợp | Release theo lịch cố định, team lớn ít phối hợp CI | Continuous Delivery, team làm CI/CD mạnh |
| Rollback | Revert trên `release/*` branch | `git revert` trên `main`, hoặc tắt feature flag |

**Ví dụ workflow TBD:**
```bash
git checkout main && git pull
git checkout -b fix/order-race-condition
# code nhỏ, commit trong vài giờ
git push origin fix/order-race-condition
# mở PR, CI chạy test, review nhanh, merge trong ngày
git checkout main && git branch -d fix/order-race-condition
```

**Liên hệ với GitOps/Release Management:**
- TBD phù hợp tự nhiên với GitOps vì `main` của **app repo** luôn deployable, CI build image liên tục từ `main`, và **config repo** promote version qua các môi trường (dev auto-sync từ mỗi merge, staging/prod theo tag hoặc approval).
- Với ops/config repo, một số team vẫn cân nhắc thêm nhánh theo môi trường (`env/staging`, `env/prod`) — đây là biến thể riêng, không hẳn TBD thuần tuý (xem thêm câu hỏi so sánh feature-branch vs trunk-based cho ops repo).

**Pitfall:** áp dụng TBD mà không có **test coverage và CI đủ mạnh** sẽ khiến `main` thường xuyên bị breaking — TBD đòi hỏi kỷ luật cao: test tự động, feature flag, và văn hoá "fix ngay khi CI đỏ".

## Detailed Answer (EN)
**Trunk-based development (TBD)** is a branching strategy where **all developers commit directly (or via short-lived branches) into a single mainline** (`main`/`trunk`), merging frequently (typically at least once a day), avoiding long-lived feature branches.

**Key traits:**
- Feature branches (if used) live only **hours to 1-2 days**, merged quickly via small PRs.
- Incomplete features are hidden behind **feature flags** rather than kept on a separate branch until "big enough" to merge.
- `main` is always in a **deployable** state (CI must pass 100% on `main`).

**Comparison with Git Flow:**

| | Git Flow | Trunk-based |
|---|---|---|
| Main branches | `develop` + `main`, plus `feature/*`, `release/*`, `hotfix/*` | Only `main`, short-lived branches when needed |
| Branch lifespan | Feature branches can live for weeks | Hours to a few days |
| Integrating unfinished work | Kept on its own branch | Feature flags, continuous merging |
| Merge complexity | High (large merge conflicts from delayed integration) | Low (small, frequent merges) |
| Best fit | Fixed-schedule releases, large teams with weaker CI discipline | Continuous Delivery, teams with strong CI/CD |
| Rollback | Revert on the `release/*` branch | `git revert` on `main`, or toggle off the feature flag |

**Example TBD workflow:**
```bash
git checkout main && git pull
git checkout -b fix/order-race-condition
# small change, committed within hours
git push origin fix/order-race-condition
# open a PR, CI runs tests, quick review, merged same day
git checkout main && git branch -d fix/order-race-condition
```

**Connection to GitOps/Release Management:**
- TBD fits naturally with GitOps because the **app repo's** `main` is always deployable, CI continuously builds images from `main`, and the **config repo** promotes versions across environments (dev auto-syncs on every merge; staging/prod gated by tags or approval).
- For the ops/config repo, some teams still add environment branches (`env/staging`, `env/prod`) — a distinct variant, not strictly pure TBD (see the feature-branch vs trunk-based comparison question for ops repos).

**Pitfall:** adopting TBD without **strong test coverage and CI** causes `main` to break frequently — TBD demands strong discipline: automated tests, feature flags, and a culture of "fix immediately when CI turns red."
