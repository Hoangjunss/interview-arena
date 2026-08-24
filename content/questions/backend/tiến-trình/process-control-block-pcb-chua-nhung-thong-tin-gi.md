---
id: process-control-block-pcb-chua-nhung-thong-tin-gi
position: backend
technology: tiến-trình
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Process Control Block (PCB) chứa những thông tin gì?

## Question (EN)
What information does a Process Control Block (PCB) hold?

## Đáp án chi tiết (VI)
PCB là cấu trúc dữ liệu OS dùng để đại diện và quản lý mỗi tiến trình — một `hồ sơ` đầy đủ để có thể tạm dừng rồi khôi phục tiến trình. Thành phần chính:\
\
- **Process state**: new/ready/running/waiting/terminated.\
- **PID**: định danh tiến trình (và thường cả PID cha).\
- **Program counter**: địa chỉ lệnh kế tiếp sẽ chạy.\
- **CPU registers**: nội dung thanh ghi để lưu/khôi phục khi context switch.\
- **Thông tin lập lịch**: độ ưu tiên, con trỏ hàng đợi.\
- **Thông tin quản lý bộ nhớ**: base/limit, page table hoặc segment table.\
- **Thông tin kế toán**: thời gian CPU đã dùng, giới hạn thời gian.\
- **Thông tin I/O**: danh sách file đang mở, thiết bị được cấp.\
\
Khi context switch, OS lưu trạng thái tiến trình hiện tại vào PCB của nó, rồi nạp trạng thái từ PCB của tiến trình kế tiếp. Chính việc lưu/nạp này là lý do context switch có overhead.

## Detailed Answer (EN)
The PCB is the OS data structure that represents and manages each process — a complete `record` that lets a process be paused and later resumed. Main fields:\
\
- **Process state**: new/ready/running/waiting/terminated.\
- **PID**: the process identifier (and usually the parent PID).\
- **Program counter**: the address of the next instruction to run.\
- **CPU registers**: register contents saved/restored across a context switch.\
- **Scheduling info**: priority, queue pointers.\
- **Memory-management info**: base/limit, page table or segment table.\
- **Accounting info**: CPU time used, time limits.\
- **I/O info**: open file list, allocated devices.\
\
On a context switch, the OS saves the current process’s state into its PCB, then loads the next process’s state from its PCB. This save/load is exactly why a context switch has overhead.
