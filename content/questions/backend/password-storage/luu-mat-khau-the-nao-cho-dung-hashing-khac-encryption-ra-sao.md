---
id: luu-mat-khau-the-nao-cho-dung-hashing-khac-encryption-ra-sao
position: backend
technology: password-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lưu mật khẩu thế nào cho đúng? Hashing khác encryption ra sao?

## Question (EN)
How do you store passwords correctly, and how does hashing differ from encryption?

## Đáp án chi tiết (VI)
**Hashing khác encryption**: encryption **hai chiều** (có khóa để giải mã lại). Hash **một chiều** — không thể đảo ngược. Mật khẩu phải **hash**, không encrypt: DB chỉ giữ hash, kể cả bị lộ cũng không lấy lại được mật khẩu gốc. Tuyệt đối **không lưu plaintext**.\
\
Làm đúng (theo OWASP):\
- **Dùng hàm băm mật khẩu chuyên dụng, chậm có chủ đích**: **argon2id** (khuyến nghị hàng đầu), **bcrypt**, hoặc scrypt/PBKDF2. **Không** dùng MD5/SHA-256 trần — chúng quá nhanh, dễ brute-force bằng GPU.\
- **Salt**: chuỗi ngẫu nhiên duy nhất mỗi user, thêm vào trước khi băm → hai người cùng mật khẩu ra hash khác nhau, vô hiệu **rainbow table** (các thư viện trên tự sinh salt và nhúng vào output).\
- **Work factor / cost**: chỉnh cho băm đủ chậm (vd ~vài trăm ms) để cản brute-force; tăng dần theo phần cứng.\
- Cân nhắc **pepper** (secret chung, lưu tách khỏi DB) như lớp phụ.

## Detailed Answer (EN)
**Hashing vs encryption**: encryption is **two-way** (a key can decrypt it back). A hash is **one-way** — irreversible. Passwords must be **hashed, not encrypted**: the DB stores only the hash, so even a breach cannot recover the original password. **Never store plaintext**.\
\
Doing it right (per OWASP):\
- **Use a dedicated, deliberately slow password hash**: **argon2id** (top recommendation), **bcrypt**, or scrypt/PBKDF2. **Do not** use bare MD5/SHA-256 — they are too fast and easy to brute-force on GPUs.\
- **Salt**: a unique random string per user added before hashing → two people with the same password get different hashes, defeating **rainbow tables** (the libraries above generate and embed the salt automatically).\
- **Work factor / cost**: tune the hash to be slow enough (e.g. a few hundred ms) to deter brute-force; raise it as hardware improves.\
- Consider a **pepper** (a shared secret stored apart from the DB) as an extra layer.
