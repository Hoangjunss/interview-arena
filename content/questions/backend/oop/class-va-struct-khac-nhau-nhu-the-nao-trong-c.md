---
id: class-va-struct-khac-nhau-nhu-the-nao-trong-c
position: backend
technology: oop
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Class và struct khác nhau như thế nào trong C#?

## Question (EN)
What is the difference between class and struct in C#?

## Đáp án chi tiết (VI)
Class là reference type lưu trên heap; struct là value type lưu trên stack. Class hỗ trợ kế thừa; struct thì không (ngôn ngữ không cho phép kế thừa từ value type — không phải \\"mặc định sealed\\"). Class dùng reference equality; struct dùng value equality. Class truyền theo tham chiếu; struct tạo bản sao khi gán. Dùng class cho object phức tạp cần kế thừa; dùng struct cho dữ liệu nhỏ gọn, đơn giản.

## Detailed Answer (EN)
Classes are reference types stored on the heap; structs are value types stored on the stack. Classes support inheritance; structs are implicitly non-inheritable (the language disallows deriving from a value type — they are not technically marked sealed). Classes use reference equality; structs use value equality. Classes pass by reference; structs copy on assignment. Use classes for complex objects with inheritance; use structs for small, simple data.
