---
id: quiz-kubernetes-kubectl-get-pod-ten-va-kubectl-describe-pod-ten-khac-nhau-o-cho-nao
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
kubectl get pod <tên> và kubectl describe pod <tên> khác nhau ở chỗ nào?

## Đáp án trắc nghiệm
- [x] get in trạng thái tóm tắt dạng bảng; describe in chi tiết đầy đủ kèm phần Events
- [ ] get hiển thị log của container, describe thì không
- [ ] get đọc từ Node, describe đọc từ etcd
- [ ] describe chỉ dùng được cho Pod, get dùng cho mọi loại tài nguyên

## Giải thích (VI)
get cho cái nhìn nhanh dạng bảng. describe cho chi tiết cấu hình cộng phần Events — nơi ghi lý do Pod không được lập lịch, image kéo thất bại, probe hỏng. Khi có sự cố, describe gần như luôn là lệnh thứ hai sau get.

### Giải thích các phương án:
- **get in trạng thái tóm tắt dạng bảng; describe in chi tiết đầy đủ kèm phần Events** (Đúng): Nhật ký những gì đã xảy ra với Pod, thứ quan trọng nhất khi chẩn đoán. Phần Events của describe là nơi chứa lý do thất bại.
- **get hiển thị log của container, describe thì không** (Sai): Không lệnh nào in log; đó là việc của kubectl logs.
- **get đọc từ Node, describe đọc từ etcd** (Sai): Cả hai đều hỏi API server.
- **describe chỉ dùng được cho Pod, get dùng cho mọi loại tài nguyên** (Sai): Cả hai đều làm việc với mọi loại tài nguyên.
