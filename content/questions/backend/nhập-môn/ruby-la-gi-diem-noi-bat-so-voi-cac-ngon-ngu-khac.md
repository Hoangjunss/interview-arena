---
id: ruby-la-gi-diem-noi-bat-so-voi-cac-ngon-ngu-khac
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ruby là gì? Điểm nổi bật so với các ngôn ngữ khác?

## Question (EN)
What is Ruby and what makes it stand out?

## Đáp án chi tiết (VI)
Ruby (Matz, 1995) là ngôn ngữ thông dịch, dynamic typing, **thuần hướng đối tượng**, theo triết lý \\"developer happiness\\" — code đọc gần như tiếng Anh.\
\
Khác biệt so với ngôn ngữ khác:\
- **Mọi thứ đều là object** — kể cả `5` hay `nil` (viết được `5.times { ... }`), khác C/Java vốn có kiểu nguyên thủy riêng.\
- **Mọi thứ là biểu thức**: `if`, `case`, cả phần thân method đều trả về giá trị — khác Java/C#.\
- **Block \u0026 iterator** thay cho `for` loop: `each`, `map`, `select` ngắn gọn; closure/DSL mạnh hơn Python.\
- **Open class + metaprogramming** linh hoạt bậc nhất: thêm/định nghĩa lại method lúc chạy — chính là nền tảng làm nên Rails.\
\
Đánh đổi: chạy chậm hơn ngôn ngữ biên dịch và lỗi kiểu chỉ lộ lúc runtime.

## Detailed Answer (EN)
Ruby (Matz, 1995) is an interpreted, dynamically typed, **purely object-oriented** language built around \\"developer happiness\\" — code reads almost like English.\
\
What sets it apart from other languages:\
- **Everything is an object** — even `5` or `nil` (you can write `5.times { ... }`), unlike C/Java with separate primitive types.\
- **Everything is an expression**: `if`, `case`, even a method body all return a value — unlike Java/C#.\
- **Blocks \u0026 iterators** replace `for` loops: `each`, `map`, `select` are concise, with stronger closures/DSLs than Python.\
- **Open classes + metaprogramming** are exceptionally flexible: add/redefine methods at runtime — the very foundation that makes Rails possible.\
\
Trade-off: slower than compiled languages, and type errors surface only at runtime.
