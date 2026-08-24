---
id: virtual-memory-la-gi-tai-sao-can-virtual-memory
position: backend
technology: memory-\u0026-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Virtual memory là gì? Tại sao cần virtual memory?

## Question (EN)
What is virtual memory? Why is it needed?

## Đáp án chi tiết (VI)
Virtual memory là abstraction layer giữa process và RAM vật lý: mỗi process có không gian địa chỉ ảo riêng (64-bit: 128TB), OS + MMU (Memory Management Unit) dịch virtual address sang physical address qua page table. \
\
**Lợi ích:** (1) Isolation: process A không thể đọc bộ nhớ process B dù cùng máy; (2) Overcommit: tổng virtual memory của tất cả process có thể vượt RAM thực (OS swap ít-dùng pages ra disk); (3) Shared libraries: nhiều process share cùng physical pages của libc nhưng map vào virtual address space riêng; (4) Memory-mapped files (mmap): file map vào virtual memory, OS lazily load pages khi access; (5) Copy-on-Write (CoW) khi fork: parent và child share physical pages cho đến khi một bên write. \
\
**Nhược điểm:** page table overhead (~8MB per process với 4-level paging); TLB miss latency. Thực"])</script><script>self.__next_f.push([1," tế: `docker stats` show virtual memory rất lớn nhưng RSS (Resident Set Size) là RAM thực dùng; OOM Killer kill process dùng nhiều RAM nhất khi system hết memory.

## Detailed Answer (EN)
$85
