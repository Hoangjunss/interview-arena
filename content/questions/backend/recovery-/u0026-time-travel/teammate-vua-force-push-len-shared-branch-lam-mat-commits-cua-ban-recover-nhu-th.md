---
id: teammate-vua-force-push-len-shared-branch-lam-mat-commits-cua-ban-recover-nhu-th
position: backend
technology: recovery-\u0026-time-travel
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Teammate vừa force push lên shared branch làm mất commits của bạn. Recover như thế nào?

## Question (EN)
A teammate just force-pushed to a shared branch, losing your commits. How do you recover?

## Đáp án chi tiết (VI)
**Tình huống**: bạn có commits ABC trên branch, teammate force push → remote history khác, commits của bạn \\"mất\\" trên remote.\
\
**Recovery (nếu bạn chưa pull):** commits của bạn vẫn còn nguyên trong local repo — chỉ cần replay chúng lên history mới của remote:\
```bash\
git fetch origin\
git rebase origin/feature/shared  # replay commits của bạn lên history mới\
# Resolve conflicts nếu có\
git push origin feature/shared\
```\
Đừng force push ngược lại để \\"đòi\\" history cũ — sẽ mất luôn work teammate vừa push.\
\
**Nếu bạn đã pull (local bị overwrite):**\
```bash\
git reflog  # tìm commit trước khi pull\
# Ví dụ: abc123 HEAD@{3}: commit: feat: my work\
git cherry-pick abc123  # recover commit\
```\
\
**Nếu teammate force push tới main:** không recover bằng force push ngược lại (sẽ mất work của teammate). Coordinate với team, dùng `git cherry-pick` để apply lại commits bị mất lên main mới.\
\
**Phòng tránh**: enable `--force-with-lease` và branch protection cho shared branches.

## Detailed Answer (EN)
$83
