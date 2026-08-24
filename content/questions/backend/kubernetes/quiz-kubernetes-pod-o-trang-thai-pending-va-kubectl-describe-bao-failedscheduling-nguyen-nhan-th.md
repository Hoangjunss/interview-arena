---
id: quiz-kubernetes-pod-o-trang-thai-pending-va-kubectl-describe-bao-failedscheduling-nguyen-nhan-th
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pod ở trạng thái Pending và kubectl describe báo FailedScheduling. Nguyên nhân thường gặp nhất là gì?

## Đáp án trắc nghiệm
- [ ] Service chưa được tạo nên Pod không có địa chỉ
- [ ] Image trong Pod bị lỗi nên không khởi động được
- [x] Không Node nào đủ tài nguyên hoặc thoả ràng buộc của Pod
- [ ] Liveness probe thất bại ngay lần đầu

## Giải thích (VI)
Scheduler không tìm được Node phù hợp. Hai nhóm lý do: thiếu tài nguyên (tổng requests trên Node đã kín) hoặc ràng buộc không thỏa (nodeSelector, affinity, taint, hoặc PVC chưa gắn được). kubectl describe pod ghi rõ lý do cho từng Node bị loại.

### Giải thích các phương án:
- **Service chưa được tạo nên Pod không có địa chỉ** (Sai): Pod chạy độc lập với Service; thiếu Service không chặn việc lập lịch.
- **Image trong Pod bị lỗi nên không khởi động được** (Sai): Lỗi image xảy ra SAU khi đã xếp lên Node, và cho trạng thái ImagePullBackOff.
- **Không Node nào đủ tài nguyên hoặc thoả ràng buộc của Pod** (Đúng): Scheduler cần một Node vừa đủ chỗ theo requests vừa thỏa mọi ràng buộc. Ràng buộc gồm nodeSelector, affinity và taint.
- **Liveness probe thất bại ngay lần đầu** (Sai): Probe chỉ chạy khi container đã khởi động trên một Node.
