---
id: soft-delete-va-audit-timestamps-voi-typeorm-createdat-updatedat-deletedat
position: backend
technology: database-\u0026-orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Soft delete và audit timestamps với TypeORM — createdAt, updatedAt, deletedAt?

## Question (EN)
Soft delete and audit timestamps with TypeORM — createdAt, updatedAt, deletedAt?

## Đáp án chi tiết (VI)
TypeORM cung cấp decorators tiện lợi cho timestamps và soft delete:\
\
```typescript\
import {\
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,\
  PrimaryGeneratedColumn, Column, Entity,\
} from 'typeorm';\
\
@Entity()\
export class BaseEntity {\
  @PrimaryGeneratedColumn('uuid')\
  id: string;\
\
  @CreateDateColumn()  // Tự set khi INSERT\
  createdAt: Date;\
\
  @UpdateDateColumn()  // Tự update khi UPDATE\
  updatedAt: Date;\
\
  @DeleteDateColumn()  // Tự set khi softDelete(), NULL khi active\
  deletedAt: Date | null;\
}\
```\
\
**Soft delete** với TypeORM:\
```typescript\
// Soft delete — set deletedAt\
await this.repo.softDelete(id);\
\
// Restore\
await this.repo.restore(id);\
\
// find() tự động filter deletedAt IS NULL\
// Để include deleted:\
await this.repo.find({ withDeleted: true });\
```\
\
Lưu ý: `@DeleteDateColumn` chỉ hoạt động khi dùng `softDelete()` và `softRemove()` — không phải `delete()` hay `remove()`.

## Detailed Answer (EN)
TypeORM provides convenient decorators for timestamps and soft delete:\
\
```typescript\
@Entity()\
export class BaseEntity {\
  @PrimaryGeneratedColumn('uuid') id: string;\
  @CreateDateColumn() createdAt: Date;  // Auto-set on INSERT\
  @UpdateDateColumn() updatedAt: Date;  // Auto-set on UPDATE\
  @DeleteDateColumn() deletedAt: Date | null;  // Soft delete\
}\
\
// Soft delete\
await this.repo.softDelete(id);\
await this.repo.restore(id);\
await this.repo.find({ withDeleted: true });  // Include deleted\
```\
\
Pitfall: `@DeleteDateColumn` only works with `softDelete()`/`softRemove()`, not `delete()`/`remove()`.
