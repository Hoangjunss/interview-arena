---
id: quiz-golang-mot-kieu-trong-go-thoa-man-implement-mot-interface-nhu-the-nao
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một kiểu trong Go "thoả mãn" (implement) một interface như thế nào?

## Đáp án trắc nghiệm
- [x] Ngầm định: có đủ method mà interface yêu cầu là thoả mãn
- [ ] Phải kế thừa (extends) từ interface đó
- [ ] Phải đăng ký kiểu với interface lúc chạy (runtime) qua một hàm register
- [ ] Phải khai báo tường minh bằng từ khoá implements như trong Java

## Giải thích (VI)
Trong Go, một kiểu thoả mãn interface một cách ngầm định : chỉ cần nó định nghĩa đủ tất cả method mà interface yêu cầu, không có từ khoá implements hay khai báo liên kết. Trình biên dịch kiểm tra ở compile time. Nhờ vậy interface có thể được định nghĩa ở phía consumer, tách rời khỏi kiểu cụ thể.

### Giải thích các phương án:
- **Ngầm định: có đủ method mà interface yêu cầu là thoả mãn** (Đúng): Go dùng structural typing cho interface: nếu tập method của một kiểu bao gồm mọi method trong interface, kiểu đó thoả mãn interface một cách ngầm định, không cần từ khoá liên kết. Không cần khai báo implements như Java.
- **Phải kế thừa (extends) từ interface đó** (Sai): Go không có kế thừa lớp/interface theo kiểu OOP truyền thống; nó dùng embedding và structural typing, không phải "extends".
- **Phải đăng ký kiểu với interface lúc chạy (runtime) qua một hàm register** (Sai): Không cần đăng ký runtime; trình biên dịch kiểm tra tại compile time xem kiểu có đủ method của interface hay không.
- **Phải khai báo tường minh bằng từ khoá implements như trong Java** (Sai): Go không có từ khoá implements; sự thoả mãn interface là ngầm định dựa trên tập method, không khai báo mối liên kết.
