---
id: database-transactions-trong-prisma-cach-su-dung
position: backend
technology: orm
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Database transactions trong Prisma: cách sử dụng?

## Question (EN)
Database transactions in Prisma: how to use them?

## Đáp án chi tiết (VI)
Prisma có hai kiểu transaction:\
\
- **Sequential** — truyền một mảng thao tác: `prisma.$transaction([op1, op2])`. Chạy tuần tự, một cái fail thì rollback hết. Đơn giản nhưng **không có logic điều kiện**.\
- **Interactive** — truyền một hàm async:\
```javascript\
prisma.$transaction(async (tx) =\u003e {\
  const user = await tx.user.create({ ... })\
  if (user.role === 'admin') await tx.adminProfile.create({ ... })\
})\
```\
Dùng được `if/else`. Lưu ý: bên trong phải gọi qua `tx` (không phải `prisma`) thì các thao tác mới nằm chung một transaction.\
\
Vài điểm thêm:\
- **Nested write** tự động bọc trong transaction: `prisma.user.create({ data: { profile: { create: {...} } } })`.\
- Đặt được isolation level và `timeout` (mặc định 5s).\
\
Giới hạn: Prisma **không** làm transaction trải nhiều database — với microservices phải dùng 2-phase commit hoặc saga pattern.

## Detailed Answer (EN)
Prisma has two transaction styles:\
\
- **Sequential** — pass an array of operations: `prisma.$transaction([op1, op2])`. Runs sequentially, rolls everything back if one fails. Simple but has **no conditional logic**.\
- **Interactive** — pass an async function:\
```javascript\
prisma.$transaction(async (tx) =\u003e {\
  const user = await tx.user.create({ ... })\
  if (user.role === 'admin') await tx.adminProfile.create({ ... })\
})\
```\
Lets you use `if/else`. Note: inside it you must call via `tx` (not `prisma`) for the operations to belong to the same transaction.\
\
A few extras:\
- **Nested writes** are auto-wrapped in a transaction: `prisma.user.create({ data: { profile: { create: {...} } } })`.\
- You can set the isolation level and a `timeout` (default 5s).\
\
Limitation: Prisma does **not** do transactions spanning multiple databases — for microservices use a 2-phase commit or the saga pattern.
