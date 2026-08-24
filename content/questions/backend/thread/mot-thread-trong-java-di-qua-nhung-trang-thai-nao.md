---
id: mot-thread-trong-java-di-qua-nhung-trang-thai-nao
position: backend
technology: thread
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một thread trong Java đi qua những trạng thái nào?

## Question (EN)
What states does a Java thread go through?

## Đáp án chi tiết (VI)
Enum `Thread.State` định nghĩa **6 trạng thái**:\
\
- **NEW** — đã `new Thread(...)` nhưng chưa gọi `start()`.\
- **RUNNABLE** — đang chạy **hoặc** đang chờ CPU cấp slot. JVM gộp hai tình huống này làm một, không có trạng thái \\"RUNNING\\" riêng.\
- **BLOCKED** — đang chờ **monitor lock** để vào một khối `synchronized`.\
- **WAITING** — chờ vô hạn sau `wait()`, `join()`, `LockSupport.park()`; phải có thread khác đánh thức.\
- **TIMED_WAITING** — như trên nhưng có thời hạn: `sleep(ms)`, `wait(ms)`, `join(ms)`.\
- **TERMINATED** — `run()` đã kết thúc (bình thường hoặc do exception).\
\
```java\
Thread t = new Thread(() -\u003e {});\
t.getState();   // NEW\
t.start();\
t.join();\
t.getState();   // TERMINATED\
t.start();      // IllegalThreadStateException\
```\
\
Hai điểm hay bị hỏi thêm: thread đã **TERMINATED không start lại được**; và thread bị chặn ở I/O (đọc socket) vẫn hiện **RUNNABLE** chứ không phải BLOCKED — vì với JVM đó là lời gọi hệ điều hành, không phải chờ lock.

## Detailed Answer (EN)
The `Thread.State` enum defines **six states**:\
\
- **NEW** — constructed but `start()` not yet called.\
- **RUNNABLE** — running **or** waiting for a CPU slot. The JVM merges both; there is no separate \\"RUNNING\\" state.\
- **BLOCKED** — waiting for a **monitor lock** to enter a `synchronized` block.\
- **WAITING** — waiting indefinitely after `wait()`, `join()`, `LockSupport.park()`; another thread must wake it.\
- **TIMED_WAITING** — same but bounded: `sleep(ms)`, `wait(ms)`, `join(ms)`.\
- **TERMINATED** — `run()` has finished (normally or by exception).\
\
```java\
Thread t = new Thread(() -\u003e {});\
t.getState();   // NEW\
t.start();\
t.join();\
t.getState();   // TERMINATED\
t.start();      // IllegalThreadStateException\
```\
\
Two common follow-ups: a **TERMINATED thread cannot be restarted**; and a thread blocked on I/O (reading a socket) still shows as **RUNNABLE**, not BLOCKED — from the JVM's view that is an OS call, not lock contention.
