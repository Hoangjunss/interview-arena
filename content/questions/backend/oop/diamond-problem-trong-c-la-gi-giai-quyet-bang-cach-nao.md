---
id: diamond-problem-trong-c-la-gi-giai-quyet-bang-cach-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Diamond problem trong C++ là gì? Giải quyết bằng cách nào?

## Question (EN)
What is the diamond problem in C++? How is it solved?

## Đáp án chi tiết (VI)
Diamond problem xảy ra khi class `D` kế thừa từ `B` và `C`, cả hai đều kế thừa từ `A`. Kết quả: `D` có **2 bản sao** của `A`, gây nhập nhằng.\
\
```\
    A\
   / \\\\\
  B   C\
   \\\\ /\
    D\
```\
\
```cpp\
class A { public: int x; };\
class B : public A {};\
class C : public A {};\
class D : public B, public C {};\
\
D d;\
// d.x;  // lỗi: ambiguous — B::x hay C::x?\
```\
\
**Giải pháp: virtual inheritance** — `A` chỉ tồn tại **1 lần** trong `D`.\
\
```cpp\
class B : virtual public A {};\
class C : virtual public A {};\
class D : public B, public C {};\
\
D d;\
d.x = 5;  // OK — chỉ có một A::x duy nhất\
```\
\
Virtual inheritance tốn thêm overhead (thêm vptr); thường nên tránh diamond bằng cách thiết kế lại (dùng interface/composition).

## Detailed Answer (EN)
The diamond problem occurs when class `D` inherits from both `B` and `C`, which both inherit from `A`. Result: `D` gets **two copies** of `A`, causing ambiguity.\
\
```\
    A\
   / \\\\\
  B   C\
   \\\\ /\
    D\
```\
\
```cpp\
class A { public: int x; };\
class B : public A {};\
class C : public A {};\
class D : public B, public C {};\
\
D d;\
// d.x;  // error: ambiguous — B::x or C::x?\
```\
\
**Solution: virtual inheritance** — `A` exists only **once** in `D`.\
\
```cpp\
class B : virtual public A {};\
class C : virtual public A {};\
class D : public B, public C {};\
\
D d;\
d.x = 5;  // OK — only one A::x\
```\
\
Virtual inheritance adds overhead (extra vptr); the usual recommendation is to avoid the diamond by redesigning using interfaces or composition.
