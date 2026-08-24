---
id: content-security-policy-csp-la-gi-va-giup-chong-xss-the-nao
position: backend
technology: web-security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Content Security Policy (CSP) là gì và giúp chống XSS thế nào?

## Question (EN)
What is Content Security Policy (CSP) and how does it help against XSS?

## Đáp án chi tiết (VI)
CSP là header `Content-Security-Policy` giới hạn nguồn tài nguyên trang được phép nạp/chạy → **phòng thủ chiều sâu** cho XSS: dù sanitize sót, CSP vẫn chặn `\u003cscript\u003e` từ nguồn lạ, inline script, inline event handler, `javascript:` URL, và `eval()`.\
\
Directive chính: `default-src`, `script-src`.\
\
Cách mạnh:\
- **nonce**: server sinh giá trị ngẫu nhiên mỗi response, gắn vào cả header (`script-src 'nonce-xxx'`) và thẻ `\u003cscript nonce=\\"xxx\\"\u003e`.\
- **hash** (SHA-256) cho script tĩnh.\
- Thêm `strict-dynamic`, `object-src 'none'`, `base-uri 'none'`.\
\
Test an toàn bằng `Content-Security-Policy-Report-Only`. CSP bổ sung, không thay thế sanitize.

## Detailed Answer (EN)
CSP is the `Content-Security-Policy` header that restricts which resources a page may load/run → **defense-in-depth** for XSS: even if sanitization misses something, CSP still blocks external `\u003cscript\u003e` sources, inline scripts, inline event handlers, `javascript:` URLs, and `eval()`.\
\
Key directives: `default-src`, `script-src`.\
\
Strong approaches:\
- **nonce**: the server generates a random value per response, placed in both the header (`script-src 'nonce-xxx'`) and the `\u003cscript nonce=\\"xxx\\"\u003e` tag.\
- **hash** (SHA-256) for static scripts.\
- Add `strict-dynamic`, `object-src 'none'`, `base-uri 'none'`.\
\
Roll out safely with `Content-Security-Policy-Report-Only`. CSP complements, not replaces, sanitization.
