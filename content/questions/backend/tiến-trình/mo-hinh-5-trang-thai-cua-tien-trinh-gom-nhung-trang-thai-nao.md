---
id: mo-hinh-5-trang-thai-cua-tien-trinh-gom-nhung-trang-thai-nao
position: backend
technology: tiến-trình
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mô hình 5 trạng thái của tiến trình gồm những trạng thái nào?

## Question (EN)
What states make up the five-state process model?

## Đáp án chi tiết (VI)
Vòng đời một tiến trình:\
\
- **New**: đang được tạo, chưa nạp vào ready queue.\
- **Ready**: sẵn sàng chạy, chỉ chờ scheduler cấp CPU.\
- **Running**: đang thực thi trên CPU (chỉ 1 tiến trình mỗi lõi tại một thời điểm).\
- **Waiting** (Blocked): đang chờ một sự kiện (I/O xong, tín hiệu, lock) — không thể chạy dù có CPU.\
- **Terminated**: đã kết thúc, OS đang thu hồi tài nguyên.\
\
Các chuyển trạng thái chính: New→Ready (admit), Ready→Running (dispatch), Running→Ready (bị preempt hoặc hết time slice), Running→Waiting (chờ I/O), Waiting→Ready (I/O xong), Running→Terminated (exit).\
\
Điểm cần nhớ: chỉ **Running** mới thực sự dùng CPU; scheduler chọn tiến trình từ hàng **Ready**. Khi chờ I/O, tiến trình phải rời CPU (sang Waiting) để tiến trình khác chạy.

## Detailed Answer (EN)
A process’s life cycle:\
\
- **New**: being created, not yet in the ready queue.\
- **Ready**: able to run, waiting only for the scheduler to grant a CPU.\
- **Running**: executing on a CPU (only one process per core at a time).\
- **Waiting** (Blocked): waiting for an event (I/O completion, a signal, a lock) — cannot run even if a CPU is free.\
- **Terminated**: finished; the OS is reclaiming its resources.\
\
Key transitions: New→Ready (admit), Ready→Running (dispatch), Running→Ready (preempted or time slice expired), Running→Waiting (waits for I/O), Waiting→Ready (I/O done), Running→Terminated (exit).\
\
Remember: only **Running** actually uses the CPU; the scheduler picks processes from the **Ready** queue. When waiting for I/O, a process must leave the CPU (go to Waiting) so another can run.
