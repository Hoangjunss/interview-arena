---
id: attr-accessor-attr-reader-attr-writer-trong-ruby-la-gi
position: backend
technology: oop-\u0026-module
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`attr_accessor`, `attr_reader`, `attr_writer` trong Ruby là gì?

## Question (EN)
What are `attr_accessor`, `attr_reader`, and `attr_writer` in Ruby?

## Đáp án chi tiết (VI)
Ba macro này tự động sinh getter/setter cho instance variable:\
\
| Macro | Sinh ra | Dùng khi |\
|---|---|---|\
| `attr_reader :x` | `def x = @x` | chỉ đọc |\
| `attr_writer :x` | `def x=(v); @x=v; end` | chỉ ghi |\
| `attr_accessor :x` | cả hai | đọc + ghi |\
\
Đây là ví dụ metaprogramming cơ bản nhất của Ruby — macro gọi `define_method` nội bộ để sinh method lúc load class.

## Detailed Answer (EN)
These macros auto-generate getters/setters for instance variables:\
\
| Macro | Generates | Use when |\
|---|---|---|\
| `attr_reader :x` | `def x = @x` | read-only |\
| `attr_writer :x` | `def x=(v); @x=v; end` | write-only |\
| `attr_accessor :x` | both | read + write |\
\
The simplest example of Ruby metaprogramming — the macros call `define_method` internally at class-load time.
