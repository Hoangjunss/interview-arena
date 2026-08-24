---
id: companion-object-trong-kotlin-la-gi
position: backend
technology: kotlin-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Companion object trong Kotlin là gì?

## Question (EN)
What is a companion object in Kotlin?

## Đáp án chi tiết (VI)
Companion object cho phép định nghĩa các thành viên kiểu static (hằng số, factory method) bên trong class, thuộc về class chứ không phải instance. Mỗi class chỉ có một companion object. Có thể gọi trực tiếp mà không cần tạo instance: `MyClass.myStaticMethod()`. Giống `static` trong Java nhưng linh hoạt hơn vì có thể implement interface.

## Detailed Answer (EN)
A companion object allows you to define static-like members (constants, factory methods) within a class that belong to the class itself, not instances. Only one companion object is allowed per class. You can call companion object members without creating an instance: `MyClass.myStaticMethod()`. It's similar to `static` in Java but offers better encapsulation and allows implementing interfaces.
