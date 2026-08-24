---
id: csrf-la-gi-va-chong-the-nao-ke-ca-csrf-cua-laravel
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSRF là gì và chống thế nào (kể cả `@csrf` của Laravel)?

## Question (EN)
What is CSRF and how do you prevent it (including Laravel’s `@csrf`)?

## Đáp án chi tiết (VI)
**CSRF (Cross-Site Request Forgery)** = kẻ tấn công lừa trình duyệt của nạn nhân — đang đăng nhập ở site của bạn — tự gửi một request thay đổi trạng thái (chuyển tiền, đổi email). Trình duyệt **tự đính kèm cookie phiên**, nên server tưởng đó là hành động thật của người dùng.\
\
Cách chống theo OWASP:\
- **Synchronizer token:** server phát một token bí mật gắn với phiên, form phải gửi kèm; server so khớp mới chấp nhận. Site khác không đọc được token → không giả mạo được.\
- **SameSite cookie** (`Lax`/`Strict`) chặn cookie đi kèm request cross-site.\
\
Trong **Laravel**: middleware `VerifyCsrfToken` tự kiểm token cho mọi `POST/PUT/PATCH/DELETE`. Directive `@csrf` render một hidden input `_token`:\
\
```blade\
\u003cform method=\\"POST\\" action=\\"/profile\\"\u003e\
  @csrf\
  \u003c!-- =\u003e \u003cinput type=\\"hidden\\" name=\\"_token\\" value=\\"...\\"\u003e --\u003e\
\u003c/form\u003e\
```\
\
API **stateless** (token/JWT trong header, không dùng cookie phiên) thì không dính CSRF nên được exempt khỏi middleware này.

## Detailed Answer (EN)
$82
