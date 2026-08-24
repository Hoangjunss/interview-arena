---
id: wait-va-sleep-khac-nhau-the-nao
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
wait() và sleep() khác nhau thế nào?

## Question (EN)
How do wait() and sleep() differ?

## Đáp án chi tiết (VI)
| | **`wait()`** | **`sleep()`** |\
|---|---|---|\
| Thuộc | `Object` (instance method) | `Thread` (static method) |\
| Monitor lock | **Nhả lock** khi chờ | **Giữ nguyên lock** |\
| Đánh thức | `notify()`/`notifyAll()` hoặc timeout | Hết thời gian |\
| Điều kiện gọi | Phải trong `synchronized` (không thì `IllegalMonitorStateException`) | Gọi ở đâu cũng được |\
| Dùng cho | Phối hợp giữa các thread (producer–consumer) | Tạm dừng thread hiện tại |\
\
**Điểm ăn điểm:** `wait()` nhả lock để thread khác vào **thay đổi điều kiện** rồi `notify()` — đây là nền của producer–consumer. `sleep()` giữ lock, nên sleep bên trong `synchronized` sẽ chặn mọi thread khác cần lock đó suốt thời gian ngủ.\
\
**Lưu ý:** `wait()` phải gọi trong vòng lặp kiểm tra điều kiện (`while (!condition) wait();`) — vì có **spurious wakeup** (thức dậy không do notify). Code hiện đại ưu tiên `BlockingQueue`, `CountDownLatch`, `Condition` thay vì wait/notify thủ công.

## Detailed Answer (EN)
| | **`wait()`** | **`sleep()`** |\
|---|---|---|\
| Belongs to | `Object` (instance method) | `Thread` (static method) |\
| Monitor lock | **Releases the lock** while waiting | **Keeps the lock** |\
| Wakes up on | `notify()`/`notifyAll()` or timeout | Time elapsed |\
| Call requirement | Must be inside `synchronized` (else `IllegalMonitorStateException`) | Anywhere |\
| Used for | Thread coordination (producer–consumer) | Pausing the current thread |\
\
**The scoring point:** `wait()` releases the lock so another thread can **change the condition** and `notify()` — the foundation of producer–consumer. `sleep()` keeps the lock, so sleeping inside `synchronized` blocks every other thread needing that lock for the whole nap.\
\
**Note:** `wait()` must be called in a condition-checking loop (`while (!condition) wait();`) — because of **spurious wakeups**. Modern code prefers `BlockingQueue`, `CountDownLatch`, `Condition` over manual wait/notify.
