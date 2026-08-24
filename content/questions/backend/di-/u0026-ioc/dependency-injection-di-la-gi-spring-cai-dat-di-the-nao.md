---
id: dependency-injection-di-la-gi-spring-cai-dat-di-the-nao
position: backend
technology: di-\u0026-ioc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency Injection (DI) là gì? Spring cài đặt DI thế nào?

## Question (EN)
What is Dependency Injection (DI) and how does Spring implement it?

## Đáp án chi tiết (VI)
**DI:** dependency được cung cấp **từ bên ngoài** thay vì object tự `new` → giảm coupling, tăng testability (mock được khi test). Thay vì khởi tạo cứng `new UserRepository()` bên trong class, constructor nhận sẵn `UserRepository` từ ngoài — class chỉ khai báo *cần gì*, không quan tâm *tạo thế nào*.\
\
**3 cách inject:**\
- **Constructor** — **KHUYẾN NGHỊ**: immutable (`final`), required dependency rõ ràng, dễ test. Spring 4.3+ có 1 constructor thì khỏi `@Autowired`.\
- **Setter** — cho dependency **optional**.\
- **Field** (`@Autowired` trên field) — gọn nhưng **anti-pattern**: khó test, ẩn dependency.\
\
**IoC container** (`ApplicationContext`) quản lý lifecycle bean + tự wiring qua component scan. (Code minh hoạ 3 kiểu: xem câu constructor/setter/field injection.)

## Detailed Answer (EN)
**DI:** dependencies are supplied **from outside** instead of an object `new`-ing them → less coupling, better testability (mockable in tests). Instead of hardcoding `new UserRepository()` inside the class, the constructor receives a `UserRepository` from outside — the class declares *what it needs*, not *how to create it*.\
\
**Three injection styles:**\
- **Constructor** — **RECOMMENDED**: immutable (`final`), required deps explicit, easy to test. Spring 4.3+ needs no `@Autowired` for a single constructor.\
- **Setter** — for **optional** dependencies.\
- **Field** (`@Autowired` on a field) — concise but an **anti-pattern**: hard to test, hides dependencies.\
\
The **IoC container** (`ApplicationContext`) manages bean lifecycle + auto-wires via component scan. (Code for the three styles: see the constructor/setter/field injection item.)
