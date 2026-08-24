---
id: phia-frontend-nen-luu-access-token-va-refresh-token-o-dau
position: backend
technology: auth-\u0026-token
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phía frontend nên lưu access token và refresh token ở đâu?

## Question (EN)
Where should a frontend store access tokens and refresh tokens?

## Đáp án chi tiết (VI)
Nguyên tắc: **access token giữ trong bộ nhớ**, **refresh token trong cookie `HttpOnly`**.\
\
- **Access token** → biến JS/closure (hoặc Web Worker để tách global scope). Không sống qua reload, nhưng đó lại là điểm mạnh: XSS khó lấy, blast radius nhỏ. Access token nên sống ngắn (vài phút).\
- **Refresh token** → cookie `HttpOnly` + `Secure` + `SameSite`. JS không đọc được nên XSS không exfiltrate được; trình duyệt tự đính cookie khi gọi endpoint refresh.\
- **Tránh `localStorage`** cho token: bất kỳ script XSS nào (kể cả từ thư viện bên thứ ba) đều đọc được rồi replay từ nơi khác.\
- Web app truyền thống: lưu token server-side hoặc trong session cookie mã hóa.\
\
Giảm rủi ro thêm: rút ngắn hạn access token + bật **refresh token rotation**.

## Detailed Answer (EN)
Rule of thumb: **keep the access token in memory, the refresh token in an `HttpOnly` cookie**.\
\
- **Access token** → a JS variable/closure (or a Web Worker to isolate it from the global scope). It does not survive a reload, which is the point: XSS cannot easily read it and the blast radius stays small. Keep its lifetime short (minutes).\
- **Refresh token** → an `HttpOnly` + `Secure` + `SameSite` cookie. JS cannot read it, so XSS cannot exfiltrate it; the browser attaches it automatically when calling the refresh endpoint.\
- **Avoid `localStorage`** for tokens: any XSS payload (including one from a third-party library) can read and replay it from anywhere.\
- Traditional web apps: store tokens server-side or in an encrypted session cookie.\
\
Extra hardening: short access-token lifetime + refresh token rotation.
