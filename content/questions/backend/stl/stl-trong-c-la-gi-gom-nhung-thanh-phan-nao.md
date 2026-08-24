---
id: stl-trong-c-la-gi-gom-nhung-thanh-phan-nao
position: backend
technology: stl
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
STL trong C++ là gì? Gồm những thành phần nào?

## Question (EN)
What is the STL in C++? What are its main components?

## Đáp án chi tiết (VI)
STL (Standard Template Library) là thư viện chuẩn C++ cung cấp các **cấu trúc dữ liệu** và **thuật toán** đã được tối ưu hoá, dùng qua templates.\
\
**3 thành phần chính:**\
\
1. **Containers:** lưu trữ dữ liệu.\
   - Sequence: `vector`, `list`, `deque`, `array`\
   - Associative: `set`, `map`, `multiset`, `multimap`\
   - Unordered: `unordered_map`, `unordered_set`\
   - Adapters: `stack`, `queue`, `priority_queue`\
\
2. **Iterators:** đối tượng để duyệt container — cầu nối giữa container và algorithm.\
\
3. **Algorithms:** hàm generic như `std::sort`, `std::find`, `std::for_each`, `std::accumulate` — hoạt động trên bất kỳ container nào qua iterator.

## Detailed Answer (EN)
The STL (Standard Template Library) is C++'s standard library providing optimised **data structures** and **algorithms** via templates.\
\
**Three main components:**\
\
1. **Containers:** store data.\
   - Sequence: `vector`, `list`, `deque`, `array`\
   - Associative: `set`, `map`, `multiset`, `multimap`\
   - Unordered: `unordered_map`, `unordered_set`\
   - Adapters: `stack`, `queue`, `priority_queue`\
\
2. **Iterators:** objects for traversing containers — the bridge between containers and algorithms.\
\
3. **Algorithms:** generic functions like `std::sort`, `std::find`, `std::for_each`, `std::accumulate` — work on any container through iterators.
