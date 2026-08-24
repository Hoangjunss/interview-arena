---
id: dangling-pointer-la-gi-lam-sao-tranh
position: backend
technology: con-trỏ-\u0026-bộ-nhớ
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dangling pointer là gì? Làm sao tránh?

## Question (EN)
What is a dangling pointer in C++? How do you avoid it?

## Đáp án chi tiết (VI)
Dangling pointer là con trỏ **trỏ tới vùng nhớ đã bị giải phóng** — đọc/ghi vào đó là undefined behavior (crash hoặc corrupt dữ liệu ngầm).\
\
```cpp\
int* p = new int(10);\
delete p;\
p = nullptr;        // gán null ngay sau delete — an toàn\
if (p) { *p = 20; } // điều kiện false, không vào\
```\
\
**Cách tránh tốt hơn:** dùng smart pointer (`std::unique_ptr`, `std::shared_ptr`) — tự giải phóng khi ra scope, không bao giờ để con trỏ trỏ vào vùng nhớ đã giải phóng.

## Detailed Answer (EN)
A dangling pointer points to **memory that has already been freed** — reading or writing through it is undefined behavior (crash or silent data corruption).\
\
```cpp\
int* p = new int(10);\
delete p;\
p = nullptr;        // set to null immediately after delete — safe\
if (p) { *p = 20; } // condition is false, never enters\
```\
\
**Better approach:** use smart pointers (`std::unique_ptr`, `std::shared_ptr`) — they self-destruct when leaving scope, preventing dangling entirely.
