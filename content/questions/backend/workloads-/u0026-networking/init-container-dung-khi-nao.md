---
id: init-container-dung-khi-nao
position: backend
technology: workloads-\u0026-networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Init container dùng khi nào?

## Question (EN)
When should init containers be used?

## Đáp án chi tiết (VI)
Init container chạy xong trước app containers. Nó phù hợp chuẩn bị file/config, chờ dependency nội bộ, chạy migration nhẹ có kiểm soát hoặc setup permission cho volume.\
\
Ví dụ:\
```yaml\
initContainers:\
  - name: wait-db\
    image: busybox:1.36\
    command: [\\"sh\\

## Detailed Answer (EN)
An init container runs to completion before app containers. It fits preparing files/config, waiting for internal dependencies, running controlled lightweight migrations or setting up volume permissions.\
\
Example:\
```yaml\
initContainers:\
  - name: wait-db\
    image: busybox:1.36\
    command: [\\"sh\\
