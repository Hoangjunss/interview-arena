---
id: demand-paging-la-gi-chuyen-gi-xay-ra-khi-co-page-fault
position: backend
technology: bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Demand paging là gì? Chuyện gì xảy ra khi có page fault?

## Question (EN)
What is demand paging? What happens on a page fault?

## Đáp án chi tiết (VI)
Demand paging: chỉ nạp trang vào RAM khi thực sự được truy cập, thay vì nạp toàn bộ chương trình lúc khởi động. Mỗi entry trong page table có `valid/invalid bit` đánh dấu trang đang ở RAM hay còn trên đĩa.\
\
Khi CPU truy cập một trang có bit invalid → phần cứng phát sinh **page fault** (một loại trap vào kernel). Xử lý:\
1. OS kiểm tra tham chiếu có hợp lệ không (nếu sai → segfault).\
2. Tìm khung trang trống; nếu hết thì chạy thuật toán thay trang.\
3. Đọc trang cần thiết từ đĩa vào khung (chậm — vài ms).\
4. Cập nhật page table, đặt valid bit.\
5. Khởi động lại đúng lệnh đã gây fault.\
\
**Lợi ích**: khởi động nhanh, tiết kiệm RAM, cho phép chương trình lớn hơn RAM vật lý. **Chi phí**: mỗi page fault đắt, và thiếu RAM sẽ dẫn tới thrashing.

## Detailed Answer (EN)
Demand paging: pages are loaded into RAM only when actually accessed, instead of loading the whole program at startup. Each page-table entry has a `valid/invalid bit` marking whether the page is in RAM or still on disk.\
\
When the CPU accesses a page whose bit is invalid → the hardware raises a **page fault** (a kind of trap into the kernel). Handling:\
1. The OS checks whether the reference is legal (if not → segfault).\
2. Find a free frame; if none, run the page-replacement algorithm.\
3. Read the needed page from disk into the frame (slow — a few ms).\
4. Update the page table and set the valid bit.\
5. Restart the exact instruction that caused the fault.\
\
**Benefits**: faster startup, less RAM used, programs larger than physical RAM. **Costs**: each page fault is expensive, and insufficient RAM leads to thrashing.
