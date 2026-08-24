---
id: orm-la-gi-uu-va-nhuoc-diem
position: backend
technology: orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ORM là gì? Ưu và nhược điểm?

## Question (EN)
What is an ORM and what are its pros and cons?

## Đáp án chi tiết (VI)
ORM (Object-Relational Mapping) ánh xạ **bảng DB ↔ object/class** trong code, để thao tác dữ liệu bằng đối tượng thay vì viết SQL tay (vd Prisma, TypeORM, Hibernate, Drizzle).\
\
**Ưu**:\
- Viết nhanh, ít boilerplate, code gần với domain.\
- An toàn hơn: query được **tham số hóa** sẵn → giảm SQL injection.\
- Trừu tượng hóa DB, hỗ trợ migration, type-safety (với TS).\
\
**Nhược**:\
- **Leaky abstraction**: query phức tạp/tối ưu vẫn phải hiểu SQL bên dưới.\
- Dễ dính **N+1 query** nếu không eager-load đúng.\
- Query sinh ra có thể kém tối ưu; khó kiểm soát chi tiết; thêm một lớp học tập.\
\
Chốt: ORM tốt cho phần lớn CRUD; phần truy vấn nặng/báo cáo nên hạ xuống **raw SQL**. Hiểu SQL vẫn là bắt buộc.

## Detailed Answer (EN)
An ORM (Object-Relational Mapping) maps **DB tables ↔ objects/classes** in code so you manipulate data as objects instead of writing SQL by hand (e.g. Prisma, TypeORM, Hibernate, Drizzle).\
\
**Pros**:\
- Fast to write, less boilerplate, code close to the domain.\
- Safer: queries are **parameterized** by default → reduces SQL injection.\
- Abstracts the DB, supports migrations, type-safety (with TS).\
\
**Cons**:\
- **Leaky abstraction**: complex/optimized queries still require understanding the SQL underneath.\
- Prone to the **N+1 query** problem without correct eager-loading.\
- Generated queries can be suboptimal; less fine-grained control; an extra learning layer.\
\
Bottom line: ORMs are great for most CRUD; drop to **raw SQL** for heavy queries/reporting. Knowing SQL is still mandatory.
