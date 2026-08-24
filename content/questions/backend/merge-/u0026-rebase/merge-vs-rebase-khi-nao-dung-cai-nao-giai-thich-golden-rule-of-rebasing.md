---
id: merge-vs-rebase-khi-nao-dung-cai-nao-giai-thich-golden-rule-of-rebasing
position: backend
technology: merge-\u0026-rebase
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Merge vs Rebase: khi nào dùng cái nào? Giải thích golden rule of rebasing.

## Question (EN)
Merge vs Rebase: when to use which? Explain the golden rule of rebasing.

## Đáp án chi tiết (VI)
**Merge**: tạo merge commit, preserve history đầy đủ. `git log --graph` thấy nhánh. Non-destructive — không thay đổi existing commits.\
\
**Rebase**: replay commits lên đỉnh của branch khác, tạo linear history. Rewrite commit hashes.\
\
**Golden Rule of Rebasing**: **KHÔNG BAO GIỜ rebase branch đã được share/push lên remote mà người khác đang dùng.**\
\
Vì sao: rebase tạo commits MỚI với hash khác. Nếu teammate đã pull branch của bạn, họ có commits với hash cũ. Khi bạn force push sau rebase, history của họ và remote diverge → họ phải resolve \\"fake conflicts\\" khi pull.\
\
**Khi dùng rebase (an toàn):**\
- Trên local feature branch chưa push\
- `git pull --rebase` để sync với remote (thay vì tạo merge commit)\
- Clean up commits trước khi tạo PR: `git rebase -i origin/main`\
\
**Khi dùng merge:**\
- Merge feature branch vào main (qua PR)\
- Tích hợp upstream changes vào long-lived branch của team\
- Khi branch đã được share\
\
**Thực tế**: rebase locally, merge publicly (via PR).

## Detailed Answer (EN)
$88
