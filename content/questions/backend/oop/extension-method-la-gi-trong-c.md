---
id: extension-method-la-gi-trong-c
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Extension method là gì trong C#?

## Question (EN)
What are extension methods in C#?

## Đáp án chi tiết (VI)
Extension method cho phép thêm method mới vào class đã có mà không cần subclass hay sửa source code. Khai báo chúng là `static` trong static class: `public static void CustomMethod(this MyClass obj) {}`. Extension method hữu ích để thêm functionality cho third-party types hoặc framework types và hỗ trợ method chaining. Tránh lạm dụng vì có thể gây khó hiểu khi đọc code.

## Detailed Answer (EN)
Extension methods add new methods to existing classes without subclassing or modifying source code. Declare them as `static` in a static class: `public static void CustomMethod(this MyClass obj) {}`. They enable method chaining on third-party and framework types. Use sparingly — overuse creates confusion about where methods are defined.
