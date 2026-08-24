---
id: inode-exhaustion-debug
position: devops
technology: linux-networking-ops
level: mid
tags: [linux, disk-io, filesystem, debugging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server báo lỗi "No space left on device" nhưng `df -h` cho thấy vẫn còn dung lượng trống. Nguyên nhân có thể là gì và bạn debug thế nào?

## Question (EN)
A server reports "No space left on device" but `df -h` shows plenty of free space. What could cause this, and how would you debug it?

## Đáp án chi tiết (VI)
Đây là dấu hiệu kinh điển của **hết inode** chứ không phải hết dung lượng disk. Mỗi filesystem (ext4, xfs...) khi format sẽ cấp phát một số lượng inode cố định — mỗi file/thư mục/symlink chiếm đúng 1 inode, bất kể kích thước file lớn hay nhỏ (kể cả file 0 byte). Nếu hệ thống tạo ra hàng triệu file nhỏ (session file, cache file, log file rác, email queue...) thì có thể cạn inode dù dung lượng byte còn rất nhiều.

**Bước 1: Xác nhận đúng là hết inode**
```bash
df -h        # còn dung lượng trống
df -i        # kiểm tra % inode đã dùng
```
Output ví dụ:
```
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
/dev/sda1      6553600 6553600      0  100% /
```
`IUse% = 100%` xác nhận chính xác vấn đề.

**Bước 2: Tìm thư mục đang chứa nhiều file nhỏ nhất**
```bash
# Đếm số file theo từng thư mục con cấp 1, tìm "thủ phạm"
for d in /var/*; do echo "$d: $(find "$d" -xdev -type f 2>/dev/null | wc -l)"; done | sort -t: -k2 -rn

# Hoặc dùng find trực tiếp để tìm thư mục nghi ngờ (session, tmp, mail queue)
find /var/lib/php/sessions -type f | wc -l
find /var/spool/postfix -type f | wc -l
```

Các thủ phạm thường gặp trong thực tế:
- **PHP session files** không có cron dọn dẹp (`session.gc_probability` bị tắt).
- **Log rotation không chạy** — mỗi request tạo 1 file log riêng thay vì append.
- **Mail queue** (Postfix/Sendmail) bị nghẽn, email dồn ứ hàng triệu file trong `/var/spool`.
- **Cache framework** (ví dụ cache file-based của Laravel/Symfony) không có TTL cleanup.
- Thư mục `.git` với hàng trăm nghìn object rời rạc chưa `git gc`.

**Bước 3: Xử lý**
```bash
# Xóa hàng loạt file cũ hơn N ngày (an toàn hơn rm -rf trực tiếp)
find /var/lib/php/sessions -type f -mtime +1 -delete

# Nếu số lượng quá lớn, rm thẳng sẽ chậm/quá tải arg list -> dùng find -delete hoặc xargs
find /path -type f -print0 | xargs -0 rm -f
```

**Về lâu dài**: thiết lập cron dọn rác định kỳ, bật log rotation (`logrotate`), giám sát `df -i` trong hệ thống monitoring (Prometheus node_exporter có metric `node_filesystem_files_free`) song song với `df -h`, vì rất nhiều team chỉ alert theo dung lượng byte mà quên inode.

**Lưu ý khi format lại**: nếu server có đặc thù lưu rất nhiều file nhỏ (message queue, session store...), nên format ext4 với `mkfs.ext4 -N <số_inode_lớn>` để tăng số inode cấp phát ban đầu, hoặc cân nhắc dùng XFS (cấp phát inode động, ít bị giới hạn cứng như ext4).

## Detailed Answer (EN)
This is a classic symptom of **inode exhaustion**, not disk space exhaustion. Every filesystem (ext4, xfs, etc.) allocates a fixed number of inodes at format time — each file, directory, or symlink consumes exactly one inode regardless of its byte size (even a 0-byte file). If the system generates millions of small files (session files, cache files, stray logs, a stuck mail queue...) it can run out of inodes while plenty of byte-level space remains.

**Step 1: Confirm it's inodes, not space**
```bash
df -h        # shows free space
df -i        # check inode usage percentage
```
Example output:
```
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
/dev/sda1      6553600 6553600      0  100% /
```
`IUse% = 100%` confirms the diagnosis.

**Step 2: Find the directory hoarding the most small files**
```bash
# Count files per top-level subdirectory to find the culprit
for d in /var/*; do echo "$d: $(find "$d" -xdev -type f 2>/dev/null | wc -l)"; done | sort -t: -k2 -rn

# Or check specific suspects directly (sessions, tmp, mail queue)
find /var/lib/php/sessions -type f | wc -l
find /var/spool/postfix -type f | wc -l
```

Common real-world culprits:
- **PHP session files** never garbage-collected (`session.gc_probability` disabled).
- **Log rotation not running** — each request writing its own log file instead of appending.
- **Stuck mail queue** (Postfix/Sendmail) piling up millions of files under `/var/spool`.
- **File-based application cache** (e.g. Laravel/Symfony) with no TTL cleanup.
- A `.git` directory with hundreds of thousands of loose objects never `git gc`'d.

**Step 3: Remediate**
```bash
# Delete files older than N days in bulk (safer than a blind rm -rf)
find /var/lib/php/sessions -type f -mtime +1 -delete

# For very large counts, plain rm can choke on arg-list length — use find -delete or xargs
find /path -type f -print0 | xargs -0 rm -f
```

**Long term**: set up periodic cleanup cron jobs, enable `logrotate`, and monitor `df -i` alongside `df -h` in your monitoring stack (Prometheus node_exporter exposes `node_filesystem_files_free`) — many teams alert only on byte usage and completely miss inode exhaustion.

**Reformatting note**: for workloads that intrinsically create huge numbers of small files (message queues, session stores), format ext4 with `mkfs.ext4 -N <large_inode_count>` to raise the initial inode allocation, or consider XFS, which allocates inodes dynamically and is far less prone to this hard ceiling than ext4.
