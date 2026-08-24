---
id: value-type-va-reference-type-khac-nhau-nhu-the-nao-trong-c
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Value type và reference type khác nhau như thế nào trong C#?

## Question (EN)
What is the difference between value types and reference types in C#?

## Đáp án chi tiết (VI)
Value type (`int`, `float`, `bool`, `struct`) lưu dữ liệu trực tiếp trên stack và tạo bản sao khi truyền đi. Reference type (`class`, `string`, `array`) lưu tham chiếu trên stack trỏ tới dữ liệu trên heap, khi truyền đi thì chia sẻ cùng một đối tượng. Value type nhanh hơn nhưng bị giới hạn bộ nhớ stack; reference type linh hoạt hơn nhưng chịu overhead của garbage collection.

## Detailed Answer (EN)
Value types (`int`, `float`, `bool`, `struct`) store actual data on the stack and copy data when passed around. Reference types (`class`, `string`, `array`) store references on the stack pointing to heap data — passing them shares the same object. Value types are faster but stack-space limited; reference types offer flexibility at the cost of GC overhead.
