---
id: phan-biet-authentication-va-authorization-server-verify-jwt-the-nao
position: backend
technology: auth-\u0026-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt authentication và authorization? Server verify JWT thế nào?

## Question (EN)
Authentication vs authorization — and how does a server verify a JWT?

## Đáp án chi tiết (VI)
- **Authentication (xác thực)**: bạn **là ai** — kiểm danh tính (mật khẩu, OAuth, passkey).\
- **Authorization (phân quyền)**: bạn **được làm gì** — kiểm quyền truy cập tài nguyên (RBAC, scope).\
\
Thứ tự: xác thực trước, phân quyền sau. Sai quyền → `403`; chưa xác thực → `401`.\
\
**Server verify JWT**: token gồm `header.payload.signature`. Server **tính lại chữ ký** trên `header.payload` bằng secret (HS256) hoặc public key (RS256) và so với `signature` → phát hiện sửa đổi; đồng thời kiểm claim `exp` (hết hạn), `iss`/`aud`. Vì stateless nên **không tra DB** — đổi lại khó thu hồi trước hạn (dùng access token sống ngắn + refresh, hoặc blacklist). Với OAuth2, SPA nên dùng Authorization Code + **PKCE**.

## Detailed Answer (EN)
- **Authentication**: **who you are** — verifying identity (password, OAuth, passkey).\
- **Authorization**: **what you may do** — checking access to resources (RBAC, scopes).\
\
Order: authenticate first, authorize second. Missing permission → `403`; not authenticated → `401`.\
\
**How a server verifies a JWT**: the token is `header.payload.signature`. The server **recomputes the signature** over `header.payload` using the secret (HS256) or public key (RS256) and compares it to `signature` → detects tampering; it also checks claims `exp` (expiry), `iss`/`aud`. Being stateless it does **no DB lookup** — the cost is hard early revocation (use short-lived access tokens + refresh, or a blacklist). For OAuth2, SPAs should use Authorization Code + **PKCE**.
