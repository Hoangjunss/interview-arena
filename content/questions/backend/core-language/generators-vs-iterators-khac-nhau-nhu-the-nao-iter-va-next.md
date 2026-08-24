---
id: generators-vs-iterators-khac-nhau-nhu-the-nao-iter-va-next
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generators vs Iterators — khác nhau như thế nào? `__iter__` và `__next__`?

## Question (EN)
Generators vs Iterators — how do they differ? `__iter__` and `__next__`?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
**Iterator**: any object implementing `__iter__()` and `__next__()`. **Generator**: a function using `yield` — automatically implements the iterator protocol.\
```python\
# Generator function\
def countdown(n):\
    while n \u003e 0:\
        yield n; n -= 1\
\
# Generator expression — lazy\
gen = (x**2 for x in range(1_000_000))  # No RAM consumed\
\
# Class-based iterator\
class CountDown:\
    def __iter__(self): return self\
    def __next__(self):\
        if self.current \u003c= 0: raise StopIteration\
        self.current -= 1\
        return self.current + 1\
```
