---
id: sse-khac-websocket-trong-fastapi-nhu-the-nao
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SSE khác WebSocket trong FastAPI như thế nào?

## Question (EN)
How is SSE different from WebSocket in FastAPI?

## Đáp án chi tiết (VI)
SSE là stream một chiều từ server tới client qua HTTP, tự reconnect tốt trong browser và phù hợp notification, progress, AI token stream hoặc dashboard chỉ cần server push. WebSocket hai chiều và phù hợp khi client/server đều gửi liên tục.\
\
Nếu chỉ cần server push text events, SSE đơn giản hơn WebSocket và dễ đi qua proxy hơn. Nếu cần binary, bidirectional protocol, presence hoặc low-latency interaction hai chiều, dùng WebSocket.

## Detailed Answer (EN)
SSE is one-way server-to-client streaming over HTTP, has good browser reconnection behavior and fits notifications, progress, AI token streams or dashboards that only need server push. WebSocket is bidirectional and fits when both client and server send continuously.\
\
If you only need server-pushed text events, SSE is simpler than WebSocket and often easier through proxies. If you need binary data, bidirectional protocol, presence or low-latency two-way interaction, use WebSocket.
