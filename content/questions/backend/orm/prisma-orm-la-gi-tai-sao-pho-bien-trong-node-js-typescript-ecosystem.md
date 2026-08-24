---
id: prisma-orm-la-gi-tai-sao-pho-bien-trong-node-js-typescript-ecosystem
position: backend
technology: orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prisma ORM là gì? Tại sao phổ biến trong Node.js/TypeScript ecosystem?

## Question (EN)
What is Prisma ORM? Why is it popular in the Node.js/TypeScript ecosystem?

## Đáp án chi tiết (VI)
Prisma là ORM thế hệ mới cho Node.js/TypeScript, theo hướng **schema-first**: bạn mô tả model trong `schema.prisma`, Prisma sinh ra mọi thứ từ đó.\
\
Điểm mạnh:\
- **Client tự sinh, type-safe**: mỗi lần chạy `prisma generate` tạo ra TypeScript types khớp chính xác với schema → autocomplete và bắt lỗi ngay khi gõ.\
- **Prisma Migrate**: sinh file SQL migration có thể review.\
- **Prisma Studio**: GUI để xem dữ liệu.\
- Bên trong dùng query engine viết bằng Rust → hiệu năng tốt.\
\
So với Sequelize/TypeORM: DX tốt hơn, type safety mạnh hơn (không cần decorator), nhưng xử lý các kiểu kế thừa phức tạp chưa tốt.\
\
Điểm chốt phải nhớ: **mỗi lần đổi schema phải chạy `prisma generate`** để đồng bộ types — bước bắt buộc, hay quên trong CI/CD.

## Detailed Answer (EN)
Prisma is a next-generation ORM for Node.js/TypeScript, built **schema-first**: you describe models in `schema.prisma`, and Prisma generates everything from it.\
\
Strengths:\
- **Auto-generated, type-safe client**: each `prisma generate` produces TypeScript types that exactly match the schema → autocomplete and error-catching as you type.\
- **Prisma Migrate**: generates reviewable SQL migration files.\
- **Prisma Studio**: a GUI to browse data.\
- Internally uses a Rust query engine → good performance.\
\
Vs Sequelize/TypeORM: better DX, stronger type safety (no decorators), but weaker at complex inheritance patterns.\
\
Key point to remember: **after every schema change you must run `prisma generate`** to sync the types — a required step that's easy to forget in CI/CD.
