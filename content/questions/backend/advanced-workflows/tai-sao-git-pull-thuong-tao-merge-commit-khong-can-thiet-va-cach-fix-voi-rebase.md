---
id: tai-sao-git-pull-thuong-tao-merge-commit-khong-can-thiet-va-cach-fix-voi-rebase
position: backend
technology: advanced-workflows
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao `git pull` thường tạo merge commit không cần thiết và cách fix với `--rebase`?

## Question (EN)
Why does `git pull` often create unnecessary merge commits and how do you fix it with `--rebase`?

## Đáp án chi tiết (VI)
**Vấn đề**: bạn có local commits chưa push. Teammate đã push lên remote. `git pull` = `git fetch` + `git merge` → tạo merge commit \\"Merge branch 'main' of github.com/...\\" không mang thông tin gì, `git log --graph` đầy những vòng merge vô nghĩa.\
\
**Fix: dùng rebase khi pull:**\
```bash\
git pull --rebase origin main         # = fetch + rebase → history linear\
git config --global pull.rebase true  # set làm default\
```\
\
**Nếu gặp conflict giữa chừng**: resolve file → `git add` → `git rebase --continue`; hoặc `git rebase --abort` để về trạng thái trước pull.\
\
**Khi nào dùng `git pull` (merge) thay vì rebase:**\
- Branch đã có merge commits quan trọng (merge commit là intentional)\
- Long-lived feature branch muốn preserve merge history\
\
**Tip**: `git pull --rebase --autostash` tự động stash local changes trước khi rebase, unstash sau.

## Detailed Answer (EN)
**Problem**: you have local unpushed commits. A teammate has pushed to remote. `git pull` = `git fetch` + `git merge` → creates a \\"Merge branch 'main' of github.com/...\\" commit that carries no information, and `git log --graph` fills with meaningless merge loops.\
\
**Fix: rebase on pull:**\
```bash\
git pull --rebase origin main         # = fetch + rebase → linear history\
git config --global pull.rebase true  # set as default\
```\
\
**If a conflict appears mid-way**: resolve the file → `git add` → `git rebase --continue`; or `git rebase --abort` to return to the pre-pull state.\
\
**When to use `git pull` (merge) instead of rebase:**\
- Branch has intentional merge commits that should be preserved\
- Long-lived feature branch where merge history is meaningful\
\
**Tip**: `git pull --rebase --autostash` automatically stashes local changes before rebasing and unstashes them after.
