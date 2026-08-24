---
id: tu-khoa-volatile-dung-de-lam-gi
position: backend
technology: con-trỏ-\u0026-bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Từ khóa `volatile` dùng để làm gì?

## Question (EN)
What is the `volatile` keyword used for?

## Đáp án chi tiết (VI)
`volatile` báo compiler rằng giá trị biến có thể bị thay đổi bởi tác nhân **ngoài luồng chương trình**: thanh ghi phần cứng, interrupt/ISR, memory-mapped I/O.\
\
Compiler khi đó **không được tối ưu** kiểu cache biến vào thanh ghi hay bỏ đi lần đọc \\"thừa\\" — mỗi lần truy cập phải đọc/ghi thẳng bộ nhớ.\
\
```cpp\
volatile int* reg = ...;\
while (*reg == 0) { }   // đọc lại thật mỗi vòng, không bị tối ưu bỏ\
```\
\
**Lưu ý quan trọng:** `volatile` KHÔNG đảm bảo atomicity hay thứ tự bộ nhớ giữa các luồng — nó **không phải** công cụ đồng bộ đa luồng. Dùng `std::atomic` / mutex cho threading.

## Detailed Answer (EN)
`volatile` tells the compiler that a variable value may change from **outside the program flow**: hardware registers, interrupts/ISRs, memory-mapped I/O.\
\
The compiler then **must not optimize** by caching the variable in a register or eliminating \\"redundant\\" reads — every access must read/write memory directly.\
\
```cpp\
volatile int* reg = ...;\
while (*reg == 0) { }   // truly re-reads each loop, not optimized away\
```\
\
**Important:** `volatile` does NOT provide atomicity or cross-thread memory ordering — it is **not** a threading synchronization tool. Use `std::atomic` / mutexes for threads.
