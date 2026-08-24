---
id: lap-lich-preemptive-va-non-preemptive-khac-nhau-the-nao
position: backend
technology: lập-lịch
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lập lịch preemptive và non-preemptive khác nhau thế nào?

## Question (EN)
How do preemptive and non-preemptive scheduling differ?

## Đáp án chi tiết (VI)
Khác nhau ở chỗ OS có được quyền `cướp` CPU khỏi tiến trình đang chạy hay không.\
\
**Non-preemptive** (cooperative): một khi được cấp CPU, tiến trình giữ tới khi tự nguyện nhả — do kết thúc hoặc chuyển sang waiting (chờ I/O). Scheduler chỉ ra quyết định tại các thời điểm đó. Đơn giản, ít overhead, không lo data race chia sẻ giữa các lần chuyển; nhưng một tiến trình dài/lặp vô hạn có thể chiếm CPU, response time kém. Ví dụ: FCFS, SJF (bản non-preemptive).\
\
**Preemptive**: OS có thể lấy lại CPU giữa chừng — khi hết time slice (timer interrupt) hoặc khi một tiến trình ưu tiên cao hơn sẵn sàng. Đáp ứng tốt, công bằng hơn, cần cho hệ thống tương tác/real-time; nhưng phát sinh chi phí context switch và cần cơ chế đồng bộ (lock) vì có thể bị ngắt giữa lúc đang sửa dữ liệu chia sẻ. Ví dụ: Round Robin, SRTF, priority preemptive. Đa số OS hiện đại (Linux, Windows) dùng preemptive.

## Detailed Answer (EN)
The difference is whether the OS may `take` the CPU away from a running process.\
\
**Non-preemptive** (cooperative): once granted the CPU, a process keeps it until it voluntarily releases it — by terminating or moving to waiting (for I/O). The scheduler decides only at those points. Simple, low overhead, no worries about shared-data races between switches; but a long or infinitely looping process can hog the CPU, hurting response time. Examples: FCFS, SJF (non-preemptive form).\
\
**Preemptive**: the OS can reclaim the CPU mid-execution — when a time slice expires (timer interrupt) or a higher-priority process becomes ready. Better responsiveness and fairness, needed for interactive/real-time systems; but it incurs context-switch cost and requires synchronization (locks) since a process can be interrupted while modifying shared data. Examples: Round Robin, SRTF, preemptive priority. Most modern OSes (Linux, Windows) are preemptive.
