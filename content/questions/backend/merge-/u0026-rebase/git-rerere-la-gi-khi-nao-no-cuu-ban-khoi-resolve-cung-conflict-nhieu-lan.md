---
id: git-rerere-la-gi-khi-nao-no-cuu-ban-khoi-resolve-cung-conflict-nhieu-lan
position: backend
technology: merge-\u0026-rebase
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`git rerere` là gì? Khi nào nó cứu bạn khỏi resolve cùng conflict nhiều lần?

## Question (EN)
What is `git rerere`? When does it save you from resolving the same conflict multiple times?

## Đáp án chi tiết (VI)
**rerere = Reuse Recorded Resolution**: git ghi nhớ cách bạn resolve conflict, và tự động replay resolution đó khi gặp cùng conflict.\
\
**Enable:**\
```bash\
git config --global rerere.enabled true\
```\
\
**Khi nào cứu bạn:**\
\
**Scenario 1 - Long rebase**: feature branch 20 commits, rebase lên main, commit thứ 3 có conflict X. Bạn resolve. Commit thứ 15 có cùng conflict X → rerere tự resolve.\
\
**Scenario 2 - Release branch**: merge release branch vào main mỗi tháng, cùng một config conflict xuất hiện mỗi lần → rerere nhớ, không cần resolve lại.\
\
**Scenario 3 - Topic branches**: nhiều feature branches merge vào integration branch để test, cùng conflict xuất hiện nhiều lần qua ngày → rerere tái dùng resolution.\
\
**Cách hoạt động:**\
```bash\
git rerere diff    # xem resolutions đã ghi nhớ\
git rerere forget  # xóa 1 resolution nếu sai\
```\
\
**Lưu ý**: rerere chỉ hoạt động nếu conflict markers giống hệt nhau (same file, same context lines). Nếu code xung quanh thay đổi, rerere không match được.

## Detailed Answer (EN)
$85
