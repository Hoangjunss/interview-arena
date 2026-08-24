---
id: health-checks-va-graceful-shutdown-trong-nestjs-production
position: backend
technology: testing-\u0026-production
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Health checks và graceful shutdown trong NestJS production?

## Question (EN)
Health checks and graceful shutdown in NestJS production?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
**Health Checks** with `@nestjs/terminus`:\
```typescript\
@Get('health') @HealthCheck()\
check() {\
  return this.health.check([\
    () =\u003e this.db.pingCheck('database'),\
    () =\u003e this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),\
  ]);\
}\
```\
\
**Graceful Shutdown**: handle in-flight requests before exiting:\
```typescript\
app.enableShutdownHooks(); // Listen SIGTERM, SIGINT\
\
// In service\
async onApplicationShutdown(signal?: string) {\
  await this.closeConnections();\
}\
```\
\
Kubernetes sends `SIGTERM` on pod termination — NestJS must finish active requests before exit. Set `terminationGracePeriodSeconds: 30` in K8s manifest.
