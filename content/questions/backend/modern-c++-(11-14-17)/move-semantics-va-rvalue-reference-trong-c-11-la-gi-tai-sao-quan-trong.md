---
id: move-semantics-va-rvalue-reference-trong-c-11-la-gi-tai-sao-quan-trong
position: backend
technology: modern-c++-(11-14-17)
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Move semantics và rvalue reference (`\u0026\u0026`) trong C++11 là gì? Tại sao quan trọng?

## Question (EN)
What are move semantics and rvalue references (`\u0026\u0026`) in C++11? Why do they matter?

## Đáp án chi tiết (VI)
Trước C++11, truyền object lớn (vector, string) vào hàm luôn copy → tốn kém. Move semantics cho phép **\\"chuyển nhượng\\"** tài nguyên thay vì copy.\
\
- **lvalue**: object có địa chỉ xác định (có thể lấy `\u0026`).\
- **rvalue**: giá trị tạm thời, không có địa chỉ bền vững (kết quả biểu thức, literal).\
- **`T\u0026\u0026`** (rvalue reference): bind vào temporary, cho phép \\"cướp\\" tài nguyên.\
\
```cpp\
std::vector\u003cint\u003e a = {1, 2, 3};\
std::vector\u003cint\u003e b = std::move(a);  // a rỗng sau move, b có data\
// std::move: cast sang rvalue reference — không move gì cả, chỉ cast\
```\
\
Kết quả: `push_back` với rvalue không copy nữa — cải thiện hiệu năng đáng kể với object lớn. Return value từ hàm (RVO/NRVO) cũng được tối ưu tương tự.

## Detailed Answer (EN)
Before C++11, passing large objects (vectors, strings) always copied them — expensive. Move semantics allow **transferring** resources instead of copying.\
\
- **lvalue**: object with a stable address (addressable with `\u0026`).\
- **rvalue**: temporary value with no persistent address (expression result, literal).\
- **`T\u0026\u0026`** (rvalue reference): binds to temporaries, enabling resource \\"theft\\".\
\
```cpp\
std::vector\u003cint\u003e a = {1, 2, 3};\
std::vector\u003cint\u003e b = std::move(a);  // a is empty after; b holds the data\
// std::move: cast to rvalue reference — does not move anything by itself\
```\
\
Result: `push_back` with an rvalue no longer copies — significant performance gain for large objects. Return values (RVO/NRVO) are similarly optimised.
