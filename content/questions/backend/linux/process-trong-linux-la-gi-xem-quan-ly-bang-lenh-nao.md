---
id: process-trong-linux-la-gi-xem-quan-ly-bang-lenh-nao
position: backend
technology: linux
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Process trong Linux là gì? Xem/quản lý bằng lệnh nào?

## Question (EN)
What is a process in Linux, and how do you inspect/manage it?

## Đáp án chi tiết (VI)
Process là **một chương trình đang chạy**, có **PID** riêng, không gian bộ nhớ riêng, và một tiến trình cha (PPID). Process đầu tiên là `init`/`systemd` (PID 1), mọi process khác là con cháu của nó.\
\
- **Trạng thái**: running, sleeping, stopped, **zombie** (đã kết thúc nhưng cha chưa thu nhận exit code).\
- **Xem**: `ps aux`, `top`/`htop` (thời gian thực), `pgrep`.\
- **Foreground vs background**: thêm `\u0026` để chạy nền; `jobs`, `fg`, `bg` quản lý; `nohup`/`disown` cho chạy tiếp sau khi thoát shell.\
- **Kết thúc**: `kill \u003cPID\u003e` (gửi signal).\
\
Process khác **thread**: thread là luồng thực thi **trong** một process, dùng chung bộ nhớ; process cô lập bộ nhớ với nhau.

## Detailed Answer (EN)
A process is **a running program** with its own **PID**, memory space, and a parent (PPID). The first process is `init`/`systemd` (PID 1), and every other process descends from it.\
\
- **States**: running, sleeping, stopped, **zombie** (finished but the parent has not reaped its exit code).\
- **Inspect**: `ps aux`, `top`/`htop` (real time), `pgrep`.\
- **Foreground vs background**: append `\u0026` to run in the background; `jobs`, `fg`, `bg` manage them; `nohup`/`disown` keep them running after the shell exits.\
- **Terminate**: `kill \u003cPID\u003e` (sends a signal).\
\
A process differs from a **thread**: a thread is an execution flow **within** a process sharing its memory; processes have isolated memory.
