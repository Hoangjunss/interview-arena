---
id: khi-nao-dung-hash-khi-nao-dung-ma-hoa-cho-vi-du-chon-sai-thi-hau-qua-gi
position: backend
technology: cryptography
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng hash, khi nào dùng mã hoá? Cho ví dụ chọn sai thì hậu quả gì.

## Question (EN)
When do you hash versus encrypt? Give an example of choosing wrong and its consequence.

## Đáp án chi tiết (VI)
Phân biệt bằng **một câu hỏi duy nhất: có cần lấy lại giá trị gốc không?**\
\
- **Hash** — một chiều, không giải ngược được. Dùng khi chỉ cần **so khớp** hoặc **kiểm tra toàn vẹn**: mật khẩu, checksum file, khoá cache.\
- **Mã hoá** — hai chiều, có khoá để giải. Dùng khi **sau này phải đọc lại nội dung**: số CCCD hiển thị lại cho user, access token của bên thứ ba mà server phải dùng để gọi API.\
\
Quan trọng: **không phải hash nào cũng như nhau.** Mật khẩu phải dùng hàm **chậm, có salt** — Argon2id, bcrypt, scrypt. Dùng SHA-256 cho mật khẩu là sai vì nó được thiết kế để chạy nhanh, GPU thử hàng tỉ ứng viên mỗi giây.\
\
**Chọn sai điển hình:**\
- Mã hoá mật khẩu thay vì hash → lộ khoá là lộ toàn bộ mật khẩu ở dạng rõ.\
- Hash số điện thoại rồi mới nhận ra cần gửi SMS → không có đường lấy lại, phải bắt user nhập lại.\
- Hash một tập giá trị hẹp (số điện thoại, email) mà không có secret → attacker hash toàn bộ dải số rồi tra ngược, coi như không mã hoá.

## Detailed Answer (EN)
$88
