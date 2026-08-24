---
id: throw-catch-trong-ruby-khac-gi-raise-rescue
position: backend
technology: exception-\u0026-gem
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`throw`/`catch` trong Ruby khác gì `raise`/`rescue`?

## Question (EN)
How do `throw`/`catch` differ from `raise`/`rescue` in Ruby?

## Đáp án chi tiết (VI)
`raise`/`rescue` là cơ chế **exception handling** — dùng khi có lỗi thật.\
`throw`/`catch` là cơ chế **control flow** — dùng để thoát khỏi vòng lặp lồng nhau mà không có lỗi gì.\
\
```ruby\
# throw/catch — thoát sớm khỏi nested loop\
result = catch(:found) do\
  (1..100).each do |i|\
    (1..100).each do |j|\
      throw(:found, [i, j]) if i * j == 42\
    end\
  end\
  nil  # không tìm thấy\
end\
\
puts result.inspect  # =\u003e [1, 42] hoặc [2, 21] ...\
```\
\
**`throw` không phải exception** — nó không tạo stack trace, không chậm như raise. Dùng khi cần thoát sớm mà `break` không đủ (vì `break` chỉ thoát 1 cấp vòng lặp).\
\
**Hình dung:** `raise` như báo cháy; `throw` như nút eject — thoát nhanh không có cảnh báo.

## Detailed Answer (EN)
`raise`/`rescue` is an **exception handling** mechanism — for actual errors.\
`throw`/`catch` is a **control flow** mechanism — for early exit from nested code without any error.\
\
```ruby\
result = catch(:found) do\
  (1..100).each do |i|\
    (1..100).each do |j|\
      throw(:found, [i, j]) if i * j == 42\
    end\
  end\
  nil\
end\
\
puts result.inspect  # =\u003e [1, 42] or [2, 21] ...\
```\
\
**`throw` is not an exception** — no stack trace, none of the overhead of `raise`. Use it when you need to exit multiple levels of loops and `break` (single-level only) is insufficient.\
\
Mental model: `raise` is a fire alarm; `throw` is an eject button — fast exit, no warning.
