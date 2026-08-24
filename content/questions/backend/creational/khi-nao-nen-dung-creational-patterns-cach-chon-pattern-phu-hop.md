---
id: khi-nao-nen-dung-creational-patterns-cach-chon-pattern-phu-hop
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng Creational patterns? Cách chọn pattern phù hợp?

## Question (EN)
When should you use Creational patterns? How do you choose the right one?

## Đáp án chi tiết (VI)
Creational patterns giải quyết vấn đề tạo object một cách linh hoạt. Cách chọn:\
\
- **Singleton**: cần đúng một instance shared toàn app (logger, config) — nhưng ưu tiên DI container thay vì tự implement.\
- **Factory Method**: framework cần cho phép subclass override cách tạo object.\
- **Abstract Factory**: cần tạo nhóm object liên quan phải consistent với nhau.\
- **Builder**: object có nhiều optional params hoặc construction process phức tạp nhiều bước.\
- **Prototype**: clone nhanh hơn tạo mới (object expensive to initialize).\
- **Object Pool**: object expensive to create và cần reuse ở high throughput.\
\
Quy tắc thực tế: bắt đầu simple (`new Constructor()`), refactor sang pattern khi thấy pain point rõ ràng. YAGNI áp dụng cho cả design patterns.

## Detailed Answer (EN)
Creational patterns solve the problem of creating objects flexibly. How to choose: use **Singleton** when exactly one shared instance is needed app-wide (logger, config) — but prefer a DI container over a hand-rolled Singleton; use **Factory Method** when a framework needs to let subclasses override how objects are created; use **Abstract Factory** when creating a group of related objects that must be consistent with each other; use **Builder** when an object has many optional parameters or a complex multi-step construction process; use **Prototype** when cloning is faster than creating from scratch; use **Object Pool** when objects are expensive to create and need to be reused. Practical rule: start simple (`new Constructor()`), and refactor to a pattern only when a clear pain point emerges. Over-engineering with patterns from the start is a common mistake — YAGNI applies to design patterns too.
