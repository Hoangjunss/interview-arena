---
id: thiet-ke-authentication-flow-cho-spa-react
position: backend
technology: debug-\u0026-scenario
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế authentication flow cho SPA (React)?

## Question (EN)
Design an authentication flow for a React SPA.

## Đáp án chi tiết (VI)
Authentication flow cho React SPA:\
\
- Login: POST credentials → nhận access + refresh token.\
- Lưu access token trong memory (biến JS), refresh token trong httpOnly cookie.\
- Axios interceptor: attach access token mỗi request; nếu 401 → dùng refresh token lấy token mới → retry; nếu refresh fail → logout.\
- Route guard: PrivateRoute component check auth state.

## Detailed Answer (EN)
Authentication flow for a React SPA:\
\
- Login: POST credentials → receive access + refresh tokens.\
- Store access token in memory (JS variable), refresh token in an httpOnly cookie.\
- Axios interceptor: attach access token to every request; on 401 → use refresh token to get a new access token → retry original request; if refresh fails → logout.\
- Route protection: a PrivateRoute component checks auth state before rendering.
