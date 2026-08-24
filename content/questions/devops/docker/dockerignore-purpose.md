---
id: dockerignore-purpose
position: devops
technology: docker
level: junior
tags: [docker, dockerfile, build]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File `.dockerignore` dùng để làm gì? Không có nó thì gây ra vấn đề gì?

## Question (EN)
What is the `.dockerignore` file for? What problems occur without it?

## Đáp án chi tiết (VI)
`.dockerignore` liệt kê các file/thư mục **không được gửi vào build context** khi chạy `docker build`. Cú pháp giống `.gitignore` (glob pattern, `!` để loại trừ ngoại lệ).

**Build context là gì:** khi chạy `docker build .`, Docker CLI **nén toàn bộ thư mục hiện tại** (trừ những gì bị `.dockerignore` loại) và gửi lên Docker daemon trước khi build bắt đầu — kể cả khi Dockerfile chỉ `COPY` một vài file.

**Vấn đề nếu không có `.dockerignore`:**
1. **Build chậm** — nếu thư mục có `node_modules`, `.git`, file build output cũ (`dist/`, `target/`)... toàn bộ bị nén và gửi lên daemon mỗi lần build, dù không dùng tới. Với repo lớn có thể mất hàng chục giây tới vài phút chỉ để "Sending build context to Docker daemon".
2. **Image phình to / lộ thông tin nhạy cảm** — nếu Dockerfile có `COPY . .`, mọi thứ trong context (kể cả `.env`, `.git`, private key, credential file) đều bị copy vào image nếu không bị ignore, dẫn tới **rò rỉ secret khi image được push lên registry**.
3. **Cache bị invalidate không cần thiết** — Docker tính cache dựa trên checksum của file trong context; nếu `.git` hoặc log file thay đổi liên tục mà không bị ignore, layer `COPY . .` sẽ bị cache-miss dù code thực sự không đổi.

Ví dụ `.dockerignore` thực tế cho một dự án Node.js:
```
node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
dist
coverage
*.md
Dockerfile
.dockerignore
.vscode
```

**Edge case:** `.dockerignore` áp dụng ngay cả cho `COPY --from=<stage>` giữa các stage của multi-stage build không? — **Không**, nó chỉ ảnh hưởng tới context gửi lên từ host; COPY giữa các stage đọc từ filesystem của stage trước, không bị `.dockerignore` chi phối.

## Detailed Answer (EN)
`.dockerignore` lists files/directories that should **not be sent as build context** when running `docker build`. Syntax mirrors `.gitignore` (glob patterns, `!` for exceptions).

**What "build context" means:** when you run `docker build .`, the Docker CLI **tars up the entire current directory** (minus anything excluded by `.dockerignore`) and sends it to the Docker daemon before the build even starts — even if the Dockerfile only `COPY`s a few files.

**Problems without `.dockerignore`:**
1. **Slow builds** — if the directory contains `node_modules`, `.git`, stale build output (`dist/`, `target/`)... all of it gets tarred and sent to the daemon on every build, even if unused. On a large repo this can take tens of seconds to minutes just for "Sending build context to Docker daemon".
2. **Bloated images / sensitive data leaks** — if the Dockerfile has `COPY . .`, everything in the context (including `.env`, `.git`, private keys, credential files) gets copied into the image unless ignored, leading to **secret leakage once the image is pushed to a registry**.
3. **Unnecessary cache invalidation** — Docker computes cache based on the checksum of files in the context; if `.git` or a constantly-changing log file isn't ignored, the `COPY . .` layer gets a cache miss even though the actual code hasn't changed.

Real-world `.dockerignore` for a Node.js project:
```
node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
dist
coverage
*.md
Dockerfile
.dockerignore
.vscode
```

**Edge case:** does `.dockerignore` also apply to `COPY --from=<stage>` between stages of a multi-stage build? — **No**, it only affects context sent from the host; COPY between stages reads from the previous stage's filesystem and is unaffected by `.dockerignore`.
