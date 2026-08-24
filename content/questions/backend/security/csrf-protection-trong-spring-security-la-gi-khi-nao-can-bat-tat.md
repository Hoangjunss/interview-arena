---
id: csrf-protection-trong-spring-security-la-gi-khi-nao-can-bat-tat
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSRF protection trong Spring Security là gì? Khi nào cần bật/tắt?

## Question (EN)
What is CSRF protection in Spring Security? When should you enable or disable it?

## Đáp án chi tiết (VI)
**CSRF (Cross-Site Request Forgery):** attacker lừa browser của user gửi request đến server — browser tự đính kèm cookie session nên server tưởng là request hợp lệ.\
\
**Cơ chế chống:** server phát CSRF token (random, per-session) nhúng vào form → mọi request thay đổi state phải kèm token → server verify. Token nằm ngoài cookie nên site khác không lấy được.\
\
**Khi TẮT (an toàn):** stateless REST API dùng JWT/Bearer token — không có cookie session → CSRF không áp dụng. Tắt: `http.csrf(AbstractHttpConfigurer::disable)`.\
\
**Khi BẬT (bắt buộc):** web app dùng session cookie (Thymeleaf, JSP, MVC truyền thống), form submit từ browser. JS gọi API phải gửi kèm header `X-CSRF-TOKEN`.\
\
**2026:** đa số Spring Boot app là REST + JWT → tắt CSRF; web app truyền thống → bật (default của Spring Security).

## Detailed Answer (EN)
**CSRF (Cross-Site Request Forgery):** an attacker tricks the user's browser into sending a request — the browser automatically attaches the session cookie, so the server thinks the request is legitimate.\
\
**Protection mechanism:** the server issues a CSRF token (random, per-session) embedded in forms → every state-changing request must include it → server verifies. The token lives outside the cookie, so another site cannot obtain it.\
\
**When to DISABLE (safe):** stateless REST APIs using JWT/Bearer tokens — no session cookie → CSRF does not apply. Disable: `http.csrf(AbstractHttpConfigurer::disable)`.\
\
**When to ENABLE (required):** web apps using session cookies (Thymeleaf, JSP, traditional MVC), browser form submissions. JS calls must send the `X-CSRF-TOKEN` header.\
\
**2026:** most Spring Boot apps are REST + JWT → disable CSRF; traditional web apps → enable (Spring Security's default).
