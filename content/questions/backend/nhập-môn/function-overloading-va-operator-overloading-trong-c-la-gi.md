---
id: function-overloading-va-operator-overloading-trong-c-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Function overloading và operator overloading trong C++ là gì?

## Question (EN)
What are function overloading and operator overloading in C++?

## Đáp án chi tiết (VI)
**Function overloading:** nhiều hàm cùng tên, khác signature (số/kiểu tham số). Compiler chọn đúng bản tại compile-time.\
\
**Operator overloading:** tái định nghĩa toán tử (`+`, `\u003c\u003c`, `==`, ...) cho kiểu tự định nghĩa.\
\
```cpp\
struct Vec2 {\
  float x, y;\
  Vec2 operator+(const Vec2\u0026 o) const {\
    return { x + o.x, y + o.y };\
  }\
};\
\
Vec2 a{1,2}, b{3,4};\
Vec2 c = a + b;  // gọi operator+\
```\
\
Khác biệt với **overriding**: override là ghi đè hàm ở lớp con (runtime polymorphism), overloading là cùng tên khác signature (compile-time).

## Detailed Answer (EN)
**Function overloading:** multiple functions with the same name but different signatures (parameter count/types). The compiler picks the right version at compile-time.\
\
**Operator overloading:** redefine operators (`+`, `\u003c\u003c`, `==`, ...) for user-defined types.\
\
```cpp\
struct Vec2 {\
  float x, y;\
  Vec2 operator+(const Vec2\u0026 o) const {\
    return { x + o.x, y + o.y };\
  }\
};\
\
Vec2 a{1,2}, b{3,4};\
Vec2 c = a + b;  // calls operator+\
```\
\
Distinct from **overriding**: override rewrites a base-class method in a subclass (runtime), overloading is same name + different signature (compile-time).
