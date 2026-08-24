---
id: systemd-la-gi-dung-de-lam-gi
position: backend
technology: linux
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
systemd là gì? Dùng để làm gì?

## Question (EN)
What is systemd and what is it used for?

## Đáp án chi tiết (VI)
systemd là **init system và service manager** của đa số Linux hiện đại — process **PID 1** khởi động khi boot và quản lý các dịch vụ nền (daemon) suốt vòng đời hệ thống.\
\
- **Unit**: đơn vị quản lý; loại phổ biến là **`.service`** (một dịch vụ), ngoài ra `.socket`, `.timer`, `.mount`, `.target`.\
- **`systemctl`**: điều khiển — `start`, `stop`, `restart`, `enable` (bật khi boot), `status`.\
- **`journalctl`**: xem log tập trung của các service.\
- Tính năng: khởi động **song song** (nhanh hơn init cũ), **tự restart** service khi chết, quản lý dependency giữa unit.\
- **`.timer`**: thay thế hiện đại cho cron, tích hợp logging + dependency.\
\
Hình dung: systemd là \\"nhạc trưởng\\" quyết định cái gì chạy, theo thứ tự nào, và giữ cho dịch vụ luôn sống.

## Detailed Answer (EN)
systemd is the **init system and service manager** on most modern Linux — the **PID 1** process that starts at boot and manages background services (daemons) throughout the system lifecycle.\
\
- **Unit**: the managed unit; the common type is **`.service`** (a service), plus `.socket`, `.timer`, `.mount`, `.target`.\
- **`systemctl`**: controls them — `start`, `stop`, `restart`, `enable` (start at boot), `status`.\
- **`journalctl`**: views centralized service logs.\
- Features: **parallel** startup (faster than the old init), **auto-restart** of dead services, and dependency management between units.\
- **`.timer`**: a modern replacement for cron, integrated with logging + dependencies.\
\
Analogy: systemd is the \\"conductor\\" deciding what runs, in what order, and keeping services alive.
