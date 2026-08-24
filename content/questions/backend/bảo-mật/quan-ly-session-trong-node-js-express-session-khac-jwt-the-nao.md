---
id: quan-ly-session-trong-node-js-express-session-khac-jwt-the-nao
position: backend
technology: bảo-mật
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quản lý session trong Node.js: `express-session` khác JWT thế nào?

## Question (EN)
Session management in Node.js: how does `express-session` differ from JWT?

## Đáp án chi tiết (VI)
Hai cách giữ trạng thái đăng nhập, khác nhau ở chỗ **state nằm đâu**:\
\
**`express-session` (stateful, server-side)**\
- Server lưu dữ liệu session; client chỉ giữ một **session id** trong cookie.\
- Cần một **store** (Redis/DB) để scale ngang nhiều instance — không nên để MemoryStore ở production.\
- Server **thu hồi tức thì** được (xóa session) → logout/ban hiệu lực ngay.\
\
**JWT (stateless, self-contained)**\
- Token tự chứa claim + chữ ký; server chỉ **verify chữ ký**, không cần lưu gì → dễ scale, hợp kiến trúc nhiều service.\
- Nhược điểm: **khó thu hồi** trước khi hết hạn → dùng token **ngắn hạn** + refresh token; payload chỉ base64 (đọc được) nên **không đặt dữ liệu nhạy cảm**.\
\
Theo OWASP, mặc định ưu tiên **session phía server** vì kiểm soát vòng đời tốt hơn; chọn JWT khi thực sự cần stateless. Dù cách nào, cookie phải `HttpOnly` + `Secure` + `SameSite`.

## Detailed Answer (EN)
Two ways to hold login state, differing in **where the state lives**:\
\
**`express-session` (stateful, server-side)**\
- The server stores the session data; the client only holds a **session id** in a cookie.\
- Needs a **store** (Redis/DB) to scale across instances — don't use the MemoryStore in production.\
- The server can **revoke instantly** (delete the session) → logout/ban takes effect immediately.\
\
**JWT (stateless, self-contained)**\
- The token carries claims + a signature; the server only **verifies the signature**, storing nothing → easy to scale, fits multi-service architectures.\
- Downside: **hard to revoke** before expiry → use **short-lived** tokens + a refresh token; the payload is only base64 (readable), so **put no sensitive data** in it.\
\
Per OWASP, default to **server-side sessions** for better lifecycle control; reach for JWT when you genuinely need statelessness. Either way, cookies must be `HttpOnly` + `Secure` + `SameSite`.
