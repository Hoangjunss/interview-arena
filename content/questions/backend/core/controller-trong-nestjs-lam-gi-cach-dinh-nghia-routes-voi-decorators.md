---
id: controller-trong-nestjs-lam-gi-cach-dinh-nghia-routes-voi-decorators
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Controller trong NestJS làm gì? Cách định nghĩa routes với decorators?

## Question (EN)
What does a Controller do in NestJS? How to define routes with decorators?

## Đáp án chi tiết (VI)
Controller chịu trách nhiệm nhận HTTP requests và trả về responses. Controller map routes đến handler methods thông qua decorators.\
\
`@Controller('users')` đặt base route `/users`. Các HTTP method decorators: `@Get()`, `@Post()`, `@Patch()`, `@Put()`, `@Delete()`. Có thể thêm path vào decorator như `@Get(':id')` để tạo route động.\
\
Parameter decorators để extract data từ request: `@Param('id')` lấy route param, `@Query()` lấy query string, `@Body()` lấy request body, `@Headers()` lấy headers, `@Req()` / `@Res()` để access raw request/response (dùng `@Res()` sẽ mất một số tính năng NestJS như interceptors).

## Detailed Answer (EN)
A Controller is responsible for receiving HTTP requests and returning responses. Controllers map routes to handler methods via decorators.\
\
`@Controller('users')` sets the base route `/users`. HTTP method decorators: `@Get()`, `@Post()`, `@Patch()`, `@Put()`, `@Delete()`. You can add a path like `@Get(':id')` for dynamic routes.\
\
Parameter decorators to extract data from requests: `@Param('id')` gets route param, `@Query()` gets query string, `@Body()` gets request body, `@Headers()` gets headers, `@Req()` / `@Res()` accesses raw request/response (using `@Res()` bypasses some NestJS features like interceptors).
