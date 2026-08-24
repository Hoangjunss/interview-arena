---
id: access-token-va-refresh-token-khac-nhau-nhu-the-nao
position: backend
technology: security-\u0026-production
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Access token và Refresh token khác nhau như thế nào?

## Question (EN)
How are access tokens and refresh tokens different?

## Đáp án chi tiết (VI)
Access token short-lived (15 phút) gửi trong mỗi request — stateless, server không lưu gì. Refresh token long-lived (7-30 ngày) lưu trong httpOnly cookie, chỉ dùng để lấy access token mới tại endpoint `/auth/refresh`. Rotation strategy: mỗi lần dùng refresh token phải issue cặp token mới và invalidate token cũ (one-time-use) — nếu token cũ bị dùng lại là dấu hiệu bị đánh cắp, revoke toàn bộ session. Token blacklisting: lưu revoked JTI (JWT ID) trong Redis với TTL bằng thời gian còn lại của token — kiểm tra blacklist trong auth middleware. Sliding sessions: mỗi request hợp lệ extend session — issue refresh token mới nếu còn \u003c 1 ngày. Security: lưu hash của refresh token trong DB, không plain text — nếu DB leak thì token vô dụng. Lưu ý: không implement rotation → stolen refresh token dùng mãi đến hết hạn; không lưu vào httpOnly cookie → XSS đánh cắp được.

## Detailed Answer (EN)
Access tokens are short-lived (15 minutes), sent with every request — stateless, the server stores nothing. Refresh tokens are long-lived (7-30 days), stored in an httpOnly cookie, used only to obtain a new access token at the `/auth/refresh` endpoint. Rotation strategy: each use of a refresh token must issue a new pair (access + refresh) and invalidate the old one (one-time-use) — if an old token is used again, it's a sign of theft; revoke the entire session. Token blacklisting: store the revoked JTI (JWT ID) in Redis with a TTL equal to the remaining lifetime of the token — check the blacklist in the auth middleware. Sliding sessions: each valid request extends the session — issue a new refresh token if less than 1 day remains. Security: store the hash of the refresh token in the DB, not plain text — if the DB leaks, the tokens are useless. Pitfall: not implementing rotation → a stolen refresh token is valid until it expires; not storing in an httpOnly cookie → XSS can steal it.
