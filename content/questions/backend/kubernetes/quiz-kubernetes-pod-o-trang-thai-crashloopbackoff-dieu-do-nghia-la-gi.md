---
id: quiz-kubernetes-pod-o-trang-thai-crashloopbackoff-dieu-do-nghia-la-gi
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pod ở trạng thái CrashLoopBackOff. Điều đó nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Pod đang chờ PersistentVolume được cấp phát
- [x] Container khởi động rồi thoát lặp lại, kubelet chờ lâu dần
- [ ] Không có Node nào đủ tài nguyên để xếp Pod vào
- [ ] Không kéo được image từ registry

## Giải thích (VI)
Container cứ khởi động rồi chết, lặp đi lặp lại. Kubelet tăng dần khoảng chờ giữa các lần thử (10s, 20s, 40s… tới 5 phút). Log của container đang chạy thường rỗng — phải dùng kubectl logs <pod> --previous để đọc log lần chạy vừa chết.

### Giải thích các phương án:
- **Pod đang chờ PersistentVolume được cấp phát** (Sai): Trường hợp đó Pod ở Pending, không phải CrashLoopBackOff.
- **Container khởi động rồi thoát lặp lại, kubelet chờ lâu dần** (Đúng): Cần xem log của lần chạy TRƯỚC (kubectl logs --previous) để biết vì sao nó thoát. "BackOff" chính là khoảng chờ tăng dần sau mỗi lần thất bại liên tiếp. Khoảng chờ giữa các lần thử lại tăng dần theo cấp số nhân.
- **Không có Node nào đủ tài nguyên để xếp Pod vào** (Sai): Đó là trạng thái Pending kèm sự kiện FailedScheduling.
- **Không kéo được image từ registry** (Sai): Đó là ImagePullBackOff, một trạng thái khác.
