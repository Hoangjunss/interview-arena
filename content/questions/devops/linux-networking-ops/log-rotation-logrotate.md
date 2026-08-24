---
id: log-rotation-logrotate
position: devops
technology: linux-networking-ops
level: mid
tags: [linux, logging, disk-io, operations]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`logrotate` là gì và hoạt động như thế nào? Vì sao xóa trực tiếp một file log đang được ứng dụng ghi vào không giải phóng được dung lượng disk ngay lập tức?

## Question (EN)
What is `logrotate` and how does it work? Why doesn't deleting a log file that an application is actively writing to immediately free up disk space?

## Đáp án chi tiết (VI)
**`logrotate`** là công cụ tiêu chuẩn trên Linux để quản lý vòng đời file log: tự động **xoay vòng (rotate)** — đổi tên/nén file log cũ, tạo file mới để ghi tiếp, và **xóa** log quá cũ theo policy đã cấu hình. Mục đích chính là tránh log tăng vô hạn gây đầy disk, trong khi vẫn giữ lại lịch sử log đủ để debug khi cần.

Chạy dưới dạng cron job (`/etc/cron.daily/logrotate`) hoặc systemd timer, đọc cấu hình từ `/etc/logrotate.conf` và các file trong `/etc/logrotate.d/`.

Cấu hình mẫu cho ứng dụng:
```
/var/log/myapp/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
    dateext
}
```
Giải thích các directive quan trọng:
- `daily`: xoay vòng mỗi ngày (còn có `weekly`, `size 100M`...).
- `rotate 14`: giữ lại 14 bản cũ nhất, xóa bản cũ hơn.
- `compress`: nén file log cũ bằng gzip để tiết kiệm dung lượng.
- `delaycompress`: **trì hoãn nén file mới xoay 1 chu kỳ** — để tránh nén file mà ứng dụng có thể vẫn đang giữ file descriptor cũ ghi dở dang.
- `copytruncate`: **copy nội dung hiện tại sang file mới rồi truncate file gốc về 0 byte**, thay vì rename — cần dùng khi ứng dụng **không hỗ trợ** signal để mở lại file log (không có cơ chế reopen), tránh mất log nhưng có rủi ro nhỏ mất vài dòng log ghi đúng lúc giữa copy và truncate.
- `postrotate`/`endscript`: chạy lệnh sau khi rotate, thường dùng để gửi signal cho ứng dụng reopen file log mới (ví dụ `nginx -s reopen` hoặc `kill -USR1`).

**Vì sao `rm`/xóa trực tiếp file log không giải phóng dung lượng ngay** — đây là câu hỏi hay bị hỏi về cơ chế filesystem của Linux:

Trên Linux, một file thực chất được xác định bởi **inode**, còn tên file trong thư mục chỉ là một **link (hard link)** trỏ tới inode đó. `rm` chỉ **gỡ bỏ link** khỏi thư mục — inode và dữ liệu thực tế trên disk **chỉ bị giải phóng khi reference count về 0**, nghĩa là không còn hard link nào trỏ tới VÀ không còn **file descriptor nào đang mở** nó.

Nếu ứng dụng đang có file descriptor mở tới file log đó (đang ghi liên tục), `rm` file sẽ:
- Xóa tên file khỏi thư mục ngay lập tức — `ls` không còn thấy file.
- Nhưng inode/dữ liệu **vẫn tồn tại trên disk** vì process vẫn giữ file descriptor mở, ứng dụng vẫn tiếp tục ghi bình thường vào đúng inode đó (chỉ là không còn tên trong thư mục) → `df -h` vẫn báo dung lượng bị chiếm y nguyên, thậm chí tiếp tục tăng.
- Dung lượng chỉ thực sự được giải phóng khi process đóng file descriptor (thường là khi restart service).

