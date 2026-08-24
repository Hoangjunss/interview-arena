---
id: include-extend-va-prepend-trong-ruby-khac-nhau-the-nao
position: backend
technology: oop-\u0026-module
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`include`, `extend`, và `prepend` trong Ruby khác nhau thế nào?

## Question (EN)
What is the difference between `include`, `extend`, and `prepend` in Ruby?

## Đáp án chi tiết (VI)
Cả 3 đều đưa module vào class, nhưng tác dụng lên **method lookup chain** khác nhau:\
\
| Keyword | Method thêm vào | Gọi từ |\
|---|---|---|\
| `include` | instance methods | object instances |\
| `extend` | class methods (singleton) | class trực tiếp |\
| `prepend` | instance methods (ưu tiên hơn class) | object instances, override class methods |\
\
`prepend` chèn module **trước** class trong lookup chain — khi gọi method, module được tìm trước. Thường dùng để wrap method mà không monkey-patch (pattern AOP / decorator): module định nghĩa `save` gọi `super` để tiếp tục vào `save` gốc của class.

## Detailed Answer (EN)
All three mix a module into a class, but they differ in where methods land in the **method lookup chain**:\
\
| Keyword | Adds methods as | Called from |\
|---|---|---|\
| `include` | instance methods | object instances |\
| `extend` | class (singleton) methods | the class itself |\
| `prepend` | instance methods (higher priority) | object instances, overrides class methods |\
\
`prepend` inserts the module **before** the class in the lookup chain — the module method is found first. Commonly used to wrap methods without monkey-patching (AOP / decorator): the module defines `save`, calls `super`, which then calls the class's original `save`.
