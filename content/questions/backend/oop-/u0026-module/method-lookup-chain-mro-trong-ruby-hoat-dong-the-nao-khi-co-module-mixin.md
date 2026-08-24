---
id: method-lookup-chain-mro-trong-ruby-hoat-dong-the-nao-khi-co-module-mixin
position: backend
technology: oop-\u0026-module
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Method lookup chain (MRO) trong Ruby hoạt động thế nào khi có module mixin?

## Question (EN)
How does the method lookup chain (MRO) work in Ruby when modules are mixed in?

## Đáp án chi tiết (VI)
Khi gọi method, Ruby tìm theo thứ tự: **object eigenclass → class → prepended modules (LIFO) → included modules (LIFO) → superclass** và cứ thế leo lên đến `BasicObject`.\
\
```ruby\
module M1; def hello = \\"M1\\"; end\
module M2; def hello = \\"M2\\"; end\
\
class Base\
  def hello = \\"Base\\"\
end\
\
class Child \u003c Base\
  include M1\
  include M2   # include sau → cao hơn trong chain\
end\
\
Child.ancestors\
# =\u003e [Child, M2, M1, Base, Object, Kernel, BasicObject]\
\
Child.new.hello  # =\u003e \\"M2\\"  — M2 được tìm thấy trước\
```\
\
`prepend` chèn module trước class trong chain, `include` chèn sau class (trước superclass). Hình dung: ancestors là danh sách ưu tiên tra cứu — phần tử đầu tiên có method phù hợp thắng.

## Detailed Answer (EN)
When a method is called, Ruby searches: **object eigenclass → class → prepended modules (LIFO) → included modules (LIFO) → superclass**, all the way up to `BasicObject`.\
\
```ruby\
module M1; def hello = \\"M1\\"; end\
module M2; def hello = \\"M2\\"; end\
\
class Base\
  def hello = \\"Base\\"\
end\
\
class Child \u003c Base\
  include M1\
  include M2  # included last → higher in chain\
end\
\
Child.ancestors\
# =\u003e [Child, M2, M1, Base, Object, Kernel, BasicObject]\
\
Child.new.hello  # =\u003e \\"M2\\"\
```\
\
`prepend` inserts a module before the class; `include` inserts it after the class (before the superclass). Mental model: ancestors is the priority lookup list — the first entry with a matching method wins.
