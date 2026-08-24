---
id: readonly-classes-trong-php-8-2-co-nhung-rang-buoc-gi
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Readonly classes trong PHP 8.2 có những ràng buộc gì?

## Question (EN)
What are the constraints of readonly classes introduced in PHP 8.2?

## Đáp án chi tiết (VI)
Readonly classes ngăn sửa đổi các public property sau khi khởi tạo. Ràng buộc cụ thể: mọi property phải có kiểu (không được khai báo untyped), không thể có static property, không dùng được `#[AllowDynamicProperties]`, và mỗi property phải được gán giá trị trong constructor. \
\
**Ví dụ:** `readonly class Address { public function __construct(public string $street, public string $city) {} }`. Rất phù hợp để xây dựng Value Object và DTO bất biến. \
\
**Ràng buộc kế thừa:** readonly class **không thể** được extend bởi non-readonly class. Child class bắt buộc phải cũng là readonly — đây là ràng buộc của PHP 8.2.

## Detailed Answer (EN)
Readonly classes prevent property modification after instantiation. Specific constraints: all properties must be typed (no untyped declarations allowed), cannot declare static properties, cannot use `#[AllowDynamicProperties]`, and every property must receive a value in the constructor. \
\
**Example:** `readonly class Address { public function __construct(public string $street, public string $city) {} }`. Ideal for immutable Value Objects and DTOs. \
\
**Inheritance constraint:** a readonly class **cannot** be extended by a non-readonly class — any child class must also be declared `readonly`. This is a hard PHP 8.2 language rule.
