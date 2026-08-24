---
id: file-da-lo-commit-vd-node-modules-file-log-them-vao-gitignore-roi-ma-git-van-tra
position: backend
technology: commits-\u0026-history
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File đã lỡ commit (vd `node_modules/`, file log) — thêm vào `.gitignore` rồi mà git vẫn track. Xử lý thế nào?

## Question (EN)
A file was committed by mistake (e.g. `node_modules/`, a log file) — you added it to `.gitignore` but git still tracks it. How do you fix it?

## Đáp án chi tiết (VI)
`.gitignore` chỉ có tác dụng với file **chưa được track**. File đã commit thì git tiếp tục track bất kể `.gitignore` — phải gỡ khỏi index:\
\
```bash\
# Gỡ khỏi git nhưng GIỮ file trên disk (--cached):\
git rm -r --cached node_modules/\
git rm --cached debug.log\
\
# Đảm bảo pattern đã có trong .gitignore:\
echo \\"node_modules/\\" \u003e\u003e .gitignore\
echo \\"*.log\\" \u003e\u003e .gitignore\
\
git add .gitignore\
git commit -m \\"chore: stop tracking node_modules and log files\\"\
```\
\
**Lưu ý:**\
- Thiếu `--cached` → `git rm` xóa luôn file thật trên disk\
- File vẫn nằm trong **history cũ** — nếu là secret/credentials thì chưa đủ: phải rotate credentials + rewrite history (`git filter-repo`)\
- Teammate pull về sẽ thấy file bị gỡ khỏi index của họ — file trên disk của họ giữ nguyên (thành untracked)

## Detailed Answer (EN)
`.gitignore` only affects files that are **not yet tracked**. Once a file is committed, git keeps tracking it regardless of `.gitignore` — you must remove it from the index:\
\
```bash\
# Remove from git but KEEP the file on disk (--cached):\
git rm -r --cached node_modules/\
git rm --cached debug.log\
\
# Make sure the pattern is in .gitignore:\
echo \\"node_modules/\\" \u003e\u003e .gitignore\
echo \\"*.log\\" \u003e\u003e .gitignore\
\
git add .gitignore\
git commit -m \\"chore: stop tracking node_modules and log files\\"\
```\
\
**Warnings:**\
- Without `--cached`, `git rm` deletes the actual file from disk\
- The file still exists in **old history** — for secrets/credentials this is not enough: rotate the credentials + rewrite history (`git filter-repo`)\
- When teammates pull, the file is removed from their index — their copy on disk stays (becomes untracked)
