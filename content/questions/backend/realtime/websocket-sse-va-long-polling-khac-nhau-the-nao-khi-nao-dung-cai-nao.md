---
id: websocket-sse-va-long-polling-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: realtime
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WebSocket, SSE và long-polling khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
WebSocket vs SSE vs long-polling — how do they differ and when to use each?

## Đáp án chi tiết (VI)
Cả ba giải bài toán server đẩy dữ liệu về client mà không đợi client hỏi liên tục.\
\
- **Long-polling**: client gửi request, server **giữ mở** tới khi có dữ liệu rồi trả về; client lập tức gọi lại. Chạy trên HTTP thường, tương thích rộng, nhưng tốn kết nối và có độ trễ.\
- **SSE (Server-Sent Events)**: kênh **một chiều** server → client trên một kết nối HTTP giữ mở; text-only, **tự reconnect**, nhẹ. Hợp feed/thông báo/log realtime.\
- **WebSocket**: kênh **song công (hai chiều)** trên một kết nối TCP nâng cấp từ HTTP. Độ trễ thấp, hợp chat, game, collaboration. Đổi lại: cần hạ tầng riêng, không dùng cache/HTTP semantics.

## Detailed Answer (EN)
All three let the server push data without the client constantly asking.\
\
- **Long-polling**: the client sends a request, the server **holds it open** until data exists, then responds; the client immediately re-requests. Works over plain HTTP, widely compatible, but connection-heavy and adds latency.\
- **SSE (Server-Sent Events)**: a **one-way** server → client channel over one held-open HTTP connection; text-only, **auto-reconnects**, lightweight. Fits feeds/notifications/live logs.\
- **WebSocket**: a **full-duplex (two-way)** channel over one TCP connection upgraded from HTTP. Low latency, fits chat, games, collaboration. Costs: needs dedicated infra and drops HTTP caching/semantics.
