---
id: std-move-vs-std-forward-khac-nhau-the-nao-perfect-forwarding-la-gi
position: backend
technology: modern-c++-(11-14-17)
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::move` vs `std::forward` — khác nhau thế nào? Perfect forwarding là gì?

## Question (EN)
What is the difference between `std::move` and `std::forward`? What is perfect forwarding?

## Đáp án chi tiết (VI)
**`std::move`:** cast **vô điều kiện** một giá trị thành rvalue reference — cho phép move constructor/assignment \\"cướp\\" tài nguyên.\
\
**`std::forward`:** cast **có điều kiện** — giữ nguyên value category (lvalue giữ lvalue, rvalue giữ rvalue) khi truyền tiếp vào hàm khác. Chỉ dùng với template forwarding reference (`T\u0026\u0026`).\
\
**Perfect forwarding pattern:**\
```cpp\
template \u003ctypename T\u003e\
void wrapper(T\u0026\u0026 arg) {\
  // std::move(arg): luôn rvalue — có thể sai nếu arg là lvalue\
  // std::forward\u003cT\u003e(arg): đúng trong mọi trường hợp\
  doWork(std::forward\u003cT\u003e(arg));\
}\
\
std::string s = \\"hello\\";\
wrapper(s);              // arg là lvalue → forward giữ lvalue\
wrapper(std::string{\\"world\\

## Detailed Answer (EN)
**`std::move`:** **unconditionally** casts a value to an rvalue reference — enabling a move constructor/assignment to \\"steal\\" its resources.\
\
**`std::forward`:** **conditionally** casts — preserves the original value category (lvalue stays lvalue, rvalue stays rvalue) when passing an argument onward. Used only with template forwarding references (`T\u0026\u0026`).\
\
**Perfect forwarding pattern:**\
```cpp\
template \u003ctypename T\u003e\
void wrapper(T\u0026\u0026 arg) {\
  // std::move(arg): always rvalue — wrong if arg is lvalue\
  // std::forward\u003cT\u003e(arg): correct in all cases\
  doWork(std::forward\u003cT\u003e(arg));\
}\
\
std::string s = \\"hello\\";\
wrapper(s);                      // arg is lvalue → forward preserves lvalue\
wrapper(std::string{\\"world\\
