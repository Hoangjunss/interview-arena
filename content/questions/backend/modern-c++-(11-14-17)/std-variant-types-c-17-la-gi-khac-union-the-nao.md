---
id: std-variant-types-c-17-la-gi-khac-union-the-nao
position: backend
technology: modern-c++-(11-14-17)
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::variant\u003cTypes...\u003e` (C++17) là gì? Khác `union` thế nào?

## Question (EN)
What is `std::variant\u003cTypes...\u003e` in C++17? How does it differ from a `union`?

## Đáp án chi tiết (VI)
`std::variant` là **type-safe union** — tại một thời điểm chỉ giữ một giá trị, nhưng luôn biết kiểu đang giữ là gì.\
\
```cpp\
std::variant\u003cint, double, std::string\u003e v;\
v = 42;          // giữ int\
v = 3.14;        // giữ double\
v = \\"hello\\";     // giữ string\
\
// Truy cập:\
std::cout \u003c\u003c std::get\u003cdouble\u003e(v);       // OK\
// std::get\u003cint\u003e(v);                    // throw std::bad_variant_access\
\
// Pattern matching:\
std::visit([](auto\u0026\u0026 val) {\
  std::cout \u003c\u003c val;\
}, v);\
```\
\
**Khác `union`:**\
| | `union` | `std::variant` |\
|---|---|---|\
| Type tracking | Không | Có |\
| Destructor | Không tự gọi | Tự gọi |\
| An toàn | Không (UB nếu đọc sai kiểu) | An toàn |\
\
**Dùng khi:** cần lưu một trong nhiều kiểu (kết quả parse, AST node, lỗi/giá trị).

## Detailed Answer (EN)
`std::variant` is a **type-safe union** — holds one value at a time, but always knows which type it is currently holding.\
\
```cpp\
std::variant\u003cint, double, std::string\u003e v;\
v = 42;          // holds int\
v = 3.14;        // holds double\
v = \\"hello\\";     // holds string\
\
// Access:\
std::cout \u003c\u003c std::get\u003cdouble\u003e(v);       // OK\
// std::get\u003cint\u003e(v);                    // throws std::bad_variant_access\
\
// Pattern matching:\
std::visit([](auto\u0026\u0026 val) {\
  std::cout \u003c\u003c val;\
}, v);\
```\
\
**vs `union`:**\
| | `union` | `std::variant` |\
|---|---|---|\
| Type tracking | No | Yes |\
| Destructor | Not called automatically | Called automatically |\
| Safety | No (UB if wrong type read) | Safe |\
\
**Use when:** you need to store one of several types (parse results, AST nodes, error-or-value patterns).
