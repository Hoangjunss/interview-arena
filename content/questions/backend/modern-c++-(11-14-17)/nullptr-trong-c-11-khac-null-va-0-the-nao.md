---
id: nullptr-trong-c-11-khac-null-va-0-the-nao
position: backend
technology: modern-c++-(11-14-17)
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`nullptr` trong C++11 khác `NULL` và `0` thế nào?

## Question (EN)
How does `nullptr` in C++11 differ from `NULL` and `0`?

## Đáp án chi tiết (VI)
Trước C++11, `NULL` thường là macro `#define NULL 0` — kiểu int, gây nhập nhằng khi overloading.\
\
```cpp\
void foo(int x)   { std::cout \u003c\u003c \\"int\\"; }\
void foo(char* p) { std::cout \u003c\u003c \\"pointer\\"; }\
\
foo(NULL);    // trước C++11: \\"int\\" — sai ý định!\
foo(nullptr); // C++11: \\"pointer\\" — đúng\
```\
\
`nullptr` là literal kiểu `std::nullptr_t`, chuyển đổi ngầm về bất kỳ pointer type nào nhưng **không** về `int`.\
\
**Quy tắc hiện đại:** luôn dùng `nullptr` thay `NULL` hoặc `0` trong C++ — rõ ràng về ý định và type-safe.

## Detailed Answer (EN)
Before C++11, `NULL` was typically `#define NULL 0` — an integer type, causing overload ambiguity.\
\
```cpp\
void foo(int x)   { std::cout \u003c\u003c \\"int\\"; }\
void foo(char* p) { std::cout \u003c\u003c \\"pointer\\"; }\
\
foo(NULL);    // pre-C++11: \\"int\\" — wrong intent!\
foo(nullptr); // C++11: \\"pointer\\" — correct\
```\
\
`nullptr` is a literal of type `std::nullptr_t`, implicitly convertible to any pointer type but **not** to `int`.\
\
**Modern rule:** always use `nullptr` instead of `NULL` or `0` in C++ — clearer intent and type-safe.
