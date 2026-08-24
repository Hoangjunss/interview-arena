---
id: value-objects-trong-php-la-gi-va-khi-nao-nen-dung-thay-vi-kieu-nguyen-thuy
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Value Objects trong PHP là gì và khi nào nên dùng thay vì kiểu nguyên thủy?

## Question (EN)
What are Value Objects in PHP and when should you use them instead of primitives?

## Đáp án chi tiết (VI)
Value Objects là các object bất biến đại diện cho khái niệm nghiệp vụ (Money, Email, Address) thay vì dùng kiểu nguyên thủy dễ sai. \
\
**Ví dụ:** thay `$price = 99.99` (float dễ lỗi làm tròn), dùng `new Money(9999, 'VND')` với validation trong constructor. \
\
**Lợi ích:** type safety, ngôn ngữ domain rõ ràng, đóng gói logic validation, ngăn trạng thái không hợp lệ. `new Email('user@example.com')` sẽ throw exception nếu format sai ngay khi tạo object. Laravel Casts có thể tự hydrate Value Object từ DB. Áp dụng sớm để bắt bug tại compile-time thay vì runtime.

## Detailed Answer (EN)
Value Objects are immutable objects representing domain concepts (Money, Email, Address) instead of error-prone primitives. \
\
**Example:** instead of `$price = 99.99` (float rounding bug-prone), use `new Money(9999, 'VND')` with constructor validation. \
\
**Benefits:** type safety, clear domain language, encapsulated validation logic, prevent invalid states. `new Email('user@example.com')` throws exception on invalid format at creation time. Laravel Casts can hydrate Value Objects from DB automatically. Adopt early to catch bugs at object creation rather than at runtime.
