---
id: mro-method-resolution-order-la-gi-python-giai-quyet-diamond-problem-the-nao
position: backend
technology: oop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MRO (Method Resolution Order) là gì? Python giải quyết diamond problem thế nào?

## Question (EN)
What is MRO? How does Python solve the diamond problem?

## Đáp án chi tiết (VI)
MRO xác định thứ tự Python tìm method trong cây kế thừa, dùng thuật toán C3 Linearization. Giải quyết diamond problem bằng cách đảm bảo mỗi class chỉ xuất hiện một lần.\
```python\
class A:\
    def method(self): print(\\"A\\")\
\
class B(A):\
    def method(self): super().method(); print(\\"B\\")\
\
class C(A):\
    def method(self): super().method(); print(\\"C\\")\
\
class D(B, C): pass\
\
D().method()   # A → C → B (theo MRO)\
print(D.__mro__)  # D, B, C, A, object\
```\
Xem MRO: `ClassName.__mro__` hoặc `ClassName.mro()`.

## Detailed Answer (EN)
MRO defines the order Python searches for methods in the inheritance tree, using C3 Linearization. Solves the diamond problem by ensuring each class appears only once.\
```python\
class D(B, C): pass\
print(D.__mro__)  # D → B → C → A → object\
D().method()      # Calls in MRO order\
```
