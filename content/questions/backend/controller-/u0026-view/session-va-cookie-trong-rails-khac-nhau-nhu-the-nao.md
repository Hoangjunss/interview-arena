---
id: session-va-cookie-trong-rails-khac-nhau-nhu-the-nao
position: backend
technology: controller-\u0026-view
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Session và Cookie trong Rails khác nhau như thế nào?

## Question (EN)
What is the difference between Session and Cookie in Rails?

## Đáp án chi tiết (VI)
| | Cookie | Session |\
|---|---|---|\
| Lưu ở đâu | Trình duyệt | Server (hoặc encrypted cookie) |\
| Xem được | Có (dễ đọc) | Không (mã hóa hoặc server-side) |\
| Kích thước | 4KB | Không giới hạn (server-side) |\
\
Cookies lưu plaintext hoặc signed (`cookies.signed[:user_id]`). Session mặc định dùng `CookieStore` — toàn bộ session được mã hóa và lưu trong cookie. Đọc/ghi session: `session[:user_id] = id` / `session.delete(:user_id)`.\
\
Không lưu thông tin nhạy cảm lớn vào session (giới hạn ~4KB).

## Detailed Answer (EN)
| | Cookie | Session |\
|---|---|---|\
| Stored | Browser | Server (or encrypted cookie) |\
| Readable | Yes (unless signed) | No (encrypted or server-side) |\
| Size | 4KB | Unlimited (server-side) |\
\
Cookies store plaintext or signed values (`cookies.signed[:user_id]`). Rails defaults to `CookieStore` for sessions — the entire session is encrypted and stored in a cookie. Read/write session: `session[:user_id] = id` / `session.delete(:user_id)`.\
\
Avoid storing large sensitive data in sessions (~4KB limit).
