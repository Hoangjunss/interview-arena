---
id: vi-sao-fns-lambda-i-for-i-in-range-3-goi-ra-deu-bang-2
position: backend
technology: closure
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `fns = [lambda: i for i in range(3)]` gọi ra đều bằng 2?

## Question (EN)
Why do all functions in `fns = [lambda: i for i in range(3)]` return 2?

## Đáp án chi tiết (VI)
Vì closure trong Python **giữ tham chiếu tới biến, không giữ giá trị tại thời điểm tạo** (late binding). Cả ba lambda cùng trỏ tới một biến `i`; đến lúc gọi thì vòng lặp đã kết thúc và `i` đang là `2`.\
\
```python\
fns = [lambda: i for i in range(3)]\
[f() for f in fns]        # [2, 2, 2]\
```\
\
**Ba cách sửa:**\
\
```python\
# 1. default argument — evaluated at definition time\
fns = [lambda i=i: i for i in range(3)]\
\
# 2. functools.partial — binds the value now\
from functools import partial\
fns = [partial(lambda i: i, i) for i in range(3)]\
\
# 3. factory function — new scope per iteration\
def make(i):\
    return lambda: i\
fns = [make(i) for i in range(3)]\
```\
\
Lỗi này ít khi hiện ra ở dạng lambda thuần; nó thường hiện ra khi **đăng ký callback/handler trong vòng lặp** (button handler, task scheduler, retry hook) rồi tất cả cùng thao tác trên phần tử cuối. Ngược lại, late binding cũng chính là thứ khiến closure \\"thấy\\" được giá trị mới nhất của biến ngoài — hữu ích với counter/accumulator dùng `nonlocal`.

## Detailed Answer (EN)
$82
