---
id: access-modifier-public-private-protected-trong-php-la-gi
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Access modifier (public, private, protected) trong PHP là gì?

## Question (EN)
What are access modifiers (public, private, protected)?

## Đáp án chi tiết (VI)
Access modifier kiểm soát khả năng hiển thị của thuộc tính và phương thức: `public` truy cập được từ mọi nơi (trong/ngoài class và subclass), `private` chỉ truy cập được bên trong class đó (không phải subclass), `protected` truy cập được trong class và subclass nhưng không từ bên ngoài. \
\
**Ví dụ:** `private $password` ngăn truy cập trực tiếp như `$user-\u003epassword = \\"hacked\\"`, buộc phải dùng setter method để kiểm tra. Dùng `private` cho dữ liệu nội bộ, `protected` để subclass dùng, `public` cho giao diện ra bên ngoài.

## Detailed Answer (EN)
Access modifiers control visibility of properties and methods: `public` accessible everywhere (inside/outside class and subclasses), `private` accessible only inside that class (not subclasses), `protected` accessible inside class and subclasses but not outside. \
\
**Example:** `private $password` prevents direct access like `$user-\u003epassword = \\"hacked\\"`, forcing use of setter method for validation. Use `private` for internal data, `protected` for subclass access, `public` for intended external interfaces. Encapsulation improves security and maintainability.
