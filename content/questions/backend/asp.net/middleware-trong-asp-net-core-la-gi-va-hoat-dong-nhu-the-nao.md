---
id: middleware-trong-asp-net-core-la-gi-va-hoat-dong-nhu-the-nao
position: backend
technology: asp.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware trong ASP.NET Core là gì và hoạt động như thế nào?

## Question (EN)
What is middleware in ASP.NET Core and how does it work?

## Đáp án chi tiết (VI)
Middleware là các C# class xử lý HTTP request/response theo pipeline. Mỗi middleware nhận request, có thể sửa đổi nó, chuyển tiếp cho middleware tiếp theo qua `next()`, rồi xử lý response trên đường về. Middleware phổ biến: authentication, authorization, logging, CORS. Thứ tự rất quan trọng — exception handler đặt trước, CORS trước auth, auth trước authorization.

## Detailed Answer (EN)
Middleware are C# classes that process HTTP requests and responses in a pipeline. Each middleware receives a request, optionally modifies it, passes it to the next middleware via `next()`, then handles the response on the way back. Common middleware: authentication, authorization, logging, CORS. Order matters — exception handlers first, CORS before auth, auth before authorization.
