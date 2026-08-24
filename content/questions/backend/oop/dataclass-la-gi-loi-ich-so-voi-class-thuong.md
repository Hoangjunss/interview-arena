---
id: dataclass-la-gi-loi-ich-so-voi-class-thuong
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`@dataclass` là gì? Lợi ích so với class thường?

## Question (EN)
What is `@dataclass`? Benefits over regular classes?

## Đáp án chi tiết (VI)
`@dataclass` tự động generate `__init__`, `__repr__`, `__eq__` — giảm boilerplate đáng kể.\
```python\
from dataclasses import dataclass, field\
from typing import List\
\
@dataclass\
class User:\
    name: str\
    email: str\
    age: int = 0\
    tags: List[str] = field(default_factory=list)\
    # __init__, __repr__, __eq__ tự động được generate!\
\
@dataclass(frozen=True)  # Immutable như tuple\
class Point:\
    x: float\
    y: float\
\
p = Point(1.0, 2.0)\
# p.x = 3.0  # FrozenInstanceError\
```\
Ưu điểm so với `namedtuple`: có default values, methods, mutable (nếu không frozen).

## Detailed Answer (EN)
@dataclass auto-generates __init__, __repr__, __eq__ — reduces boilerplate significantly.\
```python\
@dataclass\
class Config:\
    host: str = 'localhost'\
    port: int = 8080\
    debug: bool = False\
\
# Equivalent to writing __init__, __repr__, __eq__ manually\
c = Config(port=3000)\
print(c)  # Config(host='localhost', port=3000, debug=False)\
```
