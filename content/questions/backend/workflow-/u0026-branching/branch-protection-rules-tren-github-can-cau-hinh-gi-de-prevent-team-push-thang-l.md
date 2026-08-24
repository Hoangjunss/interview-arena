---
id: branch-protection-rules-tren-github-can-cau-hinh-gi-de-prevent-team-push-thang-l
position: backend
technology: workflow-\u0026-branching
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Branch protection rules trên GitHub: cần cấu hình gì để prevent team push thẳng lên main?

## Question (EN)
Branch protection rules on GitHub: what should you configure to prevent the team from pushing directly to main?

## Đáp án chi tiết (VI)
Vào GitHub repo → Settings → Branches → Add branch protection rule cho `main`:\
\
**Tối thiểu cần bật**:\
- `Require a pull request before merging` — không ai push thẳng\
- `Require approvals` (1-2 reviewers)\
- `Dismiss stale pull request approvals when new commits are pushed` — re-review sau mỗi force push\
- `Require status checks to pass` — CI phải xanh trước khi merge\
- `Require branches to be up to date before merging` — không merge stale branch\
- `Include administrators` — áp dụng cả cho repo owner\
\
**Nâng cao**:\
- `Require signed commits` — GPG/SSH signature bắt buộc\
- `Require linear history` — chỉ cho phép squash/rebase merge (không merge commit)\
- `Restrict who can push to matching branches` — chỉ CI bot được push sau review\
\
**Lưu ý**: `Include administrators` hay bị bỏ quên — không bật thì owner vẫn có thể bypass. Với GitHub Enterprise: dùng ruleset thay vì branch protection — linh hoạt hơn, có thể apply cho pattern nhiều branches.

## Detailed Answer (EN)
Go to GitHub repo → Settings → Branches → Add branch protection rule for `main`:\
\
**Minimum required**:\
- `Require a pull request before merging` — no direct pushes\
- `Require approvals` (1-2 reviewers)\
- `Dismiss stale pull request approvals when new commits are pushed` — re-review after each force push\
- `Require status checks to pass` — CI must be green before merge\
- `Require branches to be up to date before merging` — no stale branch merges\
- `Include administrators` — applies to repo owners too\
\
**Advanced**:\
- `Require signed commits` — GPG/SSH signatures mandatory\
- `Require linear history` — only squash/rebase merges allowed (no merge commits)\
- `Restrict who can push to matching branches` — only the CI bot can push post-review\
\
**Warning**: `Include administrators` is often forgotten — without it, the owner can still bypass all rules. With GitHub Enterprise: use rulesets instead of branch protection — more flexible, can apply to branch name patterns.
