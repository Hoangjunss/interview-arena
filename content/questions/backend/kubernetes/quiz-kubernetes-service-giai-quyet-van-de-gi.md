---
id: quiz-kubernetes-service-giai-quyet-van-de-gi
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service giải quyết vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Nó khởi động lại Pod khi Pod bị lỗi
- [x] Cho một nhóm Pod địa chỉ và tên DNS ổn định
- [ ] Nó giới hạn số request mỗi giây tới ứng dụng
- [ ] Nó cấp phát ổ đĩa cho Pod dùng chung

## Giải thích (VI)
Pod có IP thay đổi mỗi lần tạo lại, nên không thể gọi trực tiếp. Service cho nhóm Pod (chọn qua label) một IP ảo và tên DNS cố định, rồi phân tải các request tới những Pod đang sẵn sàng.

### Giải thích các phương án:
- **Nó khởi động lại Pod khi Pod bị lỗi** (Sai): Đó là việc của Deployment/ReplicaSet.
- **Cho một nhóm Pod địa chỉ và tên DNS ổn định** (Đúng): Service là lớp trừu tượng ổn định đứng trước tập Pod luôn biến động. Đồng thời phân tải giữa các Pod phía sau.
- **Nó giới hạn số request mỗi giây tới ứng dụng** (Sai): Giới hạn tốc độ nằm ở Ingress controller hoặc service mesh, không phải ở Service.
- **Nó cấp phát ổ đĩa cho Pod dùng chung** (Sai): Lưu trữ thuộc về PersistentVolume.
