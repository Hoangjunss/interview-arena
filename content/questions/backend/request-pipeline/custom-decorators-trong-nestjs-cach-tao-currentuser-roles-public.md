---
id: custom-decorators-trong-nestjs-cach-tao-currentuser-roles-public
position: backend
technology: request-pipeline
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom Decorators trong NestJS — cách tạo @CurrentUser, @Roles, @Public?

## Question (EN)
Custom Decorators in NestJS — how to create @CurrentUser, @Roles, @Public?

## Đáp án chi tiết (VI)
Custom Decorators giúp code sạch hơn và tái sử dụng được. NestJS cung cấp `createParamDecorator` cho param decorators và `SetMetadata` để đính kèm metadata.\
\
`@CurrentUser`: dùng `createParamDecorator((data, ctx) =\u003e ctx.switchToHttp().getRequest().user)`. Có thể nhận tham số để extract field cụ thể: `@CurrentUser('email')` trả về `user.email`, `@CurrentUser()` trả về toàn bộ user object. Dùng trong controller thay vì `@Request() req` rồi `req.user`.\
\
`@Roles(...roles)`: dùng `SetMetadata('roles', roles)` để đính kèm metadata. `RolesGuard` implement `CanActivate`, dùng `Reflector.getAllAndOverride()` để đọc required roles từ handler và class, so sánh với `request.user.role`.\
\
`@Public()`: `SetMetadata(IS_PUBLIC_KEY, true)`, đọc trong `JwtAuthGuard` — nếu `isPublic === true` thì return true ngay mà không verify token. Pattern này cho phép global guard nhưng vẫn có public routes.

## Detailed Answer (EN)
Custom Decorators make code cleaner and reusable. NestJS provides `createParamDecorator` for param decorators and `SetMetadata` to attach metadata.\
\
`@CurrentUser`: use `createParamDecorator((data, ctx) =\u003e ctx.switchToHttp().getRequest().user)`. It can accept a parameter to extract a specific field: `@CurrentUser('email')` returns `user.email`, `@CurrentUser()` returns the full user object. Use this in controllers instead of `@Request() req` and then `req.user`.\
\
`@Roles(...roles)`: use `SetMetadata('roles', roles)` to attach metadata. `RolesGuard` implements `CanActivate`, using `Reflector.getAllAndOverride()` to read required roles from the handler and class, then comparing with `request.user.role`.\
\
`@Public()`: `SetMetadata(IS_PUBLIC_KEY, true)`, read in `JwtAuthGuard` — if `isPublic === true` return true immediately without verifying token. This pattern allows a global guard while still supporting public routes.
