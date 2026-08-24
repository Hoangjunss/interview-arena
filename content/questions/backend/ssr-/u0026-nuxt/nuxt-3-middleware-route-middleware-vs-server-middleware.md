---
id: nuxt-3-middleware-route-middleware-vs-server-middleware
position: backend
technology: ssr-\u0026-nuxt
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nuxt 3 middleware — route middleware vs server middleware?

## Question (EN)
Nuxt 3 middleware — route middleware vs server middleware?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
**Route Middleware** (client + server): runs on navigation:\
```typescript\
// middleware/auth.ts\
export default defineNuxtRouteMiddleware((to) =\u003e {\
  const { loggedIn } = useAuth()\
  if (!loggedIn.value \u0026\u0026 to.meta.requiresAuth)\
    return navigateTo('/login')\
})\
\
// In page\
definePageMeta({ middleware: 'auth' })\
```\
\
**Server Middleware** (server-only): runs before every request, like Express middleware:\
```typescript\
// server/middleware/logger.ts\
export default defineEventHandler((event) =\u003e {\
  console.log(`[${event.method}] ${event.path}`)\
  // Return nothing → continue\
})\
\
// Rate limiting\
export default defineEventHandler(async (event) =\u003e {\
  const count = await redis.incr(`rate:${getRequestIP(event)}`)\
  if (count \u003e 100) throw createError({ statusCode: 429 })\
})\
```
