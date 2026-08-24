---
id: std-initializer-list-t-trong-c-11-la-gi-hoat-dong-the-nao-voi-constructor
position: backend
technology: modern-c++-(11-14-17)
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::initializer_list\u003cT\u003e` trong C++11 là gì? Hoạt động thế nào với constructor?

## Question (EN)
What is `std::initializer_list\u003cT\u003e` in C++11? How does it interact with constructors?

## Đáp án chi tiết (VI)
`std::initializer_list\u003cT\u003e` cho phép khởi tạo object bằng **cú pháp `{...}` (brace initialization)** với nhiều giá trị — đặc biệt hữu ích cho container.\
\
```cpp\
class NumberSet {\
  std::vector\u003cint\u003e data_;\
public:\
  NumberSet(std::initializer_list\u003cint\u003e list) : data_(list) {}\
};\
\
NumberSet s = {1, 2, 3, 4, 5};  // gọi constructor nhận initializer_list\
\
// STL containers hỗ trợ sẵn:\
std::vector\u003cint\u003e v = {10, 20, 30};\
std::map\u003cstd::string, int\u003e m = {{\\"a\\

## Detailed Answer (EN)
`std::initializer_list\u003cT\u003e` allows initialising objects with **brace syntax `{...}`** using multiple values — especially useful for containers.\
\
```cpp\
class NumberSet {\
  std::vector\u003cint\u003e data_;\
public:\
  NumberSet(std::initializer_list\u003cint\u003e list) : data_(list) {}\
};\
\
NumberSet s = {1, 2, 3, 4, 5};  // calls initializer_list constructor\
\
// STL containers support this natively:\
std::vector\u003cint\u003e v = {10, 20, 30};\
std::map\u003cstd::string, int\u003e m = {{\\"a\\
