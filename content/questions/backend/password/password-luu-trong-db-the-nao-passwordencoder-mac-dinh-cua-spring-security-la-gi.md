---
id: password-luu-trong-db-the-nao-passwordencoder-mac-dinh-cua-spring-security-la-gi
position: backend
technology: password
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Password lưu trong DB thế nào? `PasswordEncoder` mặc định của Spring Security là gì và tiền tố `{bcrypt}` để làm gì?

## Question (EN)
How should passwords be stored? What is Spring Security's default `PasswordEncoder`, and what is the `{bcrypt}` prefix for?

## Đáp án chi tiết (VI)
Password **không bao giờ** lưu dạng plaintext, và cũng không dùng hash nhanh (MD5, SHA-256) vì tấn công brute-force bằng GPU quá rẻ. Spring Security dùng **hàm băm chậm có salt**, mặc định là **BCrypt**.\
\
```java\
@Bean\
PasswordEncoder passwordEncoder() {\
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();\
}\
```\
\
Hàm này trả về **`DelegatingPasswordEncoder`** — nó lưu chuỗi hash kèm **tiền tố định danh thuật toán**:\
\
```\
{bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG\
```\
\
Tiền tố `{bcrypt}` cho phép hệ thống **đọc được nhiều thuật toán cùng lúc**: khi cần nâng cấp sang Argon2, bạn chỉ đổi encoder mặc định, các hash `{bcrypt}` cũ vẫn verify được và có thể re-hash dần khi user đăng nhập. Không có tiền tố, việc đổi thuật toán buộc mọi user phải reset password.\
\
BCrypt tự sinh **salt** riêng cho từng password (nằm luôn trong chuỗi hash) nên không cần cột salt. Tham số `strength` mặc định 10; tăng lên khiến verify chậm hơn, tuning sao cho một lần verify khoảng 1 giây.

## Detailed Answer (EN)
$7c
