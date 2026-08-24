---
id: jwt-gom-nhung-phan-nao-payload-co-duoc-ma-hoa-khong
position: backend
technology: auth-\u0026-token
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JWT gồm những phần nào? Payload có được mã hóa không?

## Question (EN)
What parts make up a JWT? Is the payload encrypted?

## Đáp án chi tiết (VI)
JWT (RFC 7519) gồm **3 phần** ngăn bởi dấu chấm: `header.payload.signature`, mỗi phần mã hóa **Base64URL**.\
\
- **Header**: loại token + thuật toán ký (vd `HS256`).\
- **Payload**: các **claim** — thông tin về chủ thể + metadata.\
- **Signature**: ký header+payload bằng HMAC/RSA/ECDSA với secret/private key → đảm bảo **toàn vẹn** (phát hiện nếu bị sửa) và xác nhận nguồn.\
\
**Quan trọng**: payload chỉ **encode chứ KHÔNG encrypt** — ai có token đều đọc được nội dung. Vì vậy **không đặt thông tin bí mật** vào payload trừ khi đã mã hóa (JWE). Token bị ký chống sửa, không chống đọc.

## Detailed Answer (EN)
A JWT (RFC 7519) has **3 parts** separated by dots: `header.payload.signature`, each **Base64URL**-encoded.\
\
- **Header**: token type + signing algorithm (e.g. `HS256`).\
- **Payload**: the **claims** — statements about the subject + metadata.\
- **Signature**: signs header+payload with HMAC/RSA/ECDSA using a secret/private key → guarantees **integrity** (detects tampering) and confirms the issuer.\
\
**Important**: the payload is **encoded, NOT encrypted** — anyone holding the token can read it. So **do not put secrets** in the payload unless it is encrypted (JWE). A signed token resists tampering, not reading.
