---
id: descriptor-protocol-trong-python-get-set-delete
position: backend
technology: oop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Descriptor Protocol trong Python — `__get__`, `__set__`, `__delete__`?

## Question (EN)
Descriptor Protocol in Python — `__get__`, `__set__`, `__delete__`?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
Descriptors define how attributes are accessed — the mechanism behind `@property`, `@classmethod`, `@staticmethod`.\
```python\
class Validator:\
    def __set_name__(self, owner, name): self.name = name\
    def __get__(self, obj, objtype=None):\
        return None if obj is None else obj.__dict__.get(self.name)\
    def __set__(self, obj, value):\
        if not isinstance(value, int) or value \u003c 0:\
            raise ValueError(f\\"{self.name} must be non-negative int\\")\
        obj.__dict__[self.name] = value\
\
class Product:\
    price = Validator()\
    quantity = Validator()\
\
p = Product(); p.price = 100  # OK\
p.price = -1  # ValueError\
```\
**Data descriptor** (has `__set__`): takes priority over instance `__dict__`. Explains why `instance.method` returns a bound method.
