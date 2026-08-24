---
id: delete-va-delete-khac-nhau-the-nao
position: backend
technology: con-trỏ-\u0026-bộ-nhớ
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`delete` và `delete[]` khác nhau thế nào?

## Question (EN)
What is the difference between `delete` and `delete[]`?

## Đáp án chi tiết (VI)
- **`delete`**: hủy **một object đơn** (cấp bằng `new`). Gọi 1 destructor rồi giải phóng vùng nhớ.\
- **`delete[]`**: hủy **một mảng** (cấp bằng `new[]`). Gọi destructor cho **từng phần tử** rồi giải phóng.\
\
```cpp\
int*  a = new int(5);      delete a;      // đơn\
int*  b = new int[10];     delete[] b;    // mảng\
```\
\
Phải khớp cặp: `new`↔`delete`, `new[]`↔`delete[]`. Trộn lẫn (dùng `delete` trên mảng, hoặc `delete[]` trên object đơn) là **undefined behavior** — có thể chỉ hủy 1 phần tử hoặc làm hỏng heap.\
\
Modern C++: dùng `std::vector` hoặc `std::unique_ptr\u003cT[]\u003e` để khỏi tự tay `delete[]`.

## Detailed Answer (EN)
- **`delete`**: destroys **a single object** (allocated with `new`). Runs one destructor, then frees the memory.\
- **`delete[]`**: destroys **an array** (allocated with `new[]`). Runs the destructor for **each element**, then frees.\
\
```cpp\
int*  a = new int(5);      delete a;      // single\
int*  b = new int[10];     delete[] b;    // array\
```\
\
They must be paired: `new`↔`delete`, `new[]`↔`delete[]`. Mixing them (using `delete` on an array, or `delete[]` on a single object) is **undefined behavior** — it may destroy only one element or corrupt the heap.\
\
Modern C++: use `std::vector` or `std::unique_ptr\u003cT[]\u003e` to avoid manual `delete[]`.
