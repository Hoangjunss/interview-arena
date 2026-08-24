---
id: branch-bi-xoa-nham-chua-merge-vao-dau-ca-recover-nhu-the-nao
position: backend
technology: recovery-\u0026-time-travel
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Branch bị xóa nhầm, chưa merge vào đâu cả. Recover như thế nào?

## Question (EN)
A branch was accidentally deleted before being merged anywhere. How do you recover it?

## Đáp án chi tiết (VI)
Branch chỉ là pointer đến commit. Xóa branch không xóa commits — chỉ xóa pointer. Commits vẫn tồn tại trong git object store cho đến khi `git gc` chạy.\
\
**Recovery qua reflog:**\
```bash\
git reflog --all | grep \\"feature/deleted-branch\\"\
# abc123 refs/heads/feature/deleted-branch@{0}: commit: feat: last work\
git branch feature/deleted-branch abc123   # recreate branch tại commit đó\
```\
\
- **Không nhớ tên branch**: `git reflog | grep \\"checkout: moving from\\"` — tìm lần cuối bạn checkout khỏi branch đó.\
- **Branch trên remote bị xóa**: `git fetch origin` nếu remote còn lưu, hoặc hỏi teammate — họ có thể còn local copy.\
- **Đã `git gc` chạy**: `git fsck --lost-found` liệt kê dangling commits (không còn ref nào trỏ đến) vào `.git/lost-found/commit/` — duyệt từng sha bằng `git log --oneline -1 \u003csha\u003e`.\
\
**Phòng tránh:** trước khi xóa branch, push lên remote hoặc tag commit cuối: `git tag backup/feature-before-delete \u003cbranch\u003e`.

## Detailed Answer (EN)
A branch is just a pointer to a commit. Deleting a branch does not delete commits — only the pointer. Commits still exist in the git object store until `git gc` runs.\
\
**Recovery via reflog:**\
```bash\
git reflog --all | grep \\"feature/deleted-branch\\"\
# abc123 refs/heads/feature/deleted-branch@{0}: commit: feat: last work\
git branch feature/deleted-branch abc123   # recreate the branch at that commit\
```\
\
- **Forgot the branch name**: `git reflog | grep \\"checkout: moving from\\"` — find the last time you switched away from it.\
- **Remote branch deleted**: `git fetch origin` if the remote still has it, or ask a teammate — they may have a local copy.\
- **`git gc` already ran**: `git fsck --lost-found` lists dangling commits (no ref points to them) into `.git/lost-found/commit/` — inspect each sha with `git log --oneline -1 \u003csha\u003e`.\
\
**Prevention:** before deleting a branch, push to remote or tag the last commit: `git tag backup/feature-before-delete \u003cbranch\u003e`.
