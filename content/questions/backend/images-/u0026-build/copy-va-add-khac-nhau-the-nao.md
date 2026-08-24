---
id: copy-va-add-khac-nhau-the-nao
position: backend
technology: images-\u0026-build
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`COPY` và `ADD` khác nhau thế nào?

## Question (EN)
How are `COPY` and `ADD` different?

## Đáp án chi tiết (VI)
`COPY` copy file/folder từ build context vào image. `ADD` cũng copy nhưng có thêm behavior như tự giải nén local tar archives và hỗ trợ URL trong một số trường hợp.\
\
Trong production Dockerfile, ưu tiên `COPY` vì rõ ràng và ít bất ngờ hơn. Chỉ dùng `ADD` khi thật sự cần tính năng đặc biệt của nó, ví dụ giải nén tar local có chủ đích.

## Detailed Answer (EN)
`COPY` copies files or folders from the build context into the image. `ADD` also copies, but has extra behavior such as extracting local tar archives and supporting URLs in some cases.\
\
In production Dockerfiles, prefer `COPY` because it is explicit and less surprising. Use `ADD` only when its extra behavior is intentionally needed, such as extracting a local tar archive.
