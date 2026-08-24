---
id: vi-sao-ham-khai-bao-def-add-item-bucket-lai-giu-nguyen-du-lieu-cua-nhung-lan-goi
position: backend
technology: gotcha
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao hàm khai báo `def add(item, bucket=[])` lại giữ nguyên dữ liệu của những lần gọi trước?

## Question (EN)
Why does a function declared as `def add(item, bucket=[])` keep data from previous calls?

## Đáp án chi tiết (VI)
**Giá trị mặc định chỉ được tính đúng một lần**, tại thời điểm câu lệnh `def` chạy — không phải mỗi lần gọi hàm. List đó được gắn vào chính object hàm (`add.__defaults__`), nên mọi lần gọi không truyền `bucket` đều dùng chung một list.\
\
```python\
def add(item, bucket=[]):\
    bucket.append(item)\
    return bucket\
\
add(1)   # [1]\
add(2)   # [1, 2] — same list, not a fresh one\
```\
\
**Cách sửa chuẩn:** dùng `None` làm sentinel rồi khởi tạo bên trong hàm.\
\
```python\
def add(item, bucket=None):\
    if bucket is None:\
        bucket = []\
    bucket.append(item)\
    return bucket\
```\
\
Quy tắc: default là **immutable** (`None`, số, chuỗi, tuple) thì an toàn; default là **mutable** (`list`, `dict`, `set`, instance) thì bắt buộc dùng sentinel. Lỗi này hay lộ ra ở `__init__` của class hoặc hàm cache tự viết, vì dữ liệu rò rỉ giữa các object.

## Detailed Answer (EN)
A **default value is evaluated exactly once**, when the `def` statement runs — not on every call. That list is stored on the function object itself (`add.__defaults__`), so every call that omits `bucket` shares the same list.\
\
```python\
def add(item, bucket=[]):\
    bucket.append(item)\
    return bucket\
\
add(1)   # [1]\
add(2)   # [1, 2] — same list, not a fresh one\
```\
\
**The standard fix:** use `None` as a sentinel and build the value inside the function.\
\
```python\
def add(item, bucket=None):\
    if bucket is None:\
        bucket = []\
    bucket.append(item)\
    return bucket\
```\
\
Rule of thumb: **immutable** defaults (`None`, numbers, strings, tuples) are safe; **mutable** defaults (`list`, `dict`, `set`, instances) require the sentinel. The bug usually surfaces in a class `__init__` or a hand-rolled cache, where state leaks between objects.
