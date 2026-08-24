---
id: super-va-super-trong-ruby-khac-nhau-the-nao
position: backend
technology: oop-\u0026-module
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`super` và `super()` trong Ruby khác nhau thế nào?

## Question (EN)
What is the difference between `super` and `super()` in Ruby?

## Đáp án chi tiết (VI)
Cả hai đều gọi method cùng tên ở superclass, nhưng khác nhau về argument:\
\
| | `super` | `super()` |\
|---|---|---|\
| Argument truyền lên | Tự động forward **tất cả** arg của method hiện tại | Gọi superclass method **không có argument** |\
\
```ruby\
class Animal\
  def initialize(name, age)\
    @name, @age = name, age\
  end\
end\
\
class Dog \u003c Animal\
  def initialize(name, age, breed)\
    super(name, age)   # tường minh — chỉ truyền 2 arg\
    @breed = breed\
  end\
end\
\
class Cat \u003c Animal\
  def initialize(name, age)\
    super           # forward cả name + age\
  end\
end\
\
class Bird \u003c Animal\
  def initialize(name)\
    super()         # gọi Animal#initialize không arg → ArgumentError sẽ xảy ra nếu parent yêu cầu arg\
  end\
end\
```\
\
Lưu ý: dùng `super` không tường minh khi signature parent và child giống nhau; dùng `super(arg1, arg2)` hoặc `super()` khi cần kiểm soát arg.

## Detailed Answer (EN)
Both call the same-named method in the superclass, but differ in argument forwarding:\
\
| | `super` | `super()` |\
|---|---|---|\
| Arguments passed | Auto-forwards **all** current method args | Calls parent with **no arguments** |\
\
```ruby\
class Animal\
  def initialize(name, age)\
    @name, @age = name, age\
  end\
end\
\
class Dog \u003c Animal\
  def initialize(name, age, breed)\
    super(name, age)   # explicit — only 2 args\
    @breed = breed\
  end\
end\
\
class Cat \u003c Animal\
  def initialize(name, age)\
    super           # forwards both name + age\
  end\
end\
```\
\
Rule of thumb: use bare `super` when child and parent signatures match; use `super(args)` or `super()` when you need to control what gets forwarded.
