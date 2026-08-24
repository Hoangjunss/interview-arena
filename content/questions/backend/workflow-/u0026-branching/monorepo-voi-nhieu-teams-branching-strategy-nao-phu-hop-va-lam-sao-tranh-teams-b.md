---
id: monorepo-voi-nhieu-teams-branching-strategy-nao-phu-hop-va-lam-sao-tranh-teams-b
position: backend
technology: workflow-\u0026-branching
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Monorepo với nhiều teams: branching strategy nào phù hợp và làm sao tránh teams block lẫn nhau?

## Question (EN)
Multi-team monorepo: what branching strategy fits and how do you prevent teams from blocking each other?

## Đáp án chi tiết (VI)
Monorepo không thay đổi branching strategy cơ bản nhưng tăng complexity của conflict và CI.\
\
**Recommended: trunk-based + CODEOWNERS + scoped CI**\
\
**CODEOWNERS** (`/.github/CODEOWNERS`): định nghĩa team nào review phần nào:\
```\
/apps/frontend/   @frontend-team\
/apps/backend/    @backend-team\
/packages/shared/ @core-team\
```\
PR chỉ require approval từ owner của file được thay đổi → teams không block nhau.\
\
**Scoped CI**: chỉ chạy test của packages bị ảnh hưởng — dùng `nx affected`, `turborepo --filter`, hoặc `changesets`. Đừng chạy full test suite cho mọi PR.\
\
**Branch per team**: mỗi team có `team/frontend/feature-x` namespace riêng, merge vào main thường xuyên.\
\
**Lưu ý**: shared packages (`/packages/shared`) là bottleneck — thay đổi đây require tất cả teams test. Giải pháp: versioned internal packages với changelogs, không mutate shared package mà không notify.

## Detailed Answer (EN)
Monorepos do not change the fundamental branching strategy but increase conflict and CI complexity.\
\
**Recommended: trunk-based + CODEOWNERS + scoped CI**\
\
**CODEOWNERS** (`/.github/CODEOWNERS`): define which team reviews which area:\
```\
/apps/frontend/   @frontend-team\
/apps/backend/    @backend-team\
/packages/shared/ @core-team\
```\
PRs only require approval from owners of changed files → teams do not block each other.\
\
**Scoped CI**: only run tests for affected packages — use `nx affected`, `turborepo --filter`, or `changesets`. Do not run the full test suite for every PR.\
\
**Team-namespaced branches**: each team uses their own `team/frontend/feature-x` namespace, merging to main frequently.\
\
**Note**: shared packages (`/packages/shared`) become bottlenecks — changes there require all teams to test. Solution: versioned internal packages with changelogs; never mutate shared packages without notifying all consumers.
