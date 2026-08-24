---
id: guards-trong-nestjs-la-gi-cach-implement-jwt-auth-guard
position: backend
technology: request-pipeline
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Guards trong NestJS là gì? Cách implement JWT Auth Guard?

## Question (EN)
What are Guards in NestJS? How to implement a JWT Auth Guard?

## Đáp án chi tiết (VI)
Guards quyết định request có được phép đi tiếp không (authorization). Khác với Middleware, Guards implement interface `CanActivate` và có access vào `ExecutionContext` — biết được handler nào sẽ được gọi, rất hữu ích cho role-based access control.\
\
JWT Auth Guard hoạt động: extract Bearer token từ header `Authorization`, verify token bằng `JwtService.verify()`, nếu hợp lệ attach payload vào `request.user` và trả về `true`, ngược lại throw `UnauthorizedException`. Guards có thể áp dụng với `@UseGuards()` ở mức route, controller, hoặc global qua `APP_GUARD` provider.\
\
Public decorator pattern: dùng `SetMetadata('isPublic', true)` với `@Public()` decorator, trong guard đọc metadata qua `Reflector` để bỏ qua authentication cho các route công khai.

## Detailed Answer (EN)
Guards decide whether a request should proceed (authorization). Unlike Middleware, Guards implement the `CanActivate` interface and have access to `ExecutionContext` — knowing which handler will be called, making them ideal for role-based access control.\
\
JWT Auth Guard works by: extracting the Bearer token from the `Authorization` header, verifying it with `JwtService.verify()`, if valid attaching the payload to `request.user` and returning `true`, otherwise throwing `UnauthorizedException`. Guards can be applied with `@UseGuards()` at route, controller, or globally via the `APP_GUARD` provider.\
\
Public decorator pattern: use `SetMetadata('isPublic', true)` with a `@Public()` decorator, then in the guard read metadata via `Reflector` to skip authentication for public routes.
