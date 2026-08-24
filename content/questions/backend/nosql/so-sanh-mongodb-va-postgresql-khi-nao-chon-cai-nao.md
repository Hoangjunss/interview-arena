---
id: so-sanh-mongodb-va-postgresql-khi-nao-chon-cai-nao
position: backend
technology: nosql
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh MongoDB và PostgreSQL: khi nào chọn cái nào?

## Question (EN)
MongoDB vs PostgreSQL: when should you choose each?

## Đáp án chi tiết (VI)
Không phải \\"cái nào tốt hơn\\" mà là \\"hợp với dữ liệu nào\\".\
\
**Chọn PostgreSQL khi**: dữ liệu có quan hệ rõ, cần transaction ACID, schema ổn định, query phức tạp nhiều JOIN. PostgreSQL còn có kiểu `JSONB` (+ GIN index) cho phép lưu/truy vấn JSON nhanh — là điểm trung gian khi cần vừa quan hệ vừa linh hoạt.\
\
**Chọn MongoDB khi**: dữ liệu cấu trúc thay đổi/lồng sâu, cần scale ngang đơn giản, hướng document (nội dung, catalog, hồ sơ).\
\
Vài điểm so sánh:\
- Hiệu năng: MongoDB nhanh khi lấy nguyên document không cần JOIN; PostgreSQL mạnh khi tổng hợp phức tạp nhiều bảng.\
- Hệ sinh thái: Mongoose (ODM) cho MongoDB vs Prisma/TypeORM cho PostgreSQL.\
\
Lưu ý: chọn MongoDB vì \\"linh hoạt\\" rồi phải tự code join bằng tay trong app — còn tệ hơn dùng SQL ngay từ đầu.

## Detailed Answer (EN)
It's not \\"which is better\\" but \\"which fits the data\\".\
\
**Choose PostgreSQL when**: data has clear relationships, you need ACID transactions, a stable schema, complex multi-JOIN queries. PostgreSQL also has the `JSONB` type (+ GIN index) for fast JSON storage/queries — a middle ground when you need both relational and flexible.\
\
**Choose MongoDB when**: data has variable/deeply-nested structure, you want simple horizontal scaling, document-centric use cases (content, catalogs, profiles).\
\
A few comparison points:\
- Performance: MongoDB is fast at fetching whole documents without JOINs; PostgreSQL is stronger at complex multi-table aggregations.\
- Ecosystem: Mongoose (ODM) for MongoDB vs Prisma/TypeORM for PostgreSQL.\
\
Classic pitfall: picking MongoDB for \\"flexibility\\" then hand-coding joins in app code — worse than just using SQL from the start.
