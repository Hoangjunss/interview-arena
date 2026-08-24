---
id: quiz-linux-os-chay-mot-tien-trinh-lau-qua-ssh-muon-no-tiep-tuc-sau-khi-ngat-ket-noi-dung-gi
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chạy một tiến trình lâu qua SSH, muốn nó tiếp tục sau khi ngắt kết nối. Dùng gì?

## Đáp án trắc nghiệm
- [ ] Thêm & vào cuối lệnh để chạy ở chế độ nền
- [ ] Chạy với sudo để tiến trình thuộc về root
- [ ] Tăng ClientAliveInterval trong cấu hình của SSH server
- [x] tmux hoặc screen; nohup cho việc đơn giản

## Giải thích (VI)
tmux (hoặc screen) là lựa chọn tốt nhất: tiến trình chạy trong một phiên độc lập, bạn ngắt kết nối rồi gắn lại xem tiếp được. nohup command & đủ cho việc đơn giản không cần xem output tương tác.

### Giải thích các phương án:
- **Thêm & vào cuối lệnh để chạy ở chế độ nền** (Sai): Vẫn thuộc phiên hiện tại nên vẫn nhận SIGHUP khi ngắt kết nối.
- **Chạy với sudo để tiến trình thuộc về root** (Sai): Quyền không ảnh hưởng tới việc tiến trình bị dừng khi phiên đóng.
- **Tăng ClientAliveInterval trong cấu hình của SSH server** (Sai): Giúp giữ kết nối lâu hơn nhưng mất mạng là vẫn mất tiến trình.
- **tmux hoặc screen; nohup cho việc đơn giản** (Đúng): Ngắt SSH sẽ gửi SIGHUP làm tiến trình chạy trực tiếp bị dừng.
