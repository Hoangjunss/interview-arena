---
id: list-dict-set-comprehension-la-gi-va-khi-nao-nen-dung
position: backend
technology: core-language
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
List/dict/set comprehension là gì và khi nào nên dùng?

## Question (EN)
What are list/dict/set comprehensions, and when should you use them?

## Đáp án chi tiết (VI)
Cú pháp gọn để **dựng collection mới** bằng transform + filter trong một biểu thức:\
\
```python\
[x*x for x in nums if x \u003e 0]        # list\
{k: v for k, v in pairs}            # dict\
{x % 3 for x in nums}               # set\
(x*x for x in nums)                 # generator (lazy)\
```\
\
Dùng khi map/filter một iterable — ngắn và thường nhanh hơn vòng `for` + `append`. **Không** nên dùng khi logic nhiều nhánh, lồng sâu, hay có side-effect → vòng `for` dễ đọc hơn. Nếu chỉ cần duyệt một lần và muốn tiết kiệm bộ nhớ, chọn **generator expression** `(...)` thay vì tạo hẳn list.

## Detailed Answer (EN)
A compact way to **build a new collection** with a transform + filter in one expression:\
\
```python\
[x*x for x in nums if x \u003e 0]        # list\
{k: v for k, v in pairs}            # dict\
{x % 3 for x in nums}               # set\
(x*x for x in nums)                 # generator (lazy)\
```\
\
Use them to map/filter an iterable — short and usually faster than a `for` loop with `append`. **Avoid** them for multi-branch logic, deep nesting, or side effects → a plain `for` loop reads better. If you only iterate once and want to save memory, prefer a **generator expression** `(...)` over materializing a list.
