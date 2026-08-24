---
id: refinement-trong-ruby-la-gi-khac-monkey-patching-the-nao
position: backend
technology: oop-\u0026-module
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Refinement trong Ruby là gì? Khác Monkey Patching thế nào?

## Question (EN)
What is a Refinement in Ruby? How does it differ from monkey patching?

## Đáp án chi tiết (VI)
Refinement (Ruby 2.0+) là cách mở rộng class **có phạm vi giới hạn** — method chỉ có hiệu lực trong file/module đã khai báo `using`, không lan ra toàn global như monkey patch.\
\
```ruby\
module StringExtras\
  refine String do\
    def palindrome?\
      self == reverse\
    end\
  end\
end\
\
# NGOÀI scope using — chưa có hiệu lực\
\\"racecar\\".respond_to?(:palindrome?)  # =\u003e false\
\
# BÊN TRONG scope using\
using StringExtras\
\\"racecar\\".palindrome?   # =\u003e true\
\\"hello\\".palindrome?     # =\u003e false\
```\
\
| | Monkey Patch | Refinement |\
|---|---|---|\
| Phạm vi | **Global** — ảnh hưởng toàn app | **Lexical scope** — chỉ sau `using` |\
| An toàn | Thấp — conflict với gem khác | Cao — cô lập |\
| Hiệu năng | Bình thường | Nhẹ hơn do không thay đổi global vtable |\
\
Dùng Refinement khi cần thêm method vào built-in class mà không muốn ảnh hưởng code ngoài scope của mình.

## Detailed Answer (EN)
A Refinement (Ruby 2.0+) extends a class in a **limited scope** — methods are active only within files/modules that call `using`, not globally like a monkey patch.\
\
```ruby\
module StringExtras\
  refine String do\
    def palindrome?\
      self == reverse\
    end\
  end\
end\
\
# OUTSIDE using scope — not visible\
\\"racecar\\".respond_to?(:palindrome?)  # =\u003e false\
\
# INSIDE using scope\
using StringExtras\
\\"racecar\\".palindrome?   # =\u003e true\
```\
\
| | Monkey Patch | Refinement |\
|---|---|---|\
| Scope | **Global** — affects entire app | **Lexical scope** — only after `using` |\
| Safety | Low — conflicts with gems | High — isolated |\
\
Use Refinements when you need to extend a built-in class without polluting the global namespace.
