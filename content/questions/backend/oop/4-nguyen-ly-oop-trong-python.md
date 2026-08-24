---
id: 4-nguyen-ly-oop-trong-python
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
4 nguyên lý OOP trong Python?

## Question (EN)
What are the 4 OOP principles in Python?

## Đáp án chi tiết (VI)
(1) Encapsulation — đóng gói data + methods, dùng `_` (protected) và `__` (name mangling) (2) Inheritance — `class Child(Parent)`, hỗ trợ multiple inheritance, dùng `super()` (3) Polymorphism — cùng method tên, hành vi khác nhau tùy class; duck typing (4) Abstraction — ẩn implementation qua `ABC` + `@abstractmethod`. Lưu ý: Python không có `private` thật sự — `__attr` chỉ là name mangling, vẫn access được qua `_ClassName__attr`.

## Detailed Answer (EN)
(1) Encapsulation — bundle data + methods, use `_` (protected) and `__` (name mangling) (2) Inheritance — `class Child(Parent)`, multiple inheritance supported (3) Polymorphism — same method name, different behavior per class; duck typing (4) Abstraction — hide implementation via `ABC` + `@abstractmethod`. Pitfall: Python has no true private — `__attr` is name mangling, still accessible via `_ClassName__attr`.
