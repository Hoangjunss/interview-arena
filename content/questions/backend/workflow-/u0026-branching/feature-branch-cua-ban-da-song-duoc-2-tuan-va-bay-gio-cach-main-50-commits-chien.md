---
id: feature-branch-cua-ban-da-song-duoc-2-tuan-va-bay-gio-cach-main-50-commits-chien
position: backend
technology: workflow-\u0026-branching
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Feature branch của bạn đã sống được 2 tuần và bây giờ cách main 50 commits. Chiến lược nào để merge mà không gây sự cố nghiêm trọng?

## Question (EN)
Your feature branch has lived 2 weeks and is now 50 commits behind main. What strategy merges it safely?

## Đáp án chi tiết (VI)
Branch sống lâu là nợ kỹ thuật về integration. Quy trình an toàn:\
\
```bash\
git branch backup/feature-before-rebase   # backup trước khi làm gì\
git fetch origin\
git rebase origin/main                    # resolve từng commit → git rebase --continue\
git push --force-with-lease origin feature/my-branch\
```\
\
- Conflict quá nhiều → rebase tới một commit ở giữa của main trước, resolve xong rồi rebase tiếp lên đầu.\
- Dùng `git mergetool` (vimdiff, VSCode, IntelliJ) để visual diff thay vì sửa tay.\
- Sau rebase — chạy full test suite trước khi push.\
\
**Phòng tránh lần sau**: rebase lên main mỗi ngày (hoặc dùng `git fetch \u0026\u0026 git rebase origin/main`), chia feature lớn thành nhiều PR nhỏ, dùng feature flags để merge code chưa hoàn thiện vào main sớm.

## Detailed Answer (EN)
A long-lived branch is integration debt. The safe process:\
\
```bash\
git branch backup/feature-before-rebase   # backup before anything\
git fetch origin\
git rebase origin/main                    # resolve per commit → git rebase --continue\
git push --force-with-lease origin feature/my-branch\
```\
\
- Overwhelming conflicts → rebase to a mid-point commit on main first, resolve, then rebase the rest of the way.\
- Use `git mergetool` (vimdiff, VSCode, IntelliJ) for visual diffing instead of hand-editing.\
- After the rebase — run the full test suite before pushing.\
\
**Prevention**: rebase onto main every day (`git fetch \u0026\u0026 git rebase origin/main`), split large features into multiple small PRs, use feature flags to merge unfinished code into main early.
