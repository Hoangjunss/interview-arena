---
id: dockerignore-quan-trong-the-nao
position: backend
technology: images-\u0026-build
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`.dockerignore` quan trọng thế nào?

## Question (EN)
How important is `.dockerignore`?

## Đáp án chi tiết (VI)
`.dockerignore` loại file khỏi build context trước khi gửi cho Docker builder. Nó giúp build nhanh hơn, cache ổn định hơn và tránh đưa secrets, logs, node_modules local hoặc artifacts lớn vào context.\
\
Nên ignore `.git`, local env files, test output, coverage, build artifacts không cần, dependency folder local và file backup. Nếu build context quá lớn, Dockerfile tốt vẫn có thể build chậm vì builder phải nhận quá nhiều dữ liệu.

## Detailed Answer (EN)
`.dockerignore` excludes files from the build context before it is sent to the Docker builder. It makes builds faster, keeps cache more stable and avoids sending secrets, logs, local dependency folders or large artifacts.\
\
Ignore `.git`, local env files, test output, coverage, unnecessary build artifacts, local dependency folders and backup files. If the build context is huge, even a good Dockerfile can build slowly because the builder receives too much data.
