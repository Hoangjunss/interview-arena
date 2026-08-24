---
id: phan-biet-image-va-container-trong-docker
position: backend
technology: docker
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt image và container trong Docker?

## Question (EN)
What is the difference between a Docker image and a container?

## Đáp án chi tiết (VI)
- **Image**: gói **chỉ đọc** (read-only) chứa mã, runtime, thư viện và cấu hình — bản thiết kế để chạy ứng dụng. Image gồm nhiều **layer** xếp chồng.\
- **Container**: một **instance đang chạy** của image, thêm một lớp ghi (writable layer) ở trên cùng. Nhiều container có thể tạo từ cùng một image.\
\
Hình dung: image giống **class**, container giống **object** khởi tạo từ class đó. Image nằm trong registry (Docker Hub, ECR); container sống trên host qua Docker Engine.

## Detailed Answer (EN)
- **Image**: a **read-only** package with code, runtime, libraries and config — the blueprint to run an app. An image is a stack of **layers**.\
- **Container**: a **running instance** of an image, adding a writable layer on top. Many containers can start from the same image.\
\
Analogy: an image is like a **class**, a container like an **object** instantiated from it. Images live in a registry (Docker Hub, ECR); containers run on the host via the Docker Engine.
