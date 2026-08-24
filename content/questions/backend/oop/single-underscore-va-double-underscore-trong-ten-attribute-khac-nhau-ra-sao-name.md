---
id: single-underscore-va-double-underscore-trong-ten-attribute-khac-nhau-ra-sao-name
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Single underscore và double underscore trong tên attribute khác nhau ra sao? Name mangling là gì?

## Question (EN)
How do single vs double leading underscores in an attribute name differ? What is name mangling?

## Đáp án chi tiết (VI)
Python **không có** access modifier thật (`private`/`protected`). Thay vào đó là quy ước và một cơ chế đổi tên:\
\
- `_name` (1 gạch đầu): quy ước \\"nội bộ, đừng đụng từ ngoài\\" — **thuần convention**, không ràng buộc, vẫn truy cập được.\
- `__name` (2 gạch đầu, tối đa 1 gạch cuối): trình biên dịch **đổi tên** thành `_ClassName__name` — gọi là **name mangling**. Mục đích không phải giấu mà **tránh trùng tên** khi subclass vô tình đặt cùng attribute.\
- `__dunder__` (2 gạch đầu **và** đuôi): tên đặc biệt của Python (`__init__`, `__len__`), **không** bị mangle.\
\
```python\
class A:\
    def __init__(self):\
        self.__x = 1    # thực chất là self._A__x\
```

## Detailed Answer (EN)
Python has **no** real access modifiers (`private`/`protected`). Instead there is a convention plus a renaming mechanism:\
\
- `_name` (single leading underscore): a \\"internal, do not touch from outside\\" convention — **purely a convention**, not enforced, still accessible.\
- `__name` (two leading underscores, at most one trailing): the compiler **rewrites** it to `_ClassName__name` — this is **name mangling**. The point is not hiding but **avoiding name clashes** when a subclass accidentally defines the same attribute.\
- `__dunder__` (two leading **and** trailing): Python's special names (`__init__`, `__len__`) are **not** mangled.\
\
```python\
class A:\
    def __init__(self):\
        self.__x = 1    # actually stored as self._A__x\
```
