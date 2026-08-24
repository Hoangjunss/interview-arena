---
id: quiz-linux-os-free-h-bao-bo-nho-gan-het-nhung-ung-dung-van-chay-tot-vi-sao
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
free -h báo bộ nhớ gần hết nhưng ứng dụng vẫn chạy tốt. Vì sao?

## Đáp án trắc nghiệm
- [x] Phần lớn là page cache, kernel nhả ra khi cần
- [ ] Ứng dụng dùng bộ nhớ ảo nên phần đó không tính vào RAM thật
- [ ] Hệ thống đang dùng swap nên RAM trông đầy
- [ ] free tính cả bộ nhớ của các tiến trình đã kết thúc

## Giải thích (VI)
Phần lớn "đã dùng" là page cache — kernel giữ dữ liệu đĩa trong RAM để đọc nhanh, và nhả ra ngay khi ứng dụng cần. Nhìn cột available thay vì free: RAM rỗi là RAM bị bỏ không.

### Giải thích các phương án:
- **Phần lớn là page cache, kernel nhả ra khi cần** (Đúng): Cột available mới là con số nên theo dõi, không phải free.
- **Ứng dụng dùng bộ nhớ ảo nên phần đó không tính vào RAM thật** (Sai): Bộ nhớ ảo được ánh xạ vào RAM khi thực sự truy cập.
- **Hệ thống đang dùng swap nên RAM trông đầy** (Sai): Swap được báo riêng và dùng swap thì hiệu năng sẽ giảm rõ.
- **free tính cả bộ nhớ của các tiến trình đã kết thúc** (Sai): Tiến trình kết thúc thì bộ nhớ được thu hồi ngay.
