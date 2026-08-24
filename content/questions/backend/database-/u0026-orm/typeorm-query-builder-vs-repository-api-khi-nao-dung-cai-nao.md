---
id: typeorm-query-builder-vs-repository-api-khi-nao-dung-cai-nao
position: backend
technology: database-\u0026-orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TypeORM Query Builder vs Repository API — khi nào dùng cái nào?

## Question (EN)
TypeORM Query Builder vs Repository API — when to use each?

## Đáp án chi tiết (VI)
**Repository API** (High-level): phù hợp cho CRUD đơn giản, dễ đọc, type-safe:\
```typescript\
const users = await this.usersRepo.find({\
  where: { isActive: true, role: Role.USER },\
  relations: ['profile'],\
  order: { createdAt: 'DESC' },\
  take: 20, skip: 0,\
});\
```\
\
**Query Builder** (Low-level): cho queries phức tạp với dynamic conditions, subqueries, raw SQL expressions:\
```typescript\
const result = await this.usersRepo\
  .createQueryBuilder('user')\
  .leftJoinAndSelect('user.posts', 'post')\
  .where('user.isActive = :active', { active: true })\
  .andWhere('post.publishedAt \u003e :date', { date: lastWeek })\
  .select(['user.id', 'user.email', 'COUNT(post.id) as postCount'])\
  .groupBy('user.id')\
  .having('COUNT(post.id) \u003e 0')\
  .orderBy('postCount', 'DESC')\
  .getRawMany();\
```\
\
Dùng Repository API cho 80% cases. Dùng Query Builder khi: complex JOINs, aggregations (COUNT/SUM/AVG), dynamic WHERE conditions, raw SQL expressions cần.

## Detailed Answer (EN)
**Repository API**: best for simple CRUD, readable, type-safe:\
```typescript\
const users = await this.usersRepo.find({ where: { isActive: true }, relations: ['profile'] });\
```\
\
**Query Builder**: for complex dynamic queries:\
```typescript\
const result = await this.usersRepo.createQueryBuilder('user')\
  .leftJoinAndSelect('user.posts', 'post')\
  .where('user.isActive = :active', { active: true })\
  .groupBy('user.id').getRawMany();\
```\
\
Use Repository API for 80% of cases. Use Query Builder for: complex JOINs, aggregations, dynamic WHERE conditions, raw SQL expressions.
