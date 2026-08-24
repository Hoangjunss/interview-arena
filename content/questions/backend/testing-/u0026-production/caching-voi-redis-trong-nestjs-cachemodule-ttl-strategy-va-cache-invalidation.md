---
id: caching-voi-redis-trong-nestjs-cachemodule-ttl-strategy-va-cache-invalidation
position: backend
technology: testing-\u0026-production
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Caching với Redis trong NestJS — CacheModule, TTL strategy và cache invalidation?

## Question (EN)
Caching with Redis in NestJS — CacheModule, TTL strategy and cache invalidation?

## Đáp án chi tiết (VI)
$81

## Detailed Answer (EN)
**Setup** with `@nestjs/cache-manager` and Redis store:\
```typescript\
CacheModule.registerAsync({\
  isGlobal: true,\
  useFactory: async (config) =\u003e ({\
    store: await redisStore({ socket: { host: config.get('REDIS_HOST') } }),\
    ttl: 60 * 1000,\
  }),\
})\
```\
\
**Manual caching** (recommended for control):\
```typescript\
const cached = await this.cache.get\u003cProduct\u003e(`product:${id}`);\
if (cached) return cached;\
const product = await this.repo.findOne({ where: { id } });\
await this.cache.set(`product:${id}`, product, 300000);\
```\
\
**Invalidation**: `await this.cache.del(`product:${id}`)` on update/delete. Cache-aside pattern: always invalidate on write.
