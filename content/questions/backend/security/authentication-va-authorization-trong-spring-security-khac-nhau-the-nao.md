---
id: authentication-va-authorization-trong-spring-security-khac-nhau-the-nao
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Authentication và Authorization trong Spring Security khác nhau thế nào?

## Question (EN)
How do authentication and authorization differ in Spring Security?

## Đáp án chi tiết (VI)
**Authentication (xác thực):** \\"Bạn là ai?\\" — verify identity (login mật khẩu, JWT, OAuth). **Authorization (phân quyền):** \\"Bạn được phép làm gì?\\" — check permission (role, scope). Authentication luôn xảy ra **trước** Authorization.\
\
**Trong Spring Security:**\
- **Authentication:** implement `UserDetailsService.loadUserByUsername()` trả về `UserDetails` (username, password hash, danh sách authority) — Spring so credential và dựng `Authentication` object.\
- **Authorization:** rule theo URL qua `authorizeHttpRequests` — `hasRole(\\"ADMIN\\")`, `authenticated()`, `permitAll()` cho từng pattern; hoặc theo method qua `@PreAuthorize` (xem câu method-level security).\
- Sau khi xác thực thành công, **`SecurityContextHolder`** giữ `Authentication` (user info, roles) cho thread hiện tại — mọi check phân quyền phía sau đọc từ đây.

## Detailed Answer (EN)
**Authentication:** \\"Who are you?\\" — verifying identity (password login, JWT, OAuth). **Authorization:** \\"What are you allowed to do?\\" — checking permissions (roles, scopes). Authentication always happens **before** authorization.\
\
**In Spring Security:**\
- **Authentication:** implement `UserDetailsService.loadUserByUsername()` returning a `UserDetails` (username, password hash, authorities) — Spring compares credentials and builds the `Authentication` object.\
- **Authorization:** URL rules via `authorizeHttpRequests` — `hasRole(\\"ADMIN\\")`, `authenticated()`, `permitAll()` per pattern; or per method via `@PreAuthorize` (see the method-level security item).\
- After successful authentication, **`SecurityContextHolder`** holds the `Authentication` (user info, roles) for the current thread — every later authorization check reads from it.
