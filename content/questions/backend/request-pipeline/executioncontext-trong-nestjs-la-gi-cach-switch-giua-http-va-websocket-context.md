---
id: executioncontext-trong-nestjs-la-gi-cach-switch-giua-http-va-websocket-context
position: backend
technology: request-pipeline
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ExecutionContext trong NestJS là gì? Cách switch giữa HTTP và WebSocket context?

## Question (EN)
What is ExecutionContext in NestJS? How to switch between HTTP and WebSocket context?

## Đáp án chi tiết (VI)
`ExecutionContext` extends `ArgumentsHost`, cung cấp thông tin về execution context hiện tại (HTTP, WebSocket, RPC). Guards, Interceptors và Exception Filters đều nhận `ExecutionContext`.\
\
Các methods quan trọng:\
- `getType()`: trả về `'http'` | `'ws'` | `'rpc'`\
- `switchToHttp()`: trả về `HttpArgumentsHost` với `getRequest()`, `getResponse()`\
- `switchToWs()`: trả về `WsArgumentsHost` với `getData()`, `getClient()`\
- `switchToRpc()`: cho microservices\
- `getHandler()`: trả về handler function đang được gọi\
- `getClass()`: trả về controller class\
\
Dùng `getHandler()` và `getClass()` kết hợp `Reflector` để đọc metadata:\
```typescript\
const roles = this.reflector.getAllAndOverride\u003cstring[]\u003e('roles', [\
  context.getHandler(),  // Route-level metadata\
  context.getClass(),    // Controller-level metadata\
]);\
```\
Pattern này cho phép metadata được định nghĩa ở cả route lẫn controller, với route-level ưu tiên hơn.

## Detailed Answer (EN)
`ExecutionContext` extends `ArgumentsHost`, providing info about the current execution context (HTTP, WebSocket, RPC). Guards, Interceptors, and Exception Filters all receive it.\
\
Key methods:\
- `getType()`: returns `'http'` | `'ws'` | `'rpc'`\
- `switchToHttp()`: returns `HttpArgumentsHost` with `getRequest()`, `getResponse()`\
- `getHandler()` + `getClass()` + `Reflector` to read metadata:\
```typescript\
const roles = this.reflector.getAllAndOverride\u003cstring[]\u003e('roles', [\
  context.getHandler(),\
  context.getClass(),\
]);\
```\
Route-level metadata takes priority over controller-level.
