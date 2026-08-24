---
id: quiz-security-hsts-strict-transport-security-co-tac-dung-gi
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HSTS (Strict-Transport-Security) có tác dụng gì?

## Đáp án trắc nghiệm
- [ ] Mã hoá dữ liệu mạnh hơn so với HTTPS thông thường
- [ ] Chuyển hướng request HTTP sang HTTPS ở phía server
- [ ] Ngăn chứng chỉ TLS bị thay thế bởi một chứng chỉ giả mạo
- [x] Buộc trình duyệt chỉ dùng HTTPS với domain đó

## Giải thích (VI)
Nói với trình duyệt: từ giờ chỉ kết nối domain này bằng HTTPS , trong max-age đã khai. Nhờ đó lần sau người dùng gõ http:// thì trình duyệt tự đổi sang HTTPS trước khi gửi, không còn request HTTP để bị chặn giữa đường.

### Giải thích các phương án:
- **Mã hoá dữ liệu mạnh hơn so với HTTPS thông thường** (Sai): HSTS không thay đổi cách mã hoá.
- **Chuyển hướng request HTTP sang HTTPS ở phía server** (Sai): Chuyển hướng do server làm; HSTS hoạt động ở phía trình duyệt.
- **Ngăn chứng chỉ TLS bị thay thế bởi một chứng chỉ giả mạo** (Sai): Đó gần với certificate pinning, một cơ chế khác.
- **Buộc trình duyệt chỉ dùng HTTPS với domain đó** (Đúng): Nhờ đó lần truy cập sau không còn request HTTP nào để bị chặn và chuyển hướng.
