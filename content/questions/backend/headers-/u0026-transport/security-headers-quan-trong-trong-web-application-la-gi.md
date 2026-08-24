---
id: security-headers-quan-trong-trong-web-application-la-gi
position: backend
technology: headers-\u0026-transport
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Security headers quan trọng trong web application là gì?

## Question (EN)
What are the important security headers in a web application?

## Đáp án chi tiết (VI)
Security headers là các response header điều khiển hành vi browser để chặn tấn công — Helmet.js (`app.use(helmet())`) set sẵn bộ mặc định hợp lý.\
\
- **Strict-Transport-Security** — `max-age=31536000; includeSubDomains`: ép HTTPS, chặn SSL stripping.\
- **X-Content-Type-Options: nosniff** — chặn MIME sniffing, browser không tự đoán content type khác header — ngăn polyglot file attack.\
- **X-Frame-Options: DENY/SAMEORIGIN** — chống clickjacking; CSP `frame-ancestors` là bản thay thế linh hoạt hơn.\
- **Referrer-Policy** — browser hiện đại mặc định `strict-origin-when-cross-origin` (Chrome 85+); dùng `no-referrer` cho trang nhạy cảm.\
- **Permissions-Policy** — tắt browser API không dùng: `geolocation=(), camera=(), microphone=()`.\
- **COOP/COEP** — `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp` bật process isolation, cần cho SharedArrayBuffer.\
- **X-XSS-Protection** — đã deprecated, không cần set.\
\
Test site bằng securityheaders.com.

## Detailed Answer (EN)
Security headers are response headers that control browser behavior to block attacks — Helmet.js (`app.use(helmet())`) sets a sensible default set.\
\
- **Strict-Transport-Security** — `max-age=31536000; includeSubDomains`: forces HTTPS, blocks SSL stripping.\
- **X-Content-Type-Options: nosniff** — stops MIME sniffing so the browser never guesses a different content type — blocks polyglot file attacks.\
- **X-Frame-Options: DENY/SAMEORIGIN** — anti-clickjacking; CSP `frame-ancestors` is the more flexible replacement.\
- **Referrer-Policy** — modern browsers default to `strict-origin-when-cross-origin` (Chrome 85+); use `no-referrer` for sensitive pages.\
- **Permissions-Policy** — disable unused browser APIs: `geolocation=(), camera=(), microphone=()`.\
- **COOP/COEP** — `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp` enable process isolation, required for SharedArrayBuffer.\
- **X-XSS-Protection** — deprecated, no need to set.\
\
Test your site with securityheaders.com.
