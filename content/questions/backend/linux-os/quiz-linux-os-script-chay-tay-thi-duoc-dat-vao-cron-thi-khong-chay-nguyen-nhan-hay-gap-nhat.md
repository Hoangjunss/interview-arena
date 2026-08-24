---
id: quiz-linux-os-script-chay-tay-thi-duoc-dat-vao-cron-thi-khong-chay-nguyen-nhan-hay-gap-nhat
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Script chạy tay thì được, đặt vào cron thì không chạy. Nguyên nhân hay gặp nhất?

## Đáp án trắc nghiệm
- [x] Cron có môi trường tối giản: PATH khác, không nạp profile
- [ ] Cú pháp thời gian trong crontab bị sai định dạng
- [ ] Cron chỉ chạy được script bash chứ không chạy được ngôn ngữ khác
- [ ] Cron không có quyền chạy script của người dùng

## Giải thích (VI)
Môi trường của cron rất tối giản : PATH ngắn, không nạp .bashrc hay .profile, biến môi trường của bạn không có. Nên node hay pnpm gọi được ở terminal lại "command not found" trong cron.

### Giải thích các phương án:
- **Cron có môi trường tối giản: PATH khác, không nạp profile** (Đúng): Lệnh tìm thấy khi chạy tay có thể không nằm trong PATH của cron.
- **Cú pháp thời gian trong crontab bị sai định dạng** (Sai): Xảy ra được nhưng thường phát hiện ngay khi kiểm lại dòng cấu hình.
- **Cron chỉ chạy được script bash chứ không chạy được ngôn ngữ khác** (Sai): Cron chạy được mọi thứ thực thi được.
- **Cron không có quyền chạy script của người dùng** (Sai): Crontab của user chạy với quyền của chính user đó.
