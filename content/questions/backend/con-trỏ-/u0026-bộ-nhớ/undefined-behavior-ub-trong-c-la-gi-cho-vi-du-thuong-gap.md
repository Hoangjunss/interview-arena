---
id: undefined-behavior-ub-trong-c-la-gi-cho-vi-du-thuong-gap
position: backend
technology: con-trỏ-\u0026-bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Undefined behavior (UB) trong C++ là gì? Cho ví dụ thường gặp.

## Question (EN)
What is undefined behavior (UB) in C++? What are common examples?

## Đáp án chi tiết (VI)
Undefined behavior là hành vi mà chuẩn C++ **không quy định kết quả** — compiler được phép làm bất cứ điều gì: crash, kết quả sai, hoặc \\"chạy đúng\\" vô tình.\
\
**Ví dụ phổ biến:**\
\
| Tình huống | Lý do UB |\
|---|---|\
| `int* p = nullptr; *p = 1;` | dereference null pointer |\
| `int a[5]; a[10] = 0;` | out-of-bounds array access |\
| `int x; int y = x + 1;` | đọc biến chưa khởi tạo |\
| `delete p; delete p;` | double-free |\
| Trả về reference tới biến local | biến đã ra scope khi dùng |\
| Signed integer overflow | `INT_MAX + 1` không wrap |\
\
**Tại sao nguy hiểm:** compiler tối ưu hóa dựa trên giả định \\"không có UB\\" — code trông đúng vẫn bị compile thành hành vi sai hoàn toàn, thường chỉ lộ ra ở production build với `-O2`.\
\
Lưu ý: unsigned integer overflow **không phải** UB — wrap modulo `2^N` theo chuẩn.

## Detailed Answer (EN)
Undefined behavior is behavior that the C++ standard **does not specify an outcome for** — the compiler is free to do anything: crash, wrong result, or accidentally \\"work\\".\
\
**Common examples:**\
\
| Situation | Why UB |\
|---|---|\
| `int* p = nullptr; *p = 1;` | null pointer dereference |\
| `int a[5]; a[10] = 0;` | out-of-bounds array access |\
| `int x; int y = x + 1;` | reading an uninitialised variable |\
| `delete p; delete p;` | double-free |\
| Return reference to local variable | variable is gone when used |\
| Signed integer overflow | `INT_MAX + 1` doesn't wrap |\
\
**Why dangerous:** compilers optimise assuming \\"no UB exists\\" — code that looks correct can compile into completely wrong behaviour, often only visible in production builds with `-O2`.\
\
Note: unsigned integer overflow is **not** UB — it wraps modulo `2^N` per the standard.
