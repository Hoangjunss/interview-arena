---
id: template-trong-c-la-gi-function-template-va-class-template-khac-nhau-the-nao
position: backend
technology: modern-c++-(11-14-17)
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Template trong C++ là gì? Function template và class template khác nhau thế nào?

## Question (EN)
What are templates in C++? How do function templates and class templates differ?

## Đáp án chi tiết (VI)
Template cho phép viết code **generic** — hoạt động với nhiều kiểu mà không cần copy-paste. Compiler tạo bản cụ thể (instantiation) khi cần.\
\
**Function template:**\
```cpp\
template \u003ctypename T\u003e\
T max_val(T a, T b) { return a \u003e b ? a : b; }\
\
max_val(3, 5);       // T = int\
max_val(3.0, 5.0);   // T = double\
```\
\
**Class template:**\
```cpp\
template \u003ctypename T\u003e\
class Stack {\
  std::vector\u003cT\u003e data_;\
public:\
  void push(T val) { data_.push_back(val); }\
  T pop() { T v = data_.back(); data_.pop_back(); return v; }\
};\
\
Stack\u003cint\u003e si;\
Stack\u003cstd::string\u003e ss;\
```\
\
**Template specialization:** định nghĩa cài đặt riêng cho kiểu cụ thể — ví dụ `template \u003c\u003e max_val\u003cint\u003e(...)` dùng SIMD.\
\
STL hoàn toàn được xây dựng trên template — đây là lý do `std::vector\u003cint\u003e` và `std::vector\u003cdouble\u003e` cùng API.

## Detailed Answer (EN)
Templates allow writing **generic** code that works across multiple types without copy-pasting. The compiler generates concrete instantiations on demand.\
\
**Function template:**\
```cpp\
template \u003ctypename T\u003e\
T max_val(T a, T b) { return a \u003e b ? a : b; }\
\
max_val(3, 5);       // T = int\
max_val(3.0, 5.0);   // T = double\
```\
\
**Class template:**\
```cpp\
template \u003ctypename T\u003e\
class Stack {\
  std::vector\u003cT\u003e data_;\
public:\
  void push(T val) { data_.push_back(val); }\
  T pop() { T v = data_.back(); data_.pop_back(); return v; }\
};\
\
Stack\u003cint\u003e si;\
Stack\u003cstd::string\u003e ss;\
```\
\
**Template specialization:** custom implementation for a specific type — e.g. `template \u003c\u003e max_val\u003cint\u003e(...)` using SIMD.\
\
The entire STL is built on templates — which is why `std::vector\u003cint\u003e` and `std::vector\u003cdouble\u003e` share the same API.
