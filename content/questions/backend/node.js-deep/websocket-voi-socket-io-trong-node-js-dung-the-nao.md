---
id: websocket-voi-socket-io-trong-node-js-dung-the-nao
position: backend
technology: node.js-deep
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Websocket với Socket.io trong Node.js dùng thế nào?

## Question (EN)
How do you use WebSockets with Socket.io in Node.js?

## Đáp án chi tiết (VI)
Socket.io wraps WebSocket với automatic reconnection, rooms, và namespace support.\
\
```js\
// Server\
const io = new Server(httpServer);\
io.on('connection', socket =\u003e {\
  socket.on('message', data =\u003e { io.emit('message', data); });\
});\
// Client\
const socket = io('http://localhost:3000');\
socket.emit('message', 'hello');\
```\
\
Rooms cho group chat, namespaces cho tách concerns. Reconnection tự động.

## Detailed Answer (EN)
Server: `const io = new Server(httpServer); io.on('connection', socket =\u003e { socket.on('message', data =\u003e { io.emit('message', data); }); });` Client: `const socket = io('http://localhost:3000'); socket.emit('message', 'hello');` Use rooms for group chat and namespaces to separate concerns. Socket.io includes automatic reconnection.
