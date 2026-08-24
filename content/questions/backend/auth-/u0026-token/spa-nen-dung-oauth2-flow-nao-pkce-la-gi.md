---
id: spa-nen-dung-oauth2-flow-nao-pkce-la-gi
position: backend
technology: auth-\u0026-token
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SPA nên dùng OAuth2 flow nào? PKCE là gì?

## Question (EN)
Which OAuth2 flow should a SPA use? What is PKCE?

## Đáp án chi tiết (VI)
SPA nên dùng **Authorization Code flow + PKCE** — **không** dùng Implicit flow (đã lỗi thời, để lộ token trên URL).\
\
**PKCE** (RFC 7636) chống chặn/inject authorization code:\
1. Client sinh `code_verifier` ngẫu nhiên.\
2. Hash ra `code_challenge`, gửi kèm khi redirect tới authorization server.\
3. Server trả về authorization code.\
4. Client đổi code lấy token, **phải kèm `code_verifier` gốc**.\
5. Server kiểm `code_verifier` khớp `code_challenge`.\
\
→ Kẻ chặn được authorization code cũng **không đổi được token** vì thiếu `code_verifier`. Thêm tham số `state` để chống CSRF trên bước redirect.

## Detailed Answer (EN)
A SPA should use the **Authorization Code flow + PKCE** — **not** the Implicit flow (deprecated, leaks tokens in the URL).\
\
**PKCE** (RFC 7636) prevents authorization-code interception/injection:\
1. The client generates a random `code_verifier`.\
2. It hashes it into a `code_challenge`, sent when redirecting to the authorization server.\
3. The server returns an authorization code.\
4. The client exchanges the code for tokens, **including the original `code_verifier`**.\
5. The server checks the `code_verifier` matches the `code_challenge`.\
\
→ An attacker who intercepts the authorization code still **cannot exchange it** without the `code_verifier`. Add a `state` parameter to defend the redirect against CSRF.
