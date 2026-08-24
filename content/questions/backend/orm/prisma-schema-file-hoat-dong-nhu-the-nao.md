---
id: prisma-schema-file-hoat-dong-nhu-the-nao
position: backend
technology: orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prisma schema file hoạt động như thế nào?

## Question (EN)
How does a Prisma schema file work?

## Đáp án chi tiết (VI)
`schema.prisma` là nguồn sự thật duy nhất của Prisma, gồm ba phần:\
- **datasource**: kết nối DB.\
- **generator**: cấu hình Prisma Client.\
- **models**: định nghĩa bảng và quan hệ.\
\
Vài cú pháp hay dùng:\
- **Quan hệ**: `@relation(fields: [authorId], references: [id])` cho khóa ngoại; quan hệ N-N ngầm sẽ tự tạo bảng nối.\
- **`@map` / `@db`**: `@map('user_name')` giữ tên camelCase trong code nhưng đổi tên cột trong DB; `@db.VarChar(255)` chỉ định kiểu riêng của DB.\
- `prisma format` tự canh chỉnh và sắp xếp field.\
\
Điểm chốt: `prisma migrate dev` sinh ra file SQL migration **có thể review và sửa trước khi áp** — quan trọng khi cần migration phức tạp như chuyển đổi dữ liệu, đừng để nó tự chạy mù.

## Detailed Answer (EN)
`schema.prisma` is Prisma's single source of truth, with three sections:\
- **datasource**: the DB connection.\
- **generator**: Prisma Client configuration.\
- **models**: table and relation definitions.\
\
A few common bits of syntax:\
- **Relations**: `@relation(fields: [authorId], references: [id])` for a foreign key; implicit N-N relations auto-create a junction table.\
- **`@map` / `@db`**: `@map('user_name')` keeps a camelCase name in code but renames the DB column; `@db.VarChar(255)` specifies a DB-specific type.\
- `prisma format` auto-aligns and sorts fields.\
\
Key point: `prisma migrate dev` produces SQL migration files you **can review and edit before applying** — important for complex migrations like data transformations; don't let it run blind.
