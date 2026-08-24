---
id: tai-sao-luu-mat-khau-bang-password-hash-password-verify-thay-vi-md5-sha1
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao lưu mật khẩu bằng `password_hash()` / `password_verify()` thay vì `md5`/`sha1`?

## Question (EN)
Why store passwords with `password_hash()` / `password_verify()` instead of `md5`/`sha1`?

## Đáp án chi tiết (VI)
`md5`/`sha1` là hàm băm **nhanh** và **không có salt** → dễ brute-force bằng GPU và tra rainbow table. `password_hash()` dùng thuật toán **chậm có chủ đích** (mặc định bcrypt, hoặc Argon2) với **salt ngẫu nhiên nhúng sẵn** trong chuỗi kết quả, nên không cần cột salt riêng.\
\
```php\
$hash = password_hash($plain, PASSWORD_DEFAULT); // salt tự sinh + cost nhúng trong chuỗi\
// lưu $hash vào DB — cột nên rộng 255 ký tự\
\
if (password_verify($plain, $hash)) { /* đăng nhập hợp lệ */ }\
\
if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {\
  $hash = password_hash($plain, PASSWORD_DEFAULT); // rehash khi tăng cost\
}\
```\
\
- **cost** (mặc định 10 với bcrypt) điều chỉnh độ chậm → tăng theo phần cứng để chống brute-force.\
- `password_verify()` so sánh **constant-time**, chống timing attack — đừng tự so sánh bằng `==`.\
- **Không bao giờ** lưu plaintext hay hàm băm nhanh; luôn để `PASSWORD_DEFAULT` (theo chuẩn mới nhất của PHP).

## Detailed Answer (EN)
`md5`/`sha1` are **fast**, **unsalted** hashes → trivial to brute-force on a GPU and to reverse via rainbow tables. `password_hash()` uses a **deliberately slow** algorithm (bcrypt by default, or Argon2) with a **random salt embedded** in the output string, so you never need a separate salt column.\
\
```php\
$hash = password_hash($plain, PASSWORD_DEFAULT); // salt + cost baked into the string\
// store $hash — the column should be 255 chars wide\
\
if (password_verify($plain, $hash)) { /* valid login */ }\
\
if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {\
  $hash = password_hash($plain, PASSWORD_DEFAULT); // rehash when you raise the cost\
}\
```\
\
- The **cost** factor (bcrypt default 10) tunes the slowness → raise it as hardware improves.\
- `password_verify()` compares in **constant time**, defeating timing attacks — never compare with `==`.\
- **Never** store plaintext or fast hashes; keep `PASSWORD_DEFAULT` so PHP tracks the current best algorithm.
