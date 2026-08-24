---
id: git-fetch-va-git-pull-khac-nhau-nhu-the-nao-khi-nao-chi-nen-fetch
position: backend
technology: merge-\u0026-rebase
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`git fetch` và `git pull` khác nhau như thế nào? Khi nào chỉ nên fetch?

## Question (EN)
What is the difference between `git fetch` and `git pull`? When should you only fetch?

## Đáp án chi tiết (VI)
`git fetch` tải commits/refs mới từ remote về **remote-tracking branches** (`origin/main`) — KHÔNG đụng vào working directory hay local branch. `git pull` = `git fetch` + `git merge` (hoặc + `git rebase` nếu config `pull.rebase`) — tích hợp thẳng vào branch hiện tại.\
\
```bash\
git fetch origin\
git log main..origin/main --oneline  # xem team có gì mới trước khi tích hợp\
git merge origin/main                # tích hợp khi đã sẵn sàng\
```\
\
**Chỉ nên fetch khi**: muốn xem thay đổi trước khi tích hợp (review diff), đang dở việc không muốn working directory bị thay đổi, hoặc script/CI chỉ cần cập nhật refs.\
\
**Pull phù hợp khi**: working directory sạch và bạn muốn cập nhật nhanh. Nên set `git config --global pull.rebase true` để tránh merge commit thừa mỗi lần pull.

## Detailed Answer (EN)
`git fetch` downloads new commits/refs from the remote into **remote-tracking branches** (`origin/main`) — it does NOT touch your working directory or local branch. `git pull` = `git fetch` + `git merge` (or + `git rebase` with `pull.rebase` configured) — it integrates directly into your current branch.\
\
```bash\
git fetch origin\
git log main..origin/main --oneline  # see what the team pushed before integrating\
git merge origin/main                # integrate when ready\
```\
\
**Fetch only when**: you want to inspect changes before integrating (review the diff), you are mid-task and do not want the working directory to change, or a script/CI only needs updated refs.\
\
**Pull fits when**: the working directory is clean and you want a quick update. Set `git config --global pull.rebase true` to avoid a redundant merge commit on every pull.
