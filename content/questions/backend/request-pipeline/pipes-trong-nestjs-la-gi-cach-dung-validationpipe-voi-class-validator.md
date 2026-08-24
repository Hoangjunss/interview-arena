---
id: pipes-trong-nestjs-la-gi-cach-dung-validationpipe-voi-class-validator
position: backend
technology: request-pipeline
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pipes trong NestJS là gì? Cách dùng ValidationPipe với class-validator?

## Question (EN)
What are Pipes in NestJS? How to use ValidationPipe with class-validator?

## Đáp án chi tiết (VI)
Pipes có hai use-case chính: validation (throw exception nếu data không hợp lệ) và transformation (chuyển đổi input sang dạng mong muốn). Pipes implement interface `PipeTransform` với method `transform(value, metadata)`.\
\
`ValidationPipe` của NestJS kết hợp với `class-validator` để validate DTO tự động. Cấu hình quan trọng: `whitelist: true` loại bỏ các properties không khai báo trong DTO, `forbidNonWhitelisted: true` throw error thay vì strip, `transform: true` tự động chuyển đổi type (string sang number), `enableImplicitConversion: true` convert dựa trên TypeScript type.\
\
DTO dùng decorators từ `class-validator` như `@IsString()`, `@IsEmail()`, `@MinLength()`, `@IsOptional()`, `@IsEnum()`. `class-transformer` cung cấp `@Transform()` để biến đổi giá trị trước khi validate. Pipe global đăng ký qua `app.useGlobalPipes()` hoặc `APP_PIPE` provider.

## Detailed Answer (EN)
Pipes have two main use cases: validation (throw exception if data is invalid) and transformation (convert input to the desired type). Pipes implement the `PipeTransform` interface with a `transform(value, metadata)` method.\
\
NestJS's `ValidationPipe` combined with `class-validator` automatically validates DTOs. Key options: `whitelist: true` removes undeclared properties, `forbidNonWhitelisted: true` throws an error instead of stripping, `transform: true` auto-converts types (string to number), `enableImplicitConversion: true` converts based on TypeScript types.\
\
DTOs use decorators from `class-validator` like `@IsString()`, `@IsEmail()`, `@MinLength()`, `@IsOptional()`, `@IsEnum()`. `class-transformer` provides `@Transform()` to mutate values before validation. Global pipes are registered via `app.useGlobalPipes()` or the `APP_PIPE` provider.
