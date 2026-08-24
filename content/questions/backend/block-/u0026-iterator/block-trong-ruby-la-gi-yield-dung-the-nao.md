---
id: block-trong-ruby-la-gi-yield-dung-the-nao
position: backend
technology: block-\u0026-iterator
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Block trong Ruby là gì? `yield` dùng thế nào?

## Question (EN)
What is a block in Ruby and how does `yield` work?

## Đáp án chi tiết (VI)
Block là một đoạn code ẩn danh truyền cho method, **không phải object**, không gán vào biến được. Viết bằng `{}` (1 dòng) hoặc `do...end` (nhiều dòng). Method gọi block bằng `yield`.\
\
```ruby\
def greet\
  puts \\"Before\\"\
  yield            # gọi block\
  puts \\"After\\"\
end\
\
greet { puts \\"Hello!\\" }\
# Before\
# Hello!\
# After\
\
# yield với argument\
def double(n)\
  yield(n * 2)\
end\
double(5) { |x| puts x }  # =\u003e 10\
\
# Kiểm tra block có được truyền không\
def safe_call\
  yield if block_given?\
end\
```

## Detailed Answer (EN)
A block is an anonymous piece of code passed to a method — it is **not an object** and cannot be assigned to a variable. Written with `{}` (single-line) or `do...end` (multi-line). A method calls the block using `yield`.\
\
```ruby\
def greet\
  puts \\"Before\\"\
  yield\
  puts \\"After\\"\
end\
\
greet { puts \\"Hello!\\" }\
# Before\
# Hello!\
# After\
\
# yield with argument\
def double(n)\
  yield(n * 2)\
end\
double(5) { |x| puts x }  # =\u003e 10\
\
# Guard: only yield if block given\
def safe_call\
  yield if block_given?\
end\
```
