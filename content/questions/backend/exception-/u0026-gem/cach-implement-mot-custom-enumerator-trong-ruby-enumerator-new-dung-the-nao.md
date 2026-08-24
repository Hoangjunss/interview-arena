---
id: cach-implement-mot-custom-enumerator-trong-ruby-enumerator-new-dung-the-nao
position: backend
technology: exception-\u0026-gem
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách implement một custom Enumerator trong Ruby? `Enumerator.new` dùng thế nào?

## Question (EN)
How do you implement a custom Enumerator in Ruby? How does `Enumerator.new` work?

## Đáp án chi tiết (VI)
`Enumerator.new` nhận một block với yielder — gọi `yielder \u003c\u003c value` (hoặc `yielder.yield value`) để emit từng giá trị. Giá trị chỉ được tính khi caller yêu cầu (lazy-compatible).\
\
```ruby\
# Fibonacci vô hạn\
fib = Enumerator.new do |yielder|\
  a, b = 0, 1\
  loop do\
    yielder \u003c\u003c a\
    a, b = b, a + b\
  end\
end\
\
fib.first(8)          # =\u003e [0, 1, 1, 2, 3, 5, 8, 13]\
fib.lazy.select(\u0026:odd?).first(5)  # =\u003e [1, 1, 3, 5, 13]\
\
# Custom Enumerator trên class có sẵn\
class BinaryTree\
  def each\
    return enum_for(:each) unless block_given?  # tạo Enumerator nếu không có block\
    # ... traverse logic\
  end\
end\
```\
\
`enum_for(:method_name)` (alias `to_enum`) là cách tiêu chuẩn cho method `each` trả về Enumerator khi không có block — giúp tương thích với `.lazy`, `.map`, `.select`.

## Detailed Answer (EN)
`Enumerator.new` takes a block with a yielder — call `yielder \u003c\u003c value` (or `yielder.yield value`) to emit each value. Values are only computed when the caller requests them (lazy-compatible).\
\
```ruby\
fib = Enumerator.new do |yielder|\
  a, b = 0, 1\
  loop do\
    yielder \u003c\u003c a\
    a, b = b, a + b\
  end\
end\
\
fib.first(8)          # =\u003e [0, 1, 1, 2, 3, 5, 8, 13]\
fib.lazy.select(\u0026:odd?).first(5)  # =\u003e [1, 1, 3, 5, 13]\
\
# Standard pattern: return Enumerator when no block given\
class BinaryTree\
  def each\
    return enum_for(:each) unless block_given?\
    # ... traversal\
  end\
end\
```\
\
`enum_for(:method_name)` (alias `to_enum`) is the standard idiom for making an `each`-style method return an `Enumerator` when called without a block — enabling `.lazy`, `.map`, `.select` chaining.
