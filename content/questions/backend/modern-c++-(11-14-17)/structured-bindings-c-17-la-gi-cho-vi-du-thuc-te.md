---
id: structured-bindings-c-17-la-gi-cho-vi-du-thuc-te
position: backend
technology: modern-c++-(11-14-17)
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Structured bindings (C++17) là gì? Cho ví dụ thực tế.

## Question (EN)
What are structured bindings in C++17? Give a practical example.

## Đáp án chi tiết (VI)
Structured bindings (C++17) cho phép **unpack** tuple, pair, array, hoặc struct vào các biến riêng biệt với cú pháp ngắn gọn.\
\
```cpp\
// Trước C++17:\
int idx = p.first;\
std::string name = p.second;\
\
// C++17 — ngắn và rõ:\
auto [idx, name] = std::make_pair(1, \\"hello\\");\
\
// Map iteration — rất phổ biến trong interview:\
for (const auto\u0026 [name, score] : scores) {\
  std::cout \u003c\u003c name \u003c\u003c \\": \\" \u003c\u003c score \u003c\u003c \\"\\\
\\";\
}\
\
// Unpack insert result:\
auto [it, inserted] = myMap.insert({\\"key\\

## Detailed Answer (EN)
Structured bindings (C++17) allow **unpacking** a tuple, pair, array, or struct into individual named variables with clean syntax.\
\
```cpp\
// Pre-C++17:\
int idx = p.first;\
std::string name = p.second;\
\
// C++17 — concise:\
auto [idx, name] = std::make_pair(1, \\"hello\\");\
\
// Map iteration — very common in interviews:\
for (const auto\u0026 [name, score] : scores) {\
  std::cout \u003c\u003c name \u003c\u003c \\": \\" \u003c\u003c score \u003c\u003c \\"\\\
\\";\
}\
\
// Unpack insert result:\
auto [it, inserted] = myMap.insert({\\"key\\
