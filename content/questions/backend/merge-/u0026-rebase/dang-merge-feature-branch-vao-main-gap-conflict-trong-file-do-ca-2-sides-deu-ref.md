---
id: dang-merge-feature-branch-vao-main-gap-conflict-trong-file-do-ca-2-sides-deu-ref
position: backend
technology: merge-\u0026-rebase
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đang merge feature branch vào main, gặp conflict trong file do cả 2 sides đều refactor. Quy trình resolve an toàn?

## Question (EN)
Merging a feature branch into main, you hit a conflict where both sides refactored the same file. What is the safe resolution process?

## Đáp án chi tiết (VI)
**Worst case conflict**: không phải thêm/xóa dòng đơn giản mà là structural refactor — function bị rename, logic được reorganize.\
\
**Quy trình an toàn:**\
\
**1. Hiểu context trước khi resolve:**\
```bash\
git log --oneline main..feature/my-branch   # commits của feature\
git log --oneline feature/my-branch..main   # commits của main\
git diff $(git merge-base HEAD feature/my-branch) feature/my-branch -- src/file.ts\
```\
\
**2. Dùng 3-panel merge tool** — `git mergetool` (trái: ours, phải: theirs, giữa: base — common ancestor, dưới: result). Không resolve bằng tay trong terminal với structural conflict.\
\
**3. Resolve và verify**: `git add src/file.ts`, chạy test cho phần code đó TRƯỚC khi `git merge --continue`.\
\
**4. Sau merge**: review lại diff của merge commit — `git diff main~1..main -- src/file.ts`.\
\
**Nguyên tắc**: khi không chắc, chọn solution bảo toàn logic của cả 2 sides thay vì chọn 1 side. Đừng dùng `-X ours` hay `-X theirs` với structural conflicts.

## Detailed Answer (EN)
**Worst case conflict**: not a simple add/delete but a structural refactor — a function was renamed, logic was reorganized.\
\
**Safe process:**\
\
**1. Understand context before resolving:**\
```bash\
git log --oneline main..feature/my-branch   # commits in feature\
git log --oneline feature/my-branch..main   # commits in main\
git diff $(git merge-base HEAD feature/my-branch) feature/my-branch -- src/file.ts\
```\
\
**2. Use a 3-panel merge tool** — `git mergetool` (left: ours, right: theirs, center: base — the common ancestor, bottom: result). Do not resolve structural conflicts by hand in the terminal.\
\
**3. Resolve and verify**: `git add src/file.ts`, run the tests for that code BEFORE `git merge --continue`.\
\
**4. After the merge**: review the merge commit diff — `git diff main~1..main -- src/file.ts`.\
\
**Principle**: when in doubt, choose a solution that preserves the logic of both sides rather than picking one side. Never use `-X ours` or `-X theirs` for structural conflicts.
