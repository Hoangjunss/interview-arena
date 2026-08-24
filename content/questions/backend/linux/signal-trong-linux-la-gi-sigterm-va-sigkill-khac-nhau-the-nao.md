---
id: signal-trong-linux-la-gi-sigterm-va-sigkill-khac-nhau-the-nao
position: backend
technology: linux
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Signal trong Linux là gì? SIGTERM và SIGKILL khác nhau thế nào?

## Question (EN)
What are Linux signals, and how do SIGTERM and SIGKILL differ?

## Đáp án chi tiết (VI)
Signal là **thông báo bất đồng bộ** gửi tới process để yêu cầu nó phản ứng — cơ chế IPC đơn giản của OS. Gửi bằng `kill -SIGNAL \u003cPID\u003e`.\
\
Hay gặp:\
- **SIGTERM (15)** — mặc định của `kill`: yêu cầu **kết thúc lịch sự**. Process **có thể bắt** để dọn dẹp (đóng kết nối, flush, lưu state) rồi thoát. Đây là \\"graceful shutdown\\".\
- **SIGKILL (9)**: **buộc chết ngay**, **không thể bắt hay bỏ qua**, không kịp dọn dẹp. Chỉ dùng khi process treo, không phản hồi SIGTERM.\
- **SIGINT (2)**: Ctrl+C.\
- **SIGHUP (1)**: mất terminal; nhiều daemon dùng để **reload config**.\
- **SIGSTOP/SIGCONT**: tạm dừng/tiếp tục.\
\
Thực hành đúng: gửi **SIGTERM trước**, chờ; chỉ **SIGKILL** khi bắt buộc. Container: `docker stop` gửi SIGTERM rồi mới SIGKILL sau timeout.

## Detailed Answer (EN)
A signal is an **asynchronous notification** sent to a process to prompt a reaction — a simple OS IPC mechanism. Send with `kill -SIGNAL \u003cPID\u003e`.\
\
Common ones:\
- **SIGTERM (15)** — the default of `kill`: asks for a **graceful termination**. The process **can catch** it to clean up (close connections, flush, save state) then exit. This is a graceful shutdown.\
- **SIGKILL (9)**: **forces immediate death**, **cannot be caught or ignored**, no cleanup. Use only when a process hangs and ignores SIGTERM.\
- **SIGINT (2)**: Ctrl+C.\
- **SIGHUP (1)**: terminal hangup; many daemons use it to **reload config**.\
- **SIGSTOP/SIGCONT**: pause/resume.\
\
Good practice: send **SIGTERM first**, wait, and only **SIGKILL** if necessary. Containers: `docker stop` sends SIGTERM, then SIGKILL after a timeout.
