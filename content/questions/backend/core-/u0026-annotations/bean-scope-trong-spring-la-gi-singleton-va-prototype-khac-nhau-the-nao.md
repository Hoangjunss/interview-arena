---
id: bean-scope-trong-spring-la-gi-singleton-va-prototype-khac-nhau-the-nao
position: backend
technology: core-\u0026-annotations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bean scope trong Spring là gì? Singleton và Prototype khác nhau thế nào?

## Question (EN)
What are bean scopes in Spring? How do Singleton and Prototype differ?

## Đáp án chi tiết (VI)
**Scope** xác định vòng đời + số instance của bean.\
\
| Scope | Instance | Dùng khi |\
|---|---|---|\
| **singleton** (default) | **1** dùng chung toàn app | Stateless service, repository |\
| **prototype** | **Mỗi lần inject/getBean** tạo mới | Stateful object (command, builder) |\
| **request** / **session** | 1 / HTTP request / session (Web) | Request / session state |\
\
Khai báo scope khác default: `@Scope(\\"prototype\\")` trên class bean.\
\
**Lưu ý:** inject prototype vào singleton → Spring inject **1 lần lúc startup** → singleton giữ **cùng 1 prototype instance** mãi mãi. Fix: lấy instance mới qua `ApplicationContext.getBean()` hoặc method `@Lookup`.\
\
**Singleton** phù hợp 99% Spring bean vì stateless.

## Detailed Answer (EN)
**Scope** defines the lifecycle and number of instances of a bean.\
\
| Scope | Instances | Use when |\
|---|---|---|\
| **singleton** (default) | **1** shared across the app | Stateless services, repositories |\
| **prototype** | **New on each inject/getBean** | Stateful objects (command, builder) |\
| **request** / **session** | 1 per HTTP request / session (Web) | Request / session state |\
\
Declare a non-default scope with `@Scope(\\"prototype\\")` on the bean class.\
\
**Biggest gotcha:** injecting a prototype into a singleton → Spring injects it **once at startup** → the singleton keeps the **same prototype instance** forever. Fix: obtain fresh instances via `ApplicationContext.getBean()` or a `@Lookup` method.\
\
**Singleton** fits 99% of Spring beans since they are stateless.