**Cách xử lý đúng khi disk đầy do log lớn mà không muốn restart service**:
```bash
# Tìm file đã bị xóa nhưng vẫn chiếm dung lượng (deleted nhưng process vẫn giữ)
lsof +L1
# hoặc
lsof / | grep deleted

# Giải pháp không cần restart: truncate về 0 byte thay vì rm
> /var/log/myapp/app.log
# hoặc dùng file descriptor của process đang giữ (nếu biết pid và fd)
truncate -s 0 /proc/<pid>/fd/<fd_number>
```
`truncate -s 0` giữ nguyên inode và file descriptor process đang mở, chỉ đưa kích thước dữ liệu về 0 — giải phóng dung lượng ngay lập tức mà **không cần restart ứng dụng**, vì process vẫn ghi tiếp vào đúng file/offset mới sau khi bị truncate.

**Bài học thực tế**: sự cố "disk đầy dù đã rm hết log cũ" gần như luôn là do quên rằng process vẫn giữ file descriptor của file đã xóa — kiểm tra bằng `lsof | grep deleted` là bước đầu tiên nên làm trước khi hoảng loạn tìm nơi khác.

## Detailed Answer (EN)
**`logrotate`** is the standard Linux tool for managing log file lifecycle: automatically **rotating** — renaming/compressing old log files, starting a fresh one to write into, and **deleting** logs beyond a configured retention policy. Its main purpose is preventing unbounded log growth from filling the disk, while retaining enough history for debugging.

It runs as a cron job (`/etc/cron.daily/logrotate`) or a systemd timer, reading configuration from `/etc/logrotate.conf` and files in `/etc/logrotate.d/`.

Sample application config:
```
/var/log/myapp/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
    dateext
}
```
Key directives:
- `daily`: rotate every day (also available: `weekly`, `size 100M`, etc.).
- `rotate 14`: keep the 14 most recent rotated files, delete older ones.
- `compress`: gzip old log files to save space.
- `delaycompress`: **delay compressing the newly rotated file by one cycle** — avoids compressing a file the application might still hold an open handle to mid-write.
- `copytruncate`: **copy current content to a new file, then truncate the original to 0 bytes**, instead of renaming — needed when the application **doesn't support** a signal to reopen its log file, avoiding lost logs, with a small risk of losing a few lines written exactly between the copy and the truncate.
- `postrotate`/`endscript`: commands run after rotation, typically to signal the application to reopen its new log file (e.g. `nginx -s reopen` or `kill -USR1`).

**Why `rm`/deleting a log file directly doesn't free disk space immediately** — a common question about Linux filesystem mechanics:

On Linux, a file is fundamentally identified by its **inode**, while the filename in a directory is just a **link** pointing to that inode. `rm` only **removes the link** from the directory — the inode and actual data on disk are only freed once the reference count drops to zero, meaning no more hard links point to it **and** no process still has a **file descriptor open** to it.

If an application currently has an open file descriptor to that log file (actively writing to it), `rm`ing the file will:
- Remove the filename from the directory immediately — `ls` no longer shows it.
- But the inode/data **still exists on disk** because the process still holds an open descriptor and keeps writing normally to that same inode (it just no longer has a name in the directory) → `df -h` still reports the same space used, potentially still growing.
- The space is only actually freed when the process closes the file descriptor (typically at service restart).

**The correct fix when disk is full from a large log without wanting to restart the service**:
```bash
# Find files that were deleted but are still consuming space (deleted but held open)
lsof +L1
# or
lsof / | grep deleted

# Fix without restarting: truncate to 0 bytes instead of rm
> /var/log/myapp/app.log
# or use the open process's file descriptor directly (if PID and fd are known)
truncate -s 0 /proc/<pid>/fd/<fd_number>
```
`truncate -s 0` keeps the same inode and the process's open file descriptor intact, just resets the data size to 0 — freeing disk space immediately **without restarting the application**, since the process simply keeps writing to the same file/offset after the truncation.

**Real-world lesson**: a "disk full despite deleting old logs" incident is almost always caused by forgetting that a process still holds an open file descriptor to the deleted file — checking with `lsof | grep deleted` should be the first step, before panicking and looking elsewhere.
