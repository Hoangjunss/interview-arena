---
id: toi-uu-performance-nestjs-fastify-caching-compression-rate-limiting
position: backend
technology: testing-\u0026-production
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tối ưu performance NestJS: Fastify, Caching, Compression, Rate Limiting?

## Question (EN)
NestJS performance optimization: Fastify, Caching, Compression, Rate Limiting?

## Đáp án chi tiết (VI)
Fastify adapter thay Express: dùng `FastifyAdapter` từ `@nestjs/platform-fastify`, nhanh hơn 2-3x nhờ JSON serialization tối ưu và request/response lifecycle hiệu quả hơn. Nhưng một số middleware Express không tương thích, cần kiểm tra.\
\
Caching: `@nestjs/cache-manager` với Redis store qua `CacheModule.registerAsync()`. `@UseInterceptors(CacheInterceptor)` tự động cache GET responses, `@CacheTTL(seconds)` override TTL cho route cụ thể. Programmatic cache với `CacheManager.get/set/del`.\
\
Compression: `app.use(compression())` giảm response size 60-70% cho text content.\
\
Rate Limiting: `@nestjs/throttler` với `ThrottlerModule.forRoot()` config nhiều tiers (short/long). `APP_GUARD` với `ThrottlerGuard` apply global, `@Throttle()` override cho route cụ thể, `@SkipThrottle()` bỏ qua.\
\
DB connection pooling: TypeORM `extra.max` tăng max connections theo CPU cores. Lazy loading modules với `LazyModuleLoader` cho microservices để giảm startup time.

## Detailed Answer (EN)
Fastify adapter over Express: use `FastifyAdapter` from `@nestjs/platform-fastify`, 2-3x faster due to optimized JSON serialization and request/response lifecycle. However, some Express middleware is incompatible — check before switching.\
\
Caching: `@nestjs/cache-manager` with Redis store via `CacheModule.registerAsync()`. `@UseInterceptors(CacheInterceptor)` automatically caches GET responses, `@CacheTTL(seconds)` overrides TTL for specific routes. Programmatic cache with `CacheManager.get/set/del`.\
\
Compression: `app.use(compression())` reduces response size by 60-70% for text content.\
\
Rate Limiting: `@nestjs/throttler` with `ThrottlerModule.forRoot()` configuring multiple tiers (short/long). `APP_GUARD` with `ThrottlerGuard` applies globally, `@Throttle()` overrides per route, `@SkipThrottle()` bypasses it.\
\
DB connection pooling: TypeORM `extra.max` increases max connections based on CPU cores. Lazy loading modules with `LazyModuleLoader` in microservices reduces startup time.
