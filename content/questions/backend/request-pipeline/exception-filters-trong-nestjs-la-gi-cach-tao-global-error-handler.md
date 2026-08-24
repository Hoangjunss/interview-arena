---
id: exception-filters-trong-nestjs-la-gi-cach-tao-global-error-handler
position: backend
technology: request-pipeline
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Exception Filters trong NestJS là gì? Cách tạo global error handler.

## Question (EN)
What are Exception Filters in NestJS? How to create a global error handler.

## Đáp án chi tiết (VI)
Exception Filters bắt các exceptions được throw trong ứng dụng và format response lỗi. NestJS có built-in filter xử lý `HttpException` và các subclass của nó. Nếu exception không phải `HttpException`, NestJS trả về 500 Internal Server Error mặc định.\
\
Custom global filter implement `ExceptionFilter` với method `catch(exception, host)`. `host.switchToHttp()` lấy req/res. Trong filter có thể check `instanceof HttpException` để lấy status code, log lỗi, format response chuẩn với `statusCode`, `message`, `timestamp`, `path`.\
\
Built-in HTTP exceptions: `NotFoundException`, `BadRequestException`, `UnauthorizedException`, `ForbiddenException`, `ConflictException`, `InternalServerErrorException`... Đăng ký global qua `app.useGlobalFilters()` hoặc preferred là `{ provide: APP_FILTER, useClass: ... }` để hỗ trợ DI.

## Detailed Answer (EN)
Exception Filters catch exceptions thrown in the application and format error responses. NestJS has a built-in filter that handles `HttpException` and its subclasses. If an exception is not an `HttpException`, NestJS returns a 500 Internal Server Error by default.\
\
A custom global filter implements `ExceptionFilter` with a `catch(exception, host)` method. `host.switchToHttp()` provides access to req/res. Inside the filter you can check `instanceof HttpException` to get the status code, log the error, and format a standard response with `statusCode`, `message`, `timestamp`, `path`.\
\
Built-in HTTP exceptions: `NotFoundException`, `BadRequestException`, `UnauthorizedException`, `ForbiddenException`, `ConflictException`, `InternalServerErrorException`... Register globally via `app.useGlobalFilters()` or preferably `{ provide: APP_FILTER, useClass: ... }` to support DI.
