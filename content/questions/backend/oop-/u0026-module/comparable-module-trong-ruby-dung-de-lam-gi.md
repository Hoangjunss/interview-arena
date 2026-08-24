---
id: comparable-module-trong-ruby-dung-de-lam-gi
position: backend
technology: oop-\u0026-module
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Comparable module trong Ruby dùng để làm gì?

## Question (EN)
What does the Comparable module do in Ruby?

## Đáp án chi tiết (VI)
`Comparable` cho phép class định nghĩa thứ tự bằng cách implement **duy nhất 1 method `\u003c=\u003e`** (spaceship operator), sau đó nhận miễn phí: `\u003c`, `\u003c=`, `\u003e`, `\u003e=`, `between?`, `clamp`, và cả `sort`.\
\
`\u003c=\u003e` trả `0` nếu bằng, `-1` nếu nhỏ hơn, `1` nếu lớn hơn. Hình dung: ký `\u003c=\u003e` một lần, cả module Comparable làm phần còn lại.

## Detailed Answer (EN)
`Comparable` allows a class to define ordering by implementing just **one method `\u003c=\u003e`** (the spaceship operator), then freely gets: `\u003c`, `\u003c=`, `\u003e`, `\u003e=`, `between?`, `clamp`, and `sort`.\
\
`\u003c=\u003e` returns `0` if equal, `-1` if less, `1` if greater. Mental model: implement `\u003c=\u003e` once, and the Comparable module handles the rest.
