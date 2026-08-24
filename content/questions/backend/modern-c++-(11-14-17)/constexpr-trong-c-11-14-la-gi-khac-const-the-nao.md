---
id: constexpr-trong-c-11-14-la-gi-khac-const-the-nao
position: backend
technology: modern-c++-(11-14-17)
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`constexpr` trong C++11/14 là gì? Khác `const` thế nào?

## Question (EN)
What is `constexpr` in C++11/14? How does it differ from `const`?

## Đáp án chi tiết (VI)
**`const`**: giá trị không thay đổi sau khởi tạo — có thể tính toán lúc runtime.\
**`constexpr`**: giá trị (hoặc hàm) **được tính tại compile-time** — không tốn chi phí runtime.\
\
```cpp\
const int a = some_function();    // tính lúc runtime — OK\
constexpr int b = 5 * 3;          // tính lúc compile-time — 15\
\
// const int arr[a];  // lỗi — a không phải compile-time constant\
int arr[b];           // OK — b là constexpr\
\
constexpr int factorial(int n) {\
  return n \u003c= 1 ? 1 : n * factorial(n - 1);\
}\
constexpr int f5 = factorial(5);  // = 120, tính lúc compile-time\
```\
\
C++14 mở rộng `constexpr` cho phép `if`, `for`, biến local. C++17 thêm `if constexpr` cho template branching.\
\
**Khi nào dùng `constexpr`:** magic numbers trong code, kích thước mảng, template argument, tránh overhead runtime với giá trị cố định.

## Detailed Answer (EN)
**`const`**: value does not change after initialisation — may be computed at runtime.\
**`constexpr`**: value (or function) **evaluated at compile-time** — zero runtime cost.\
\
```cpp\
const int a = some_function();    // runtime — fine\
constexpr int b = 5 * 3;          // compile-time — 15\
\
// const int arr[a];  // error — a is not a compile-time constant\
int arr[b];           // OK — b is constexpr\
\
constexpr int factorial(int n) {\
  return n \u003c= 1 ? 1 : n * factorial(n - 1);\
}\
constexpr int f5 = factorial(5);  // = 120, computed at compile-time\
```\
\
C++14 expanded `constexpr` to allow `if`, `for`, and local variables. C++17 added `if constexpr` for compile-time template branching.\
\
**When to use `constexpr`:** named constants, array sizes, template arguments, eliminating runtime overhead for fixed values.
