---
id: sealed-class-trong-dart-la-gi-va-tai-sao-no-huu-ich-hon-abstract-class-trong-mot
position: backend
technology: dart-nhập-môn
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sealed class trong Dart là gì và tại sao nó hữu ích hơn abstract class trong một số trường hợp?

## Question (EN)
What is a sealed class in Dart and why is it more useful than an abstract class in some cases?

## Đáp án chi tiết (VI)
Sealed class giới hạn các subclass phải được định nghĩa trong cùng một library, tạo ra tập hợp đóng và biết trước. Khác với abstract class (ai cũng có thể extend từ bất kỳ đâu), sealed class đảm bảo exhaustiveness trong pattern matching—compiler báo lỗi nếu switch thiếu case. \
\
**Ví dụ:** `sealed class Shape {}; class Circle extends Shape {}; class Square extends Shape {};`—switch trên Shape bắt buộc phải handle cả Circle lẫn Square. Rất phù hợp để mô hình hóa sum type như Result, State.

## Detailed Answer (EN)
Sealed classes restrict subclasses to a known, closed set in the same library. Unlike abstract classes (extendable from anywhere), sealed classes guarantee exhaustiveness in pattern matching — the compiler errors if a switch is missing a case. Perfect for modeling sum types like Result or State.
