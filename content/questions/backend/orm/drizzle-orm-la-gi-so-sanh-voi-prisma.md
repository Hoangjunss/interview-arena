---
id: drizzle-orm-la-gi-so-sanh-voi-prisma
position: backend
technology: orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Drizzle ORM là gì? So sánh với Prisma?

## Question (EN)
What is Drizzle ORM? How does it compare to Prisma?

## Đáp án chi tiết (VI)
Drizzle là ORM TypeScript nhẹ, query builder viết **gần giống SQL** nhưng vẫn type-safe — hợp người đã quen SQL:\
```javascript\
db.select().from(users).where(eq(users.age, 25)).orderBy(desc(users.createdAt));\
```\
Schema khai báo bằng TypeScript, tự suy ra type: `pgTable('users', { id: serial('id').primaryKey(), name: text('name').notNull() })`. Migration qua `drizzle-kit generate` / `push`.\
\
Khác biệt lớn nhất với Prisma là **không có native binary** như Prisma engine:\
- Bundle nhỏ hơn nhiều (~100KB vs Prisma ~40MB) → chạy tốt trên edge (Cloudflare Workers, Vercel Edge).\
- Nhanh hơn 2-5x cho query đơn giản vì ít lớp trừu tượng.\
\
Đánh đổi: DX kém Prisma hơn (viết dài dòng hơn), cộng đồng nhỏ hơn, thiếu một số tính năng nâng cao. Chọn Drizzle khi cần edge/bundle nhỏ và muốn sát SQL; chọn Prisma khi ưu tiên DX và type-safety tối đa.

## Detailed Answer (EN)
Drizzle is a lightweight TypeScript ORM whose query builder reads **almost like SQL** while staying type-safe — great if you already know SQL:\
```javascript\
db.select().from(users).where(eq(users.age, 25)).orderBy(desc(users.createdAt));\
```\
Schema is declared in TypeScript with inferred types: `pgTable('users', { id: serial('id').primaryKey(), name: text('name').notNull() })`. Migrations via `drizzle-kit generate` / `push`.\
\
The biggest difference from Prisma is **no native binary** like the Prisma engine:\
- Much smaller bundle (~100KB vs Prisma ~40MB) → runs well on the edge (Cloudflare Workers, Vercel Edge).\
- 2-5x faster on simple queries thanks to fewer abstraction layers.\
\
Trade-off: worse DX than Prisma (more verbose), smaller community, some advanced features missing. Pick Drizzle when you need edge/small bundles and want to stay close to SQL; pick Prisma when you prioritize DX and maximum type safety.
