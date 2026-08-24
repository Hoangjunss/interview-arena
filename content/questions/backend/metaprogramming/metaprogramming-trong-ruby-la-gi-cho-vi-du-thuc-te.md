---
id: metaprogramming-trong-ruby-la-gi-cho-vi-du-thuc-te
position: backend
technology: metaprogramming
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Metaprogramming trong Ruby là gì? Cho ví dụ thực tế.

## Question (EN)
What is metaprogramming in Ruby? Give a real-world example.

## Đáp án chi tiết (VI)
Metaprogramming là viết code **sinh ra hoặc sửa đổi code khác lúc runtime** — thay vì viết cứng từng method, ta dùng các công cụ của Ruby để tự động hóa. Ví dụ đơn giản nhất: `attr_accessor :name` tự sinh getter + setter thay vì viết thủ công.\
\
**Công cụ chính:**\
- `define_method` — định nghĩa method động.\
- `method_missing` — bắt call đến method chưa tồn tại.\
- `send` / `public_send` — gọi method bằng tên string/symbol.\
- `class_eval` / `instance_eval` — chạy code trong context class/object.\
\
Rails dùng metaprogramming rộng rãi: `has_many`, `belongs_to`, `validates` đều là macro sinh method lúc load class.

## Detailed Answer (EN)
Metaprogramming is writing code that **generates or modifies other code at runtime** — instead of hardcoding every method, Ruby's built-in tools let you automate it. The simplest example: `attr_accessor :name` auto-generates a getter and setter instead of writing them manually.\
\
**Key tools:**\
- `define_method` — define methods dynamically.\
- `method_missing` — intercept calls to undefined methods.\
- `send` / `public_send` — call a method by name (string/symbol).\
- `class_eval` / `instance_eval` — execute code in a class/object context.\
\
Rails uses metaprogramming extensively: `has_many`, `belongs_to`, `validates` are all macros that generate methods at class-load time.
