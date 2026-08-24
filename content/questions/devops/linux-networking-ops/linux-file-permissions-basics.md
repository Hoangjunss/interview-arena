---
id: linux-file-permissions-basics
position: devops
technology: linux-networking-ops
level: junior
tags: [linux, permissions, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích ý nghĩa của `-rwxr-xr--` trong output `ls -l`, và sự khác nhau giữa `chmod 755` và `chmod 644`. SUID/SGID là gì?

## Question (EN)
Explain the meaning of `-rwxr-xr--` in `ls -l` output, and the difference between `chmod 755` and `chmod 644`. What are SUID/SGID?

## Đáp án chi tiết (VI)
Chuỗi quyền `-rwxr-xr--` trong `ls -l` gồm 10 ký tự, chia làm 4 nhóm:

```
-   rwx   r-x   r--
^    ^     ^     ^
|    |     |     +-- other (mọi user khác): read only
|    |     +-------- group: read + execute
|    +-------------- owner: read + write + execute
+------------------- loại file (- = file thường, d = thư mục, l = symlink)
```

Mỗi nhóm 3 ký tự tương ứng `r` (read=4), `w` (write=2), `x` (execute=1). Cộng dồn thành số octal:
- `rwx` = 4+2+1 = 7
- `r-x` = 4+0+1 = 5
- `r--` = 4+0+0 = 4

Vậy `-rwxr-xr--` = **754**.

**`chmod 755`**: `rwxr-xr-x` — owner full quyền, group và other chỉ đọc + execute, **không có write**. Đây là quyền chuẩn cho **thư mục** (cần execute để `cd` vào/list nội dung) và **file thực thi** (script, binary) mà nhiều người cần chạy nhưng chỉ owner được sửa.

**`chmod 644`**: `rw-r--r--` — owner đọc/ghi, group và other chỉ đọc, không ai được execute. Chuẩn cho **file dữ liệu thông thường** (config, source code không cần chạy trực tiếp) — không nên set execute cho file không phải script/binary vì không cần thiết và tăng bề mặt tấn công không đáng.

**Với thư mục**, ý nghĩa hơi khác:
- `r` trên thư mục = được phép `ls` liệt kê tên file bên trong.
- `x` trên thư mục = được phép `cd` vào và **truy cập** file bên trong (nếu biết tên), dù không có quyền `r` để list.
- Thiếu `x` trên thư mục cha sẽ chặn truy cập file con dù file con có quyền 777 — lỗi permission hay bị nhầm là do file trong khi thực ra là do thư mục cha.

**SUID (Set User ID) và SGID (Set Group ID)** là các bit đặc biệt:
- **SUID** (`chmod u+s`, hiển thị là `s` thay cho `x` ở owner, ví dụ `-rwsr-xr-x`): khi file thực thi có SUID, nó chạy với **quyền của owner file** thay vì quyền của user thực thi. Ví dụ kinh điển: `/usr/bin/passwd` có SUID root, để user thường có thể sửa `/etc/shadow` (file chỉ root ghi được) khi đổi mật khẩu của chính mình.
```bash
ls -l /usr/bin/passwd
# -rwsr-xr-x 1 root root ... /usr/bin/passwd
```
- **SGID** (`chmod g+s`) trên file: chạy với quyền group của owner. Trên **thư mục**: mọi file/thư mục con tạo mới sẽ tự động thừa hưởng group của thư mục cha thay vì group mặc định của user tạo — rất hữu ích cho thư mục dùng chung giữa nhiều user trong cùng group (ví dụ `/var/www/shared`).

**Rủi ro bảo mật**: SUID trên binary do người dùng tự biên dịch/cài là một vector tấn công phổ biến để leo thang đặc quyền (privilege escalation) — nếu binary có lỗ hổng và chạy với SUID root, kẻ tấn công có thể lợi dụng để chạy code tùy ý với quyền root. Nên định kỳ audit các file có SUID:
```bash
find / -perm -4000 -type f 2>/dev/null
```

## Detailed Answer (EN)
The permission string `-rwxr-xr--` in `ls -l` has 10 characters split into 4 groups:

```
-   rwx   r-x   r--
^    ^     ^     ^
|    |     |     +-- other (everyone else): read only
|    |     +-------- group: read + execute
|    +-------------- owner: read + write + execute
+------------------- file type (- = regular file, d = directory, l = symlink)
```

Each 3-character group maps to `r` (read=4), `w` (write=2), `x` (execute=1), summed into an octal digit:
- `rwx` = 4+2+1 = 7
- `r-x` = 4+0+1 = 5
- `r--` = 4+0+0 = 4

So `-rwxr-xr--` = **754**.

**`chmod 755`**: `rwxr-xr-x` — owner has full permissions, group and other get read + execute, **no write**. This is the standard permission set for **directories** (execute is needed to `cd` into/list contents) and **executable files** (scripts, binaries) that many people need to run but only the owner should modify.

**`chmod 644`**: `rw-r--r--` — owner can read/write, group and other can only read, nobody can execute. Standard for **regular data files** (config, source code that isn't run directly) — don't set execute on files that aren't scripts/binaries, since it's unnecessary and needlessly widens the attack surface.

**On directories**, the meaning shifts slightly:
- `r` on a directory = allowed to `ls` and list filenames inside.
- `x` on a directory = allowed to `cd` into it and **access** a file inside (if you already know its name), even without `r` to list contents.
- Missing `x` on a parent directory blocks access to a child file even if that child has permission 777 — a permission error often blamed on the file when it's actually the parent directory.

**SUID (Set User ID) and SGID (Set Group ID)** are special permission bits:
- **SUID** (`chmod u+s`, shown as `s` in place of `x` in the owner slot, e.g. `-rwsr-xr-x`): when an executable has SUID set, it runs with the **file owner's privileges** instead of the executing user's. Classic example: `/usr/bin/passwd` has SUID root, letting a regular user modify `/etc/shadow` (root-writable only) when changing their own password.
```bash
ls -l /usr/bin/passwd
# -rwsr-xr-x 1 root root ... /usr/bin/passwd
```
- **SGID** (`chmod g+s`) on a file: runs with the owner's group privileges. On a **directory**: any new file/subdirectory created inside automatically inherits the parent directory's group instead of the creating user's default group — very useful for shared directories across users in the same group (e.g. `/var/www/shared`).

**Security risk**: SUID on user-compiled/installed binaries is a common privilege-escalation attack vector — if a SUID-root binary has a vulnerability, an attacker can exploit it to run arbitrary code as root. It's good practice to periodically audit SUID files:
```bash
find / -perm -4000 -type f 2>/dev/null
```
