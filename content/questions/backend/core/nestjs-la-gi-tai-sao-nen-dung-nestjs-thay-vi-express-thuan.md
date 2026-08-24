---
id: nestjs-la-gi-tai-sao-nen-dung-nestjs-thay-vi-express-thuan
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
NestJS là gì? Tại sao nên dùng NestJS thay vì Express thuần?

## Question (EN)
What is NestJS? Why use NestJS instead of plain Express?

## Đáp án chi tiết (VI)
NestJS là framework Node.js xây dựng trên TypeScript, lấy cảm hứng từ Angular. Nó cung cấp kiến trúc module rõ ràng với `@Module()`, `@Controller()`, `@Injectable()` và Dependency Injection tích hợp sẵn.\
\
Lý do chọn NestJS thay Express thuần: kiến trúc có cấu trúc (Modules/Controllers/Services phân tách rõ ràng), TypeScript-first với decorators và metadata reflection, IoC container tích hợp dễ test, hỗ trợ Microservices/GraphQL/WebSockets/gRPC. NestJS vẫn chạy trên Express (hoặc Fastify) bên dưới, nhưng thêm lớp abstraction giúp code dễ maintain và scale hơn.

## Detailed Answer (EN)
NestJS is a Node.js framework built on TypeScript, inspired by Angular. It provides a clear modular architecture with `@Module()`, `@Controller()`, `@Injectable()` and built-in Dependency Injection.\
\
Reasons to choose NestJS over plain Express: structured architecture (Modules/Controllers/Services clearly separated), TypeScript-first with decorators and metadata reflection, built-in IoC container for easy testing, supports Microservices/GraphQL/WebSockets/gRPC. NestJS still runs on Express (or Fastify) under the hood, but adds an abstraction layer that makes code easier to maintain and scale.
