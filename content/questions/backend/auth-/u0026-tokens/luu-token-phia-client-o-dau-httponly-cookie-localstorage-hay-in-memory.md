---
id: luu-token-phia-client-o-dau-httponly-cookie-localstorage-hay-in-memory
position: backend
technology: auth-\u0026-tokens
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lưu token phía client ở đâu: httpOnly cookie, localStorage hay in-memory?

## Question (EN)
Where do you store a token on the client: httpOnly cookie, localStorage, or in-memory?

## Đáp án chi tiết (VI)
Mỗi chỗ đánh đổi giữa hai nguy cơ khác nhau — **XSS** và **CSRF**.\
\
- **`localStorage`**: JS đọc/ghi dễ, tiện gắn `Authorization` header (nên miễn nhiễm CSRF). Nhưng **XSS đọc được** → một script chèn vào là mất token. Không nên dùng cho token nhạy cảm.\
- **Cookie `httpOnly` + `Secure` + `SameSite`**: JS **không đọc được** → chống XSS đánh cắp token. Nhưng cookie tự động gửi kèm request → mở **CSRF**, cần phòng bằng `SameSite=Lax/Strict` + anti-CSRF token cho thao tác đổi trạng thái.\
- **In-memory (biến JS)**: an toàn nhất trước XSS-lâu-dài (mất khi reload, không nằm trên disk), nhưng mất khi refresh trang → thường ghép với refresh token trong cookie `httpOnly` để lấy lại access.\
\
**Khuyến nghị thực dụng**: refresh token trong cookie `httpOnly`+`Secure`+`SameSite`; access token in-memory. Tránh để token dài hạn trong `localStorage`. Dù chọn gì, **vá XSS vẫn là ưu tiên số một** — XSS thắng thì mọi cách lưu đều gãy.

## Detailed Answer (EN)
Each location trades off two different risks — **XSS** and **CSRF**.\
\
- **`localStorage`**: easy JS read/write, convenient for attaching an `Authorization` header (so it is CSRF-immune). But **XSS can read it** → one injected script and the token is gone. Avoid it for sensitive tokens.\
- **`httpOnly` + `Secure` + `SameSite` cookie**: JS **cannot read it** → protects against XSS token theft. But cookies are sent automatically with requests → opens **CSRF**, which you defend with `SameSite=Lax/Strict` + an anti-CSRF token for state-changing actions.\
- **In-memory (JS variable)**: safest against persistent XSS (lost on reload, never on disk), but lost on refresh → usually paired with a refresh token in an `httpOnly` cookie to re-obtain access.\
\
**Pragmatic recommendation**: refresh token in an `httpOnly`+`Secure`+`SameSite` cookie; access token in memory. Avoid long-lived tokens in `localStorage`. Whatever you pick, **fixing XSS is still priority one** — if XSS wins, every storage choice breaks.
