---
id: lam-the-nao-de-implement-method-chaining-voi-exception-handling-an-toan-trong-ru
position: backend
technology: exception-\u0026-gem
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để implement method chaining với exception handling an toàn trong Ruby (Railway-Oriented Programming)?

## Question (EN)
How do you implement safe method chaining with exception handling in Ruby (Railway-Oriented Programming)?

## Đáp án chi tiết (VI)
Railway-Oriented Programming (ROP) áp dụng `Result` pattern — mỗi bước trả về success hoặc failure, chain chỉ tiếp tục khi success.\
\
Cách đơn giản nhất trong Ruby là dùng gem `dry-monads` hoặc tự implement với `Struct`:\
\
```ruby\
Success = Struct.new(:value)\
Failure = Struct.new(:error)\
\
def parse_age(input)\
  n = Integer(input)\
  n \u003e 0 ? Success.new(n) : Failure.new(\\"Age must be positive\\")\
rescue ArgumentError\
  Failure.new(\\"Not a valid integer\\")\
end\
\
def validate_adult(age)\
  age \u003e= 18 ? Success.new(age) : Failure.new(\\"Must be 18+\\")\
end\
\
result = parse_age(\\"25\\")\
result = validate_adult(result.value) if result.is_a?(Success)\
\
case result\
in Success[value] then puts \\"Valid age: #{value}\\"\
in Failure[error] then puts \\"Error: #{error}\\"\
end\
```\
\
Gem `dry-rb` (dry-monads, dry-validation) cung cấp full ROP/monad cho production. Pattern này tránh exception cho business logic — exception chỉ dùng cho lỗi hệ thống thực sự.

## Detailed Answer (EN)
Railway-Oriented Programming (ROP) applies the `Result` pattern — each step returns success or failure, and the chain only continues on success.\
\
The simplest Ruby approach uses a `Struct`:\
\
```ruby\
Success = Struct.new(:value)\
Failure = Struct.new(:error)\
\
def parse_age(input)\
  n = Integer(input)\
  n \u003e 0 ? Success.new(n) : Failure.new(\\"Age must be positive\\")\
rescue ArgumentError\
  Failure.new(\\"Not a valid integer\\")\
end\
\
def validate_adult(age)\
  age \u003e= 18 ? Success.new(age) : Failure.new(\\"Must be 18+\\")\
end\
\
result = parse_age(\\"25\\")\
result = validate_adult(result.value) if result.is_a?(Success)\
\
case result\
in Success[value] then puts \\"Valid age: #{value}\\"\
in Failure[error] then puts \\"Error: #{error}\\"\
end\
```\
\
The `dry-rb` family (dry-monads, dry-validation) provides full ROP/monad support for production. The pattern avoids exceptions for business logic — exceptions are reserved for true system errors.
