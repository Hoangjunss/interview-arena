---
id: real-time-websocket-sse-va-long-polling-khac-nhau-ra-sao
position: system-design
technology: real-time
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Real-time: WebSocket, SSE và long polling khác nhau ra sao?

## Question (EN)
For real-time: how do WebSocket, SSE and long polling differ?

## Đáp án chi tiết (VI)
Ba cách đẩy dữ liệu gần thời gian thực từ server về client:\
\
- **(Long) polling**: client hỏi lặp lại. Short polling gọi định kỳ (lãng phí); **long polling** giữ request mở tới khi có dữ liệu rồi mở lại. Đơn giản, chạy mọi nơi, nhưng tốn kết nối và có độ trễ.\
- **SSE (Server-Sent Events)**: kênh **một chiều** server→client trên một kết nối HTTP dài, tự reconnect, dạng text. Nhẹ, hợp **feed/thông báo/streaming một chiều** (ví dụ token của LLM), nhưng không gửi ngược lên bằng cùng kênh.\
- **WebSocket**: kênh **song công (hai chiều)**, độ trễ thấp, hợp **chat, game, collaborative editing**. Mạnh nhất nhưng là giao thức riêng (không phải HTTP request/response), khó cache/scale hơn, cần quản lý kết nối bền.\
\
Chọn: một chiều nhẹ → SSE; hai chiều tương tác cao → WebSocket; môi trường hạn chế → long polling làm fallback.

## Detailed Answer (EN)
Three ways to push near-real-time data from server to client:\
\
- **(Long) polling**: the client asks repeatedly. Short polling calls periodically (wasteful); **long polling** holds the request open until data arrives, then reopens. Simple and works everywhere, but connection-heavy and latent.\
- **SSE (Server-Sent Events)**: a **one-way** server→client channel over a long-lived HTTP connection, auto-reconnecting, text-based. Lightweight, fits **feeds/notifications/one-way streaming** (e.g. LLM tokens), but cannot send back on the same channel.\
- **WebSocket**: a **full-duplex (two-way)** low-latency channel, fits **chat, games, collaborative editing**. The most capable but a separate protocol (not HTTP request/response), harder to cache/scale, and needs persistent-connection management.\
\
Choose: lightweight one-way → SSE; interactive two-way → WebSocket; constrained environments → long polling as a fallback.
