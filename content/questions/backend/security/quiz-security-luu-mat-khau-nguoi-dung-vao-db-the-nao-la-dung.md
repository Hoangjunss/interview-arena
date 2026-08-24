---
id: quiz-security-luu-mat-khau-nguoi-dung-vao-db-the-nao-la-dung
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lưu mật khẩu người dùng vào DB thế nào là đúng?

## Đáp án trắc nghiệm
- [ ] Mã hoá bằng AES với khoá lưu trong biến môi trường
- [x] Băm bằng bcrypt hoặc argon2, salt riêng từng người
- [ ] Băm bằng MD5 nhưng thêm salt dài cho mỗi người dùng
- [ ] Băm bằng SHA-256 kèm một salt cố định của hệ thống

## Giải thích (VI)
bcrypt hoặc argon2 (argon2id nếu chọn mới), mỗi mật khẩu một salt riêng do thư viện tự sinh. Điểm cốt lõi: hàm băm phải chậm có chủ ý — SHA-256 nhanh nên không phù hợp dù có salt.

### Giải thích các phương án:
- **Mã hoá bằng AES với khoá lưu trong biến môi trường** (Sai): Mã hoá là giải mã được, mà mật khẩu thì không cần giải mã bao giờ.
- **Băm bằng bcrypt hoặc argon2, salt riêng từng người** (Đúng): Hàm băm chậm có chủ ý nên tấn công thử hàng loạt trở nên rất đắt.
- **Băm bằng MD5 nhưng thêm salt dài cho mỗi người dùng** (Sai): MD5 vừa nhanh vừa đã bị phá, không dùng cho mật khẩu.
- **Băm bằng SHA-256 kèm một salt cố định của hệ thống** (Sai): SHA-256 quá nhanh nên thử hàng tỉ mật khẩu mỗi giây là khả thi.
