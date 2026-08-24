---
id: atomic-commits-la-gi-tai-sao-1-commit-feat-add-user-auth-fix-navbar-update-deps
position: backend
technology: commits-\u0026-history
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Atomic commits là gì? Tại sao 1 commit \\"feat: add user auth + fix navbar + update deps\\" lại là anti-pattern?

## Question (EN)
What are atomic commits? Why is a commit like \\"feat: add user auth + fix navbar + update deps\\" an anti-pattern?

## Đáp án chi tiết (VI)
**Atomic commit**: mỗi commit chứa MỘT logical change hoàn chỉnh — pass tests độc lập, có thể revert độc lập, message mô tả đủ ý.\
\
**Tại sao commit \\"fat\\" là anti-pattern:**\
\
1. **Revert bị ràng buộc**: cần revert chỉ navbar fix nhưng buộc phải revert cả auth + deps update\
2. **git bisect bị nhiễu**: khi tìm regression, mỗi commit nên là one thing — commit fat khó xác định cái gì gây bug\
3. **Code review khó**: reviewer phải context-switch giữa auth logic, CSS, và package.json\
4. **git blame vô nghĩa**: `blame` trên navbar file thấy commit \\"add user auth\\" → confusing\
\
**Ví dụ tách đúng:**\
```bash\
git add src/auth/     \u0026\u0026 git commit -m \\"feat(auth): implement JWT authentication\\"\
git add src/navbar/   \u0026\u0026 git commit -m \\"fix(navbar): correct mobile menu z-index\\"\
git add package.json  \u0026\u0026 git commit -m \\"chore(deps): upgrade react to 18.3.1\\"\
```\
\
**Trick**: `git add -p` (patch mode) — interactive staging theo từng hunk, không phải toàn bộ file. Cho phép tách 1 file có nhiều thay đổi thành nhiều commits.

## Detailed Answer (EN)
$87
