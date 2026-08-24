---
id: freeze-trong-ruby-dung-de-lam-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`freeze` trong Ruby dùng để làm gì?

## Question (EN)
What does `freeze` do in Ruby?

## Đáp án chi tiết (VI)
`Object#freeze` làm object trở thành **immutable** — mọi cố gắng sửa đổi sẽ raise `FrozenError` (Ruby ≥ 2.5) hoặc `RuntimeError`.\
\
```ruby\
str = \\"hello\\"\
str.freeze\
str \u003c\u003c \\" world\\"  # =\u003e FrozenError: can't modify frozen String\
\
# Kiểm tra\
str.frozen?  # =\u003e true\
```\
\
**Vì sao dùng:** tránh sửa nhầm hằng số, dùng string làm hash key an toàn, tiết kiệm memory (Ruby có thể cache frozen string). String literal trở thành frozen khi bật `# frozen_string_literal: true` (magic comment có từ Ruby 2.3).

## Detailed Answer (EN)
`Object#freeze` makes an object **immutable** — any attempt to modify it raises `FrozenError` (Ruby ≥ 2.5).\
\
```ruby\
str = \\"hello\\"\
str.freeze\
str \u003c\u003c \\" world\\"  # =\u003e FrozenError: can't modify frozen String\
\
str.frozen?  # =\u003e true\
```\
\
**Why use it:** prevent accidental mutation of constants, safely use strings as hash keys, save memory (Ruby can cache frozen strings). From Ruby 3.0, string literals are immutable by default when `# frozen_string_literal: true` is set.
