---
id: quiz-frontend-core-xac-thuc-bang-session-cookie-va-bang-token-jwt-khac-nhau-o-diem-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xác thực bằng session (cookie) và bằng token (JWT) khác nhau ở điểm nào?

## Đáp án trắc nghiệm
- [ ] JWT không thể đặt trong cookie mà bắt buộc nằm ở header
- [x] Session thu hồi được ngay vì trạng thái ở server; JWT khó thu hồi trước hạn
- [ ] JWT an toàn hơn session trong mọi trường hợp vì nội dung của nó đã được ký số
- [ ] Session không dùng được cho ứng dụng chạy trên nhiều máy chủ

## Giải thích (VI)
Với session, server lưu trạng thái phiên và cookie chỉ mang một id — muốn đăng xuất hoặc khoá tài khoản thì xoá phiên là có hiệu lực ngay, nhưng server phải tra cứu mỗi request và cần kho dùng chung khi chạy nhiều máy. Với JWT, thông tin nằm trong token và server chỉ kiểm chữ ký — không cần tra cứu, nhưng token đã phát thì có hiệu lực tới khi hết hạn trừ khi duy trì danh sách vô hiệu.

### Giải thích các phương án:
- **JWT không thể đặt trong cookie mà bắt buộc nằm ở header** (Sai): Hoàn toàn có thể đặt JWT trong cookie HttpOnly.
- **Session thu hồi được ngay vì trạng thái ở server; JWT khó thu hồi trước hạn** (Đúng): Đúng: đánh đổi giữa khả năng thu hồi và việc không cần lưu trạng thái. Cookie phiên chỉ mang một id nên xoá phiên là có hiệu lực ngay; JWT mang trạng thái trong chính token nên server không cần tra cứu, đổi lại không rút lại được trước khi hết hạn.
- **JWT an toàn hơn session trong mọi trường hợp vì nội dung của nó đã được ký số** (Sai): Chữ ký chỉ chống sửa nội dung; nó không giải quyết việc token bị đánh cắp.
- **Session không dùng được cho ứng dụng chạy trên nhiều máy chủ** (Sai): Dùng được khi lưu phiên ở kho dùng chung như Redis.
