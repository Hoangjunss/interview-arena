---
id: class-eval-va-instance-eval-trong-ruby-dung-de-lam-gi
position: backend
technology: metaprogramming
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`class_eval` và `instance_eval` trong Ruby dùng để làm gì?

## Question (EN)
What are `class_eval` and `instance_eval` used for in Ruby?

## Đáp án chi tiết (VI)
- **`class_eval`** (alias `module_eval`): chạy block trong ngữ cảnh class — method định nghĩa trong đó là instance method của class đó.\
- **`instance_eval`**: chạy block trong ngữ cảnh object cụ thể — method định nghĩa là singleton method của object đó.\
\
```ruby\
String.class_eval do\
  def palindrome?\
    self == self.reverse\
  end\
end\
\\"racecar\\".palindrome?  # =\u003e true\
\
obj = Object.new\
obj.instance_eval { def greet = \\"hello from singleton\\" }\
obj.greet  # =\u003e \\"hello from singleton\\"\
```\
\
Dùng `class_eval` khi động thêm method vào class biết qua biến (không phải tên literal). `instance_eval` ít gặp hơn, thường trong DSL builder (Rack middleware config, v.v.).

## Detailed Answer (EN)
- **`class_eval`** (alias `module_eval`): runs a block in the context of a class — methods defined inside become instance methods of that class.\
- **`instance_eval`**: runs a block in the context of a specific object — methods defined become singleton methods of that object.\
\
```ruby\
String.class_eval do\
  def palindrome?\
    self == self.reverse\
  end\
end\
\\"racecar\\".palindrome?  # =\u003e true\
\
obj = Object.new\
obj.instance_eval { def greet = \\"hello from singleton\\" }\
obj.greet  # =\u003e \\"hello from singleton\\"\
```\
\
Use `class_eval` when dynamically adding methods to a class held in a variable. `instance_eval` is less common — mainly used in DSL builders (Rack config, etc.).
