---
id: std-string-view-c-17-la-gi-uu-diem-so-voi-const-std-string
position: backend
technology: modern-c++-(11-14-17)
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::string_view` (C++17) là gì? Ưu điểm so với `const std::string\u0026`?

## Question (EN)
What is `std::string_view` in C++17? What are its advantages over `const std::string\u0026`?

## Đáp án chi tiết (VI)
`std::string_view` là **view không sở hữu** (non-owning view) vào một chuỗi ký tự — chỉ là con trỏ + độ dài, không copy.\
\
```cpp\
void print(std::string_view sv) {\
  std::cout \u003c\u003c sv;  // không copy\
}\
\
print(\\"hello\\");                    // const char* — không tạo std::string\
print(std::string{\\"world\\

## Detailed Answer (EN)
`std::string_view` is a **non-owning view** into a character sequence — just a pointer + length, zero copies.\
\
```cpp\
void print(std::string_view sv) {\
  std::cout \u003c\u003c sv;  // no copy\
}\
\
print(\\"hello\\");                    // const char* — no std::string created\
print(std::string{\\"world\\
