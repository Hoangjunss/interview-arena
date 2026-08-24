---
id: quiz-kubernetes-deployment-khai-bao-image-myapplatest-vi-sao-day-la-lua-chon-te-o-production
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deployment khai báo image: myapp:latest. Vì sao đây là lựa chọn tệ ở production?

## Đáp án trắc nghiệm
- [x] Không biết đang chạy bytes nào, rollback không đáng tin
- [ ] Tag latest làm image tải chậm hơn các tag khác
- [ ] latest bắt buộc phải dùng kèm imagePullPolicy: Never
- [ ] Kubernetes không hỗ trợ tag latest

## Giải thích (VI)
latest là tag di động — nó trỏ vào image nào tùy thời điểm. Hệ quả: không biết production đang chạy gì, rollout undo có thể quay về đúng tag đó nên không đổi gì, và các Pod tạo ở thời điểm khác nhau có thể chạy hai phiên bản khác nhau.

### Giải thích các phương án:
- **Không biết đang chạy bytes nào, rollback không đáng tin** (Đúng): Tag di động phá vỡ tính tái lập, thứ tối quan trọng khi có sự cố. Mỗi Node còn có thể kéo về phiên bản khác nhau tuỳ thời điểm.
- **Tag latest làm image tải chậm hơn các tag khác** (Sai): Tốc độ tải không phụ thuộc tên tag.
- **latest bắt buộc phải dùng kèm imagePullPolicy: Never** (Sai): Không có ràng buộc như vậy.
- **Kubernetes không hỗ trợ tag latest** (Sai): Nó hoạt động bình thường, chỉ là không nên dùng.
