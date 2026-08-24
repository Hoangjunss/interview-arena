---
id: rebase-interactive-edit-mode-cho-phep-lam-gi-ma-squash-khong-lam-duoc
position: backend
technology: merge-\u0026-rebase
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rebase interactive: edit mode cho phép làm gì mà squash không làm được?

## Question (EN)
Interactive rebase edit mode: what can it do that squash cannot?

## Đáp án chi tiết (VI)
**`edit` trong interactive rebase** dừng tại 1 commit cụ thể, cho phép bạn amend nó trước khi tiếp tục rebase.\
\
**Những gì `edit` làm được mà squash không:**\
\
**1. Tách 1 commit thành nhiều commits:**\
```bash\
git rebase -i HEAD~3\
# Đánh dấu commit cần tách là: edit abc123\
# Git dừng tại abc123\
git reset HEAD~  # unstage commit, giữ files\
git add src/auth/\
git commit -m \\"feat(auth): add login logic\\"\
git add src/tests/\
git commit -m \\"test(auth): add login tests\\"\
git rebase --continue\
```\
\
**2. Chèn commit mới vào giữa history**: dừng (`edit`) tại commit đứng trước vị trí cần chèn, tạo thay đổi + `git commit` như bình thường, rồi `git rebase --continue`.\
\
**3. Thay đổi nội dung file trong commit cũ** (không chỉ message): dừng tại commit đó, sửa file, `git add` rồi `git commit --amend --no-edit`, tiếp tục rebase.\
\
**Cẩn thận**: edit mode tạo ra commits mới với hash khác → mọi commits phía sau cũng có hash mới → cần force push.

## Detailed Answer (EN)
**`edit` in interactive rebase** pauses at a specific commit, letting you amend it before continuing the rebase.\
\
**What `edit` can do that squash cannot:**\
\
**1. Split one commit into multiple commits:**\
```bash\
git rebase -i HEAD~3\
# Mark the commit to split as: edit abc123\
# Git pauses at abc123\
git reset HEAD~  # unstage the commit, keep the files\
git add src/auth/\
git commit -m \\"feat(auth): add login logic\\"\
git add src/tests/\
git commit -m \\"test(auth): add login tests\\"\
git rebase --continue\
```\
\
**2. Insert a new commit in the middle of history**: pause (`edit`) at the commit before the insertion point, make the change + `git commit` as usual, then `git rebase --continue`.\
\
**3. Change file content in an old commit** (not just the message): pause at that commit, edit files, `git add` then `git commit --amend --no-edit`, continue the rebase.\
\
**Warning**: edit mode creates new commits with different hashes → all subsequent commits also get new hashes → force push required.
