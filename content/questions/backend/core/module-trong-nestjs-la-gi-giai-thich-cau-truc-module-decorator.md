---
id: module-trong-nestjs-la-gi-giai-thich-cau-truc-module-decorator
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module trong NestJS là gì? Giải thích cấu trúc @Module decorator.

## Question (EN)
What is a Module in NestJS? Explain the @Module decorator structure.

## Đáp án chi tiết (VI)
Module là đơn vị tổ chức cơ bản trong NestJS, nhóm các thành phần liên quan lại. Mỗi app có ít nhất một root module (`AppModule`).\
\
`@Module()` nhận một object với 4 thuộc tính: `imports` (modules khác cần dùng), `controllers` (xử lý HTTP requests), `providers` (services, repositories, guards...), và `exports` (providers cho phép modules khác sử dụng). Chỉ những providers được `exports` mới có thể được inject ở module khác.\
\
Các loại module: Feature Module nhóm theo tính năng (`UsersModule`, `AuthModule`), Shared Module export providers để tái sử dụng, Global Module dùng `@Global()` để providers available toàn app không cần import, Dynamic Module cấu hình runtime qua `forRoot()` / `forRootAsync()`.

## Detailed Answer (EN)
A Module is the basic organizational unit in NestJS, grouping related components together. Every app has at least one root module (`AppModule`).\
\
`@Module()` accepts an object with 4 properties: `imports` (other modules needed), `controllers` (handle HTTP requests), `providers` (services, repositories, guards...), and `exports` (providers other modules can use). Only exported providers can be injected in other modules.\
\
Module types: Feature Module groups by feature (`UsersModule`, `AuthModule`), Shared Module exports providers for reuse, Global Module uses `@Global()` so providers are available app-wide without importing, Dynamic Module configures at runtime via `forRoot()` / `forRootAsync()`.
