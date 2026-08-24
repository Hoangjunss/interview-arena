---
id: explicit-keyword-trong-c-dung-de-lam-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`explicit` keyword trong C++ dùng để làm gì?

## Question (EN)
What is the `explicit` keyword used for in C++?

## Đáp án chi tiết (VI)
`explicit` ngăn compiler **tự động chuyển đổi ngầm** (implicit conversion) khi gọi constructor hoặc toán tử chuyển đổi.\
\
```cpp\
class Width {\
public:\
  Width(int w) {}  // không có explicit\
};\
\
void process(Width w) {}\
process(42);  // OK: int → Width ngầm — dễ gây nhầm\
\
// Dùng explicit:\
class Width2 {\
public:\
  explicit Width2(int w) {}\
};\
\
// process(42);          // lỗi compile — không ngầm convert\
process(Width2(42));     // OK — convert tường minh\
```\
\
**Quy tắc thực tế:** constructor có 1 tham số nên khai báo `explicit` trừ khi conversion ngầm đó có ý nghĩa rõ ràng (ví dụ `std::string` từ `const char*`).

## Detailed Answer (EN)
`explicit` prevents the compiler from performing **implicit conversions** when calling a constructor or conversion operator.\
\
```cpp\
class Width {\
public:\
  Width(int w) {}  // no explicit\
};\
\
void process(Width w) {}\
process(42);  // OK: int → Width implicitly — easy to confuse\
\
// With explicit:\
class Width2 {\
public:\
  explicit Width2(int w) {}\
};\
\
// process(42);       // compile error — no implicit conversion\
process(Width2(42)); // OK — explicit conversion\
```\
\
**Practical rule:** single-argument constructors should be `explicit` unless the implicit conversion is intentional and clearly meaningful (e.g. `std::string` from `const char*`).
