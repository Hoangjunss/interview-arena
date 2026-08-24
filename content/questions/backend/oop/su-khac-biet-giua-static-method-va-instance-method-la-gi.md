---
id: su-khac-biet-giua-static-method-va-instance-method-la-gi
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa static method và instance method là gì?

## Question (EN)
What is the difference between static and instance methods?

## Đáp án chi tiết (VI)
Instance method thuộc về object và truy cập dữ liệu riêng của object qua `$this`. Gọi bằng `$object-\u003emethod()`. Static method thuộc về chính class, không phải instance, và không thể truy cập `$this`. Khai báo với `static function` và gọi bằng `ClassName::method()`. \
\
**Ví dụ:** `User::count()` (static, đếm tổng user) vs `$user-\u003egetName()` (instance, lấy tên user cụ thể). Static method hữu ích cho utility functions, factory methods, hoặc theo dõi dữ liệu cấp class.

## Detailed Answer (EN)
Instance methods belong to an object and access object-specific data via `$this`. Call with `$object-\u003emethod()`. Static methods belong to the class itself, not instances, and cannot access `$this`. Define with `static function` and call with `ClassName::method()` or `$object::method()`. \
\
**Example:** `User::count()` (static, returns total users) vs `$user-\u003egetName()` (instance, returns specific user's name). Static methods are useful for utility functions, factory methods, or tracking class-level data.
