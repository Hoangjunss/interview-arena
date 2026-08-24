---
id: quiz-docker-docker-compose-dung-de-lam-gi-va-nen-dat-no-o-dau-so-voi-kubernetes
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker Compose dùng để làm gì, và nên đặt nó ở đâu so với Kubernetes?

## Đáp án trắc nghiệm
- [ ] Compose chỉ chạy được đúng một container mỗi lần, muốn nhiều service phải viết nhiều file Compose riêng
- [x] Compose chạy nhiều container bằng một file, hợp cho dev và môi trường nhỏ
- [ ] Compose là một bản Kubernetes thu nhỏ, tự lo scaling, self-healing và rolling update trên cụm nhiều node
- [ ] Compose thay thế hoàn toàn Dockerfile: khai báo service trong Compose là không cần build image nữa

## Giải thích (VI)
Docker Compose mô tả và chạy nhiều container bằng một file cấu hình, thường cho local development, integration test và môi trường nhỏ — giúp app, database, cache, broker chạy cùng network và cấu hình nhất quán. Compose không thay thế Kubernetes cho orchestration production quy mô lớn (scaling, self-healing, rolling update đa node), nhưng rất hữu ích để onboarding dev và mô phỏng dependencies.

### Giải thích các phương án:
- **Compose chỉ chạy được đúng một container mỗi lần, muốn nhiều service phải viết nhiều file Compose riêng** (Sai): Ngược lại: điểm mạnh của Compose là mô tả nhiều service trong một file và chạy chúng cùng nhau.
- **Compose chạy nhiều container bằng một file, hợp cho dev và môi trường nhỏ** (Đúng): Đúng: Compose gọn cho local development, integration test và môi trường nhỏ; orchestration production quy mô lớn (scaling, self-healing) là địa hạt của Kubernetes.
- **Compose là một bản Kubernetes thu nhỏ, tự lo scaling, self-healing và rolling update trên cụm nhiều node** (Sai): Sai — Compose không làm orchestration đa node với self-healing/scaling như Kubernetes; đó không phải mục tiêu của nó.
- **Compose thay thế hoàn toàn Dockerfile: khai báo service trong Compose là không cần build image nữa** (Sai): Sai — Compose điều phối container từ image (có thể build qua Dockerfile), không thay thế bước định nghĩa image bằng Dockerfile.
