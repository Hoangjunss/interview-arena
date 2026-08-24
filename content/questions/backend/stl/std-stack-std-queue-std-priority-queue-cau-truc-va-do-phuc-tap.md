---
id: std-stack-std-queue-std-priority-queue-cau-truc-va-do-phuc-tap
position: backend
technology: stl
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::stack`, `std::queue`, `std::priority_queue` — cấu trúc và độ phức tạp?

## Question (EN)
What are `std::stack`, `std::queue`, and `std::priority_queue`? What are their structures and complexities?

## Đáp án chi tiết (VI)
Ba container adapter trong STL — xây trên container thật (mặc định `deque` hoặc `vector`).\
\
| Container | Thứ tự | Mặc định dùng | Push | Pop | Top |\
|---|---|---|---|---|---|\
| `stack` | LIFO | `deque` | O(1) | O(1) | `top()` |\
| `queue` | FIFO | `deque` | O(1) | O(1) | `front()` |\
| `priority_queue` | Heap (max ở đầu) | `vector` | O(log n) | O(log n) | `top()` |\
\
```cpp\
std::stack\u003cint\u003e s;\
s.push(1); s.push(2); s.push(3);\
s.top();   // 3\
s.pop();   // bỏ 3\
\
std::priority_queue\u003cint\u003e pq;\
pq.push(5); pq.push(1); pq.push(3);\
pq.top();  // 5 — max-heap mặc định\
\
// Min-heap:\
std::priority_queue\u003cint, std::vector\u003cint\u003e, std::greater\u003cint\u003e\u003e minpq;\
```\
\
**Điểm khác biệt:** không có iterator — chỉ truy cập phần tử đầu/cuối, phù hợp với thuật toán cần kiểm soát thứ tự truy cập.

## Detailed Answer (EN)
Three STL container adapters — built on top of real containers (default `deque` or `vector`).\
\
| Container | Order | Default base | Push | Pop | Access |\
|---|---|---|---|---|---|\
| `stack` | LIFO | `deque` | O(1) | O(1) | `top()` |\
| `queue` | FIFO | `deque` | O(1) | O(1) | `front()` |\
| `priority_queue` | Heap (max at top) | `vector` | O(log n) | O(log n) | `top()` |\
\
```cpp\
std::stack\u003cint\u003e s;\
s.push(1); s.push(2); s.push(3);\
s.top();   // 3\
s.pop();   // removes 3\
\
std::priority_queue\u003cint\u003e pq;\
pq.push(5); pq.push(1); pq.push(3);\
pq.top();  // 5 — max-heap by default\
\
// Min-heap:\
std::priority_queue\u003cint, std::vector\u003cint\u003e, std::greater\u003cint\u003e\u003e minpq;\
```\
\
**Key point:** no iterators — access only front/back, intentionally restricting the interface to enforce access-order semantics.
