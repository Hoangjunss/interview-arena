---
id: volume-va-bind-mount-khac-nhau-the-nao-vi-sao-can-chung
position: backend
technology: docker
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Volume và bind mount khác nhau thế nào? Vì sao cần chúng?

## Question (EN)
How do volumes and bind mounts differ, and why are they needed?

## Đáp án chi tiết (VI)
Container có filesystem **tạm** — xóa container là mất dữ liệu ghi bên trong. Để **giữ dữ liệu (persistent)** và chia sẻ giữa các container, dùng mount.\
\
- **Volume**: do Docker quản lý (lưu trong vùng riêng của Docker). Là cách khuyến nghị cho dữ liệu app (DB, upload). Portable, dễ backup, không phụ thuộc cấu trúc thư mục host.\
- **Bind mount**: gắn một đường dẫn **cụ thể trên host** vào container. Hợp cho **dev** (sync mã nguồn để hot-reload) nhưng gắn chặt với layout của host.\
- **tmpfs**: chỉ nằm trên RAM, mất khi container dừng.\
\
Ghi vào volume/bind mount **không tạo layer image** và tách vòng đời khỏi container.

## Detailed Answer (EN)
A container filesystem is **ephemeral** — deleting the container loses data written inside. To **persist** data and share it between containers, use a mount.\
\
- **Volume**: managed by Docker (stored in Docker's own area). The recommended way for app data (DB, uploads). Portable, easy to back up, independent of host paths.\
- **Bind mount**: maps a **specific host path** into the container. Good for **dev** (sync source for hot-reload) but tied to the host layout.\
- **tmpfs**: lives only in RAM, gone when the container stops.\
\
Writing to a volume/bind mount does **not** create an image layer and decouples data lifecycle from the container.
