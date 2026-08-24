---
id: authentication-vs-authorization-khac-nhau-the-nao
position: backend
technology: authentication-\u0026-sessions
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Authentication vs Authorization khác nhau thế nào?

## Question (EN)
What is the difference between authentication and authorization?

## Đáp án chi tiết (VI)
Authentication (authn) xác minh bạn là ai; Authorization (authz) quyết định bạn được làm gì — authn luôn xảy ra trước authz.\
\
- **Authentication** — xác minh danh tính: đăng nhập bằng password, OTP, biometric, OAuth/SSO. Kết quả: hệ thống biết request đến từ user nào.\
- **Authorization** — kiểm tra quyền: user này có được vào trang admin, xóa bài viết, đọc resource X không — thường qua role (RBAC) hoặc permission cụ thể.\
- **Hình dung** — trình hộ chiếu ở sân bay là authentication; boarding pass quyết định bạn được lên chuyến bay nào là authorization.\
- **HTTP status** — 401 Unauthorized: chưa authenticate (tên status dễ gây nhầm — bản chất là 'unauthenticated'); 403 Forbidden: đã authenticate nhưng không đủ quyền.\
- **Trong code** — authn: NextAuth/Passport verify session/token; authz: check role/permission ở từng route và action — thiếu authz check là Broken Access Control, hạng #1 trong OWASP Top 10.

## Detailed Answer (EN)
Authentication (authn) verifies who you are; authorization (authz) decides what you are allowed to do — authn always happens before authz.\
\
- **Authentication** — identity verification: logging in with a password, OTP, biometrics, OAuth/SSO. Result: the system knows which user the request comes from.\
- **Authorization** — permission checking: can this user open the admin page, delete a post, read resource X — usually via roles (RBAC) or specific permissions.\
- **Picture it** — showing your passport at the airport is authentication; the boarding pass deciding which flight you may board is authorization.\
- **HTTP status** — 401 Unauthorized: not authenticated (the status name is misleading — it really means 'unauthenticated'); 403 Forbidden: authenticated but lacking permission.\
- **In code** — authn: NextAuth/Passport verifying the session/token; authz: role/permission checks on every route and action — a missing authz check is Broken Access Control, #1 in the OWASP Top 10.
