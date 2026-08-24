---
id: generics-trong-c-la-gi-va-tai-sao-quan-trong
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generics trong C# là gì và tại sao quan trọng?

## Question (EN)
What are generics and why are they important in C#?

## Đáp án chi tiết (VI)
Generics cung cấp code type-safe và có thể tái dùng thông qua cú pháp `\u003cT\u003e`: `List\u003cint\u003e`, `Dictionary\u003cstring, object\u003e`. Chúng loại bỏ boxing/unboxing overhead, cho phép kiểm tra kiểu tại compile-time và cải thiện hiệu năng đáng kể. Dùng generics để tạo containers và methods linh hoạt hoạt động được với nhiều kiểu dữ liệu trong khi vẫn đảm bảo type safety.

## Detailed Answer (EN)
Generics provide type-safe, reusable code via `\u003cT\u003e` syntax: `List\u003cint\u003e`, `Dictionary\u003cstring, object\u003e`. They eliminate boxing/unboxing overhead, enable compile-time type checking, and significantly improve performance. Use generics to create flexible containers and methods that work across types while maintaining full type safety.
