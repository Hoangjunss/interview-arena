---
id: module-crypto-cua-node-js-cung-cap-nhung-gi-hashing-hmac-cipher
position: backend
technology: bảo-mật
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module `crypto` của Node.js cung cấp những gì? (hashing, HMAC, cipher)

## Question (EN)
What does Node.js's `crypto` module provide? (hashing, HMAC, ciphers)

## Đáp án chi tiết (VI)
Module built-in `crypto` bọc OpenSSL, gom các nhóm nguyên thủy mật mã:\
\
- **Hashing** — `createHash('sha256')`: băm một chiều, không khóa. Dùng cho checksum/toàn vẹn dữ liệu.\
- **HMAC** — `createHmac('sha256', key)`: băm **có khóa bí mật**, để xác thực rằng dữ liệu do bên biết khóa tạo ra (verify webhook, ký token).\
- **Mã hóa đối xứng** — `createCipheriv`/`createDecipheriv` (vd AES-256-GCM): mã hóa/giải mã bằng cùng một khóa + IV.\
- **Bất đối xứng** — `generateKeyPair`, `sign`/`verify`, `publicEncrypt` (RSA/EC).\
- **Ngẫu nhiên \u0026 KDF** — `randomBytes`, `randomUUID`, `scrypt`/`pbkdf2` để dẫn xuất khóa.\
\
Lưu ý: **mật khẩu KHÔNG dùng `createHash` trơn** — hãy dùng KDF có salt như `scrypt`/`pbkdf2` (hoặc bcrypt/argon2). Hash để kiểm tra toàn vẹn, KDF để lưu mật khẩu.

## Detailed Answer (EN)
The built-in `crypto` module wraps OpenSSL and bundles the cryptographic primitives:\
\
- **Hashing** — `createHash('sha256')`: one-way, keyless digest. Use for checksums/data integrity.\
- **HMAC** — `createHmac('sha256', key)`: a **keyed** hash, proving data came from someone who knows the secret (verifying webhooks, signing tokens).\
- **Symmetric encryption** — `createCipheriv`/`createDecipheriv` (e.g. AES-256-GCM): encrypt/decrypt with the same key + IV.\
- **Asymmetric** — `generateKeyPair`, `sign`/`verify`, `publicEncrypt` (RSA/EC).\
- **Randomness \u0026 KDFs** — `randomBytes`, `randomUUID`, `scrypt`/`pbkdf2` for key derivation.\
\
Note: **never store passwords with a plain `createHash`** — use a salted KDF like `scrypt`/`pbkdf2` (or bcrypt/argon2). Hashing is for integrity; a KDF is for password storage.
