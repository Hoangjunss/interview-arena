---
id: pattern-matching-trong-ruby-ruby-3-0-la-gi-cho-vi-du-in-va-case-in
position: backend
technology: nhập-môn
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pattern matching trong Ruby (Ruby 3.0+) là gì? Cho ví dụ `in` và `case/in`.

## Question (EN)
What is pattern matching in Ruby (3.0+)? Show examples with `in` and `case/in`.

## Đáp án chi tiết (VI)
Pattern matching cho phép **destructure và match cấu trúc dữ liệu** trong một bước — tương tự Elixir/Rust nhưng có cú pháp Ruby.\
\
```ruby\
# case/in — matching cấu trúc\
response = { status: 200, body: { user: { name: \\"Alice\\

## Detailed Answer (EN)
Pattern matching enables **destructuring and matching data structures** in one step — similar to Elixir/Rust but with Ruby syntax.\
\
```ruby\
response = { status: 200, body: { user: { name: \\"Alice\\
