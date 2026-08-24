---
id: mot-so-stl-algorithms-quan-trong-std-sort-std-find-std-accumulate-std-transform
position: backend
technology: stl
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một số STL algorithms quan trọng: `std::sort`, `std::find`, `std::accumulate`, `std::transform` — dùng thế nào?

## Question (EN)
How are the key STL algorithms `std::sort`, `std::find`, `std::accumulate`, and `std::transform` used?

## Đáp án chi tiết (VI)
STL algorithms hoạt động trên bất kỳ container nào qua iterator — tách logic khỏi cấu trúc dữ liệu.\
\
```cpp\
std::vector\u003cint\u003e v = {3, 1, 4, 1, 5, 9};\
\
// sort — O(n log n), sửa tại chỗ\
std::sort(v.begin(), v.end());\
std::sort(v.begin(), v.end(), std::greater\u003cint\u003e());  // giảm dần\
\
// find — O(n), trả iterator (v.end() nếu không thấy)\
auto it = std::find(v.begin(), v.end(), 5);\
if (it != v.end()) { /* tìm thấy */ }\
\
// accumulate — fold từ trái sang phải\
int sum = std::accumulate(v.begin(), v.end(), 0);  // 23\
\
// transform — apply function, ghi vào output range\
std::vector\u003cint\u003e doubled;\
std::transform(v.begin(), v.end(), std::back_inserter(doubled),\
               [](int x) { return x * 2; });\
```\
\
**Lưu ý:** dùng `std::sort` trên `std::list` sẽ không compile — list không có random access iterator; phải dùng `list.sort()`.

## Detailed Answer (EN)
STL algorithms work on any container through iterators — separating logic from data structure.\
\
```cpp\
std::vector\u003cint\u003e v = {3, 1, 4, 1, 5, 9};\
\
// sort — O(n log n), in-place\
std::sort(v.begin(), v.end());\
std::sort(v.begin(), v.end(), std::greater\u003cint\u003e());  // descending\
\
// find — O(n), returns iterator (v.end() if not found)\
auto it = std::find(v.begin(), v.end(), 5);\
if (it != v.end()) { /* found */ }\
\
// accumulate — left fold\
int sum = std::accumulate(v.begin(), v.end(), 0);  // 23\
\
// transform — apply function, write to output range\
std::vector\u003cint\u003e doubled;\
std::transform(v.begin(), v.end(), std::back_inserter(doubled),\
               [](int x) { return x * 2; });\
```\
\
**Note:** `std::sort` on `std::list` won't compile — list lacks random access iterators; use `list.sort()` instead.
