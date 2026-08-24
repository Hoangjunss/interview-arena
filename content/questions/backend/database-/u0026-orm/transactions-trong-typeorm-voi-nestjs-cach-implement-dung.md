---
id: transactions-trong-typeorm-voi-nestjs-cach-implement-dung
position: backend
technology: database-\u0026-orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transactions trong TypeORM với NestJS — cách implement đúng?

## Question (EN)
Transactions in TypeORM with NestJS — how to implement correctly?

## Đáp án chi tiết (VI)
Transactions đảm bảo multiple DB operations thành công hoặc rollback toàn bộ.\
\
**Cách 1 — QueryRunner** (recommend cho complex transactions):\
```typescript\
const queryRunner = this.dataSource.createQueryRunner();\
await queryRunner.connect();\
await queryRunner.startTransaction();\
try {\
  await queryRunner.manager.save(User, user);\
  await queryRunner.manager.save(Profile, profile);\
  await queryRunner.commitTransaction();\
} catch (err) {\
  await queryRunner.rollbackTransaction();\
  throw err;\
} finally {\
  await queryRunner.release();\
}\
```\
\
**Cách 2 — EntityManager.transaction()** (cleaner cho simple cases):\
```typescript\
await this.dataSource.transaction(async manager =\u003e {\
  await manager.save(User, user);\
  await manager.save(Profile, profile);\
  // Tự động rollback nếu throw\
});\
```\
\
**Cách 3 — @Transaction decorator** (deprecated trong TypeORM 0.3+, không dùng).\
\
Lưu ý: không mix `repository` từ DI và `queryRunner.manager` trong cùng transaction — chúng dùng connection pool khác nhau.

## Detailed Answer (EN)
Transactions ensure all DB operations succeed or roll back entirely.\
\
**Option 1 — QueryRunner** (recommended for complex transactions):\
```typescript\
const qr = this.dataSource.createQueryRunner();\
await qr.connect();\
await qr.startTransaction();\
try {\
  await qr.manager.save(User, user);\
  await qr.commitTransaction();\
} catch { await qr.rollbackTransaction(); throw; }\
finally { await qr.release(); }\
```\
\
**Option 2 — EntityManager.transaction()**:\
```typescript\
await this.dataSource.transaction(async manager =\u003e {\
  await manager.save(User, user);\
  // Auto-rollback on throw\
});\
```\
\
Pitfall: do not mix DI repositories and `queryRunner.manager` in the same transaction.
