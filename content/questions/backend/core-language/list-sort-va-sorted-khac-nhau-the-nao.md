---
id: list-sort-va-sorted-khac-nhau-the-nao
position: backend
technology: core-language
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`list.sort()` và `sorted()` khác nhau thế nào?

## Question (EN)
How do `list.sort()` and `sorted()` differ?

## Đáp án chi tiết (VI)
- `list.sort()`: sắp xếp **tại chỗ**, trả về `None`, chỉ dùng cho list.\
- `sorted(iterable)`: trả về **list mới**, nhận mọi iterable (kể cả tuple, dict keys...).\
\
Cả hai đều nhận `key=` (hàm rút khóa so sánh) và `reverse=`. Cả hai dùng **Timsort** và **ổn định (stable)** — các phần tử bằng khóa giữ nguyên thứ tự tương đối, cho phép sort nhiều tầng bằng cách sort lần lượt từ khóa phụ đến khóa chính.\
\
```python\
users.sort(key=lambda u: u.age)     # in-place, None\
top = sorted(users, key=lambda u: u.score, reverse=True)\
```

## Detailed Answer (EN)
- `list.sort()`: sorts **in place**, returns `None`, lists only.\
- `sorted(iterable)`: returns a **new list**, accepts any iterable (tuples, dict keys, …).\
\
Both take `key=` (a function extracting the comparison key) and `reverse=`. Both use **Timsort** and are **stable** — items with equal keys keep their relative order, which lets you sort by multiple criteria by sorting from the least to the most significant key.\
\
```python\
users.sort(key=lambda u: u.age)     # in-place, None\
top = sorted(users, key=lambda u: u.score, reverse=True)\
```
