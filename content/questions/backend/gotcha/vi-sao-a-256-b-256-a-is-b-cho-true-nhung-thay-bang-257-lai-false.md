---
id: vi-sao-a-256-b-256-a-is-b-cho-true-nhung-thay-bang-257-lai-false
position: backend
technology: gotcha
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `a = 256; b = 256; a is b` cho `True` nhưng thay bằng `257` lại `False`?

## Question (EN)
Why does `a = 256; b = 256; a is b` return `True` while the same code with `257` returns `False`?

## Đáp án chi tiết (VI)
Vì CPython **cấp phát sẵn và dùng chung** các object số nguyên nhỏ trong khoảng **-5 đến 256**. Với giá trị nằm ngoài khoảng đó, mỗi lần tạo là một object mới nên `is` (so sánh **identity**) trả về `False`, dù `==` (so sánh **giá trị**) vẫn `True`.\
\
```python\
a, b = 256, 256\
a is b        # True  — cached object\
x, y = 257, 257\
x is y        # False — two distinct objects\
x == y        # True\
```\
\
Đây là **chi tiết cài đặt của CPython**, không phải quy tắc ngôn ngữ: chạy trong REPL và chạy trong cùng một file có thể ra kết quả khác nhau (compiler gộp hằng số trong cùng code object). PyPy hay phiên bản khác có quyền làm khác.\
\
**Chốt cách dùng:**\
- `==` cho mọi so sánh giá trị (số, chuỗi, list...).\
- `is` chỉ dùng với **singleton**: `is None`, `is True/False`, và sentinel tự định nghĩa.\
\
Từ Python 3.8, viết `if x is 257` sẽ bị cảnh báo `SyntaxWarning: \\"is\\" with a literal`.

## Detailed Answer (EN)
Because CPython **pre-allocates and shares** small integer objects in the range **-5 to 256**. Outside that range every literal creates a new object, so `is` (an **identity** check) returns `False` even though `==` (a **value** check) is still `True`.\
\
```python\
a, b = 256, 256\
a is b        # True  — cached object\
x, y = 257, 257\
x is y        # False — two distinct objects\
x == y        # True\
```\
\
This is a **CPython implementation detail**, not a language rule: the REPL and a single source file can disagree, because the compiler folds constants within one code object. PyPy and other implementations are free to differ.\
\
**Usage rule:**\
- Use `==` for every value comparison (numbers, strings, lists...).\
- Use `is` only for **singletons**: `is None`, `is True/False`, and your own sentinels.\
\
Since Python 3.8, writing `if x is 257` raises `SyntaxWarning: \\"is\\" with a literal`.
