---
id: 3-lifetime-cua-dependency-injection-trong-asp-net-core-la-gi-va-dung-khi-nao
position: backend
technology: asp.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
3 lifetime của Dependency Injection trong ASP.NET Core là gì và dùng khi nào?

## Question (EN)
What are the three DI lifetimes in ASP.NET Core and when should you use each?

## Đáp án chi tiết (VI)
ASP.NET Core hỗ trợ ba lifetime, lựa chọn theo đặc tính stateful của service.\
\
- **Transient**: instance mới mỗi lần resolve — stateless utilities, helper\
- **Scoped**: cùng instance trong một HTTP request — `DbContext`, `UnitOfWork`\
- **Singleton**: một instance duy nhất suốt đời app — logging, configuration, in-memory cache\
\
Không bao giờ inject Scoped vào Singleton — gây \\"captive dependency\\" bug nghiêm trọng (xem #2775).

## Detailed Answer (EN)
ASP.NET Core offers three lifetimes; pick based on the service's stateful characteristics.\
\
- **Transient**: a new instance per resolve — stateless utilities, helpers\
- **Scoped**: the same instance per HTTP request — `DbContext`, `UnitOfWork`\
- **Singleton**: one instance for the application lifetime — logging, configuration, in-memory cache\
\
Never inject a Scoped service into a Singleton — it creates a \\"captive dependency\\" bug (see #2775).
