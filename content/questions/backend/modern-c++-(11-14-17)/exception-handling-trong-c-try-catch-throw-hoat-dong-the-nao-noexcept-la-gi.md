---
id: exception-handling-trong-c-try-catch-throw-hoat-dong-the-nao-noexcept-la-gi
position: backend
technology: modern-c++-(11-14-17)
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Exception handling trong C++: `try`/`catch`/`throw` hoạt động thế nào? `noexcept` là gì?

## Question (EN)
How does exception handling with `try`/`catch`/`throw` work in C++? What is `noexcept`?

## Đáp án chi tiết (VI)
**Cơ chế:**\
```cpp\
void openFile(const std::string\u0026 path) {\
  if (path.empty()) throw std::invalid_argument(\\"path rỗng\\");\
  // ...\
}\
\
try {\
  openFile(\\"\\");\
} catch (const std::invalid_argument\u0026 e) {\
  std::cerr \u003c\u003c \\"Lỗi: \\" \u003c\u003c e.what();\
} catch (const std::exception\u0026 e) {\
  std::cerr \u003c\u003c \\"Exception chung: \\" \u003c\u003c e.what();\
} catch (...) {\
  std::cerr \u003c\u003c \\"Exception không xác định\\";\
}\
```\
\
**Stack unwinding:** khi exception được throw, destructor của mọi object trên stack được gọi theo thứ tự ngược — đây là lý do RAII hoạt động ngay cả khi có exception.\
\
**`noexcept`:** khai báo hàm **không ném exception**. Nếu vi phạm → `std::terminate()` được gọi.\
```cpp\
void swap(int\u0026 a, int\u0026 b) noexcept { int t = a; a = b; b = t; }\
```\
\
Move constructor/destructor nên `noexcept` để `std::vector` dùng move thay copy khi resize.

## Detailed Answer (EN)
**Mechanism:**\
```cpp\
void openFile(const std::string\u0026 path) {\
  if (path.empty()) throw std::invalid_argument(\\"empty path\\");\
  // ...\
}\
\
try {\
  openFile(\\"\\");\
} catch (const std::invalid_argument\u0026 e) {\
  std::cerr \u003c\u003c \\"Error: \\" \u003c\u003c e.what();\
} catch (const std::exception\u0026 e) {\
  std::cerr \u003c\u003c \\"General exception: \\" \u003c\u003c e.what();\
} catch (...) {\
  std::cerr \u003c\u003c \\"Unknown exception\\";\
}\
```\
\
**Stack unwinding:** when an exception is thrown, destructors for all stack objects run in reverse order — this is why RAII is exception-safe.\
\
**`noexcept`:** declares that a function **will not throw**. If it does → `std::terminate()` is called.\
```cpp\
void swap(int\u0026 a, int\u0026 b) noexcept { int t = a; a = b; b = t; }\
```\
\
Move constructors/destructors should be `noexcept` so `std::vector` can use move instead of copy when resizing.
