---
id: walrus-operator-assignment-expression-la-gi-khi-nao-huu-ich
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Walrus operator `:=` (Assignment Expression) là gì? Khi nào hữu ích?

## Question (EN)
What is the walrus operator `:=` (Assignment Expression)? When is it useful?

## Đáp án chi tiết (VI)
Walrus operator (PEP 572, Python 3.8+) cho phép assign và return giá trị trong cùng một expression — giảm lặp code.\
```python\
# Trước 3.8 — gọi hàm 2 lần hoặc dùng temp variable\
data = get_data()\
if data:\
    process(data)\
\
# Với walrus — assign và kiểm tra cùng lúc\
if data := get_data():\
    process(data)\
\
# Đặc biệt hữu ích trong while loop\
while chunk := file.read(8192):\
    process(chunk)\
\
# List comprehension với filter + transform\
results = [y for x in data if (y := transform(x)) \u003e 0]\
# Tránh gọi transform() 2 lần (1 cho filter, 1 cho value)\
```\
Lưu ý: không lạm dụng — walrus trong nested expression phức tạp làm code khó đọc hơn. Dùng khi thực sự tránh được duplicate computation.

## Detailed Answer (EN)
Walrus operator (PEP 572, Python 3.8+) assigns and returns a value in a single expression — reduces repeated calls.\
```python\
# Assign and check simultaneously\
if data := get_data():\
    process(data)\
\
# Especially useful in while loops\
while chunk := file.read(8192):\
    process(chunk)\
\
# List comprehension — avoid calling transform() twice\
results = [y for x in data if (y := transform(x)) \u003e 0]\
```\
Pitfall: avoid overuse — walrus in complex nested expressions hurts readability. Use when genuinely avoiding duplicate computation.
