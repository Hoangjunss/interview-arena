---
id: phan-biet-proc-va-lambda-trong-ruby
position: backend
technology: block-\u0026-iterator
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `proc` và `lambda` trong Ruby?

## Question (EN)
What is the difference between `proc` and `lambda` in Ruby?

## Đáp án chi tiết (VI)
Cả hai đều là object `Proc`, khác ở 2 điểm then chốt:\
\
**1. Kiểm tra arity:**\
- `lambda`: sai số arg → `ArgumentError`.\
- `proc`: thiếu → `nil`, thừa → bỏ qua.\
\
**2. Semantics của `return`:**\
- `lambda`: `return` chỉ thoát khỏi lambda.\
- `proc`: `return` thoát khỏi **method** chứa nó (có thể gây `LocalJumpError` nếu không trong method).\
\
```ruby\
lam = lambda { |x| x * 2 }\
lam.call(3)     # =\u003e 6\
lam.call(3, 99) # =\u003e ArgumentError\
\
pr = proc { |x| x * 2 }\
pr.call(3, 99)  # =\u003e 6 (99 bị bỏ)\
\
# Phân biệt return\
def test_lambda\
  lam = lambda { return 10 }\
  lam.call\
  \\"after lambda\\"  # luôn chạy đến đây\
end\
\
def test_proc\
  pr = proc { return 10 }\
  pr.call\
  \\"after proc\\"    # KHÔNG bao giờ chạy\
end\
```\
\
Hình dung: `lambda` hành xử như method thật; `proc` như đoạn code dán thẳng vào chỗ gọi.

## Detailed Answer (EN)
Both are `Proc` objects, but differ on two critical points:\
\
**1. Arity checking:**\
- `lambda`: wrong arg count → `ArgumentError`.\
- `proc`: missing args → `nil`, extra args → ignored.\
\
**2. Return semantics:**\
- `lambda`: `return` exits only the lambda.\
- `proc`: `return` exits the **enclosing method** (causes `LocalJumpError` if there is no enclosing method).\
\
```ruby\
lam = lambda { |x| x * 2 }\
lam.call(3)     # =\u003e 6\
lam.call(3, 99) # =\u003e ArgumentError\
\
pr = proc { |x| x * 2 }\
pr.call(3, 99)  # =\u003e 6 (99 discarded)\
\
def test_lambda\
  lam = lambda { return 10 }\
  lam.call\
  \\"after lambda\\"  # always reached\
end\
\
def test_proc\
  pr = proc { return 10 }\
  pr.call\
  \\"after proc\\"    # never reached\
end\
```\
\
Mental model: a `lambda` behaves like a real method; a `proc` like code pasted inline at the call site.
