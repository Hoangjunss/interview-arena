---
id: docker-pid1-zombie-process-problem
position: devops
technology: docker
level: senior
tags: [docker, lifecycle, linux]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Zombie process trong container là gì và vì sao nó lại là vấn đề đặc thù của container (so với process chạy trực tiếp trên host)? `--init`/`tini` giải quyết nó ra sao?

## Question (EN)
What is a zombie process inside a container, and why is it a container-specific problem (compared to a process running directly on a host)? How does `--init`/`tini` solve it?

## Đáp án chi tiết (VI)
**Zombie process là gì (theo Linux):** khi một process con kết thúc, nó không biến mất ngay — kernel giữ lại entry trong process table (exit status, PID) ở trạng thái `Z` (zombie/defunct) **cho tới khi process cha gọi `wait()`/`waitpid()`** để "reap" (thu dọn) nó. Nếu process cha không bao giờ gọi `wait()`, zombie tồn tại vĩnh viễn cho tới khi chính process cha thoát (lúc đó zombie được `init` — PID 1 của **hệ thống** — reap hộ).

**Vì sao đây là vấn đề đặc thù của container:** trên một máy Linux bình thường, **PID 1 là `systemd`/`init`**, được thiết kế chuyên biệt với trách nhiệm **reap toàn bộ zombie process mồ côi** trong hệ thống (kế thừa qua cơ chế reparenting). Nhưng trong container, PID 1 thường là **chính ứng dụng của bạn** (Node.js, Python, Java...) — các runtime này **không được thiết kế để làm init system**, không có logic tự động `wait()` cho zombie process con mà chúng không trực tiếp fork ra (ví dụ zombie bị mồ côi từ process cháu, được reparent lên PID 1).

**Kịch bản thực tế gây zombie tích tụ:**
```dockerfile
CMD ["node", "server.js"]
```
Nếu `server.js` dùng `child_process.exec()` để gọi ra script khác (ví dụ ImageMagick convert ảnh, ffmpeg xử lý video) và không xử lý đúng event `exit`/`close` của child, hoặc nếu child process đó lại tự fork thêm process con rồi thoát trước con của nó — process cháu bị mồ côi, reparent lên PID 1 (Node.js), và Node.js **không tự động reap** nó → zombie tồn đọng.

**Hậu quả:**
- Mỗi zombie chiếm 1 entry trong process table (PID) — dù không tốn CPU/RAM đáng kể, hệ thống có **giới hạn số PID tối đa** (`pid_max`); container chạy lâu ngày với nhiều zombie tích tụ có thể dẫn tới **cạn kiệt PID**, khiến không thể fork thêm process mới, ứng dụng bắt đầu lỗi `fork: retry: Resource temporarily unavailable`.
- `docker top <container>` sẽ hiện các process ở trạng thái `Z` tăng dần theo thời gian — dấu hiệu rõ ràng để chẩn đoán.

**Giải pháp — dùng init process chuyên trách làm PID 1:**
```bash
docker run --init myapp
```
Flag `--init` khiến Docker tự động chèn một init binary tối giản (`tini`, mặc định tích hợp sẵn từ Docker 1.13+) làm PID 1 thật sự, còn ứng dụng của bạn chạy như process con của nó (PID 2+).

Hoặc khai báo tường minh trong Dockerfile:
```dockerfile
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
```

**`tini` làm 2 việc chính:**
1. **Reap zombie process** đúng cách — vì nó **là** init system thật sự (gọi `wait()` cho mọi process mồ côi được reparent lên nó).
2. **Forward signal đúng cách** — nhận SIGTERM từ `docker stop` và forward xuống đúng process con (app), giải quyết luôn "PID 1 signal problem" liên quan tới graceful shutdown.

**Khi nào KHÔNG cần init process:** nếu ứng dụng **không bao giờ fork/spawn process con** (ví dụ một Go binary tĩnh chỉ chạy 1 goroutine, không gọi `exec.Command`), sẽ không phát sinh zombie vì không có process con nào để reap — thêm `tini` trong trường hợp này chỉ là phòng ngừa, không bắt buộc.

**Kiểm tra thực tế:**
```bash
docker exec myapp ps aux
# STAT column có "Z" => zombie process đang tồn đọng, cần init process
```

## Detailed Answer (EN)
**What a zombie process is (in Linux):** when a child process terminates, it doesn't vanish immediately — the kernel keeps its process table entry (exit status, PID) in state `Z` (zombie/defunct) **until the parent process calls `wait()`/`waitpid()`** to reap it. If the parent never calls `wait()`, the zombie persists forever until the parent itself exits (at which point the system's `init` — PID 1 — reaps it on the parent's behalf).

**Why this is a container-specific problem:** on a normal Linux machine, **PID 1 is `systemd`/`init`**, purpose-built with the responsibility of **reaping every orphaned zombie process** on the system (via the reparenting mechanism). But in a container, PID 1 is usually **your own application** (Node.js, Python, Java...) — these runtimes **were not designed to act as an init system** and have no automatic `wait()` logic for child processes they didn't directly fork (e.g., a zombie orphaned from a grandchild process, reparented onto PID 1).

**Realistic scenario causing zombie buildup:**
```dockerfile
CMD ["node", "server.js"]
```
If `server.js` uses `child_process.exec()` to shell out to another script (e.g., ImageMagick converting an image, ffmpeg processing video) and doesn't properly handle the child's `exit`/`close` events, or if that child process itself forks grandchildren and then exits before them — the grandchildren become orphaned, get reparented onto PID 1 (Node.js), and Node.js **doesn't automatically reap them** → zombies accumulate.

**Consequences:**
- Each zombie occupies one process-table entry (PID) — while not consuming meaningful CPU/RAM, a system has a **maximum PID limit** (`pid_max`); a long-running container with accumulated zombies can eventually **exhaust PIDs**, preventing new process creation, causing `fork: retry: Resource temporarily unavailable` errors.
- `docker top <container>` will show processes in state `Z` growing over time — a clear diagnostic signal.

**Solution — use a dedicated init process as PID 1:**
```bash
docker run --init myapp
```
The `--init` flag makes Docker automatically insert a minimal init binary (`tini`, bundled by default since Docker 1.13+) as the real PID 1, with your application running as its child (PID 2+).

Or declare it explicitly in the Dockerfile:
```dockerfile
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
```

**`tini` does two main things:**
1. **Reaps zombie processes** correctly — because it **is** a real init system (calling `wait()` for every orphaned process reparented onto it).
2. **Forwards signals correctly** — receiving SIGTERM from `docker stop` and passing it down to the correct child process (the app), also resolving the "PID 1 signal problem" related to graceful shutdown.

**When you DON'T need an init process:** if the app **never forks/spawns child processes** (e.g., a static Go binary running a single goroutine, never calling `exec.Command`), no zombies can occur since there are no children to reap — adding `tini` in this case is precautionary, not mandatory.

**Practical check:**
```bash
docker exec myapp ps aux
# a "Z" in the STAT column => zombie processes are accumulating, an init process is needed
```
