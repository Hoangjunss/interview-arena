---
id: websocket-trong-fastapi-khac-http-endpoint-the-nao
position: backend
technology: core
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WebSocket trong FastAPI khác HTTP endpoint thế nào?

## Question (EN)
How are WebSockets in FastAPI different from HTTP endpoints?

## Đáp án chi tiết (VI)
WebSocket giữ kết nối lâu dài hai chiều, phù hợp chat, collaboration, realtime dashboard hoặc stream trạng thái. HTTP endpoint là request/response ngắn hạn.\
\
Ví dụ cơ bản:\
```python\
@app.websocket(\\"/ws\\")\
async def websocket_endpoint(ws: WebSocket):\
    await ws.accept()\
    while True:\
        message = await ws.receive_text()\
        await ws.send_text(message)\
```\
Production cần authentication khi connect, heartbeat, giới hạn connection, backpressure, broadcast layer như Redis pub/sub và cleanup khi disconnect.

## Detailed Answer (EN)
A WebSocket keeps a long-lived bidirectional connection, fitting chat, collaboration, realtime dashboards or status streams. An HTTP endpoint is short-lived request/response.\
\
Basic example:\
```python\
@app.websocket(\\"/ws\\")\
async def websocket_endpoint(ws: WebSocket):\
    await ws.accept()\
    while True:\
        message = await ws.receive_text()\
        await ws.send_text(message)\
```\
Production needs authentication during connect, heartbeat, connection limits, backpressure, a broadcast layer such as Redis pub/sub and cleanup on disconnect.
