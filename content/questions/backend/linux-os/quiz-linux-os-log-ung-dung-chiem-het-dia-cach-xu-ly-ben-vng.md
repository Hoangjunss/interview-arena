---
id: quiz-linux-os-log-ung-dung-chiem-het-dia-cach-xu-ly-ben-vng
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Log ứng dụng chiếm hết đĩa. Cách xử lý bền vững?

## Đáp án trắc nghiệm
- [ ] Tăng dung lượng đĩa cho máy chủ đó
- [x] Cấu hình logrotate theo kích thước và số bản giữ
- [ ] Giảm mức log xuống chỉ còn ghi lỗi
- [ ] Xoá các tệp log cũ bằng một cron job mỗi đêm

## Giải thích (VI)
logrotate : xoay tệp theo kích thước hoặc thời gian, nén bản cũ, giữ N bản rồi xoá. Quan trọng là nó gửi tín hiệu (hoặc dùng copytruncate) để tiến trình mở lại tệp — xoá bằng tay thì dung lượng không được thu hồi.

### Giải thích các phương án:
- **Tăng dung lượng đĩa cho máy chủ đó** (Sai): Chỉ trì hoãn vấn đề vì log vẫn tăng vô hạn.
- **Cấu hình logrotate theo kích thước và số bản giữ** (Đúng): Xoá tệp log bằng tay không giải phóng dung lượng nếu tiến trình còn giữ fd.
- **Giảm mức log xuống chỉ còn ghi lỗi** (Sai): Giảm được lượng log nhưng mất thông tin cần khi điều tra.
- **Xoá các tệp log cũ bằng một cron job mỗi đêm** (Sai): Xoá tệp đang được mở không thu hồi dung lượng và làm mất tệp ghi tiếp.
