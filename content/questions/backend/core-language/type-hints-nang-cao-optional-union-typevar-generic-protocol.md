---
id: type-hints-nang-cao-optional-union-typevar-generic-protocol
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Type hints nâng cao: `Optional`, `Union`, `TypeVar`, `Generic`, `Protocol`?

## Question (EN)
Advanced type hints: `Optional`, `Union`, `TypeVar`, `Generic`, `Protocol`?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
```python\
from typing import Optional, Union, TypeVar, Generic, Protocol\
\
# Optional[X] == Union[X, None]\
def find_user(user_id: int) -\u003e Optional[User]: ...\
\
# Generic class\
T = TypeVar('T')\
class Stack(Generic[T]):\
    def push(self, item: T) -\u003e None: ...\
    def pop(self) -\u003e T: ...\
\
# Protocol — structural subtyping\
class Drawable(Protocol):\
    def draw(self) -\u003e None: ...\
\
def render(obj: Drawable) -\u003e None: obj.draw()\
```\
Python 3.10+: use `X | Y` instead of `Union[X, Y]`.
