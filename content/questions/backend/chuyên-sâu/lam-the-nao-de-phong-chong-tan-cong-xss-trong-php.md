---
id: lam-the-nao-de-phong-chong-tan-cong-xss-trong-php
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để phòng chống tấn công XSS trong PHP?

## Question (EN)
How do you prevent Cross-Site Scripting (XSS) attacks in PHP?

## Đáp án chi tiết (VI)
Tấn công XSS chèn script độc hại qua input của người dùng. Phòng chống bằng: (1) Luôn escape output với `htmlspecialchars()` chuyển đổi `\u003cscript\u003e` thành `\u0026lt;script\u0026gt;`, (2) Validate và sanitize input với `filter_var()`, (3) Thiết lập Content Security Policy header: `header(\\"Content-Security-Policy: default-src 'self'\\")`, (4) Không bao giờ in trực tiếp dữ liệu người dùng. \
\
**Ví dụ:** `echo htmlspecialchars($_GET[\\"search\\"], ENT_QUOTES, \\"UTF-8\\");` hiển thị an toàn. Nguyên tắc vàng: không tin bất cứ gì từ người dùng, escape mọi thứ trước khi hiển thị.

## Detailed Answer (EN)
XSS attacks inject malicious scripts via user input. Prevent with: (1) Always escape output with `htmlspecialchars()` converting `\u003cscript\u003e` to `\u0026lt;script\u0026gt;`, (2) Validate and sanitize input with `filter_var()`, (3) Use content security policy headers: `header(\\"Content-Security-Policy: default-src 'self'\\")`, (4) Never directly output user data. \
\
**Example:** `echo htmlspecialchars($_GET[\\"search\\"], ENT_QUOTES, \\"UTF-8\\");` safely displays user input. The golden rule: trust nothing from users, escape everything before displaying.
