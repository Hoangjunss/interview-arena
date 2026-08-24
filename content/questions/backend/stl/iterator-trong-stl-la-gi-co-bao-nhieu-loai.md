---
id: iterator-trong-stl-la-gi-co-bao-nhieu-loai
position: backend
technology: stl
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Iterator trong STL là gì? Có bao nhiêu loại?

## Question (EN)
What are iterators in the STL? How many categories are there?

## Đáp án chi tiết (VI)
Iterator là object đóng vai trò **con trỏ tổng quát** để duyệt container — tách algorithm ra khỏi cấu trúc nội bộ của container.\
\
**5 loại cổ điển (từ ít đến nhiều khả năng):**\
\
| Loại | Đọc | Ghi | ++  | -- | `[]` | Ví dụ |\
|---|---|---|---|---|---|---|\
| Input | Có | Không | Có | Không | Không | `istream_iterator` |\
| Output | Không | Có | Có | Không | Không | `ostream_iterator` |\
| Forward | Có | Có | Có | Không | Không | `forward_list` |\
| Bidirectional | Có | Có | Có | Có | Không | `list`, `set`, `map` |\
| Random Access | Có | Có | Có | Có | Có | `vector`, `deque`, `array` |\
\
Lưu ý: C++17 thêm **Contiguous Iterator** (đảm bảo vùng nhớ liên tục — `vector`, `array`, `string`) như một refinement của Random Access.\
\
Range-based for (C++11) là syntactic sugar trên iterator — `for (int x : v)` tương đương dùng `v.begin()`/`v.end()` ngầm.

## Detailed Answer (EN)
An iterator is a generalised **pointer-like object** for traversing containers — decoupling algorithms from container internals.\
\
**5 classic categories (least to most capable):**\
\
| Category | Read | Write | ++ | -- | `[]` | Example |\
|---|---|---|---|---|---|---|\
| Input | Yes | No | Yes | No | No | `istream_iterator` |\
| Output | No | Yes | Yes | No | No | `ostream_iterator` |\
| Forward | Yes | Yes | Yes | No | No | `forward_list` |\
| Bidirectional | Yes | Yes | Yes | Yes | No | `list`, `set`, `map` |\
| Random Access | Yes | Yes | Yes | Yes | Yes | `vector`, `deque`, `array` |\
\
Note: C++17 added a **Contiguous Iterator** concept (guarantees contiguous memory — `vector`, `array`, `string`) as a refinement of Random Access.\
\
Range-based for (C++11) is syntactic sugar over iterators — `for (int x : v)` implicitly uses `v.begin()`/`v.end()`.
