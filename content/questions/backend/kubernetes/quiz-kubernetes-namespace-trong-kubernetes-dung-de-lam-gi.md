---
id: quiz-kubernetes-namespace-trong-kubernetes-dung-de-lam-gi
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Namespace trong Kubernetes dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Nhóm các Node có cùng cấu hình phần cứng
- [ ] Chia cụm thành nhiều mạng vật lý tách rời hoàn toàn
- [ ] Đặt tên miền công khai cho service ra internet
- [x] Chia cụm thành nhiều không gian tên logic để tách tài nguyên

## Giải thích (VI)
Namespace tách tài nguyên trong cùng một cụm thành các không gian logic — tên tài nguyên chỉ cần duy nhất trong namespace. Nó là phạm vi cho RBAC và ResourceQuota. Lưu ý: nó KHÔNG tự cách ly mạng, muốn vậy phải dùng NetworkPolicy.

### Giải thích các phương án:
- **Nhóm các Node có cùng cấu hình phần cứng** (Sai): Phân nhóm Node dùng label và nodeSelector.
- **Chia cụm thành nhiều mạng vật lý tách rời hoàn toàn** (Sai): Mặc định các Pod khác namespace vẫn gọi nhau được; cách ly mạng cần NetworkPolicy.
- **Đặt tên miền công khai cho service ra internet** (Sai): Tên miền công khai do Ingress và DNS bên ngoài đảm nhiệm.
- **Chia cụm thành nhiều không gian tên logic để tách tài nguyên** (Đúng): Namespace là ranh giới logic cho tên, quyền và hạn mức. Nó là phạm vi cho RBAC và cho hạn mức tài nguyên.
