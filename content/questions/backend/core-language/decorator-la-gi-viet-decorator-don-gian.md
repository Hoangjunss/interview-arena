---
id: decorator-la-gi-viet-decorator-don-gian
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Decorator là gì? Viết decorator đơn giản.

## Question (EN)
What is a decorator? How do you write a simple one?

## Đáp án chi tiết (VI)
Decorator là higher-order function nhận một function và trả về function mới với hành vi bổ sung — cú pháp `@decorator` là syntactic sugar. Dùng `@functools.wraps` để giữ metadata của function gốc.\
```python\
import functools, time\
\
def timer(func):\
    @functools.wraps(func)  # Giữ __name__, __doc__\
    def wrapper(*args, **kwargs):\
        start = time.perf_counter()\
        result = func(*args, **kwargs)\
        print(f\\"{func.__name__}: {time.perf_counter()-start:.4f}s\\")\
        return result\
    return wrapper\
\
@timer\
def slow():\
    time.sleep(1)\
```\
Lưu ý: Không dùng `@functools.wraps` → mất `__name__`, `__doc__` của function gốc.

## Detailed Answer (EN)
Decorator is a higher-order function that wraps another function to add behavior. `@decorator` is syntactic sugar.\
```python\
import functools\
\
def timer(func):\
    @functools.wraps(func)\
    def wrapper(*args, **kwargs):\
        result = func(*args, **kwargs)\
        return result\
    return wrapper\
```\
Pitfall: Always use @functools.wraps — otherwise __name__ and __doc__ are lost.
