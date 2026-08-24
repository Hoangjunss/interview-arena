---
id: sequelize-la-gi-so-sanh-voi-prisma
position: backend
technology: orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sequelize là gì? So sánh với Prisma?

## Question (EN)
What is Sequelize? How does it compare to Prisma?

## Đáp án chi tiết (VI)
Sequelize là ORM \\"đời trước\\" của Node.js, lâu đời và hỗ trợ nhiều DB (MySQL, PostgreSQL, SQLite, MSSQL, MariaDB). Vài tính năng đáng biết:\
\
- **Migration**: `sequelize-cli` sinh file có `up`/`down` — mạnh nhưng dài dòng.\
- **Hooks** (sự kiện vòng đời): `beforeCreate`, `afterCreate`, `beforeUpdate`... — dùng cho audit log, hash password.\
- **Scopes**: gom điều kiện query tái dùng — `User.scope('active')`.\
- **Transaction**: `sequelize.transaction(async (t) =\u003e { ... })`.\
\
So với Prisma: type TypeScript của Sequelize không chính xác bằng (phải kèm `sequelize-typescript`), định nghĩa model rườm rà với decorator, lỗi runtime khó debug — nói chung DX kém hơn.\
\
Điểm chốt: với dự án mới hãy chọn Prisma; chỉ dùng Sequelize khi đang **bảo trì codebase cũ** hoặc cần tính năng Prisma chưa có (vd polymorphic association).

## Detailed Answer (EN)
Sequelize is Node.js's \\"older-generation\\" ORM — mature and supporting many DBs (MySQL, PostgreSQL, SQLite, MSSQL, MariaDB). A few notable features:\
\
- **Migrations**: `sequelize-cli` generates files with `up`/`down` — powerful but verbose.\
- **Hooks** (lifecycle events): `beforeCreate`, `afterCreate`, `beforeUpdate`... — used for audit logging, password hashing.\
- **Scopes**: reusable query conditions — `User.scope('active')`.\
- **Transactions**: `sequelize.transaction(async (t) =\u003e { ... })`.\
\
Vs Prisma: Sequelize's TypeScript types are less accurate (you need `sequelize-typescript`), model definitions are verbose with decorators, and runtime errors are harder to debug — overall worse DX.\
\
Key point: for new projects pick Prisma; use Sequelize only when **maintaining a legacy codebase** or when you need a feature Prisma lacks (e.g. polymorphic associations).
