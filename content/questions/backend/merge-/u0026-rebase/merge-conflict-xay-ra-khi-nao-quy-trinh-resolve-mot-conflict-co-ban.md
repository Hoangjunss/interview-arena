---
id: merge-conflict-xay-ra-khi-nao-quy-trinh-resolve-mot-conflict-co-ban
position: backend
technology: merge-\u0026-rebase
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Merge conflict xảy ra khi nào? Quy trình resolve một conflict cơ bản?

## Question (EN)
When does a merge conflict happen? What is the basic process to resolve one?

## Đáp án chi tiết (VI)
Conflict xảy ra khi git không thể tự hợp nhất: **2 branch cùng sửa 1 vùng dòng** của cùng file, hoặc 1 bên xóa file mà bên kia sửa. Git dừng merge và chèn conflict markers vào file:\
\
```\
\u003c\u003c\u003c\u003c\u003c\u003c\u003c HEAD\
const rate = 0.1   // thay đổi của bạn\
=======\
const rate = 0.15  // thay đổi của branch kia\
\u003e\u003e\u003e\u003e\u003e\u003e\u003e feature/pricing\
```\
\
**Quy trình resolve:**\
1. `git status` — xem file nào đang conflict\
2. Mở file, quyết định giữ bên nào (hoặc kết hợp cả hai), **xóa hết markers**\
3. `git add \u003cfile\u003e` — đánh dấu đã resolve\
4. `git merge --continue` (hoặc `git commit`)\
5. Chạy test trước khi push\
\
Muốn hủy giữa chừng: `git merge --abort` — về trạng thái trước merge. Editor như VSCode có nút \\"Accept Current/Incoming/Both\\" giúp resolve trực quan hơn sửa tay.

## Detailed Answer (EN)
A conflict happens when git cannot merge automatically: **both branches changed the same region of lines** in the same file, or one side deleted a file the other side modified. Git pauses the merge and inserts conflict markers into the file:\
\
```\
\u003c\u003c\u003c\u003c\u003c\u003c\u003c HEAD\
const rate = 0.1   // your change\
=======\
const rate = 0.15  // the other branch's change\
\u003e\u003e\u003e\u003e\u003e\u003e\u003e feature/pricing\
```\
\
**Resolution process:**\
1. `git status` — see which files are conflicted\
2. Open the file, decide which side to keep (or combine both), **remove all markers**\
3. `git add \u003cfile\u003e` — mark as resolved\
4. `git merge --continue` (or `git commit`)\
5. Run tests before pushing\
\
To bail out mid-way: `git merge --abort` — returns to the pre-merge state. Editors like VSCode offer \\"Accept Current/Incoming/Both\\" buttons that make resolving more visual than hand-editing.
