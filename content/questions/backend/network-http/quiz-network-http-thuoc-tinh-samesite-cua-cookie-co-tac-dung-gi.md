---
id: quiz-network-http-thuoc-tinh-samesite-cua-cookie-co-tac-dung-gi
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thuộc tính SameSite của cookie có tác dụng gì?

## Đáp án trắc nghiệm
- [ ] Mã hóa nội dung cookie trước khi lưu
- [x] Hạn chế gửi cookie khi đến từ trang khác
- [ ] Chặn JavaScript đọc giá trị cookie
- [ ] Giới hạn kích thước tối đa của cookie

## Giải thích (VI)
Hạn chế việc gửi cookie khi yêu cầu xuất phát từ trang khác — lớp phòng vệ chính chống CSRF. Strict không gửi trong mọi điều hướng từ ngoài; Lax gửi khi người dùng bấm liên kết dẫn sang; None gửi mọi lúc nhưng bắt buộc phải kèm Secure.

### Giải thích các phương án:
- **Mã hóa nội dung cookie trước khi lưu** (Sai): Không có cơ chế mã hóa nào ở thuộc tính này.
- **Hạn chế gửi cookie khi đến từ trang khác** (Đúng): Đây là lớp phòng vệ chính chống tấn công giả mạo yêu cầu.
- **Chặn JavaScript đọc giá trị cookie** (Sai): Đó là thuộc tính HttpOnly.
- **Giới hạn kích thước tối đa của cookie** (Sai): Kích thước do trình duyệt giới hạn, không phải thuộc tính này.
