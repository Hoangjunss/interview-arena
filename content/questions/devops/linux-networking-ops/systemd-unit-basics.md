---
id: systemd-unit-basics
position: devops
technology: linux-networking-ops
level: junior
tags: [systemd, process-management, linux]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
systemd unit là gì? Hãy giải thích cấu trúc cơ bản của một file `.service` và cách bật một service chạy cùng hệ thống khi boot.

## Question (EN)
What is a systemd unit? Explain the basic structure of a `.service` file and how to enable a service to start on boot.

## Đáp án chi tiết (VI)
**systemd** là hệ thống init và quản lý dịch vụ mặc định trên hầu hết các distro Linux hiện đại (Ubuntu, CentOS/RHEL 7+, Debian...). Nó thay thế SysV init, chịu trách nhiệm khởi động, dừng, giám sát và quản lý dependency giữa các process (gọi là **unit**).

Có nhiều loại unit: `.service` (dịch vụ), `.socket`, `.timer`, `.mount`, `.target`... Loại phổ biến nhất khi làm ops là `.service`.

Cấu trúc file `/etc/systemd/system/myapp.service`:

```ini
[Unit]
Description=My Application Service
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/node /opt/myapp/server.js
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

Giải thích các phần chính:
- **[Unit]**: metadata và dependency ordering (`After`, `Before`, `Requires`, `Wants`). `After` chỉ định thứ tự khởi động chứ **không** đảm bảo dependency bắt buộc — nếu muốn bắt buộc phải dùng `Requires=`.
- **[Service]**: cách chạy tiến trình.
  - `Type=simple` (mặc định): tiến trình chính chạy foreground, không fork.
  - `Type=forking`: dùng cho daemon tự fork ra background (cần khai báo `PIDFile`).
  - `Type=oneshot`: chạy xong thì thoát (thường dùng cho script setup).
  - `Type=notify`: process báo cho systemd biết khi đã sẵn sàng qua sd_notify.
  - `Restart=on-failure`: tự restart khi process exit với mã lỗi khác 0 — rất quan trọng cho production để tự phục hồi.
  - `LimitNOFILE`: override ulimit file descriptor riêng cho service này (không phụ thuộc `/etc/security/limits.conf`).
- **[Install]**: xác định target nào sẽ kéo unit này vào khi enable (`multi-user.target` ~ runlevel 3 cũ).

Các lệnh thường dùng:

```bash
sudo systemctl daemon-reload        # nạp lại sau khi sửa file unit
sudo systemctl start myapp          # chạy ngay
sudo systemctl enable myapp         # tạo symlink để tự chạy khi boot
sudo systemctl enable --now myapp   # vừa enable vừa start
sudo systemctl status myapp
sudo systemctl restart myapp
journalctl -u myapp -f              # xem log realtime
```

**Điểm dễ nhầm (pitfall)**: `start` chỉ chạy ngay lập tức, không tự chạy lại sau reboot; `enable` chỉ tạo symlink trong `wants/` để được kích hoạt theo target, không chạy ngay. Rất nhiều người quên `daemon-reload` sau khi sửa unit file, dẫn đến systemd vẫn dùng cấu hình cache cũ trong bộ nhớ.

## Detailed Answer (EN)
**systemd** is the default init and service manager on most modern Linux distributions (Ubuntu, CentOS/RHEL 7+, Debian, etc.). It replaces SysV init and is responsible for starting, stopping, supervising, and managing dependencies between processes, represented as **units**.

There are several unit types: `.service`, `.socket`, `.timer`, `.mount`, `.target`, etc. The most common one for ops work is `.service`.

Structure of `/etc/systemd/system/myapp.service`:

```ini
[Unit]
Description=My Application Service
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/node /opt/myapp/server.js
ExecReload=/bin/kill -HUP $MAINPID
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

Key sections:
- **[Unit]**: metadata and dependency ordering (`After`, `Before`, `Requires`, `Wants`). `After` only affects start *order*, it does **not** enforce a hard dependency — use `Requires=` for that.
- **[Service]**: how the process runs.
  - `Type=simple` (default): the main process runs in the foreground without forking.
  - `Type=forking`: for daemons that fork into the background (requires `PIDFile`).
  - `Type=oneshot`: runs to completion and exits (common for setup scripts).
  - `Type=notify`: the process signals readiness to systemd via sd_notify.
  - `Restart=on-failure`: automatically restarts on non-zero exit — critical in production for self-healing.
  - `LimitNOFILE`: overrides the file-descriptor ulimit specifically for this service, independent of `/etc/security/limits.conf`.
- **[Install]**: which target pulls this unit in when enabled (`multi-user.target` is roughly the old runlevel 3).

Common commands:

```bash
sudo systemctl daemon-reload        # reload after editing a unit file
sudo systemctl start myapp          # start now
sudo systemctl enable myapp         # symlink so it starts on boot
sudo systemctl enable --now myapp   # enable and start together
sudo systemctl status myapp
sudo systemctl restart myapp
journalctl -u myapp -f              # follow logs in real time
```

**Common pitfall**: `start` only runs the service now — it will not survive a reboot; `enable` only creates the symlink under `wants/` so it gets pulled in by its target — it does not start it immediately. Many engineers forget `daemon-reload` after editing a unit file, so systemd keeps using the stale cached configuration in memory.
