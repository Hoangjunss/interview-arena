---
id: tcp-va-udp-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: transport
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TCP và UDP khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do TCP and UDP differ, and when do you use each?

## Đáp án chi tiết (VI)
Cả hai là giao thức tầng transport, nhưng đánh đổi khác nhau giữa **độ tin cậy** và **tốc độ**.\
\
- **TCP** — **hướng kết nối, tin cậy**: bắt tay 3 bước, **đảm bảo đến nơi, đúng thứ tự**, có kiểm soát lỗi, retransmit, flow control và congestion control. Chi phí cao hơn, độ trễ lớn hơn. Dùng khi **không được mất dữ liệu**: HTTP/HTTPS, email, SSH, truyền file.\
- **UDP** — **không kết nối, không đảm bảo**: gửi datagram \\"bắn và quên\\

## Detailed Answer (EN)
Both are transport-layer protocols, but they trade off **reliability** vs **speed** differently.\
\
- **TCP** — **connection-oriented, reliable**: a 3-way handshake, **guaranteed, in-order delivery**, with error checking, retransmission, flow control and congestion control. Higher overhead and latency. Use when **data loss is unacceptable**: HTTP/HTTPS, email, SSH, file transfer.\
- **UDP** — **connectionless, best-effort**: fire-and-forget datagrams, no retransmission, no ordering guarantee → **fast, low latency, small overhead**. Use when **speed matters more than occasional loss**: video/voice calls, real-time games, DNS, streaming.\
\
QUIC (the basis of HTTP/3) is a user-space transport protocol on top of UDP that implements its own reliability, ordering and congestion control.
