---
id: define-method-khac-gi-def-thong-thuong-khi-nao-dung-define-method
position: backend
technology: metaprogramming
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`define_method` khác gì `def` thông thường? Khi nào dùng `define_method`?

## Question (EN)
How does `define_method` differ from a regular `def`? When should you use it?

## Đáp án chi tiết (VI)
`def` là keyword — tên method phải là identifier tĩnh biết lúc viết code. `define_method` là **method nhận tên động** (string/symbol), cho phép tạo method theo pattern lúc runtime.\
\
```ruby\
class Status\
  STATES = %i[pending active suspended]\
\
  STATES.each do |state|\
    define_method(\\"#{state}?\\") do\
      @state == state\
    end\
    define_method(\\"#{state}!\\") do\
      @state = state\
    end\
  end\
end\
\
obj = Status.new\
obj.active!    # setter\
obj.active?    # =\u003e true\
obj.pending?   # =\u003e false\
```\
\
**Khi dùng `define_method`:**\
- Sinh nhiều method theo pattern (tránh copy-paste).\
- Tên method đến từ data (symbol array, config...).\
- Cần closure (capture biến từ scope tạo method).\
\
`define_method` + block là closure, còn `def` thì không capture biến ngoài.

## Detailed Answer (EN)
`def` is a keyword — the method name must be a static identifier known at write-time. `define_method` is a **method that accepts a dynamic name** (string/symbol), enabling method creation from patterns at runtime.\
\
```ruby\
class Status\
  STATES = %i[pending active suspended]\
\
  STATES.each do |state|\
    define_method(\\"#{state}?\\") do\
      @state == state\
    end\
    define_method(\\"#{state}!\\") do\
      @state = state\
    end\
  end\
end\
\
obj = Status.new\
obj.active!\
obj.active?    # =\u003e true\
obj.pending?   # =\u003e false\
```\
\
**When to use `define_method`:**\
- Generate many methods from a pattern (no copy-paste).\
- Method names come from data (symbol array, config).\
- Need a closure (capture variables from the outer scope).\
\
Key distinction: a `define_method` block is a closure and captures outer variables; a `def` body is not.
