---
id: cookie-security-httponly-secure-samesite-attributes-la-gi
position: backend
technology: authentication-\u0026-sessions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cookie security: HttpOnly, Secure, SameSite attributes là gì?

## Question (EN)
What are cookie security attributes? What do HttpOnly, Secure, and SameSite do?

## Đáp án chi tiết (VI)
Ba attribute kiểm soát mức lộ và cách gửi cookie: HttpOnly, Secure, SameSite.\
\
- **HttpOnly** — JS không đọc được cookie qua `document.cookie` — XSS không đánh cắp được session token; cookie vẫn tự động gửi kèm HTTP request.\
- **Secure** — cookie chỉ gửi qua HTTPS — bắt buộc trong production.\
- **SameSite** — `Strict`: không gửi trong mọi cross-site request; `Lax` (default Chrome từ 2020): chỉ gửi trong top-level GET navigation; `None`: gửi mọi cross-site request, bắt buộc kèm `Secure` — ngữ nghĩa chi tiết xem câu CSRF.\
- **Best practice cho session cookie** — `Set-Cookie: sessionId=abc; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`.\
- **Cookie prefix** — `__Secure-` (bắt buộc flag Secure); `__Host-` (Secure + không Domain + `Path=/` — mạnh nhất, ghim vào host).\
- **Max-Age vs Expires** — Max-Age (giây, tương đối) được ưu tiên vì không phụ thuộc clock của client; cookie không có cả hai là session cookie, xóa khi đóng browser.

## Detailed Answer (EN)
Three attributes control cookie exposure and transmission: HttpOnly, Secure, SameSite.\
\
- **HttpOnly** — JS cannot read the cookie via `document.cookie` — XSS cannot steal the session token; the cookie is still sent automatically with HTTP requests.\
- **Secure** — the cookie is only sent over HTTPS — mandatory in production.\
- **SameSite** — `Strict`: never sent on any cross-site request; `Lax` (Chrome default since 2020): sent only on top-level GET navigation; `None`: sent on all cross-site requests, requires `Secure` — see the CSRF question for the full semantics.\
- **Session cookie best practice** — `Set-Cookie: sessionId=abc; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`.\
- **Cookie prefixes** — `__Secure-` (requires the Secure flag); `__Host-` (Secure + no Domain + `Path=/` — strongest, pinned to the host).\
- **Max-Age vs Expires** — Max-Age (relative seconds) wins because it does not depend on the client clock; a cookie with neither is a session cookie, deleted when the browser closes.
