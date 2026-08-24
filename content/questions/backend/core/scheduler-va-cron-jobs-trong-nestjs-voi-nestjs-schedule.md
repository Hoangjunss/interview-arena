---
id: scheduler-va-cron-jobs-trong-nestjs-voi-nestjs-schedule
position: backend
technology: core
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Scheduler và CRON jobs trong NestJS với @nestjs/schedule?

## Question (EN)
Scheduler and CRON jobs in NestJS with @nestjs/schedule?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
`@nestjs/schedule` wraps `node-cron` for scheduled tasks:\
\
```typescript\
@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)\
async generateDailyReport() { ... }\
\
@Interval(30000)  // Every 30s\
async syncData() { ... }\
\
@Timeout(5000)  // Once after 5s from start\
async warmupCache() { ... }\
```\
\
Pitfall: in distributed deployments (multiple pods), use distributed locks (Redis + Redlock) to prevent the same job running in parallel across pods.
