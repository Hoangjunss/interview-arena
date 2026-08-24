---
id: khi-nao-nen-squash-merge-pr-thay-vi-merge-commit-trade-offs-la-gi
position: backend
technology: commits-\u0026-history
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên squash merge PR thay vì merge commit? Trade-offs là gì?

## Question (EN)
When should you squash merge a PR instead of using a merge commit? What are the trade-offs?

## Đáp án chi tiết (VI)
**3 merge strategies trên GitHub:**\
\
**Merge commit** (`--no-ff`): tạo merge commit, giữ toàn bộ history của branch. `git log --graph` thấy branch structure. Tốt cho: feature branches quan trọng muốn preserve full context.\
\
**Squash merge**: tất cả commits của PR → 1 commit trên main. History linear và clean. Xấu: mất toàn bộ individual commit history của feature.\
\
**Rebase merge**: replay từng commit của PR lên main, không có merge commit. Linear history nhưng giữ commit granularity.\
\
**Nên dùng squash khi**:\
- PR có nhiều WIP/fixup commits không meaningful\
- Team muốn main branch history = one-line-per-feature\
- Semantic release dựa trên commit messages trên main\
\
**Nên dùng merge commit khi**:\
- Branch history có value (nhiều meaningful commits)\
- Muốn `git bisect` hoạt động trên từng small commit\
- Audit trail quan trọng\
\
**Thực tế**: squash merge phổ biến nhất cho application code, merge commit cho library/SDK với semantic versioning chi tiết.

## Detailed Answer (EN)
**3 merge strategies on GitHub:**\
\
**Merge commit** (`--no-ff`): creates a merge commit, preserves the full branch history. `git log --graph` shows branch structure. Good for: important feature branches where full context should be preserved.\
\
**Squash merge**: all PR commits → 1 commit on main. Linear and clean history. Downside: loses all individual commit history for the feature.\
\
**Rebase merge**: replays each PR commit onto main without a merge commit. Linear history but preserves commit granularity.\
\
**Use squash when**:\
- PR has many WIP/fixup commits that are not meaningful\
- Team wants main branch history = one line per feature\
- Semantic release reads commit messages on main\
\
**Use merge commit when**:\
- Branch history has value (many meaningful commits)\
- You want `git bisect` to work on each small commit\
- Audit trail matters\
\
**In practice**: squash merge is most common for application code, merge commit for libraries/SDKs with detailed semantic versioning.
