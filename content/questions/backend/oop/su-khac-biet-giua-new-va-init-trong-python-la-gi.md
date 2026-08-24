---
id: su-khac-biet-giua-new-va-init-trong-python-la-gi
position: backend
technology: oop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa `__new__` và `__init__` trong Python là gì?

## Question (EN)
What is the difference between `__new__` and `__init__` in Python?

## Đáp án chi tiết (VI)
`__new__` là một static method (Python special-case nên không cần khai báo `@staticmethod`), được gọi **trước tiên** để *tạo* và trả về một instance mới — nhận `cls` làm tham số đầu.\
\
`__init__` là instance method được gọi **sau khi** `__new__` đã trả về instance, dùng để *khởi tạo* state cho instance đó — nhận `self`, và phải trả về `None`.\
\
**Khi nào dùng cái nào?**\
- Dùng `__init__` trong hầu hết trường hợp để set thuộc tính ban đầu.\
- Chỉ override `__new__` khi cần kiểm soát việc *tạo* instance: Singleton, object pooling, hoặc subclass một immutable type như `tuple`, `str`, `int` (lúc đó không thể gán giá trị trong `__init__`).\
\
**Lưu ý:** `__init__` chỉ chạy nếu `__new__` trả về instance của chính class đó; nếu `__new__` trả về object thuộc class khác thì `__init__` bị bỏ qua.

## Detailed Answer (EN)
`__new__` is a static method (special-cased so you need not declare `@staticmethod`) called **first** to *create* and return a new instance — it receives `cls` as its first argument.\
\
`__init__` is an instance method called **after** `__new__` returns the instance; it *initializes* that instance's state — it receives `self` and must return `None`.\
\
**When to use which?**\
- Use `__init__` in almost all cases to set up initial attributes.\
- Only override `__new__` when you must control instance *creation*: Singleton, object pooling, or subclassing an immutable type like `tuple`, `str`, `int` (where you cannot set the value in `__init__`).\
\
**Note:** `__init__` runs only if `__new__` returns an instance of that class; if `__new__` returns an object of a different class, `__init__` is skipped.
