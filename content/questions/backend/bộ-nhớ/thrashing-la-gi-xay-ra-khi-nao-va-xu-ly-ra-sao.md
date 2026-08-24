---
id: thrashing-la-gi-xay-ra-khi-nao-va-xu-ly-ra-sao
position: backend
technology: bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thrashing là gì? Xảy ra khi nào và xử lý ra sao?

## Question (EN)
What is thrashing? When does it happen and how is it handled?

## Đáp án chi tiết (VI)
Thrashing là trạng thái hệ thống dành phần lớn thời gian để swap trang vào/ra đĩa thay vì thực thi lệnh — CPU utilization tụt nhưng đĩa quay liên tục.\
\
**Nguyên nhân**: tổng nhu cầu bộ nhớ (working set) của các tiến trình đang chạy vượt quá RAM vật lý. Mỗi tiến trình không đủ khung trang để giữ working set → liên tục page fault → phải nạp trang từ đĩa (chậm hơn RAM hàng vạn lần). Tệ hơn, khi CPU rảnh, scheduler tưởng cần thêm việc nên nạp thêm tiến trình → càng thiếu bộ nhớ → càng thrash (vòng xoáy).\
\
**Cách xử lý**:\
- **Mô hình working-set**: OS theo dõi tập trang mỗi tiến trình dùng gần đây, chỉ cho chạy khi đủ khung cho working set.\
- **Page-fault frequency (PFF)**: cấp/thu khung theo tần suất page fault — quá cao thì cấp thêm, quá thấp thì thu bớt.\
- Giảm mức đa chương (swap hẳn vài tiến trình ra), hoặc thêm RAM.

## Detailed Answer (EN)
Thrashing is a state where the system spends most of its time swapping pages in and out of disk instead of executing instructions — CPU utilization drops while the disk stays busy.\
\
**Cause**: the combined memory demand (working set) of the running processes exceeds physical RAM. Each process lacks enough frames to hold its working set → constant page faults → pages must be loaded from disk (tens of thousands of times slower than RAM). Worse, when the CPU goes idle the scheduler assumes more work is needed and admits more processes → even less memory → more thrashing (a spiral).\
\
**Handling**:\
- **Working-set model**: the OS tracks each process’s recently used pages and only runs it when enough frames are available for its working set.\
- **Page-fault frequency (PFF)**: allocate/reclaim frames by fault rate — too high, give more; too low, take some back.\
- Reduce the degree of multiprogramming (swap whole processes out), or add RAM.
