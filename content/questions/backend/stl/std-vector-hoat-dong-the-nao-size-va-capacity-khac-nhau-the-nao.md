---
id: std-vector-hoat-dong-the-nao-size-va-capacity-khac-nhau-the-nao
position: backend
technology: stl
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::vector` hoạt động thế nào? `size()` và `capacity()` khác nhau thế nào?

## Question (EN)
How does `std::vector` work internally? What is the difference between `size()` and `capacity()`?

## Đáp án chi tiết (VI)
`std::vector` là dynamic array — tự quản lý vùng nhớ liên tục trên heap, tự resize khi cần.\
\
- **`size()`**: số phần tử hiện có.\
- **`capacity()`**: số phần tử *có thể chứa* trước khi cần cấp phát lại bộ nhớ.\
\
Khi `size == capacity` và thêm phần tử mới, vector cấp phát vùng nhớ mới (thường **gấp đôi** capacity cũ), copy/move toàn bộ, rồi giải phóng vùng cũ (thao tác reallocate là O(n), nhưng mỗi `push_back` có chi phí O(1) amortized tính chung).\
\
```cpp\
std::vector\u003cint\u003e v;\
v.reserve(8);  // capacity = 8, size = 0 — tránh reallocate\
for (int i = 0; i \u003c 8; ++i) v.push_back(i);\
v.push_back(99);  // size=9, capacity=16 — đã reallocate\
```\
\
**Best practice:** dùng `reserve()` trước khi push nhiều phần tử nếu biết trước kích thước — tránh tốn chi phí reallocate.

## Detailed Answer (EN)
`std::vector` is a dynamic array that manages a contiguous heap buffer and resizes as needed.\
\
- **`size()`**: current number of elements.\
- **`capacity()`**: number of elements the buffer *can hold* before reallocation.\
\
When `size == capacity` and a new element is added, the vector allocates a new buffer (typically **double** the old capacity), moves/copies all elements, then frees the old one — O(1) amortized per push.\
\
```cpp\
std::vector\u003cint\u003e v;\
v.reserve(8);  // capacity = 8, size = 0 — avoids reallocations\
for (int i = 0; i \u003c 8; ++i) v.push_back(i);\
v.push_back(99);  // size=9, capacity=16 — reallocated\
```\
\
**Best practice:** call `reserve()` before bulk insertions when the target size is known — avoids repeated reallocation overhead.
