---
id: keyed-services-fromkeyedservices-trong-net-8-giai-quyet-van-de-gi
position: backend
technology: modern-.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Keyed Services (`[FromKeyedServices]`) trong .NET 8 giải quyết vấn đề gì?

## Question (EN)
What problem do Keyed Services ([FromKeyedServices]) solve in .NET 8 dependency injection?

## Đáp án chi tiết (VI)
Khi có nhiều implementation của cùng một interface, DI truyền thống chỉ resolve được implementation cuối đăng ký. Keyed services cho phép đặt tên: `services.AddKeyedScoped\u003cINotifier, EmailNotifier\u003e(\\"email\\")`. Inject bằng key: `[FromKeyedServices(\\"email\\")] INotifier notifier`. Giải quyết: factory pattern phức tạp, service locator antipattern, nhập nhằng naming. Tính năng mới từ .NET 8; sạch hơn factory method. Dùng khi interface có nhiều implementation và context quyết định dùng cái nào.

## Detailed Answer (EN)
When multiple implementations share an interface, traditional DI resolves only the last registered implementation. Keyed services allow naming registrations: `services.AddKeyedScoped\u003cINotifier, EmailNotifier\u003e(\\"email\\")`. Inject by key: `[FromKeyedServices(\\"email\\")] INotifier notifier`. This resolves complex factory patterns, the service locator antipattern, and naming ambiguity. A .NET 8+ feature that is cleaner than factory methods. Use when an interface has multiple implementations and context determines which is needed.
