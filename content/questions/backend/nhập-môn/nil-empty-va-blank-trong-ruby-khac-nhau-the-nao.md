---
id: nil-empty-va-blank-trong-ruby-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`nil?`, `empty?` và `blank?` trong Ruby khác nhau thế nào?

## Question (EN)
What is the difference between `nil?`, `empty?`, and `blank?` in Ruby?

## Đáp án chi tiết (VI)
| Method | Trả `true` khi | Lưu ý |\
|---|---|---|\
| `nil?` | chỉ khi object là `nil` | có trên mọi object (kế thừa `Object`) |\
| `empty?` | string/array/hash có độ dài = 0 | `nil.empty?` → `NoMethodError` |\
| `blank?` | `nil`, `false`, `empty?`, hoặc chỉ khoảng trắng | chỉ có trong **Rails** (ActiveSupport) |\
\
```ruby\
nil.nil?      # =\u003e true\
\\"\\".nil?       # =\u003e false\
\
\\"\\".empty?     # =\u003e true\
\\" \\".empty?    # =\u003e false   — khoảng trắng không phải empty\
nil.empty?    # =\u003e NoMethodError!\
\
# Chỉ Rails:\
\\"\\".blank?     # =\u003e true\
\\" \\".blank?    # =\u003e true    — khác empty?\
nil.blank?    # =\u003e true\
```\
\
**Quy tắc thực tế:** dùng `nil?` khi cần đúng `nil`; dùng `empty?` cho collection; dùng `blank?` (Rails) khi validate input user vì xử lý cả `nil` và whitespace.

## Detailed Answer (EN)
| Method | Returns `true` when | Notes |\
|---|---|---|\
| `nil?` | only for `nil` | available on every object |\
| `empty?` | string/array/hash has length 0 | `nil.empty?` → `NoMethodError` |\
| `blank?` | `nil`, `false`, `empty?`, or whitespace-only | **Rails only** (ActiveSupport) |\
\
```ruby\
nil.nil?      # =\u003e true\
\\"\\".nil?       # =\u003e false\
\
\\"\\".empty?     # =\u003e true\
\\" \\".empty?    # =\u003e false   — whitespace is not empty\
nil.empty?    # =\u003e NoMethodError!\
\
# Rails only:\
\\"\\".blank?     # =\u003e true\
\\" \\".blank?    # =\u003e true    — unlike empty?\
nil.blank?    # =\u003e true\
```\
\
**Practical rule:** use `nil?` when you specifically need nil; use `empty?` for collections; use `blank?` (Rails) when validating user input because it handles both nil and whitespace.
