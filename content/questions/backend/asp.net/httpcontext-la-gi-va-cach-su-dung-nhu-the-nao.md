---
id: httpcontext-la-gi-va-cach-su-dung-nhu-the-nao
position: backend
technology: asp.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HttpContext là gì và cách sử dụng như thế nào?

## Question (EN)
What is HttpContext and how do you use it in ASP.NET Core?

## Đáp án chi tiết (VI)
`HttpContext` đóng gói thông tin HTTP request/response, có thể truy cập qua `ControllerBase.HttpContext` hoặc `IHttpContextAccessor`. Truy cập request properties: `Request.Headers`, `Request.Query`, `Request.Path`, `User` identity. Dùng cho các thao tác context-specific như set response headers, đọc user claims, hay truyền dữ liệu qua request pipeline.

## Detailed Answer (EN)
`HttpContext` encapsulates HTTP request/response information, accessible via `ControllerBase.HttpContext` or `IHttpContextAccessor`. Access request properties: `Request.Headers`, `Request.Query`, `Request.Path`, and the `User` identity. Use it for context-specific operations like setting response headers, reading user claims, or passing data through the request pipeline.
