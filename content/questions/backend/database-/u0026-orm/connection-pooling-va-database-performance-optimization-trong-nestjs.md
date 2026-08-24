---
id: connection-pooling-va-database-performance-optimization-trong-nestjs
position: backend
technology: database-\u0026-orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Connection pooling và database performance optimization trong NestJS?

## Question (EN)
Connection pooling and database performance optimization in NestJS?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
Connection pooling and query optimization are the two most critical factors for a NestJS app to handle production load well.\
\
**Connection Pooling** with TypeORM:\
```typescript\
TypeOrmModule.forRootAsync({\
  useFactory: (config) =\u003e ({\
    type: 'postgres',\
    url: config.get('DATABASE_URL'),\
    extra: { max: 20, min: 2, idleTimeoutMillis: 30000 },\
    logging: config.get('NODE_ENV') === 'development',\
  }),\
})\
```\
\
**Query optimization**:\
1. Use `select` to fetch only needed columns\
2. Index foreign keys and frequently queried columns\
3. Paginate all list queries — never `findAll()` without limit\
4. Enable slow query logging: `maxQueryExecutionTime: 1000`
