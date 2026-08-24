---
id: dependency-inversion-principle-dip-la-gi-lien-quan-gi-den-dependency-injection
position: backend
technology: solid
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency Inversion Principle (DIP) là gì? Liên quan gì đến Dependency Injection?

## Question (EN)
What is the Dependency Inversion Principle (DIP)? How does it relate to Dependency Injection?

## Đáp án chi tiết (VI)
DIP có hai quy tắc: (1) module high-level không nên phụ thuộc module low-level, cả hai nên phụ thuộc abstraction; (2) abstraction không nên phụ thuộc detail, mà detail phụ thuộc abstraction. \
\
**Ví dụ:** `UserService` không nên `new MySQLDatabase()` trực tiếp mà nhận `DatabaseInterface` qua constructor — `class UserService { constructor(private db: DatabaseInterface) {} }`. Dependency Injection (DI) là cơ chế triển khai DIP: thay vì class tự tạo dependency, dependency được inject từ bên ngoài (qua constructor, setter, hoặc DI container như NestJS IoC). \
\
**Lợi ích:** dễ swap implementation (đổi từ MySQL sang PostgreSQL không cần sửa UserService), dễ mock trong unit test. DIP là nền tảng của các framework như NestJS, Spring, Angular.

## Detailed Answer (EN)
DIP has two rules: (1) high-level modules should not depend on low-level modules — both should depend on abstractions; (2) abstractions should not depend on details — details should depend on abstractions. For example, `UserService` should not `new MySQLDatabase()` directly but instead receive a `DatabaseInterface` via constructor: `class UserService { constructor(private db: DatabaseInterface) {} }`. Dependency Injection (DI) is the mechanism that implements DIP: instead of a class creating its own dependencies, they are injected from outside (via constructor, setter, or a DI container like NestJS IoC). Benefits include easy implementation swapping (switching MySQL to PostgreSQL without touching UserService) and simple mocking in unit tests. DIP is the foundation of frameworks like NestJS, Spring, and Angular.
