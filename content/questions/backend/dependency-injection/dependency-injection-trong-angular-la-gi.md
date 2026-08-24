---
id: dependency-injection-trong-angular-la-gi
position: backend
technology: dependency-injection
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency Injection trong Angular là gì?

## Question (EN)
What is Dependency Injection in Angular?

## Đáp án chi tiết (VI)
Dependency Injection là cơ chế để class nhận dependency từ Angular injector thay vì tự `new` dependency đó.\
\
Component/service chỉ khai báo cần gì, còn provider quyết định instance nào được cấp. Lợi ích: code dễ test, dễ mock, giảm coupling và quản lý singleton/shared services nhất quán.

## Detailed Answer (EN)
Dependency Injection is the mechanism where a class receives dependencies from an Angular injector instead of creating them with `new`.\
\
A component/service declares what it needs, while providers decide which instance is supplied. Benefits: easier testing, easier mocking, lower coupling and consistent management of singleton/shared services.
