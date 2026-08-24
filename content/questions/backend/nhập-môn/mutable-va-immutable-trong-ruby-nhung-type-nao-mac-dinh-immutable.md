---
id: mutable-va-immutable-trong-ruby-nhung-type-nao-mac-dinh-immutable
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mutable và immutable trong Ruby: những type nào mặc định immutable?

## Question (EN)
What is mutability in Ruby? Which types are immutable by default?

## Đáp án chi tiết (VI)
Ruby object mặc định **mutable** (có thể sửa sau khi tạo). Trừ:\
- `Integer`, `Float`, `Symbol` — immutable theo thiết kế ngôn ngữ (không có setter).\
- Bất kỳ object nào đã `freeze`.\
- String literal khi bật `# frozen_string_literal: true` (mặc định của Rubocop).\
\
```ruby\
str = +\\"mutable\\"   # unary + tạo mutable string (Ruby 2.3+)\
str \u003c\u003c \\" OK\\"       # =\u003e \\"mutable OK\\"\
\
frozen_str = -\\"immutable\\"  # unary - tạo frozen string\
frozen_str \u003c\u003c \\"!\\"          # =\u003e FrozenError\
\
:sym \u003c\u003c \\"x\\"   # NoMethodError — Symbol không có \u003c\u003c\
42.frozen?    # =\u003e true — Integer luôn frozen\
```\
\
Hình dung: Integer/Symbol như hằng số toán học — giá trị `5` không thể \\"bị sửa\\

## Detailed Answer (EN)
Ruby objects are **mutable** by default. Exceptions:\
- `Integer`, `Float`, `Symbol` — immutable by language design (no setters).\
- Any object after calling `freeze`.\
- String literals when `# frozen_string_literal: true` is active (Rubocop default).\
\
```ruby\
str = +\\"mutable\\"\
str \u003c\u003c \\" OK\\"       # =\u003e \\"mutable OK\\"\
\
frozen_str = -\\"immutable\\"\
frozen_str \u003c\u003c \\"!\\"  # =\u003e FrozenError\
\
:sym \u003c\u003c \\"x\\"   # NoMethodError\
42.frozen?    # =\u003e true — Integer is always frozen\
```\
\
Mental model: Integer/Symbol behave like mathematical constants — you cannot modify `5`; you can only produce `6`.
