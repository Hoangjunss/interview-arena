---
id: property-decorator-dung-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`@property` decorator dùng thế nào?

## Question (EN)
How does the `@property` decorator work?

## Đáp án chi tiết (VI)
`@property` cho phép define getter/setter/deleter cho attribute, truy cập như attribute thường nhưng có validation logic.\
```python\
class Temperature:\
    def __init__(self, celsius: float):\
        self._celsius = celsius\
\
    @property\
    def celsius(self) -\u003e float:\
        return self._celsius\
\
    @celsius.setter\
    def celsius(self, value: float):\
        if value \u003c -273.15:\
            raise ValueError(\\"Below absolute zero!\\")\
        self._celsius = value\
\
    @property\
    def fahrenheit(self) -\u003e float:  # Read-only derived property\
        return self._celsius * 9/5 + 32\
\
t = Temperature(25)\
t.celsius = 30      # Gọi setter tự động\
print(t.fahrenheit) # 86.0\
```

## Detailed Answer (EN)
@property lets you define getter/setter/deleter, accessed like a plain attribute but with validation.\
```python\
class Circle:\
    def __init__(self, radius):\
        self._radius = radius\
\
    @property\
    def radius(self): return self._radius\
\
    @radius.setter\
    def radius(self, r):\
        if r \u003c 0: raise ValueError()\
        self._radius = r\
\
    @property\
    def area(self): return 3.14 * self._radius ** 2\
```
