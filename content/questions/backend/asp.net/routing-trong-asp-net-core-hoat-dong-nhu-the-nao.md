---
id: routing-trong-asp-net-core-hoat-dong-nhu-the-nao
position: backend
technology: asp.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Routing trong ASP.NET Core hoạt động như thế nào?

## Question (EN)
How does routing work in ASP.NET Core?

## Đáp án chi tiết (VI)
Routing ánh xạ HTTP request đến controller action. Có hai cách: conventional routing dùng pattern định sẵn (`{controller}/{action}/{id}`) và attribute routing dùng `[Route]` attribute trực tiếp trên controller/action. Attribute routing cho kiểm soát chi tiết hơn. Route parameters bind vào action parameters; query parameters cũng bind tương tự. Routing phối hợp với model binding để invoke đúng action.

## Detailed Answer (EN)
Routing maps incoming HTTP requests to controller actions. Two approaches: conventional routing using predefined patterns (`{controller}/{action}/{id}`), and attribute routing using `[Route]` attributes on controllers/actions. Attribute routing provides finer control. Route parameters bind to action parameters; query parameters bind similarly. Routing combines with model binding to invoke the correct action.
