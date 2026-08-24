---
id: record-trong-c-la-gi-va-khac-class-nhu-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Record trong C# là gì và khác class như thế nào?

## Question (EN)
What are records in C# and how do they differ from classes?

## Đáp án chi tiết (VI)
Record (C# 9+) là immutable reference type với equality dựa trên giá trị field, không phải tham chiếu — hai record có cùng giá trị được coi là bằng nhau. Record có cú pháp ngắn gọn với positional parameters và tự động implement `GetHashCode()` cùng `Equals()`. Dùng record cho DTOs, value objects và domain model immutable. Class vẫn phù hợp hơn khi cần mutable state và behavior phức tạp.

## Detailed Answer (EN)
Records (C# 9+) are immutable reference types with built-in value-based equality — two records with identical field values are considered equal. They provide concise syntax with positional parameters and automatically implement `GetHashCode()` and `Equals()`. Use records for DTOs, value objects, and immutable domain models. Classes remain better suited for mutable state and complex behavior.
