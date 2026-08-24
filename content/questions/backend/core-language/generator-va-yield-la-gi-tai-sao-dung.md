---
id: generator-va-yield-la-gi-tai-sao-dung
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generator và `yield` là gì? Tại sao dùng?

## Question (EN)
What are generators and `yield`? Why use them?

## Đáp án chi tiết (VI)
Generator là function dùng `yield` trả về iterator — tính giá trị lazily, từng phần tử khi được yêu cầu. Tiết kiệm bộ nhớ so với list vì không nạp toàn bộ dữ liệu vào RAM.\
```python\
# List — toàn bộ vào RAM\
squares_list = [x**2 for x in range(1_000_000)]\
\
# Generator — lazy, từng phần tử khi cần\
def squares_gen(n):\
    for x in range(n):\
        yield x**2\
\
gen = squares_gen(1_000_000)\
print(next(gen))  # 0 — chỉ tính khi gọi next()\
```\
Dùng khi: xử lý file lớn, streaming data, infinite sequences.

## Detailed Answer (EN)
```python\
def squares_gen(n):\
    for x in range(n):\
        yield x**2  # Pauses here each iteration\
\
gen = squares_gen(1_000_000)\
print(next(gen))  # 0 — computed lazily\
```\
Use when: large file processing, streaming data, infinite sequences. Memory-efficient vs list comprehension.
