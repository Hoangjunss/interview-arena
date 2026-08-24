---
id: jwt-json-web-token-la-gi-cau-truc-cua-jwt
position: backend
technology: security-\u0026-production
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JWT (JSON Web Token) là gì? Cấu trúc của JWT?

## Question (EN)
What is JWT (JSON Web Token)? What is the structure of a JWT?

## Đáp án chi tiết (VI)
JWT gồm header.payload.signature (base64url-encoded) — stateless, không cần lưu session; nhưng không thể revoke trước hạn nên access token phải ngắn (15 phút) kết hợp refresh token. JWT là chuẩn mở (RFC 7519) để truyền thông tin an toàn dưới dạng JSON, được ký số để đảm bảo tính toàn vẹn. Gồm 3 phần ngăn cách bởi dấu chấm, mỗi phần base64url-encoded: Header (`{alg: 'HS256', typ: 'JWT'}`), Payload (claims như `{sub: userId, exp: timestamp, role: 'admin'}`), Signature (HMAC của header+payload bằng secret key). Ưu điểm stateless: server không cần lưu session, chỉ cần verify signature — phù hợp microservices và horizontal scaling. Nhược điểm quan trọng: không thể revoke JWT trước khi hết hạn (không có centralized blacklist), nên access token phải có `exp` ngắn (15 phút) kết hợp refresh token. Lưu ý phổ biến nhất: lưu JWT trong localStorage thay vì httpOnly cookie — dễ bị XSS đánh cắp.

## Detailed Answer (EN)
JWT consists of header.payload.signature (base64url-encoded) — stateless, no session storage needed; but cannot be revoked before expiry so access tokens must be short (15 min) combined with refresh tokens. JWT is an open standard (RFC 7519) for securely transmitting information as JSON, signed to ensure integrity. It consists of 3 parts separated by dots, each base64url-encoded: Header (`{alg: 'HS256', typ: 'JWT'}`), Payload (claims such as `{sub: userId, exp: timestamp, role: 'admin'}`), Signature (HMAC of header+payload using a secret key). Stateless advantage: the server doesn't need to store sessions — it just verifies the signature — making JWTs ideal for microservices and horizontal scaling. Important downside: JWTs cannot be revoked before they expire (no centralized blacklist), so access tokens must have a short `exp` (15 minutes) combined with a refresh token. Most common pitfall: storing JWT in localStorage instead of an httpOnly cookie — vulnerable to XSS theft.
