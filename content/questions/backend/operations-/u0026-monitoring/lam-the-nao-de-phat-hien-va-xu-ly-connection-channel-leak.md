---
id: lam-the-nao-de-phat-hien-va-xu-ly-connection-channel-leak
position: backend
technology: operations-\u0026-monitoring
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để phát hiện và xử lý connection/channel leak?

## Question (EN)
How do you handle connection and channel leaks in RabbitMQ?

## Đáp án chi tiết (VI)
Connection leak xảy ra khi ứng dụng mở connection mà không đóng (phổ biến trong framework có connection pool). Channel leak tương tự. Triệu chứng: số connection/channel tăng dần, cạn kiệt file handle, connection mới bị reject. Phòng ngừa: (1) Dùng connection pooling; (2) Dùng try-finally hoặc try-with-resources để đảm bảo gọi close(); (3) Monitor và alert khi count tăng; (4) Set heartbeat timeout để phát hiện dead connection; (5) Giới hạn connection per application. Debug bằng management UI xem IP/user nào đang leak.

## Detailed Answer (EN)
Connection leaks occur when apps open connections without closing them. Symptoms: growing connection/channel count, exhausted file handles, new connections rejected. Prevention: use connection pooling, try-finally for guaranteed close(), monitor and alert on growing counts, set heartbeat timeout to detect dead connections, implement per-app connection limits. Debug by checking which IP/user is leaking in the management UI.
