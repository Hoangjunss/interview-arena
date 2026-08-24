---
id: giai-thich-closure-trong-ruby-block-co-phai-closure-khong
position: backend
technology: block-\u0026-iterator
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích Closure trong Ruby. Block có phải closure không?

## Question (EN)
What is a closure in Ruby? Are blocks closures?

## Đáp án chi tiết (VI)
Closure là một khối code **mang theo scope** tại nơi nó được định nghĩa — nó \\"đóng gói\\" (closes over) các biến local xung quanh và truy cập chúng ngay cả khi scope gốc đã thoát.\
\
Trong Ruby, **proc, lambda và block đều là closure**. Block tuy không phải object nhưng vẫn capture binding của nó.\
\
```ruby\
def make_counter\
  count = 0\
  increment = lambda { count += 1; count }\
  decrement = lambda { count -= 1; count }\
  [increment, decrement]\
end\
\
inc, dec = make_counter\
inc.call  # =\u003e 1\
inc.call  # =\u003e 2\
dec.call  # =\u003e 1\
# count tồn tại trong closure dù make_counter đã return\
```\
\
**Closure dùng để làm gì:** factory function, callback giữ state, DSL, memoization.

## Detailed Answer (EN)
A closure is a code block that **carries its surrounding scope** — it \\"closes over\\" local variables from where it was defined and can access them even after the original scope has returned.\
\
In Ruby, **procs, lambdas, and blocks are all closures**. A block, though not an object, still captures its binding.\
\
```ruby\
def make_counter\
  count = 0\
  increment = lambda { count += 1; count }\
  decrement = lambda { count -= 1; count }\
  [increment, decrement]\
end\
\
inc, dec = make_counter\
inc.call  # =\u003e 1\
inc.call  # =\u003e 2\
dec.call  # =\u003e 1\
# `count` lives in the closure even after make_counter returned\
```\
\
**Closures are used for:** factory functions, stateful callbacks, DSLs, memoization.
