---
id: vua-commit-nham-message-sai-hoac-quen-file-lam-sao-sua-ma-khong-tao-commit-moi
position: backend
technology: commits-\u0026-history
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vừa commit nhầm (message sai hoặc quên file), làm sao sửa mà không tạo commit mới?

## Question (EN)
You just made a bad commit (wrong message or forgot a file). How do you fix it without creating a new commit?

## Đáp án chi tiết (VI)
**Amend last commit** — chỉ dùng khi commit CHƯA push:\
\
```bash\
# Chỉ sửa message:\
git commit --amend -m \\"feat: correct message here\\"\
\
# Thêm file bị quên:\
git add forgotten-file.ts\
git commit --amend --no-edit  # giữ nguyên message\
\
# Sửa cả file lẫn message:\
git add forgotten-file.ts\
git commit --amend -m \\"feat: complete implementation with tests\\"\
```\
\
**Nếu đã push (chỉ branch của riêng bạn):**\
```bash\
git commit --amend -m \\"corrected message\\"\
git push --force-with-lease origin feature/my-branch\
```\
\
**Lưu ý quan trọng**:\
- `--amend` tạo commit MỚI với hash khác — không phải edit in-place\
- KHÔNG amend commits trên `main`/`develop` hoặc bất kỳ shared branch\
- `--force-with-lease` an toàn hơn `--force` — sẽ fail nếu remote có commits mới mà local chưa có (tránh overwrite người khác)\
- Nếu cần sửa commit cũ hơn (không phải last): dùng `git rebase -i`

## Detailed Answer (EN)
**Amend the last commit** — only when the commit has NOT been pushed:\
\
```bash\
# Only fix the message:\
git commit --amend -m \\"feat: correct message here\\"\
\
# Add a forgotten file:\
git add forgotten-file.ts\
git commit --amend --no-edit  # keep the original message\
\
# Fix both the file and message:\
git add forgotten-file.ts\
git commit --amend -m \\"feat: complete implementation with tests\\"\
```\
\
**If already pushed (your own branch only):**\
```bash\
git commit --amend -m \\"corrected message\\"\
git push --force-with-lease origin feature/my-branch\
```\
\
**Important warnings**:\
- `--amend` creates a NEW commit with a different hash — it does not edit in place\
- NEVER amend commits on `main`/`develop` or any shared branch\
- `--force-with-lease` is safer than `--force` — it fails if remote has new commits that local does not, preventing overwriting others\
- To fix an older commit (not the last one): use `git rebase -i`
