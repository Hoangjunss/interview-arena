---
id: da-hinh-compile-time-va-runtime-khac-nhau-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đa hình compile-time và runtime khác nhau thế nào?

## Question (EN)
How does compile-time polymorphism differ from runtime polymorphism?

## Đáp án chi tiết (VI)
**Compile-time (static polymorphism):** lời gọi được phân giải lúc biên dịch — qua **function overloading**, **template**, CRTP. Không tốn chi phí runtime và có thể inline, nhưng kiểu phải biết trước lúc biên dịch.\
\
**Runtime (dynamic polymorphism):** phân giải lúc chạy qua **virtual function + vtable**. Cho phép xử lý object qua con trỏ/tham chiếu lớp cơ sở, nhưng thêm một lần gián tiếp (tra vptr) và thường không inline được.\
\
```cpp\
template\u003cclass T\u003e void f(T\u0026 x){ x.run(); }  // static\
base-\u003erun();                                // dynamic (virtual)\
```\
\
Chọn: template khi kiểu biết lúc biên dịch và cần tốc độ; virtual khi cần chọn hành vi lúc chạy.

## Detailed Answer (EN)
**Compile-time (static polymorphism):** the call is resolved at compile time — via **function overloading**, **templates**, or CRTP. No runtime cost and it can inline, but the type must be known at compile time.\
\
**Runtime (dynamic polymorphism):** resolved at run time via **virtual functions + a vtable**. It lets you handle objects through a base pointer/reference, but adds one indirection (vptr lookup) and usually cannot inline.\
\
```cpp\
template\u003cclass T\u003e void f(T\u0026 x){ x.run(); }  // static\
base-\u003erun();                                // dynamic (virtual)\
```\
\
Choose templates when the type is known at compile time and speed matters; choose virtuals when behavior must be selected at run time.
