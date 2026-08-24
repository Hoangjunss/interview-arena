---
id: lam-sao-de-giam-kich-thuoc-docker-image
position: backend
technology: docker
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao để giảm kích thước Docker image?

## Question (EN)
How do you reduce Docker image size?

## Đáp án chi tiết (VI)
- **Base image nhỏ**: dùng `alpine`, `-slim`, hoặc `distroless` thay cho image full OS.\
- **Multi-stage build**: chỉ copy artifact runtime, bỏ toolchain/dev dependency.\
- **Gộp lệnh `RUN`** và dọn cache trong cùng layer (`apt-get ... \u0026\u0026 rm -rf /var/lib/apt/lists/*`) — vì mỗi `RUN` là một layer, xóa ở layer sau không giảm kích thước.\
- **`.dockerignore`**: loại `node_modules`, `.git`, file build khỏi context.\
- Cài **chỉ production dependency** (`npm ci --omit=dev`).\
- Ghim version cụ thể, tránh cài package thừa.\
\
Ít layer + base gọn + không file thừa = image nhỏ, pull/deploy nhanh, bề mặt tấn công thấp.

## Detailed Answer (EN)
- **Small base image**: use `alpine`, `-slim`, or `distroless` instead of a full-OS image.\
- **Multi-stage build**: copy only runtime artifacts, drop the toolchain/dev deps.\
- **Combine `RUN` steps** and clean caches in the same layer (`apt-get ... \u0026\u0026 rm -rf /var/lib/apt/lists/*`) — since each `RUN` is a layer, deleting in a later layer does not shrink the image.\
- **`.dockerignore`**: exclude `node_modules`, `.git`, build files from the context.\
- Install **production dependencies only** (`npm ci --omit=dev`).\
- Pin versions, avoid installing extra packages.\
\
Fewer layers + a lean base + no leftover files = a small image that pulls/deploys fast with a smaller attack surface.
