---
id: exception-handling-try-except-else-finally-hoat-dong-the-nao
position: backend
technology: core-language
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Exception handling — `try/except/else/finally` hoạt động thế nào?

## Question (EN)
How does `try/except/else/finally` work in Python?

## Đáp án chi tiết (VI)
(1) try — khối code có thể raise exception (2) except — xử lý exception (3) else — chạy nếu KHÔNG có exception trong try (4) finally — LUÔN chạy, dù có exception hay không — dùng để cleanup.\
```python\
try:\
    result = 10 / divisor\
except ZeroDivisionError as e:\
    print(f\\"Error: {e}\\")\
except (TypeError, ValueError):\
    print(\\"Type or value error\\")\
else:\
    print(f\\"Success: {result}\\")  # Chỉ khi không có exception\
finally:\
    print(\\"Cleanup\\")  # Luôn chạy\
```

## Detailed Answer (EN)
(1) try — code that may raise an exception (2) except — handles the exception (3) else — runs only if no exception occurred (4) finally — always runs, exception or not.\
```python\
try:\
    result = risky_operation()\
except SpecificError as e:\
    handle(e)\
else:\
    use(result)   # Only when no exception\
finally:\
    cleanup()     # Always runs\
```
