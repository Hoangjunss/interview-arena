---
id: vi-sao-destructor-cua-lop-co-so-nen-la-virtual
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao destructor của lớp cơ sở nên là `virtual`?

## Question (EN)
Why should a base class destructor be `virtual`?

## Đáp án chi tiết (VI)
Khi xóa object dẫn xuất qua con trỏ lớp cơ sở:\
```cpp\
Base* p = new Derived();\
delete p;   // destructor nào chạy?\
```\
Nếu destructor của `Base` **không** `virtual`, chỉ `~Base()` chạy — phần `Derived` không được hủy → **rò rỉ tài nguyên / undefined behavior**.\
\
Đánh dấu `virtual ~Base()` để `delete` tra vtable và gọi đúng `~Derived()`, hủy đầy đủ chuỗi từ dẫn xuất về cơ sở.\
\
**Quy tắc (Effective C++, Item 7):** lớp dùng làm base đa hình (có bất kỳ virtual function nào) phải có virtual destructor. Ngược lại, lớp không định dùng làm base thì đừng thêm — tránh chi phí vptr.

## Detailed Answer (EN)
When you delete a derived object through a base pointer:\
```cpp\
Base* p = new Derived();\
delete p;   // which destructor runs?\
```\
If `Base` destructor is **not** `virtual`, only `~Base()` runs — the `Derived` part is never destroyed → **resource leak / undefined behavior**.\
\
Mark `virtual ~Base()` so `delete` consults the vtable and calls `~Derived()`, destroying the full chain from derived down to base.\
\
**Rule (Effective C++, Item 7):** a class meant to be a polymorphic base (it has any virtual function) must have a virtual destructor. Conversely, do not add one to a class not intended as a base — it avoids the vptr cost.
