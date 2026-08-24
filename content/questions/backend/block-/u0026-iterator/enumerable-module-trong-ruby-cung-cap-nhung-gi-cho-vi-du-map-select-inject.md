---
id: enumerable-module-trong-ruby-cung-cap-nhung-gi-cho-vi-du-map-select-inject
position: backend
technology: block-\u0026-iterator
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Enumerable module trong Ruby cung cấp những gì? Cho ví dụ `map`, `select`, `inject`.

## Question (EN)
What does the Enumerable module provide in Ruby? Give examples with `map`, `select`, and `inject`.

## Đáp án chi tiết (VI)
`Enumerable` là module mixin — class nào implement `each` đều có thể include `Enumerable` để nhận ngay ~60 method: `map`, `select`, `reject`, `inject`, `sort_by`, `group_by`, `flat_map`...\
\
```ruby\
nums = [1, 2, 3, 4, 5]\
\
nums.map { |n| n ** 2 }              # =\u003e [1, 4, 9, 16, 25]\
nums.select(\u0026:odd?)                   # =\u003e [1, 3, 5]\
nums.inject(0) { |sum, n| sum + n }  # =\u003e 15\
nums.inject(:+)                       # shorthand =\u003e 15\
(1..6).group_by { |n| n % 3 }        # =\u003e {1=\u003e[1,4], 2=\u003e[2,5], 0=\u003e[3,6]}\
```\
\
Class nào implement `each` và `include Enumerable` sẽ nhận toàn bộ ~60 method này miễn phí.

## Detailed Answer (EN)
`Enumerable` is a mixin module — any class that implements `each` can `include Enumerable` and instantly gain ~60 methods: `map`, `select`, `reject`, `inject`, `sort_by`, `group_by`, `flat_map`...\
\
```ruby\
nums = [1, 2, 3, 4, 5]\
\
nums.map { |n| n ** 2 }              # =\u003e [1, 4, 9, 16, 25]\
nums.select(\u0026:odd?)                   # =\u003e [1, 3, 5]\
nums.inject(0) { |sum, n| sum + n }  # =\u003e 15\
nums.inject(:+)                       # shorthand =\u003e 15\
(1..6).group_by { |n| n % 3 }        # =\u003e {1=\u003e[1,4], 2=\u003e[2,5], 0=\u003e[3,6]}\
```\
\
Any class that implements `each` and `include Enumerable` gets all ~60 methods for free.
