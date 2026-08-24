---
id: polyrepo-vs-monorepo-git-workflow-khac-nhau-nhu-the-nao-va-khi-nao-nen-migrate
position: backend
technology: workflow-\u0026-branching
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Polyrepo vs Monorepo: git workflow khác nhau như thế nào và khi nào nên migrate?

## Question (EN)
Polyrepo vs Monorepo: how do git workflows differ and when should you migrate?

## Đáp án chi tiết (VI)
**Polyrepo**: mỗi service/app có repo riêng. Branching đơn giản hơn, CI riêng biệt, team độc lập. Nhược điểm: cross-repo changes phức tạp (cần coordinate nhiều PRs), version hell khi shared library update, hard để làm atomic change spanning nhiều services.\
\
**Monorepo**: tất cả code trong 1 repo. Atomic changes, single source of truth cho shared code, dễ refactor cross-cutting concerns. Nhược điểm: CI chậm hơn, cần tooling (Nx, Turborepo), git clone lớn.\
\
**Git workflow differences**:\
- Polyrepo: mỗi repo có branch protection, deploy pipeline riêng\
- Monorepo: cần scoped CI (`nx affected`), CODEOWNERS phân quyền theo path, tag versioning phức tạp hơn\
\
**Khi nên migrate sang Monorepo**: thường xuyên cần thay đổi shared library và update consumers đồng thời, khó maintain consistency (linting, tsconfig, deps) across repos, cross-repo PR coordination tốn \u003e2 giờ/sprint.\
\
**Migration**: không phải \\"big bang\\" — dùng git subtree để import history, giữ polyrepo cũ read-only.

## Detailed Answer (EN)
$89
