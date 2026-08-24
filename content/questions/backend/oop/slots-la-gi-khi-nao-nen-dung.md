---
id: slots-la-gi-khi-nao-nen-dung
position: backend
technology: oop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`__slots__` là gì? Khi nào nên dùng?

## Question (EN)
What is `__slots__`? When should you use it?

## Đáp án chi tiết (VI)
`__slots__` giới hạn attributes của instance, loại bỏ `__dict__` — tiết kiệm bộ nhớ ~40-60% khi có nhiều instances.\
```python\
class PointNormal:\
    def __init__(self, x, y):\
        self.x, self.y = x, y\
# Mỗi instance có __dict__ → ~200 bytes\
\
class PointSlots:\
    __slots__ = ('x', 'y')\
    def __init__(self, x, y):\
        self.x, self.y = x, y\
# Không có __dict__ → ~56 bytes\
\
# p = PointSlots(1, 2)\
# p.z = 3  # AttributeError — không thể thêm attribute mới\
```\
Dùng khi: tạo hàng triệu instances nhỏ (data processing, game objects, ML features).

## Detailed Answer (EN)
__slots__ restricts instance attributes, removes __dict__ — saves 40-60% memory with many instances.\
```python\
class Point:\
    __slots__ = ('x', 'y')\
    def __init__(self, x, y):\
        self.x, self.y = x, y\
# p.z = 1  # AttributeError\
```\
Use when creating millions of small instances (data processing, game objects).
