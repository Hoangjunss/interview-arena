---
id: prisma-voi-nestjs-setup-va-so-sanh-voi-typeorm
position: backend
technology: database-\u0026-orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prisma với NestJS — setup và so sánh với TypeORM?

## Question (EN)
Prisma with NestJS — setup and comparison with TypeORM?

## Đáp án chi tiết (VI)
Prisma là ORM thế hệ mới với type-safety chặt, ngày càng được ưa dùng thay TypeORM. Schema định nghĩa trong `prisma/schema.prisma` với cú pháp riêng, `prisma generate` tạo Prisma Client type-safe hoàn toàn.\
\
Setup NestJS: tạo `PrismaService` extends `PrismaClient` implements `OnModuleInit`, gọi `this.$connect()` trong `onModuleInit()`. Wrap trong `@Global() @Module()` để dùng toàn app. Prisma Client API rất fluent: `prisma.user.findMany({ include, where, orderBy })`, `prisma.user.create({ data })`, transactions với `prisma.$transaction([])`.\
\
So sánh Prisma vs TypeORM: Prisma có type-safety chặt (auto-generated types từ schema), `prisma migrate dev` rõ ràng an toàn hơn `synchronize: true` của TypeORM. TypeORM quen thuộc với Java/Spring developers, hỗ trợ Active Record pattern. Prisma không hỗ trợ MongoDB aggregation pipeline tốt bằng Mongoose. Hiện tại Prisma được cộng đồng ưa chuộng hơn cho dự án mới.

## Detailed Answer (EN)
Prisma is a next-generation ORM with excellent type-safety, increasingly preferred over TypeORM. The schema is defined in `prisma/schema.prisma` with its own syntax, and `prisma generate` creates a fully type-safe Prisma Client.\
\
NestJS setup: create a `PrismaService` extending `PrismaClient` implementing `OnModuleInit`, calling `this.$connect()` in `onModuleInit()`. Wrap in a `@Global() @Module()` for app-wide use. Prisma Client API is fluent: `prisma.user.findMany({ include, where, orderBy })`, `prisma.user.create({ data })`, transactions with `prisma.$transaction([])`.\
\
Prisma vs TypeORM: Prisma has excellent type-safety (auto-generated types from schema), `prisma migrate dev` is safer than TypeORM's `synchronize: true`. TypeORM is familiar to Java/Spring developers and supports Active Record pattern. Prisma handles MongoDB aggregation pipelines less well than Mongoose. Prisma is currently the community preference for new projects.
