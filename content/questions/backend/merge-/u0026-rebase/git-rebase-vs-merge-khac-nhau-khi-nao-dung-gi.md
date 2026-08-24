---
id: git-rebase-vs-merge-khac-nhau-khi-nao-dung-gi
position: backend
technology: merge-\u0026-rebase
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Git rebase vs merge khác nhau? Khi nào dùng gì?

## Question (EN)
How are git rebase and merge different? When should you use each?

## Đáp án chi tiết (VI)
Merge: tạo merge commit, giữ history đầy đủ, safe cho shared branches. Rebase: rewrite history thành linear, clean hơn, KHÔNG dùng cho shared branches. Best practice: rebase feature branch lên develop trước khi merge (hoặc squash merge). `git rebase -i` để clean commits.

## Detailed Answer (EN)
Merge: creates a merge commit, preserves full history, safe for shared branches. Rebase: rewrites history to be linear and cleaner — NEVER use on shared branches. Best practice: rebase your feature branch onto develop before merging (or use squash merge). `git rebase -i` for cleaning up commits interactively.
