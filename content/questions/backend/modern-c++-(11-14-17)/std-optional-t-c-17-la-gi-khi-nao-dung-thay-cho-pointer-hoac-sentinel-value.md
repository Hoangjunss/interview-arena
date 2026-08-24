---
id: std-optional-t-c-17-la-gi-khi-nao-dung-thay-cho-pointer-hoac-sentinel-value
position: backend
technology: modern-c++-(11-14-17)
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::optional\u003cT\u003e` (C++17) là gì? Khi nào dùng thay cho pointer hoặc sentinel value?

## Question (EN)
What is `std::optional\u003cT\u003e` in C++17? When should you use it instead of a pointer or sentinel value?

## Đáp án chi tiết (VI)
`std::optional\u003cT\u003e` đại diện cho giá trị **có thể có hoặc không** — thay thế cho `nullptr`, `-1`, hoặc out-param bool.\
\
```cpp\
// Trước C++17: trả pointer (nguy hiểm) hoặc sentinel\
int* findUser(int id);  // nullptr nếu không tìm thấy\
\
// C++17: rõ ràng, type-safe\
std::optional\u003cUser\u003e findUser(int id) {\
  if (id == 42) return User{\\"Alice\\

## Detailed Answer (EN)
`std::optional\u003cT\u003e` represents a value that **may or may not be present** — a type-safe alternative to `nullptr`, `-1`, or a boolean out-parameter.\
\
```cpp\
// Pre-C++17: return pointer (dangerous) or sentinel\
int* findUser(int id);  // nullptr if not found\
\
// C++17: explicit, type-safe\
std::optional\u003cUser\u003e findUser(int id) {\
  if (id == 42) return User{\\"Alice\\
