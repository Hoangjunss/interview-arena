---
id: cmd-va-entrypoint-khac-nhau-the-nao
position: backend
technology: images-\u0026-build
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`CMD` và `ENTRYPOINT` khác nhau thế nào?

## Question (EN)
How are `CMD` and `ENTRYPOINT` different?

## Đáp án chi tiết (VI)
`ENTRYPOINT` định nghĩa executable chính của container. `CMD` cung cấp default arguments hoặc command mặc định có thể override khi chạy container. Dùng cùng nhau khi image có một binary chính và cần default args.\
\
Ví dụ:\
```\
ENTRYPOINT [\\"python\\

## Detailed Answer (EN)
`ENTRYPOINT` defines the main executable of the container. `CMD` provides default arguments or a default command that can be overridden at runtime. They work well together when the image has one main binary and default args.\
\
Example:\
```\
ENTRYPOINT [\\"python\\
