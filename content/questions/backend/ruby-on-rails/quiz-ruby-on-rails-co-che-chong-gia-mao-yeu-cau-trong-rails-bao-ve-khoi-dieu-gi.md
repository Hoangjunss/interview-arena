---
id: quiz-ruby-on-rails-co-che-chong-gia-mao-yeu-cau-trong-rails-bao-ve-khoi-dieu-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cơ chế chống giả mạo yêu cầu trong Rails bảo vệ khỏi điều gì?

## Đáp án trắc nghiệm
- [ ] Người dùng gửi dữ liệu không hợp lệ trong biểu mẫu
- [x] Trang khác gửi yêu cầu thay mặt người dùng
- [ ] Kẻ tấn công đoán mật khẩu bằng cách thử liên tục
- [ ] Mã độc được chèn vào nội dung hiển thị

## Giải thích (VI)
Nó ngăn một trang web khác gửi yêu cầu thay mặt người dùng đã đăng nhập . Trình duyệt tự gửi kèm phiên nên server cần một dấu hiệu chứng minh yêu cầu xuất phát từ trang của chính mình.

### Giải thích các phương án:
- **Người dùng gửi dữ liệu không hợp lệ trong biểu mẫu** (Sai): Đó là việc của kiểm tra hợp lệ.
- **Trang khác gửi yêu cầu thay mặt người dùng** (Đúng): Trình duyệt tự gửi kèm phiên đăng nhập nên máy chủ cần bằng chứng yêu cầu xuất phát từ trang của mình.
- **Kẻ tấn công đoán mật khẩu bằng cách thử liên tục** (Sai): Đó là việc của giới hạn tần suất.
- **Mã độc được chèn vào nội dung hiển thị** (Sai): Đó là chèn mã kịch bản, được ngăn bằng cách thoát ký tự khi hiển thị.
