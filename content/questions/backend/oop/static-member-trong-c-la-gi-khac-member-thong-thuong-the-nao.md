---
id: static-member-trong-c-la-gi-khac-member-thong-thuong-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`static` member trong C++ là gì? Khác member thông thường thế nào?

## Question (EN)
What is a static member in C++? How does it differ from a regular member?

## Đáp án chi tiết (VI)
`static` member (variable hoặc function) thuộc về **class**, không thuộc về instance cụ thể nào — tất cả object chia sẻ cùng 1 bản.\
\
```cpp\
class Counter {\
public:\
  static int total;  // 1 biến cho toàn bộ class\
  Counter() { total++; }\
  ~Counter() { total--; }\
\
  static int getTotal() { return total; }  // không có `this`\
};\
\
int Counter::total = 0;  // phải định nghĩa ngoài class\
\
Counter a, b, c;\
std::cout \u003c\u003c Counter::total;        // 3\
std::cout \u003c\u003c Counter::getTotal();   // gọi qua class name\
```\
\
**Đặc điểm:**\
- Static member variable phải **định nghĩa ngoài class** (trừ `inline static` C++17).\
- Static method **không có `this`** — không truy cập non-static member.\
- Dùng cho singleton, factory method, global counter, shared config.

## Detailed Answer (EN)
A `static` member (variable or function) belongs to the **class itself**, not to any particular instance — all objects share the same single copy.\
\
```cpp\
class Counter {\
public:\
  static int total;  // one variable for the entire class\
  Counter() { total++; }\
  ~Counter() { total--; }\
\
  static int getTotal() { return total; }  // no `this`\
};\
\
int Counter::total = 0;  // must be defined outside the class\
\
Counter a, b, c;\
std::cout \u003c\u003c Counter::total;       // 3\
std::cout \u003c\u003c Counter::getTotal();  // call via class name\
```\
\
**Key points:**\
- Static member variable must be **defined outside the class** (except `inline static` in C++17).\
- Static methods have **no `this`** — cannot access non-static members.\
- Used for singletons, factory methods, global counters, shared config.
