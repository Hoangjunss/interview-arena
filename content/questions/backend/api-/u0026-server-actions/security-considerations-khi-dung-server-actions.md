---
id: security-considerations-khi-dung-server-actions
position: backend
technology: api-\u0026-server-actions
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Security considerations khi dùng Server Actions?

## Question (EN)
What are the security considerations when using Server Actions?

## Đáp án chi tiết (VI)
Server Actions tự động có CSRF protection từ Next.js. Tuy nhiên vẫn cần: validate và sanitize inputs (không trust FormData), authenticate user trong action (check session), authorize permissions, rate limiting. Server Actions là public API endpoints dù không có URL, nên treat như REST endpoints về security.

## Detailed Answer (EN)
Next.js automatically provides CSRF protection for Server Actions. However you still need to: validate and sanitize all inputs (never trust FormData blindly), authenticate the user inside the action (check the session), verify authorization/permissions, and consider rate limiting. Server Actions are effectively public API endpoints even without a URL — treat them with the same security rigor as REST endpoints.
