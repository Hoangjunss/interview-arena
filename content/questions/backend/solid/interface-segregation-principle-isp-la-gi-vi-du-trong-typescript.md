---
id: interface-segregation-principle-isp-la-gi-vi-du-trong-typescript
position: backend
technology: solid
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Interface Segregation Principle (ISP) là gì? Ví dụ trong TypeScript?

## Question (EN)
What is the Interface Segregation Principle (ISP)? Example in TypeScript?

## Đáp án chi tiết (VI)
ISP quy định không nên bắt client implement những interface mà nó không sử dụng — thay vì một interface lớn, hãy tách thành nhiều interface nhỏ, chuyên biệt. \
\
**Ví dụ:** thay vì `interface Animal { fly(): void; swim(): void; run(): void }` bắt `Dog` phải implement `fly()`, ta tách thành `Flyable`, `Swimmable`, `Runnable` rồi `class Dog implements Runnable, Swimmable`. Trong TypeScript, ISP rất tự nhiên vì có thể dùng intersection types và multiple interface implementation. Dấu hiệu vi phạm: class implement interface nhưng để các method trống hoặc throw `NotImplementedException`. ISP đặc biệt quan trọng khi thiết kế API/SDK public — interface nhỏ giúp người dùng dễ hiểu và ít bị breaking change hơn.

## Detailed Answer (EN)
ISP states that clients should not be forced to implement interfaces they don't use — instead of one large interface, split it into smaller, focused ones. For example, instead of `interface Animal { fly(): void; swim(): void; run(): void }` forcing `Dog` to implement `fly()`, split into `Flyable`, `Swimmable`, and `Runnable`, then `class Dog implements Runnable, Swimmable`. TypeScript makes ISP natural through intersection types and multiple interface implementation. A clear violation is a class that implements an interface but leaves certain methods empty or throws `NotImplementedException`. ISP is especially important when designing public APIs or SDKs — smaller interfaces are easier to understand and less prone to breaking changes.
