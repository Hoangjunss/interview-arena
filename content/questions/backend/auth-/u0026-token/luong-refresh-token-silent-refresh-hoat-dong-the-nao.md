---
id: luong-refresh-token-silent-refresh-hoat-dong-the-nao
position: backend
technology: auth-\u0026-token
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Luồng refresh token (silent refresh) hoạt động thế nào?

## Question (EN)
How does the refresh token (silent refresh) flow work?

## Đáp án chi tiết (VI)
Access token sống ngắn; khi nó hết hạn, client dùng **refresh token** (sống lâu hơn) gọi endpoint `/token` để lấy access token mới — **không bắt người dùng đăng nhập lại**. Đó là \\"silent refresh\\".\
\
**Refresh token rotation**: mỗi lần refresh, server cấp refresh token MỚI và vô hiệu cái cũ. Nếu một refresh token cũ bị dùng lại (dấu hiệu bị đánh cắp/replay), server phát hiện và có thể thu hồi cả chuỗi token của phiên đó.\
\
Refresh token nên nằm trong cookie `HttpOnly`; access token mới đưa về in-memory để dùng cho các request kế tiếp.

## Detailed Answer (EN)
The access token is short-lived; when it expires, the client uses the longer-lived **refresh token** to call the `/token` endpoint and get a new access token — **without forcing the user to log in again**. That is a \\"silent refresh\\".\
\
**Refresh token rotation**: each refresh issues a NEW refresh token and invalidates the old one. If an old refresh token is reused (a sign of theft/replay), the server detects it and can revoke the whole token chain for that session.\
\
Keep the refresh token in an `HttpOnly` cookie; put the fresh access token in memory for subsequent requests.
