---
id: alias-va-alias-method-trong-ruby-khac-nhau-the-nao
position: backend
technology: oop-\u0026-module
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`alias` và `alias_method` trong Ruby khác nhau thế nào?

## Question (EN)
What is the difference between `alias` and `alias_method` in Ruby?

## Đáp án chi tiết (VI)
| | `alias` | `alias_method` |\
|---|---|---|\
| Loại | Keyword (cú pháp ngôn ngữ) | Method của Module |\
| Cú pháp | `alias new_name old_name` (không dấu phẩy, chỉ symbol/bare word) | `alias_method :new_name, :old_name` (symbol/string, dấu phẩy) |\
| Tên động | Không hỗ trợ | Có — nhận biến/expression |\
| Kế thừa | Alias được resolve tại thời điểm định nghĩa (bind tĩnh) | Alias được resolve lúc gọi — override ở subclass hoạt động |\
\
```ruby\
class Parent\
  def greet = \\"hello from Parent\\"\
  alias_method :hi, :greet\
end\
\
class Child \u003c Parent\
  def greet = \\"hello from Child\\"\
end\
\
Child.new.hi   # =\u003e \\"hello from Child\\"  (alias_method — dynamic)\
\
# Nếu dùng alias trong Parent:\
# Child.new.hi   # =\u003e \\"hello from Parent\\"  (alias — static)\
```\
\
Dùng `alias_method` trong module/metaprogramming. Dùng `alias` khi cần cú pháp đơn giản trong class body.

## Detailed Answer (EN)
| | `alias` | `alias_method` |\
|---|---|---|\
| Type | Keyword (language syntax) | Module method |\
| Syntax | `alias new_name old_name` (no comma, symbol/bare word) | `alias_method :new, :old` (symbol/string, comma) |\
| Dynamic names | Not supported | Yes — accepts variables/expressions |\
| Inheritance | Resolved at definition time (static binding) | Resolved at call time — subclass overrides work |\
\
```ruby\
class Parent\
  def greet = \\"hello from Parent\\"\
  alias_method :hi, :greet\
end\
\
class Child \u003c Parent\
  def greet = \\"hello from Child\\"\
end\
\
Child.new.hi   # =\u003e \\"hello from Child\\"  (alias_method — dynamic)\
# With plain alias in Parent: Child.new.hi =\u003e \\"hello from Parent\\"  (static)\
```\
\
Prefer `alias_method` in modules and metaprogramming contexts. Use `alias` for simple renaming inside a class body.
