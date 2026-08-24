---
id: cron-job-troubleshooting
position: devops
technology: linux-networking-ops
level: junior
tags: [linux, cron, debugging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một cron job chạy hoàn hảo khi bạn tự chạy script bằng tay, nhưng khi để cron tự chạy thì lại fail hoặc không có output gì. Những nguyên nhân phổ biến nhất là gì?

## Question (EN)
A cron job runs perfectly when you execute the script manually, but fails or produces no output when cron runs it automatically. What are the most common causes?

## Đáp án chi tiết (VI)
Đây là câu hỏi kinh điển vì cron chạy trong một **môi trường (environment) hoàn toàn khác** so với shell tương tác của bạn. Các nguyên nhân phổ biến nhất, theo thứ tự hay gặp:

**1. Biến môi trường `PATH` khác biệt** — nguyên nhân số 1 gây lỗi "command not found":
- Shell tương tác load `PATH` đầy đủ từ `~/.bashrc`/`~/.bash_profile`.
- Cron chạy với `PATH` tối giản, thường chỉ là `/usr/bin:/bin`. Nếu script gọi `node`, `python3`, hay binary cài qua `nvm`/`pyenv`/`/usr/local/bin`, cron sẽ không tìm thấy.

Fix: luôn dùng **đường dẫn tuyệt đối** trong crontab hoặc set `PATH` ngay đầu script/crontab:
```bash
PATH=/usr/local/bin:/usr/bin:/bin
0 2 * * * /usr/local/bin/node /opt/app/script.js
```

**2. Không có output vì stdout/stderr bị "nuốt"**:
Mặc định cron gửi output qua email nội bộ (`mail`) tới user chạy cron — nếu hệ thống không cấu hình MTA, output biến mất im lặng. Luôn redirect log ra file để debug:
```bash
0 2 * * * /opt/app/script.sh >> /var/log/myscript.log 2>&1
```

**3. Working directory khác** — cron **không** chạy trong thư mục bạn nghĩ (thường là `$HOME` của user chạy cron, hoặc `/`), trong khi khi bạn tự chạy tay bạn đang đứng ở thư mục project. Script dùng đường dẫn tương đối (`./config.json`, `../data`) sẽ fail khi cron chạy.

Fix: luôn `cd` tường minh đầu script hoặc dùng đường dẫn tuyệt đối:
```bash
0 2 * * * cd /opt/app && ./run.sh
```

**4. Thiếu biến môi trường ứng dụng cần** (ví dụ `NODE_ENV`, `DATABASE_URL`, các biến từ `.env` mà shell tương tác đã `export` từ trước nhưng cron không biết) — cron chỉ có một tập biến môi trường tối thiểu (`SHELL`, `PATH`, `HOME`, `LOGNAME`), không kế thừa gì từ session login của bạn.

Fix: load `.env` tường minh trong script, hoặc khai báo biến ngay trong crontab.

**5. Sai user chạy cron** — `crontab -e` sửa crontab của **user hiện tại**; nếu deploy bằng script chạy với `sudo` rồi quên đổi lại, job có thể bị thêm vào crontab của `root` thay vì user ứng dụng mong muốn (hoặc ngược lại), dẫn đến sai quyền truy cập file khi chạy.

Kiểm tra: `crontab -l -u <user>`, và log hệ thống `/var/log/cron` hoặc `journalctl -u cron`/`journalctl -u crond` để xem cron có thực sự trigger job không (phân biệt "job không chạy" với "job chạy nhưng fail").

**6. Escaping sai ký tự `%` trong crontab** — dấu `%` trong lệnh cron có ý nghĩa đặc biệt (xuống dòng, dùng làm stdin cho lệnh), nếu script cần dùng `%` (ví dụ trong lệnh `date +\%Y\%m\%d`) mà quên escape bằng `\%`, cron sẽ hiểu sai lệnh.

**Quy trình debug chuẩn**:
```bash
# 1. Kiểm tra cron có chạy đúng lịch không
grep CRON /var/log/syslog   # hoặc journalctl -u cron

# 2. Test bằng cách giả lập môi trường tối giản của cron
env -i PATH=/usr/bin:/bin HOME=/home/user /bin/sh /opt/app/script.sh

# 3. Luôn log timestamp + exit code để biết job chạy khi nào và kết quả
0 2 * * * /opt/app/script.sh >> /var/log/myscript.log 2>&1; echo "Exit: $?" >> /var/log/myscript.log
```

## Detailed Answer (EN)
This is a classic question because cron runs in a **completely different environment** than your interactive shell. The most common causes, roughly in order of frequency:

**1. A different `PATH` environment variable** — the #1 cause of "command not found" errors:
- An interactive shell loads a full `PATH` from `~/.bashrc`/`~/.bash_profile`.
- Cron runs with a minimal `PATH`, often just `/usr/bin:/bin`. If the script calls `node`, `python3`, or a binary installed via `nvm`/`pyenv`/`/usr/local/bin`, cron won't find it.

Fix: always use **absolute paths** in the crontab, or set `PATH` explicitly at the top of the script/crontab:
```bash
PATH=/usr/local/bin:/usr/bin:/bin
0 2 * * * /usr/local/bin/node /opt/app/script.js
```

**2. No output because stdout/stderr are "swallowed"**:
By default cron emails output (via `mail`) to the user running the job — if the system has no MTA configured, output disappears silently. Always redirect logs to a file for debugging:
```bash
0 2 * * * /opt/app/script.sh >> /var/log/myscript.log 2>&1
```

**3. A different working directory** — cron does **not** run in the directory you assume (usually the cron user's `$HOME`, or `/`), while running the script manually you were sitting in the project directory. Scripts using relative paths (`./config.json`, `../data`) will fail under cron.

Fix: always `cd` explicitly at the top of the script or use absolute paths:
```bash
0 2 * * * cd /opt/app && ./run.sh
```

**4. Missing application environment variables** (e.g. `NODE_ENV`, `DATABASE_URL`, or variables from a `.env` your interactive shell had `export`ed previously that cron knows nothing about) — cron only gets a minimal environment (`SHELL`, `PATH`, `HOME`, `LOGNAME`), inheriting nothing from your login session.

Fix: load `.env` explicitly inside the script, or declare variables directly in the crontab.

**5. Wrong user running the cron job** — `crontab -e` edits the **current user's** crontab; if a deploy script runs under `sudo` and forgets to switch back, the job can end up in `root`'s crontab instead of the intended application user's (or vice versa), causing file permission mismatches at runtime.

Check: `crontab -l -u <user>`, and system logs `/var/log/cron` or `journalctl -u cron`/`journalctl -u crond` to see whether cron even triggered the job (distinguishing "job never ran" from "job ran but failed").

**6. Improperly escaping `%` in the crontab** — the `%` character has special meaning in a cron command line (newline, used as stdin for the command); if a script needs a literal `%` (e.g. in `date +\%Y\%m\%d`) and it's not escaped as `\%`, cron will misinterpret the command.

**Standard debugging workflow**:
```bash
# 1. Check whether cron even fired on schedule
grep CRON /var/log/syslog   # or journalctl -u cron

# 2. Test by simulating cron's minimal environment
env -i PATH=/usr/bin:/bin HOME=/home/user /bin/sh /opt/app/script.sh

# 3. Always log a timestamp + exit code to know when the job ran and what happened
0 2 * * * /opt/app/script.sh >> /var/log/myscript.log 2>&1; echo "Exit: $?" >> /var/log/myscript.log
```
