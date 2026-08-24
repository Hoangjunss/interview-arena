---
id: websocket-khac-gi-so-voi-http-thong-thuong-khi-nao-nen-dung-websocket
position: backend
technology: osi-\u0026-tcp-ip
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WebSocket khác gì so với HTTP thông thường? Khi nào nên dùng WebSocket?

## Question (EN)
How does WebSocket differ from regular HTTP? When should you use WebSocket?

## Đáp án chi tiết (VI)
HTTP là request-response: client luôn phải khởi tạo request trước, server không thể chủ động push data. WebSocket là full-duplex persistent connection: sau khi upgrade từ HTTP (101 Switching Protocols), cả client và server có thể gửi message bất kỳ lúc nào với latency rất thấp (không cần header HTTP cho mỗi message).\
\
WebSocket phù hợp cho: real-time chat, live notifications, collaborative editing (Google Docs), live trading/stock prices, game online, live dashboard.\
\
Không nên dùng WebSocket khi: data không cần real-time (dùng REST polling hoặc Server-Sent Events thay thế), hoặc khi cần cache/CDN (WebSocket không cache được). Thực tế scaling: WebSocket cần sticky sessions hoặc pub/sub broker (Redis Pub/Sub, Socket.IO adapter) khi có nhiều server instance.

## Detailed Answer (EN)
HTTP is request-response: the client always initiates a request and the server cannot push data proactively. WebSocket is a full-duplex, persistent connection: after upgrading from HTTP (101 Switching Protocols), both client and server can send messages at any time with very low latency (no HTTP headers per message).\
\
WebSocket is well-suited for: real-time chat, live notifications, collaborative editing (e.g., Google Docs), live trading/stock prices, online games, and live dashboards.\
\
Avoid WebSocket when data does not need to be real-time (use REST polling or Server-Sent Events instead), or when caching via a CDN is required (WebSocket connections cannot be cached). Scaling consideration: WebSocket requires sticky sessions or a pub/sub broker (Redis Pub/Sub, Socket.IO adapter) when running multiple server instances.
