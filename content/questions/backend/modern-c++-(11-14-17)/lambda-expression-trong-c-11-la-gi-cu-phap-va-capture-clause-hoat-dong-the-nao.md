---
id: lambda-expression-trong-c-11-la-gi-cu-phap-va-capture-clause-hoat-dong-the-nao
position: backend
technology: modern-c++-(11-14-17)
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lambda expression trong C++11 là gì? Cú pháp và capture clause hoạt động thế nào?

## Question (EN)
What is a lambda expression in C++11? How does the capture clause work?

## Đáp án chi tiết (VI)
Lambda là **hàm vô danh** inline, thường dùng cùng STL algorithm.\
\
```cpp\
// Cú pháp: [capture](params) -\u003e return_type { body }\
auto add = [](int a, int b) { return a + b; };\
\
// Capture clause — truy cập biến ngoài scope:\
int base = 10;\
auto addBase  = [base](int x)  { return base + x; };   // by value\
auto addBase2 = [\u0026base](int x) { return base + x; };   // by reference\
\
// [=] bắt tất cả by value; [\u0026] bắt tất cả by reference\
std::sort(v.begin(), v.end(), [](int a, int b) { return a \u003e b; });\
```\
\
**Lưu ý:** capture by reference khi lambda tồn tại lâu hơn biến captured → dangling reference. Dùng capture by value hoặc `std::shared_ptr` để an toàn.

## Detailed Answer (EN)
A lambda is an **anonymous inline function**, commonly used with STL algorithms.\
\
```cpp\
// Syntax: [capture](params) -\u003e return_type { body }\
auto add = [](int a, int b) { return a + b; };\
\
// Capture clause — access variables from outer scope:\
int base = 10;\
auto addBase  = [base](int x)  { return base + x; };  // by value\
auto addBase2 = [\u0026base](int x) { return base + x; };  // by reference\
\
// [=] capture all by value; [\u0026] capture all by reference\
std::sort(v.begin(), v.end(), [](int a, int b) { return a \u003e b; });\
```\
\
**Watch out:** capturing by reference when the lambda outlives the captured variable → dangling reference. Use by-value capture or `std::shared_ptr` for safety.
