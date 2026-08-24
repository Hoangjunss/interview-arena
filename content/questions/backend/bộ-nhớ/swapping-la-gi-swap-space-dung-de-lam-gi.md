---
id: swapping-la-gi-swap-space-dung-de-lam-gi
position: backend
technology: bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Swapping là gì? Swap space dùng để làm gì?

## Question (EN)
What is swapping? What is swap space for?

## Đáp án chi tiết (VI)
**Swapping**: OS chuyển trang (hoặc cả tiến trình, ở mô hình cũ) từ RAM ra vùng lưu trữ trên đĩa để giải phóng RAM, và nạp lại khi cần. Nhờ đó tổng không gian địa chỉ các tiến trình có thể vượt quá RAM vật lý — nền tảng của virtual memory.\
\
**Swap space**: vùng đĩa dành riêng (một partition riêng hoặc swap file) để chứa các trang bị đẩy ra. Khi RAM đầy và cần khung trống, thuật toán thay trang chọn `nạn nhân`; nếu trang đó `bẩn` (dirty — đã bị sửa) thì phải ghi ra swap trước khi lấy khung, còn trang `sạch` thì có thể bỏ và nạp lại từ file gốc.\
\
**Đánh đổi**: swap cho phép chạy nhiều/lớn hơn RAM, nhưng đĩa chậm hơn RAM hàng vạn lần → truy cập trang đã swap ra gây page fault chậm. Swap quá nhiều dẫn tới thrashing. Thực tế swap là `van an toàn` khi thiếu RAM, không phải để thay RAM; SSD làm swap bớt đau nhưng vẫn chậm hơn RAM nhiều.

## Detailed Answer (EN)
**Swapping**: the OS moves pages (or, in older models, whole processes) from RAM to disk storage to free RAM, and loads them back when needed. This lets the combined address space of processes exceed physical RAM — the basis of virtual memory.\
\
**Swap space**: a dedicated disk area (a separate partition or a swap file) that holds the evicted pages. When RAM is full and a free frame is needed, the replacement algorithm picks a `victim`; if that page is `dirty` (modified) it must be written to swap before the frame is taken, whereas a `clean` page can be dropped and reloaded from its original file.\
\
**Trade-off**: swap allows running more/larger than RAM, but disk is tens of thousands of times slower than RAM → accessing a swapped-out page causes a slow page fault. Swapping too much causes thrashing. In practice swap is a `safety valve` for low-memory situations, not a RAM replacement; SSDs make swap less painful but still far slower than RAM.
