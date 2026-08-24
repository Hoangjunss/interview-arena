---
id: jwt-authentication-flow-trong-node-js
position: backend
technology: authentication-\u0026-sessions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JWT authentication flow trong Node.js?

## Question (EN)
What is the JWT authentication flow in Node.js?

## Đáp án chi tiết (VI)
JWT stateless auth dùng signed token thay vì server-side session — không cần DB lookup mỗi request.\
\
- Login: verify credentials → tạo JWT (sign với secret) → gửi token cho client.\
- Request: client gửi token trong Authorization header (Bearer token).\
- Server: middleware verify token, extract user info, attach vào req.user.\
- Lưu trữ: access token → memory (JS variable), refresh token → httpOnly cookie. KHÔNG lưu localStorage (XSS risk).\
\
Refresh token cho long-lived sessions.

## Detailed Answer (EN)
JWT is stateless auth using signed tokens instead of server-side sessions — no DB lookup needed per request.\
\
- Login: verify credentials → create JWT (signed with secret) → send token to client.\
- Subsequent requests: client sends the token in the Authorization header (Bearer token).\
- Server: middleware verifies the token, extracts user info, and attaches it to req.user.\
- Storage: access token → in-memory (JS variable), refresh token → httpOnly cookie. NEVER store in localStorage (XSS risk).\
\
Use refresh tokens for long-lived sessions.
