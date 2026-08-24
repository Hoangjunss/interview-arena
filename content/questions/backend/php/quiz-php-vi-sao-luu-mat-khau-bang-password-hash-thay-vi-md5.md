---
id: quiz-php-vi-sao-luu-mat-khau-bang-password-hash-thay-vi-md5
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao lưu mật khẩu bằng password hash() thay vì md5()?

## Đáp án trắc nghiệm
- [ ] md5() đã bị loại bỏ khỏi các phiên bản PHP mới
- [x] Thuật toán chậm có salt — chống brute-force và rainbow table
- [ ] password hash() mã hoá hai chiều nên giải mã lại được khi cần
- [ ] md5() không xử lý được mật khẩu dài hoặc có ký tự đặc biệt

## Giải thích (VI)
md5 được thiết kế để nhanh — GPU hiện đại thử hàng tỷ hash mỗi giây, và không có salt nên tra ngược bằng rainbow table rất dễ. password_hash() dùng bcrypt/argon2 : cố tình chậm (cost điều chỉnh được) và tự sinh salt ngẫu nhiên cho từng mật khẩu. Xác thực bằng password_verify().

### Giải thích các phương án:
- **md5() đã bị loại bỏ khỏi các phiên bản PHP mới** (Sai): md5() vẫn tồn tại trong PHP, chỉ là không phù hợp cho mật khẩu.
- **Thuật toán chậm có salt — chống brute-force và rainbow table** (Đúng): bcrypt/argon2 cố tình tốn thời gian tính, và salt làm mỗi hash là duy nhất.
- **password hash() mã hoá hai chiều nên giải mã lại được khi cần** (Sai): Hash mật khẩu phải một chiều; giải mã lại được mới là điều tệ.
- **md5() không xử lý được mật khẩu dài hoặc có ký tự đặc biệt** (Sai): md5() băm được mọi chuỗi; vấn đề nằm ở tốc độ và thiếu salt.
