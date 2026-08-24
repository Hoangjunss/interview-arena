---
id: interactive-rebase-lam-sao-dung-squash-fixup-reword-drop-de-clean-up-history-tru
position: backend
technology: commits-\u0026-history
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Interactive rebase: làm sao dùng squash, fixup, reword, drop để clean up history trước khi merge PR?

## Question (EN)
Interactive rebase: how do you use squash, fixup, reword, drop to clean up history before merging a PR?

## Đáp án chi tiết (VI)
Interactive rebase (`git rebase -i`) cho phép edit lịch sử commit local trước khi share.\
\
**Workflow chuẩn trước merge PR:**\
```bash\
git rebase -i HEAD~5  # edit 5 commits gần nhất\
# hoặc\
git rebase -i origin/main  # tất cả commits chưa merge\
```\
\
**Trong editor hiện ra:**\
```\
pick abc123 feat: add user model\
pick def456 fix typo\
pick ghi789 wip: half done\
pick jkl012 fix tests\
pick mno345 final cleanup\
```\
\
**Thay đổi:**\
- `squash` (s): merge commit này vào trước, giữ message\
- `fixup` (f): merge vào trước, BỎ message (dùng cho \\"fix typo\\

## Detailed Answer (EN)
Interactive rebase (`git rebase -i`) lets you edit local commit history before sharing it.\
\
**Standard workflow before merging a PR:**\
```bash\
git rebase -i HEAD~5  # edit last 5 commits\
# or\
git rebase -i origin/main  # all unmerged commits\
```\
\
**The editor shows:**\
```\
pick abc123 feat: add user model\
pick def456 fix typo\
pick ghi789 wip: half done\
pick jkl012 fix tests\
pick mno345 final cleanup\
```\
\
**Commands:**\
- `squash` (s): merge into previous commit, keep message\
- `fixup` (f): merge into previous commit, DISCARD message (for \\"fix typo\\
