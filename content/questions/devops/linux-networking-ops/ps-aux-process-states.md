---
id: ps-aux-process-states
position: devops
technology: linux-networking-ops
level: junior
tags: [linux, process-management, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong output của `ps aux`, cột `STAT` cho các giá trị như `S`, `R`, `D`, `Z`, `T` nghĩa là gì? Zombie process là gì và tại sao nó nguy hiểm?

## Question (EN)
In `ps aux` output, what do the `STAT` column values like `S`, `R`, `D`, `Z`, `T` mean? What is a zombie process and why can it be a problem?

## Đáp án chi tiết (VI)
Cột `STAT` trong `ps aux` (hoặc `ps -ef`) thể hiện **trạng thái hiện tại của process** theo scheduler của kernel:

| Mã | Ý nghĩa |
|---|---|
| `R` | Running hoặc runnable (đang chạy trên CPU hoặc trong hàng đợi chờ CPU) |
| `S` | Interruptible sleep — đang chờ một sự kiện (I/O, timer...) nhưng có thể bị đánh thức bởi signal |
| `D` | Uninterruptible sleep — đang chờ I/O (thường là disk) và **không thể** bị ngắt bởi signal, kể cả `kill -9` |
| `T` | Stopped — bị dừng bởi signal (`SIGSTOP`, hoặc do debugger) |
| `Z` | Zombie — process đã kết thúc (exit) nhưng entry trong process table chưa được dọn |
| `<` | Priority cao hơn bình thường (thêm sau mã chính, ví dụ `S<`) |
| `N` | Priority thấp hơn bình thường (niced) |
| `+` | Đang chạy ở foreground trong terminal group |

**Zombie process (Z)** là process đã gọi `exit()` xong nhưng **process cha chưa gọi `wait()`/`waitpid()`** để đọc exit status của nó. Kernel giữ lại một entry tối thiểu (PID, exit code) trong process table cho tới khi cha "nhận" (reap) nó. Zombie **không tốn CPU/RAM đáng kể** — nó không còn chạy code gì cả, chỉ là 1 dòng trong bảng process.

**Tại sao vẫn nguy hiểm**: PID trên Linux là tài nguyên hữu hạn (`/proc/sys/kernel/pid_max`, thường 32768 hoặc cao hơn tùy cấu hình). Nếu process cha có bug **không bao giờ reap con** (thiếu `wait()` trong code, hoặc dùng `fork()` liên tục mà không xử lý `SIGCHLD`), zombie sẽ tích tụ dần theo thời gian, cuối cùng có thể **cạn kiệt PID**, khiến hệ thống không thể `fork()` process mới → toàn bộ server ngừng hoạt động.

**Không thể `kill -9` một zombie** vì nó đã chết rồi, không có process nào đang chạy để nhận signal — thao tác đúng là fix/kill **process cha** để nó reap con, hoặc nếu cha đã chết, `init`/`systemd` (PID 1) sẽ tự động adopt và reap các zombie mồ côi (orphan) này.

**Kiểm tra**:
```bash
ps aux | grep ' Z '
ps -eo pid,ppid,stat,cmd | awk '$3 ~ /Z/'
# Xem ai là cha của zombie để xử lý đúng process
```

**Ví dụ thực tế**: một service Node.js dùng `child_process.spawn()` để chạy script con hàng loạt nhưng không lắng nghe event `exit`/`close` để reap — sau vài tuần chạy, `ps aux` cho thấy hàng nghìn zombie, và server bắt đầu báo lỗi "Resource temporarily unavailable" (`EAGAIN`) khi cố spawn thêm process mới do cạn PID.

## Detailed Answer (EN)
The `STAT` column in `ps aux` (or `ps -ef`) shows a process's **current scheduling state** according to the kernel:

| Code | Meaning |
|---|---|
| `R` | Running or runnable (on CPU or queued waiting for CPU) |
| `S` | Interruptible sleep — waiting on an event (I/O, timer, etc.) but can be woken by a signal |
| `D` | Uninterruptible sleep — waiting on I/O (usually disk) and **cannot** be interrupted by any signal, including `kill -9` |
| `T` | Stopped — halted by a signal (`SIGSTOP`, or a debugger) |
| `Z` | Zombie — the process has exited but its process-table entry hasn't been cleaned up |
| `<` | Higher-than-normal priority (appended to the state, e.g. `S<`) |
| `N` | Lower-than-normal priority (niced) |
| `+` | Running in the foreground process group of its terminal |

A **zombie process (Z)** has already called `exit()`, but its **parent process hasn't yet called `wait()`/`waitpid()`** to read its exit status. The kernel keeps a minimal entry (PID, exit code) in the process table until the parent "reaps" it. A zombie **doesn't meaningfully consume CPU/RAM** — it isn't executing any code, it's just a row in the process table.

**Why it's still dangerous**: PIDs on Linux are a finite resource (`/proc/sys/kernel/pid_max`, typically 32768 or higher depending on config). If a buggy parent process **never reaps its children** (missing `wait()` calls, or repeatedly `fork()`ing without handling `SIGCHLD`), zombies accumulate over time and can eventually **exhaust the PID space**, preventing the system from `fork()`ing any new process — effectively halting the whole server.

**You cannot `kill -9` a zombie** — it's already dead, there's no running process left to receive the signal. The correct fix is to fix/kill the **parent process** so it reaps its children, or if the parent has already died, `init`/`systemd` (PID 1) automatically adopts and reaps these orphaned zombies.

**Checking**:
```bash
ps aux | grep ' Z '
ps -eo pid,ppid,stat,cmd | awk '$3 ~ /Z/'
# Identify the parent of the zombie to address the actual issue
```

**Real-world example**: a Node.js service used `child_process.spawn()` to run child scripts in bulk but never listened for the `exit`/`close` event to reap them. After a few weeks in production, `ps aux` showed thousands of zombies, and the server started throwing "Resource temporarily unavailable" (`EAGAIN`) errors when trying to spawn new processes, because the PID space was exhausted.
