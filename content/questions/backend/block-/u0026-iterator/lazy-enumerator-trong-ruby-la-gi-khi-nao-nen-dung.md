---
id: lazy-enumerator-trong-ruby-la-gi-khi-nao-nen-dung
position: backend
technology: block-\u0026-iterator
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lazy enumerator trong Ruby là gì? Khi nào nên dùng?

## Question (EN)
What is a lazy enumerator in Ruby? When should you use it?

## Đáp án chi tiết (VI)
Lazy enumerator **trì hoãn tính toán** cho đến khi giá trị thực sự cần — không tạo array trung gian. Cực kỳ hữu ích khi xử lý chuỗi vô hạn hoặc pipeline dài.\
\
```ruby\
# Không lazy — tạo mảng trung gian khổng lồ trước khi lấy 5 phần tử\
(1..Float::INFINITY).select(\u0026:odd?).map { |n| n ** 2 }.first(5)\
# =\u003e sẽ không bao giờ dừng!\
\
# Lazy — chỉ tính khi cần\
(1..Float::INFINITY).lazy.select(\u0026:odd?).map { |n| n ** 2 }.first(5)\
# =\u003e [1, 9, 25, 49, 81]\
```\
\
**Khi nào dùng:**\
- Dãy vô hạn (`(1..)`).\
- Pipeline nhiều bước với filter aggressive (phần lớn bị loại sớm).\
- Đọc file lớn từng dòng mà không cần load hết vào memory.

## Detailed Answer (EN)
A lazy enumerator **defers computation** until values are actually needed — no intermediate arrays are created. Ideal for infinite sequences or long transformation pipelines.\
\
```ruby\
# Eager — tries to build an enormous intermediate array first\
(1..Float::INFINITY).select(\u0026:odd?).map { |n| n ** 2 }.first(5)\
# =\u003e never terminates!\
\
# Lazy — only computes what is needed\
(1..Float::INFINITY).lazy.select(\u0026:odd?).map { |n| n ** 2 }.first(5)\
# =\u003e [1, 9, 25, 49, 81]\
```\
\
**When to use:**\
- Infinite sequences (`(1..)`).\
- Multi-step pipelines with aggressive early filtering.\
- Reading large files line-by-line without loading everything into memory.
