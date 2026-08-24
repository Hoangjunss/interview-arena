---
id: websocket-trong-fastapi-implement-the-nao
position: backend
technology: fastapi
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WebSocket trong FastAPI — implement thế nào?

## Question (EN)
How do you implement WebSockets in FastAPI?

## Đáp án chi tiết (VI)
WebSocket cho phép two-way real-time communication.\
```python\
from fastapi import WebSocket, WebSocketDisconnect\
\
class ConnectionManager:\
    def __init__(self):\
        self.active: list[WebSocket] = []\
\
    async def connect(self, ws: WebSocket):\
        await ws.accept(); self.active.append(ws)\
\
    def disconnect(self, ws: WebSocket):\
        self.active.remove(ws)\
\
    async def broadcast(self, msg: str):\
        for ws in self.active:\
            await ws.send_text(msg)\
\
manager = ConnectionManager()\
\
@app.websocket(\\"/ws/{client_id}\\")\
async def ws_endpoint(ws: WebSocket, client_id: str):\
    await manager.connect(ws)\
    try:\
        while True:\
            data = await ws.receive_text()\
            await manager.broadcast(f\\"{client_id}: {data}\\")\
    except WebSocketDisconnect:\
        manager.disconnect(ws)\
```

## Detailed Answer (EN)
```python\
@app.websocket(\\"/ws\\")\
async def ws_endpoint(ws: WebSocket):\
    await ws.accept()\
    try:\
        while True:\
            data = await ws.receive_text()\
            await ws.send_text(f\\"Echo: {data}\\")\
    except WebSocketDisconnect:\
        pass\
```
