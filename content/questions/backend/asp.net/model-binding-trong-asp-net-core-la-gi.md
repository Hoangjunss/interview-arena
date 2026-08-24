---
id: model-binding-trong-asp-net-core-la-gi
position: backend
technology: asp.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Model binding trong ASP.NET Core là gì?

## Question (EN)
What is model binding in ASP.NET Core?

## Đáp án chi tiết (VI)
Model binding tự động chuyển đổi HTTP request data (form fields, route data, query strings, JSON body) thành .NET objects. Bind form fields vào action parameters theo tên, JSON body vào complex types, route parameters vào action parameters. Dùng `[FromBody]`, `[FromRoute]`, `[FromQuery]` để chỉ định nguồn rõ ràng. Giúp loại bỏ boilerplate parsing thủ công.

## Detailed Answer (EN)
Model binding automatically converts HTTP request data (form fields, route data, query strings, JSON body) to .NET objects. It binds form fields to action parameters by name, JSON body to complex types, and route parameters to action parameters. Use `[FromBody]`, `[FromRoute]`, `[FromQuery]` to specify sources explicitly. This eliminates manual parsing boilerplate.
