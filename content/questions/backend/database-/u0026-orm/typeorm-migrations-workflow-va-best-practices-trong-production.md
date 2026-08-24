---
id: typeorm-migrations-workflow-va-best-practices-trong-production
position: backend
technology: database-\u0026-orm
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TypeORM migrations — workflow và best practices trong production?

## Question (EN)
TypeORM migrations — workflow and production best practices?

## Đáp án chi tiết (VI)
TypeORM migrations quản lý schema changes an toàn. **Không dùng `synchronize: true` trong production** — có thể làm mất data.\
\
**Workflow chuẩn**:\
```bash\
# 1. Generate migration từ entity changes\
npx typeorm migration:generate -d src/data-source.ts src/migrations/AddUserPhone\
\
# 2. Review file migration được tạo\
# src/migrations/1234567890-AddUserPhone.ts\
\
# 3. Apply\
npx typeorm migration:run -d src/data-source.ts\
\
# 4. Revert nếu cần\
npx typeorm migration:revert -d src/data-source.ts\
```\
\
**Data Source file** cần tách biệt với app module để CLI có thể dùng:\
```typescript\
// src/data-source.ts\
export const AppDataSource = new DataSource({\
  type: 'postgres',\
  entities: ['src/**/*.entity.ts'],\
  migrations: ['src/migrations/*.ts'],\
  synchronize: false,\
});\
```\
\
Best practices: chạy migration tự động khi app start trong production (`runMigrations: true`), never drop column directly — add new column, migrate data, then drop old. Luôn test migration `revert` trước khi deploy.

## Detailed Answer (EN)
TypeORM migrations manage schema changes safely. **Never use `synchronize: true` in production** — it can destroy data.\
\
**Standard workflow**:\
```bash\
npx typeorm migration:generate -d src/data-source.ts src/migrations/AddUserPhone\
npx typeorm migration:run -d src/data-source.ts\
npx typeorm migration:revert -d src/data-source.ts  # if needed\
```\
\
Separate `DataSource` file for CLI access. Best practices: run migrations on app start in production (`runMigrations: true`), never drop columns directly — add new, migrate data, then drop. Always test `revert` before deploying.
