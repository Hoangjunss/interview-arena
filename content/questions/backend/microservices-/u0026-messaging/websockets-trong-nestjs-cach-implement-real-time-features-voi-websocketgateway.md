---
id: websockets-trong-nestjs-cach-implement-real-time-features-voi-websocketgateway
position: backend
technology: microservices-\u0026-messaging
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
WebSockets trong NestJS — cách implement real-time features với @WebSocketGateway?

## Question (EN)
WebSockets in NestJS — how to implement real-time features with @WebSocketGateway?

## Đáp án chi tiết (VI)
NestJS hỗ trợ WebSockets qua `@WebSocketGateway()` decorator, tích hợp với socket.io hoặc ws. Gateway là class đặc biệt giống Controller nhưng xử lý WebSocket events.\
\
Gateway implement 3 interfaces: `OnGatewayInit` (sau khi khởi tạo), `OnGatewayConnection` (client connect), `OnGatewayDisconnect` (client disconnect). `@WebSocketServer()` inject server instance. `@SubscribeMessage('event')` handle event từ client, tương tự `@Get()` trong controller. `@MessageBody()` và `@ConnectedSocket()` là param decorators cho WS.\
\
Broadcast: `this.server.emit()` gửi cho tất cả, `this.server.to(room).emit()` gửi cho room, `client.to(room).emit()` gửi cho room trừ sender. Guards và Interceptors hoạt động với WS Gateway giống HTTP. Namespace với `namespace: '/chat'` trong decorator options để tách biệt connections.

## Detailed Answer (EN)
NestJS supports WebSockets via the `@WebSocketGateway()` decorator, integrating with socket.io or ws. A Gateway is a special class similar to a Controller but handling WebSocket events.\
\
Gateways implement 3 interfaces: `OnGatewayInit` (after initialization), `OnGatewayConnection` (client connects), `OnGatewayDisconnect` (client disconnects). `@WebSocketServer()` injects the server instance. `@SubscribeMessage('event')` handles events from clients, similar to `@Get()` in controllers. `@MessageBody()` and `@ConnectedSocket()` are param decorators for WebSockets.\
\
Broadcasting: `this.server.emit()` sends to all, `this.server.to(room).emit()` sends to a room, `client.to(room).emit()` sends to a room excluding the sender. Guards and Interceptors work the same on WS Gateways as on HTTP. Use `namespace: '/chat'` in decorator options to separate connections.
