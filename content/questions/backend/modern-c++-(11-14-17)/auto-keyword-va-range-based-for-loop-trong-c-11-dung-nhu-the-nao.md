---
id: auto-keyword-va-range-based-for-loop-trong-c-11-dung-nhu-the-nao
position: backend
technology: modern-c++-(11-14-17)
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`auto` keyword và range-based for loop trong C++11 dùng như thế nào?

## Question (EN)
How are the `auto` keyword and range-based for loop used in C++11?

## Đáp án chi tiết (VI)
**`auto`:** yêu cầu compiler tự suy kiểu (type deduction) từ biểu thức khởi tạo.\
\
```cpp\
auto x = 42;          // int\
auto y = 3.14;        // double\
\
// Đặc biệt hữu ích với kiểu dài:\
std::map\u003cstd::string, std::vector\u003cint\u003e\u003e m;\
auto it = m.begin();  // thay vì: std::map\u003cstd::string, std::vector\u003cint\u003e\u003e::iterator\
```\
\
**Range-based for (C++11):**\
\
```cpp\
std::vector\u003cint\u003e v = {1, 2, 3};\
\
for (int x : v)        // copy\
for (int\u0026 x : v)       // reference — có thể sửa\
for (const int\u0026 x : v) // const ref — đọc không copy\
for (auto\u0026 x : v)      // auto + ref — tốt nhất cho mọi kiểu\
```\
\
**Lưu ý:** `auto\u0026 x` giữ reference; `auto x` luôn copy kể cả với reference source.

## Detailed Answer (EN)
**`auto`:** asks the compiler to deduce the type from the initialisation expression.\
\
```cpp\
auto x = 42;                // int\
auto y = 3.14;              // double\
\
// Especially useful for verbose types:\
std::map\u003cstd::string, std::vector\u003cint\u003e\u003e m;\
auto it = m.begin();  // instead of: std::map\u003cstd::string, std::vector\u003cint\u003e\u003e::iterator\
```\
\
**Range-based for (C++11):**\
\
```cpp\
std::vector\u003cint\u003e v = {1, 2, 3};\
\
for (int x : v)         // copy\
for (int\u0026 x : v)        // reference — can modify\
for (const int\u0026 x : v)  // const ref — read-only, no copy\
for (auto\u0026 x : v)       // auto + ref — best default for any type\
```\
\
**Note:** `auto\u0026` preserves reference; plain `auto` always copies even from a reference source.
