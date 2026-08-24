---
id: quiz-security-form-dang-nhap-nen-phan-hoi-the-nao-khi-email-khong-ton-tai
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Form đăng nhập nên phản hồi thế nào khi email không tồn tại?

## Đáp án trắc nghiệm
- [ ] Trả về mã lỗi 404 để client tự hiển thị thông báo
- [x] Thông báo chung: "email hoặc mật khẩu không đúng"
- [ ] Nói rõ email đó chưa được đăng ký cho người dùng dễ hiểu hơn
- [ ] Chuyển sang trang đăng ký với email đã điền sẵn

## Giải thích (VI)
Thông báo chung cho cả hai trường hợp : "email hoặc mật khẩu không đúng". Phân biệt rõ sẽ thành công cụ dò tài khoản (user enumeration) — kẻ tấn công biết email nào đã đăng ký để tập trung tấn công.

### Giải thích các phương án:
- **Trả về mã lỗi 404 để client tự hiển thị thông báo** (Sai): Vẫn tiết lộ email đó không tồn tại, chỉ theo cách khác.
- **Thông báo chung: "email hoặc mật khẩu không đúng"** (Đúng): Phân biệt hai trường hợp cho phép kẻ tấn công dò ra email nào đã đăng ký.
- **Nói rõ email đó chưa được đăng ký cho người dùng dễ hiểu hơn** (Sai): Tiện cho người dùng nhưng để lộ danh sách tài khoản tồn tại.
- **Chuyển sang trang đăng ký với email đã điền sẵn** (Sai): Trải nghiệm mượt nhưng lộ thông tin tài khoản rõ ràng nhất.
