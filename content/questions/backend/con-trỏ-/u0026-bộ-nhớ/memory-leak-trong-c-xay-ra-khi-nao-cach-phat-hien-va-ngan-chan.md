---
id: memory-leak-trong-c-xay-ra-khi-nao-cach-phat-hien-va-ngan-chan
position: backend
technology: con-trỏ-\u0026-bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Memory leak trong C++ xảy ra khi nào? Cách phát hiện và ngăn chặn?

## Question (EN)
When do memory leaks occur in C++? How do you detect and prevent them?

## Đáp án chi tiết (VI)
Memory leak xảy ra khi bộ nhớ được cấp phát bằng `new`/`malloc` nhưng **không bao giờ được giải phóng** — chương trình dần dần ăn hết RAM.\
\
```cpp\
void leak() {\
  int* p = new int[1000];\
  if (error) return;   // trả về sớm → delete[] không bao giờ chạy\
  delete[] p;\
}\
```\
\
**Nguyên nhân thường gặp:**\
- Quên `delete` (đặc biệt khi có exception hoặc early return)\
- Mất pointer trước khi `delete` (pointer bị ghi đè)\
- Circular reference giữa các `shared_ptr`\
\
**Cách phát hiện:**\
- `valgrind --leak-check=full ./program` (Linux)\
- AddressSanitizer: `g++ -fsanitize=address`\
- Visual Leak Detector (Windows)\
\
**Cách ngăn (tốt nhất):** dùng smart pointer — `unique_ptr`/`shared_ptr` tự giải phóng khi ra scope, không cần `delete` thủ công.

## Detailed Answer (EN)
A memory leak occurs when memory allocated via `new`/`malloc` is **never freed** — the program gradually consumes all available RAM.\
\
```cpp\
void leak() {\
  int* p = new int[1000];\
  if (error) return;   // early return → delete[] never runs\
  delete[] p;\
}\
```\
\
**Common causes:**\
- Forgetting `delete` (especially with exceptions or early returns)\
- Losing the pointer before deleting (pointer overwritten)\
- Circular references between `shared_ptr`s\
\
**Detection tools:**\
- `valgrind --leak-check=full ./program` (Linux)\
- AddressSanitizer: `g++ -fsanitize=address`\
- Visual Leak Detector (Windows)\
\
**Best prevention:** use smart pointers — `unique_ptr`/`shared_ptr` self-destruct on scope exit, no manual `delete` needed.
