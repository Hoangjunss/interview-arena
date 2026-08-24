---
id: 3-way-merge-la-gi-git-tu-dong-resolve-nhu-the-nao-va-khi-nao-phai-manual-resolve
position: backend
technology: merge-\u0026-rebase
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
3-way merge là gì? Git tự động resolve như thế nào và khi nào phải manual resolve?

## Question (EN)
What is a 3-way merge? How does git auto-resolve, and when must you resolve manually?

## Đáp án chi tiết (VI)
**3-way merge**: khi merge 2 branches, git dùng 3 snapshots:\
1. **Base** (common ancestor): commit nơi 2 branches diverge\
2. **Ours** (current branch HEAD)\
3. **Theirs** (branch đang merge vào)\
\
**Git auto-resolve khi**: thay đổi ở 2 branches không chạm cùng vùng code — git lấy thay đổi từ cả hai.\
\
**Conflict xảy ra khi**: cả 2 sides thay đổi cùng dòng, hoặc 1 side delete file mà side kia modify.\
\
**Conflict markers:**\
```\
\u003c\u003c\u003c\u003c\u003c\u003c\u003c HEAD\
console.log(\\"our change\\")\
=======\
console.log(\\"their change\\")\
\u003e\u003e\u003e\u003e\u003e\u003e\u003e feature/login\
```\
\
**Manual resolve**: xóa markers, giữ đúng code, `git add \u003cfile\u003e`, `git merge --continue`.\
\
**Chiến lược merge:**\
```bash\
git merge -X ours feature/login   # ưu tiên our side khi conflict\
git merge -X theirs feature/login  # ưu tiên their side\
# Dùng thận trọng — có thể silently mất code\
```\
\
**Khi nào dùng ours/theirs strategy**: merge release branch về main khi biết chắc 1 side luôn đúng (ví dụ: hotfix đã được test kỹ). Không dùng cho feature merge thông thường.

## Detailed Answer (EN)
$83
