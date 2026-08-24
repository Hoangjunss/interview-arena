---
id: dockerfile-layer-cache-hoat-dong-the-nao
position: backend
technology: images-\u0026-build
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dockerfile layer cache hoạt động thế nào?

## Question (EN)
How does Dockerfile layer cache work?

## Đáp án chi tiết (VI)
Mỗi instruction trong Dockerfile tạo layer hoặc metadata step. Docker có thể reuse cache nếu instruction và context liên quan không đổi. Vì vậy thứ tự Dockerfile ảnh hưởng tốc độ build rất nhiều.\
\
Pattern phổ biến: copy lockfile/package metadata trước, install dependencies, sau đó mới copy source. Nếu copy toàn bộ source trước khi install, mỗi thay đổi code nhỏ có thể phá cache dependency.

## Detailed Answer (EN)
Each Dockerfile instruction creates a layer or metadata step. Docker can reuse cache when the instruction and related context have not changed. Dockerfile order therefore strongly affects build speed.\
\
Common pattern: copy lockfiles/package metadata first, install dependencies, then copy source. If the whole source is copied before dependency installation, every small code change can invalidate dependency cache.
