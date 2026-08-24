---
id: jwt-authentication-trong-spring-security-hoat-dong-the-nao
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JWT authentication trong Spring Security hoạt động thế nào?

## Question (EN)
How does JWT authentication work in Spring Security?

## Đáp án chi tiết (VI)
**JWT (JSON Web Token)** = stateless authentication — server không lưu session, verify bằng chữ ký.\
\
**Flow:**\
```\
1. POST /login → server verify credential → ký JWT trả về\
2. Client gửi mỗi request: \\"Authorization: Bearer \u003ctoken\u003e\\"\
3. Server verify chữ ký → extract claims (sub, roles, exp) → authorize\
```\
\
**Config:** bật Resource Server JWT qua `oauth2ResourceServer(o -\u003e o.jwt(...))` với `jwkSetUri` (verify bằng public key), session để STATELESS — code đầy đủ xem câu Security Filter Chain.\
\
**Lưu ý quan trọng:**\
- JWT **không revoke được** trước khi hết hạn (trừ khi duy trì blocklist).\
- Access token: TTL ngắn (15min–1h). Refresh token: TTL dài, lưu DB để revoke được.\
- **Không đặt sensitive data** trong payload — JWT chỉ sign, không encrypt; ai cũng decode được bằng base64.

## Detailed Answer (EN)
**JWT (JSON Web Token)** = stateless authentication — the server stores no session and verifies via signature.\
\
**Flow:**\
```\
1. POST /login → server verifies credentials → signs and returns a JWT\
2. Client sends on every request: \\"Authorization: Bearer \u003ctoken\u003e\\"\
3. Server verifies the signature → extracts claims (sub, roles, exp) → authorises\
```\
\
**Config:** enable a JWT Resource Server via `oauth2ResourceServer(o -\u003e o.jwt(...))` with a `jwkSetUri` (public-key verification), session set to STATELESS — full code in the Security Filter Chain item.\
\
**Important notes:**\
- A JWT **cannot be revoked** before expiry (unless you maintain a blocklist).\
- Access token: short TTL (15min–1h). Refresh token: long TTL, stored in DB so it can be revoked.\
- **No sensitive data** in the payload — a JWT is signed, not encrypted; anyone can base64-decode it.
