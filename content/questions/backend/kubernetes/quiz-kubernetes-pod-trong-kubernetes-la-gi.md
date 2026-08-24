---
id: quiz-kubernetes-pod-trong-kubernetes-la-gi
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pod trong Kubernetes là gì?

## Đáp án trắc nghiệm
- [ ] Tên gọi khác của container trong Kubernetes, mỗi Pod luôn đúng một container
- [x] Đơn vị triển khai nhỏ nhất — một hoặc nhiều container dùng chung network namespace
- [ ] Nhóm các Service được gom lại để chia sẻ cấu hình mạng
- [ ] Một máy chủ vật lý hoặc máy ảo trong cụm

## Giải thích (VI)
Pod là đơn vị nhỏ nhất mà Kubernetes lập lịch. Nó bọc một hoặc nhiều container dùng chung IP, cổng và có thể dùng chung volume — nên các container trong cùng Pod gọi nhau bằng localhost. Pod là phù du: chết đi thì được tạo mới với IP khác, không hồi sinh cái cũ.

### Giải thích các phương án:
- **Tên gọi khác của container trong Kubernetes, mỗi Pod luôn đúng một container** (Sai): Đa số Pod có một container, nhưng Pod hỗ trợ nhiều container và đó là điểm khác biệt.
- **Đơn vị triển khai nhỏ nhất — một hoặc nhiều container dùng chung network namespace** (Đúng): Các container trong cùng Pod gọi nhau qua localhost. Pod là đơn vị lập lịch, không phải container đơn lẻ. Các container trong cùng Pod gọi nhau qua localhost và có thể dùng chung volume.
- **Nhóm các Service được gom lại để chia sẻ cấu hình mạng** (Sai): Service là khái niệm khác, nằm ở tầng truy cập mạng.
- **Một máy chủ vật lý hoặc máy ảo trong cụm** (Sai): Đó là Node; Pod chạy TRÊN Node.
