---
id: bon-toan-tu-so-sanh-bang-trong-ruby-eql-equal-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bốn toán tử so sánh bằng trong Ruby (`==`, `eql?`, `equal?`, `===`) khác nhau thế nào?

## Question (EN)
What are the differences between `==`, `eql?`, `equal?`, and `===` in Ruby?

## Đáp án chi tiết (VI)
| Toán tử | So sánh | Dùng khi |\
|---|---|---|\
| `==` | **giá trị** (thường được override) | so sánh tổng quát |\
| `eql?` | giá trị **và** cùng class (dùng cho hash key) | `1.eql?(1.0)` → `false` |\
| `equal?` | **object identity** — cùng `object_id` | kiểm tra cùng object |\
| `===` | \\"case equality\\" — mỗi class override theo nghĩa riêng | `when` trong `case` |\
\
```ruby\
1   == 1.0      # =\u003e true  (giá trị bằng)\
1.eql?(1.0)    # =\u003e false (khác class: Integer vs Float)\
1.equal?(1)    # =\u003e true  (Integer nhỏ cached cùng object)\
\\"a\\".equal?(\\"a\\")# =\u003e false (2 String object khác nhau)\
\
# === — dùng ngầm trong case/when\
case 42\
when 1..50   then puts \\"trong khoảng\\"  # Range#=== gọi include?\
when Integer then puts \\"là integer\\"\
end\
```\
\
Hình dung: `==` hỏi \\"bằng nhau không?\\

## Detailed Answer (EN)
| Operator | Compares | Used for |\
|---|---|---|\
| `==` | **value** (often overridden) | general equality |\
| `eql?` | value **and** same class (hash key semantics) | `1.eql?(1.0)` → `false` |\
| `equal?` | **object identity** — same `object_id` | checking same object |\
| `===` | \\"case equality\\" — each class overrides it | `when` in `case` expressions |\
\
```ruby\
1   == 1.0      # =\u003e true\
1.eql?(1.0)    # =\u003e false (Integer vs Float)\
1.equal?(1)    # =\u003e true  (small integers are cached)\
\\"a\\".equal?(\\"a\\")# =\u003e false (two distinct String objects)\
\
case 42\
when 1..50   then puts \\"in range\\"   # Range#=== calls include?\
when Integer then puts \\"is integer\\"\
end\
```\
\
Mental model: `==` asks \\"are these equal?\\
