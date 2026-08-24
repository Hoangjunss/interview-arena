---
id: functools-lru-cache-hoat-dong-the-nao-khi-nao-dung
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`functools.lru_cache` hoạt động thế nào? Khi nào dùng?

## Question (EN)
How does `functools.lru_cache` work? When to use it?

## Đáp án chi tiết (VI)
`lru_cache` (Least Recently Used cache) là decorator memoize kết quả của function — lần sau gọi cùng args sẽ trả về cache thay vì tính lại. Function phải có hashable arguments.\
```python\
from functools import lru_cache\
\
@lru_cache(maxsize=128)\
def fibonacci(n: int) -\u003e int:\
    if n \u003c 2: return n\
    return fibonacci(n-1) + fibonacci(n-2)\
\
# Không cache (default: cached forever)\
@lru_cache(maxsize=None)  # Cache không giới hạn\
def expensive_lookup(key): ...\
\
fibonacci.cache_info()   # hits, misses, maxsize, currsize\
fibonacci.cache_clear()  # Xóa cache\
```\
Dùng cho: pure functions với expensive computation, recursive algorithms.

## Detailed Answer (EN)
lru_cache memoizes function results — subsequent calls with same args return cached result instead of recomputing. Arguments must be hashable.\
```python\
from functools import lru_cache\
\
@lru_cache(maxsize=128)\
def fib(n):\
    if n \u003c 2: return n\
    return fib(n-1) + fib(n-2)\
```\
Use for: pure functions with expensive computation, recursive algorithms.
