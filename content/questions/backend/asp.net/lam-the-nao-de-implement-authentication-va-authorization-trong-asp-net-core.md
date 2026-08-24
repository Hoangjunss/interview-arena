---
id: lam-the-nao-de-implement-authentication-va-authorization-trong-asp-net-core
position: backend
technology: asp.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để implement authentication và authorization trong ASP.NET Core?

## Question (EN)
How do you implement authentication and authorization in ASP.NET Core?

## Đáp án chi tiết (VI)
Authentication xác minh danh tính người dùng; authorization kiểm tra quyền hạn. Dùng `AddAuthentication()` để đăng ký auth scheme (JWT, cookies, OAuth) và `AddAuthorization()` để cấu hình policies. Middleware: `app.UseAuthentication()` phải đặt trước `app.UseAuthorization()` — thứ tự quan trọng. Dùng `[Authorize]` attribute trên controllers/actions; dùng claim-based policies cho kiểm soát chi tiết.

## Detailed Answer (EN)
Authentication verifies user identity; authorization checks permissions. Use `AddAuthentication()` to register auth schemes (JWT, cookies, OAuth) and `AddAuthorization()` to configure policies. In middleware: `app.UseAuthentication()` must come before `app.UseAuthorization()` — order matters. Use the `[Authorize]` attribute on controllers/actions and claim-based policies for fine-grained control.
