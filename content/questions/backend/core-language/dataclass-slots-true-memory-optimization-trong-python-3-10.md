---
id: dataclass-slots-true-memory-optimization-trong-python-3-10
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`@dataclass(slots=True)` — memory optimization trong Python 3.10+?

## Question (EN)
`@dataclass(slots=True)` — memory optimization in Python 3.10+?

## Đáp án chi tiết (VI)
Kết hợp `__slots__` với `@dataclass` để có cả type safety và memory efficiency:\
\
```python\
from dataclasses import dataclass\
import sys\
\
@dataclass\
class UserNormal:\
    id: int; name: str; email: str\
\
@dataclass(slots=True)  # Python 3.10+\
class UserSlots:\
    id: int; name: str; email: str\
\
print(sys.getsizeof(UserNormal(1, 'Alice', 'a@b.com')))  # ~256 bytes (có __dict__)\
print(sys.getsizeof(UserSlots(1, 'Alice', 'a@b.com')))   # ~56 bytes (không có __dict__)\
\
# frozen=True + slots=True — immutable và memory-efficient\
@dataclass(frozen=True, slots=True)\
class Point:\
    x: float\
    y: float\
\
p = Point(1.0, 2.0)\
# p.x = 3.0  # FrozenInstanceError\
```\
\
Dùng `@dataclass(slots=True)` khi có hàng triệu instances — tiết kiệm ~30-60% memory.

## Detailed Answer (EN)
Combine `__slots__` with `@dataclass` for type safety and memory efficiency:\
\
```python\
@dataclass(slots=True)      # Python 3.10+ — auto-adds __slots__\
class UserSlots:\
    id: int; name: str; email: str\
\
@dataclass(frozen=True, slots=True)  # Immutable + memory-efficient\
class Point:\
    x: float; y: float\
\
# p.z = 3.0  # AttributeError\
```\
\
Use `@dataclass(slots=True)` when creating millions of instances — saves 30-60% memory.
