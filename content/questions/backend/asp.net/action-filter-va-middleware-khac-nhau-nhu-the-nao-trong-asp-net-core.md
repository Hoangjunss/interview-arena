---
id: action-filter-va-middleware-khac-nhau-nhu-the-nao-trong-asp-net-core
position: backend
technology: asp.net
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Action filter và middleware khác nhau như thế nào trong ASP.NET Core?

## Question (EN)
What is the difference between an action filter and middleware in ASP.NET Core?

## Đáp án chi tiết (VI)
Middleware xử lý tất cả request trước khi routing, dùng cho cross-cutting concerns toàn cục (logging, CORS, exception handling). Action filter chỉ chạy trên controller action đã được match, có quyền truy cập vào action context và parameters — dùng cho logic controller-specific (authorization, validation, caching). Middleware chạy sớm hơn và rộng hơn; filter chính xác hơn.

## Detailed Answer (EN)
Middleware processes all requests before routing and is used for global cross-cutting concerns (logging, CORS, exception handling). Action filters run only on matched controller actions with access to action context and parameters, making them suitable for controller-specific logic (authorization, validation, caching). Middleware executes earlier and globally; filters are more targeted.
