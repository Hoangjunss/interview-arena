---
id: quiz-system-design-nhan-webhook-tu-cong-thanh-toan-phai-xac-minh-dieu-gi-truoc-khi-xu-ly
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nhận webhook từ cổng thanh toán, phải xác minh điều gì trước khi xử lý?

## Đáp án trắc nghiệm
- [ ] IP nguồn có nằm trong danh sách của nhà cung cấp
- [ ] Số tiền có khớp với đơn hàng tương ứng trong hệ thống của mình
- [ ] User-Agent có đúng tên của nhà cung cấp
- [x] Chữ ký của payload tính bằng secret hai bên chia sẻ

## Giải thích (VI)
Chữ ký (HMAC của raw body với secret). Đây là bước không được bỏ: thiếu nó thì bất kỳ ai biết endpoint đều gửi được request báo "đã thanh toán". Sau khi chữ ký hợp lệ mới đối chiếu số tiền và trạng thái đơn.

### Giải thích các phương án:
- **IP nguồn có nằm trong danh sách của nhà cung cấp** (Sai): Có ích như lớp phụ nhưng IP thay đổi và giả mạo được.
- **Số tiền có khớp với đơn hàng tương ứng trong hệ thống của mình** (Sai): Cần kiểm tra, nhưng phải xác minh chữ ký trước đã.
- **User-Agent có đúng tên của nhà cung cấp** (Sai): Header này client tự khai nên không có giá trị xác thực.
- **Chữ ký của payload tính bằng secret hai bên chia sẻ** (Đúng): Không kiểm chữ ký thì ai cũng gửi được request báo đã thanh toán.
