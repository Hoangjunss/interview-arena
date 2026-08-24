---
id: quiz-linux-os-tien-trinh-node-bi-kernel-kill-log-he-thong-ghi-out-of-memory-nguyen-nhan
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tiến trình Node bị kernel kill, log hệ thống ghi "Out of memory". Nguyên nhân?

## Đáp án trắc nghiệm
- [ ] Đĩa hết chỗ nên không ghi được vùng nhớ tạm
- [ ] Node vượt giới hạn heap nên tự thoát ra
- [x] OOM killer chọn tiến trình chiếm nhiều bộ nhớ nhất để kill
- [ ] Có quá nhiều tiến trình con nên vượt giới hạn số tiến trình cho phép

## Giải thích (VI)
OOM killer của kernel: khi RAM và swap đều hết, kernel chọn một tiến trình (thường là cái chiếm nhiều nhất, theo điểm oom_score) để kill nhằm giữ hệ thống sống. Nó không phải lỗi của ứng dụng bị chọn.

### Giải thích các phương án:
- **Đĩa hết chỗ nên không ghi được vùng nhớ tạm** (Sai): Đĩa đầy gây lỗi khác, không kích hoạt OOM killer.
- **Node vượt giới hạn heap nên tự thoát ra** (Sai): Trường hợp đó Node báo lỗi heap out of memory, không phải kernel kill.
- **OOM killer chọn tiến trình chiếm nhiều bộ nhớ nhất để kill** (Đúng): Khi hết RAM và swap, kernel phải kết thúc một tiến trình để hệ thống sống tiếp.
- **Có quá nhiều tiến trình con nên vượt giới hạn số tiến trình cho phép** (Sai): Vượt giới hạn tiến trình báo lỗi fork, không phải OOM.
