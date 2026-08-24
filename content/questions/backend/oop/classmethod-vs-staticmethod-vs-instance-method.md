---
id: classmethod-vs-staticmethod-vs-instance-method
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`@classmethod` vs `@staticmethod` vs instance method?

## Question (EN)
@classmethod vs @staticmethod vs instance method?

## Đáp án chi tiết (VI)
Instance method nhận `self` — có access vào instance và class. `@classmethod` nhận `cls` — access class, thường dùng làm factory. `@staticmethod` không nhận `self` hay `cls` — utility function liên quan đến class.\
```python\
class User:\
    _count = 0\
\
    def __init__(self, name):\
        self.name = name\
        User._count += 1\
\
    def greet(self):            # Instance method\
        return f\\"Hi, {self.name}\\"\
\
    @classmethod\
    def from_dict(cls, data):   # Factory — dùng cls thay vì User\
        return cls(data['name'])\
\
    @staticmethod\
    def validate_name(name):    # Utility — không cần self/cls\
        return len(name) \u003e= 2\
```

## Detailed Answer (EN)
Instance method receives self. @classmethod receives cls — often used as factory. @staticmethod — utility, no self or cls.\
```python\
class Pizza:\
    @classmethod\
    def from_dict(cls, data):   # Factory pattern\
        return cls(data['price'])\
\
    @staticmethod\
    def is_valid_price(p):      # Pure utility\
        return p \u003e 0\
```
