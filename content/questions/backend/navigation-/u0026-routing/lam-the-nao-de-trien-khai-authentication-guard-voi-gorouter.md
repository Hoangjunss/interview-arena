---
id: lam-the-nao-de-trien-khai-authentication-guard-voi-gorouter
position: backend
technology: navigation-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để triển khai authentication guard với GoRouter?

## Question (EN)
How do you implement authentication guards with GoRouter?

## Đáp án chi tiết (VI)
Dùng callback `redirect` để kiểm tra state auth trước khi build route. \
\
**Ví dụ:** nếu user chưa đăng nhập và cố truy cập route được bảo vệ, redirect về `/login`. Kết hợp với Riverpod để `redirect` tự động phản ứng khi auth state thay đổi. Cách này xử lý tất cả route tập trung, không cần kiểm tra auth trong từng widget.

## Detailed Answer (EN)
Use the `redirect` callback to check auth state before building routes. If the user isn't logged in and tries to access a protected route, redirect them to the login screen. This approach handles all routes centrally without auth checks scattered across widgets.
