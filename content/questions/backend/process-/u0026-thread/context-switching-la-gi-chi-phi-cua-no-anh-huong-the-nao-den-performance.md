---
id: context-switching-la-gi-chi-phi-cua-no-anh-huong-the-nao-den-performance
position: backend
technology: process-\u0026-thread
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context switching là gì? Chi phí của nó ảnh hưởng thế nào đến performance?

## Question (EN)
What is context switching? How does its cost impact performance?

## Đáp án chi tiết (VI)
Context switching là quá trình OS lưu trạng thái CPU (registers, program counter, stack pointer) của process/thread hiện tại vào PCB (Process Control Block), rồi nạp trạng thái của process/thread kế tiếp để chạy.\
\
Chi phí bao gồm: (1) Thời gian lưu/nạp CPU state (~microseconds); (2) Cache invalidation — khi switch process, CPU cache (L1/L2) bị flush, process mới phải warm up cache lại từ đầu (cold start); (3) TLB flush khi switch process (vì địa chỉ ảo khác nhau). Thread switching trong cùng process nhẹ hơn vì không flush TLB. Ảnh hưởng thực tế: hệ thống với quá nhiều thread (C10K problem) tốn nhiều thời gian context switching hơn là làm việc thực. Đó là lý do Node.js single-threaded event loop và Go goroutines thắng trong high-concurrency — ít context switch hơn 1000 OS threads. Lập trình viên nên tránh: vòng lặp tight với `sleep(1ms)`, quá nhiều thread chờ I/O — dùng async/await thay thế.

## Detailed Answer (EN)
Context switching is the process by which the OS saves the current CPU state (registers, program counter, stack pointer) of a process or thread into its PCB (Process Control Block), then loads the state of the next process or thread to run.\
\
The costs include: (1) time to save and restore CPU state (~microseconds); (2) cache invalidation — when switching between processes, the CPU cache (L1/L2) is flushed and the new process must warm it up from scratch; (3) TLB flush on process switches (because virtual address spaces differ). Thread switching within the same process is cheaper because the TLB is not flushed. Real-world impact: a system with too many threads (the C10K problem) spends more time context switching than doing actual work. This is why Node.js's single-threaded event loop and Go goroutines outperform 1,000 OS threads in high-concurrency scenarios — far fewer context switches. Developers should avoid tight loops with `sleep(1ms)` and excessive I/O-blocking threads — use async/await instead.
