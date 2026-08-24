---
id: std-set-va-std-multiset-khac-nhau-the-nao-khi-nao-dung
position: backend
technology: stl
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::set` và `std::multiset` khác nhau thế nào? Khi nào dùng?

## Question (EN)
What is the difference between `std::set` and `std::multiset`? When should you use each?

## Đáp án chi tiết (VI)
| | `std::set` | `std::multiset` |\
|---|---|---|\
| Duplicate keys | Không cho phép | Cho phép |\
| Cấu trúc | Red-Black Tree | Red-Black Tree |\
| insert | O(log n) | O(log n) |\
| Thứ tự | Có (tăng dần mặc định) | Có |\
\
```cpp\
std::set\u003cint\u003e s = {3, 1, 4, 1, 5};  // {1, 3, 4, 5} — 1 bị loại bỏ\
s.insert(3);  // không thêm — 3 đã có\
\
std::multiset\u003cint\u003e ms = {3, 1, 4, 1, 5};  // {1, 1, 3, 4, 5}\
ms.insert(3);  // {1, 1, 3, 3, 4, 5}\
\
// Xoá một bản sao:\
auto it = ms.find(1);\
if (it != ms.end()) ms.erase(it);  // chỉ xoá 1 bản\
// ms.erase(1);  // xoá TẤT CẢ bản sao của 1\
```\
\
**Dùng `set` khi:** cần tập hợp phần tử duy nhất, kiểm tra membership O(log n).\
**Dùng `multiset` khi:** cần đếm tần số, nhiều phần tử trùng cùng thứ tự.

## Detailed Answer (EN)
| | `std::set` | `std::multiset` |\
|---|---|---|\
| Duplicate keys | Not allowed | Allowed |\
| Structure | Red-Black Tree | Red-Black Tree |\
| insert | O(log n) | O(log n) |\
| Order | Sorted (ascending by default) | Sorted |\
\
```cpp\
std::set\u003cint\u003e s = {3, 1, 4, 1, 5};  // {1, 3, 4, 5} — duplicate removed\
s.insert(3);  // no-op — 3 already exists\
\
std::multiset\u003cint\u003e ms = {3, 1, 4, 1, 5};  // {1, 1, 3, 4, 5}\
ms.insert(3);  // {1, 1, 3, 3, 4, 5}\
\
// Remove one copy:\
auto it = ms.find(1);\
if (it != ms.end()) ms.erase(it);  // removes only one copy\
// ms.erase(1);  // removes ALL copies of 1\
```\
\
**Use `set` when:** you need a collection of unique elements, O(log n) membership checks.\
**Use `multiset` when:** duplicates must be preserved, frequency counting, sorted order with repetition.
