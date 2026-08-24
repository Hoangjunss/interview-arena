---
id: dependency-injection-trong-asp-net-core-la-gi
position: backend
technology: asp.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency Injection trong ASP.NET Core là gì?

## Question (EN)
What is Dependency Injection in ASP.NET Core?

## Đáp án chi tiết (VI)
Dependency Injection cung cấp cho object các dependency của nó thông qua constructor thay vì tự tạo. ASP.NET Core có built-in IoC container (`IServiceProvider`). Đăng ký service trong `Program.cs`: `services.AddScoped\u003cIService, Service\u003e()`. Container quản lý lifetime (Transient, Scoped, Singleton). DI giúp code testable, loosely coupled và dễ bảo trì.

## Detailed Answer (EN)
Dependency injection provides objects their required dependencies through constructors rather than having them create their own. ASP.NET Core includes a built-in IoC container (`IServiceProvider`). Register services in `Program.cs`: `services.AddScoped\u003cIService, Service\u003e()`. The container manages lifetimes (Transient, Scoped, Singleton), enabling testability, loose coupling, and maintainability.
