---
id: args-va-kwargs-la-gi-khi-nao-dung
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`*args` và `**kwargs` là gì? Khi nào dùng?

## Question (EN)
What are `*args` and `**kwargs`? When to use them?

## Đáp án chi tiết (VI)
`*args` cho phép nhận bất kỳ số positional arguments — nhóm thành tuple. `**kwargs` nhận bất kỳ số keyword arguments — nhóm thành dict.\
```python\
def log(level, *args, **kwargs):\
    print(f\\"[{level}]\\

## Detailed Answer (EN)
`*args` accepts any number of positional arguments — groups them into a tuple. `**kwargs` accepts any number of keyword arguments — groups them into a dict.\
```python\
def greet(*names, greeting=\\"Hello\\"):\
    for name in names:\
        print(f\\"{greeting}, {name}!\\")\
\
greet(\\"Alice\\
