---
id: frozen-string-literal-true-magic-comment-trong-ruby-la-gi-anh-huong-the-nao-den
position: backend
technology: exception-\u0026-gem
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`frozen_string_literal: true` magic comment trong Ruby là gì? Ảnh hưởng thế nào đến performance?

## Question (EN)
What is the `# frozen_string_literal: true` magic comment in Ruby? How does it affect performance?

## Đáp án chi tiết (VI)
`# frozen_string_literal: true` đặt ở đầu file khiến mọi string literal trong file đó trở thành **frozen** và được **deduplicated** — cùng một string literal chỉ tạo 1 object duy nhất trong memory.\
\
```ruby\
# frozen_string_literal: true\
\
str1 = \\"hello\\"\
str2 = \\"hello\\"\
str1.equal?(str2)  # =\u003e true  — cùng 1 object!\
str1.frozen?       # =\u003e true\
str1 \u003c\u003c \\" world\\"   # =\u003e FrozenError\
\
# Tạo mutable string khi cần:\
mutable = +\\"mutable string\\"  # unary + thêm vào prefix\
mutable \u003c\u003c \\"!\\"\
```\
\
**Lợi ích hiệu năng:** mỗi lần gọi method/loop không tạo mới string literal → giảm GC pressure đáng kể trong code xử lý nhiều string. Rubocop enforce magic comment này bằng cop `Style/FrozenStringLiteralComment`. Ruby 4.0 dự kiến bật frozen string literal mặc định.

## Detailed Answer (EN)
`# frozen_string_literal: true` at the top of a file makes all string literals in that file **frozen** and **deduplicated** — the same literal string creates only one object in memory.\
\
```ruby\
# frozen_string_literal: true\
\
str1 = \\"hello\\"\
str2 = \\"hello\\"\
str1.equal?(str2)  # =\u003e true  — same object!\
str1.frozen?       # =\u003e true\
str1 \u003c\u003c \\" world\\"   # =\u003e FrozenError\
\
# Create a mutable string when needed:\
mutable = +\\"mutable string\\"  # unary + unfreezes\
mutable \u003c\u003c \\"!\\"\
```\
\
**Performance benefit:** string literals inside methods/loops no longer allocate a new object on each call → significantly reduces GC pressure in string-heavy code. Rubocop enforces this with `Style/FrozenStringLiteralComment`. Ruby 4.0 is expected to enable frozen string literals by default.
