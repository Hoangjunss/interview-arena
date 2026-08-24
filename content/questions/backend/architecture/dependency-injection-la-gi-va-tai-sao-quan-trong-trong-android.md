---
id: dependency-injection-la-gi-va-tai-sao-quan-trong-trong-android
position: backend
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency injection là gì và tại sao quan trọng trong Android?

## Question (EN)
What is dependency injection and why is it important in Android?

## Đáp án chi tiết (VI)
Dependency injection nghĩa là cung cấp dependency của một object qua tham số thay vì object tự tạo bên trong. \
\
**Lợi ích:** test dễ hơn (truyền mock dependency), loose coupling, linh hoạt khi đổi implementation. \
\
**Ví dụ:** thay vì `val database = Database.getInstance()` bên trong class, hãy truyền vào: `class MyClass(val database: Database)`. Code modular và testable hơn nhiều.

## Detailed Answer (EN)
Dependency injection means providing an object's dependencies through parameters instead of the object creating them internally. \
\
**Benefits:** easier testing (pass mock dependencies), loose coupling, flexibility to change implementations. For example, instead of `val database = Database.getInstance()` inside the class, pass it: `class MyClass(val database: Database)`. This makes code modular and testable.
