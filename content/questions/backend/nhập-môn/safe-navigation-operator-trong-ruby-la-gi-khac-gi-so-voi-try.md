---
id: safe-navigation-operator-trong-ruby-la-gi-khac-gi-so-voi-try
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Safe navigation operator `\u0026.` trong Ruby là gì? Khác gì so với `.try`?

## Question (EN)
What is the safe navigation operator `\u0026.` in Ruby? How does it differ from `.try`?

## Đáp án chi tiết (VI)
`\u0026.` (lonely operator / safe navigation, Ruby 2.3+) gọi method chỉ khi receiver **không phải `nil`** — nếu nil thì trả về `nil` thay vì raise `NoMethodError`.\
\
```ruby\
user = nil\
user.name           # =\u003e NoMethodError!\
user\u0026.name          # =\u003e nil\
user\u0026.name\u0026.upcase  # =\u003e nil — chain dừng ngay khi gặp nil\
\
user = User.new(name: \\"Alice\\")\
user\u0026.name          # =\u003e \\"Alice\\"\
```\
\
**Khác `.try` (Rails):**\
- `\u0026.` là Ruby core — bảo toàn `NoMethodError` nếu method không tồn tại trên object thật.\
- `.try` nuốt cả lỗi khi method không tồn tại — có thể che giấu bug.\
\
```ruby\
42.try(:nonexistent)  # =\u003e nil  (nuốt lỗi)\
42\u0026.nonexistent       # =\u003e NoMethodError (đúng hành vi)\
```\
\
Dùng `\u0026.` trong production Ruby; dùng `.try` khi thực sự muốn fallback im lặng.

## Detailed Answer (EN)
`\u0026.` (lonely operator / safe navigation, Ruby 2.3+) calls a method only when the receiver is **not `nil`** — if nil, returns `nil` instead of raising `NoMethodError`.\
\
```ruby\
user = nil\
user.name           # =\u003e NoMethodError!\
user\u0026.name          # =\u003e nil\
user\u0026.name\u0026.upcase  # =\u003e nil — chain stops at first nil\
\
user = User.new(name: \\"Alice\\")\
user\u0026.name          # =\u003e \\"Alice\\"\
```\
\
**Difference from `.try` (Rails):**\
- `\u0026.` is Ruby core — still raises `NoMethodError` if the method doesn't exist on a real object.\
- `.try` silences the error even when the method doesn't exist — can hide bugs.\
\
```ruby\
42.try(:nonexistent)  # =\u003e nil  (error swallowed)\
42\u0026.nonexistent       # =\u003e NoMethodError (correct behaviour)\
```\
\
Use `\u0026.` in production Ruby; use `.try` only when a truly silent fallback is desired.
