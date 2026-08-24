---
id: file-descriptors-ulimit
position: devops
technology: linux-networking-ops
level: junior
tags: [linux, ulimit, file-descriptors]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File descriptor là gì? Lỗi "Too many open files" xảy ra khi nào và bạn xử lý bằng cách nào?

## Question (EN)
What is a file descriptor? When does "Too many open files" happen and how do you fix it?

## Đáp án chi tiết (VI)
**File descriptor (FD)** là một số nguyên không âm mà kernel dùng để đại diện cho một "handle" tới tài nguyên I/O đang mở của một tiến trình — có thể là file thường, socket TCP, pipe, hay thiết bị. Mỗi process khi mở file/socket sẽ được cấp một FD mới, và ba FD đầu (0, 1, 2) mặc định là stdin, stdout, stderr.

Kernel giới hạn số FD một process được mở cùng lúc thông qua **ulimit**, để tránh một process "ăn" hết tài nguyên hệ thống. Có 2 loại limit:
- **Soft limit**: giới hạn hiện tại áp dụng, process có thể tự nâng lên (nhưng không vượt hard limit).
- **Hard limit**: trần tối đa, chỉ root mới nâng được.

```bash
ulimit -n          # xem soft limit hiện tại (thường 1024)
ulimit -Hn          # xem hard limit
cat /proc/<pid>/limits | grep "open files"
ls /proc/<pid>/fd | wc -l   # đếm FD process đang mở
```

**Lỗi "Too many open files" (EMFILE)** xảy ra khi process cố mở FD vượt quá soft limit — thường gặp ở:
- Web server/app xử lý nhiều connection đồng thời (mỗi socket = 1 FD) mà default ulimit 1024 quá thấp.
- **File descriptor leak**: code mở file/socket nhưng không close (ví dụ quên `.close()` trong except block, hoặc kết nối DB không được trả về pool).
- Nginx/HAProxy làm reverse proxy cho lượng lớn kết nối đồng thời.

Cách khắc phục:

1. **Tăng ulimit tạm thời** (chỉ áp dụng cho session hiện tại):
```bash
ulimit -n 65536
```

2. **Tăng vĩnh viễn** qua `/etc/security/limits.conf`:
```
appuser soft nofile 65536
appuser hard nofile 65536
```
Lưu ý: cách này chỉ áp dụng cho login session qua PAM, **không** áp dụng cho service chạy bằng systemd.

3. **Với systemd service**, phải set riêng trong unit file:
```ini
[Service]
LimitNOFILE=65536
```

4. **Tìm leak thay vì chỉ tăng limit**: dùng `lsof -p <pid>` để xem process đang giữ FD nào, nếu số lượng socket ở trạng thái `CLOSE_WAIT` tăng liên tục theo thời gian thì gần như chắc chắn là leak trong code, tăng ulimit chỉ trì hoãn sự cố chứ không giải quyết gốc rễ.

```bash
lsof -p 12345 | awk '{print $5}' | sort | uniq -c | sort -rn
```

**Pitfall thường gặp**: tăng ulimit ở `/etc/security/limits.conf` xong restart service qua systemd nhưng vẫn lỗi — vì systemd không đọc PAM limits mà có `DefaultLimitNOFILE` riêng trong `/etc/systemd/system.conf`, hoặc phải set `LimitNOFILE` trực tiếp trong unit.

## Detailed Answer (EN)
A **file descriptor (FD)** is a non-negative integer the kernel uses to represent a process's open handle to an I/O resource — a regular file, a TCP socket, a pipe, or a device. Every time a process opens a file or socket it gets a new FD; the first three (0, 1, 2) are stdin, stdout, and stderr by convention.

The kernel caps how many FDs a process can hold open at once via **ulimit**, to stop one process from exhausting system resources. There are two kinds of limits:
- **Soft limit**: the currently enforced ceiling; a process may raise it itself up to the hard limit.
- **Hard limit**: the absolute ceiling; only root can raise it.

```bash
ulimit -n          # current soft limit (often 1024)
ulimit -Hn          # hard limit
cat /proc/<pid>/limits | grep "open files"
ls /proc/<pid>/fd | wc -l   # count FDs currently open by a process
```

**"Too many open files" (EMFILE)** happens when a process tries to open more FDs than its soft limit allows. Common causes:
- A web server/app handling many concurrent connections (each socket = 1 FD) where the default 1024 limit is too low.
- **A file descriptor leak**: code opens a file/socket but never closes it (e.g. forgetting `.close()` inside an except branch, or a DB connection never returned to the pool).
- Nginx/HAProxy proxying a large number of concurrent connections.

How to fix it:

1. **Raise ulimit temporarily** (current shell session only):
```bash
ulimit -n 65536
```

2. **Raise it permanently** via `/etc/security/limits.conf`:
```
appuser soft nofile 65536
appuser hard nofile 65536
```
Note: this only applies to PAM-based login sessions, **not** to services started by systemd.

3. **For a systemd service**, set it directly in the unit file:
```ini
[Service]
LimitNOFILE=65536
```

4. **Find the leak instead of just raising the limit**: use `lsof -p <pid>` to see what FDs the process is holding. If the count of sockets in `CLOSE_WAIT` keeps climbing over time, that's almost certainly a leak in the application — raising ulimit only postpones the outage, it doesn't fix the root cause.

```bash
lsof -p 12345 | awk '{print $5}' | sort | uniq -c | sort -rn
```

**Common pitfall**: raising the limit in `/etc/security/limits.conf` and restarting via systemd but still hitting the error — systemd does not read PAM limits; it has its own `DefaultLimitNOFILE` in `/etc/systemd/system.conf`, or you must set `LimitNOFILE` directly in the unit.
