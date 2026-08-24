---
id: dbms-va-rdbms-khac-nhau-the-nao
position: backend
technology: dbms
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DBMS và RDBMS khác nhau thế nào?

## Question (EN)
How do DBMS and RDBMS differ?

## Đáp án chi tiết (VI)
- **DBMS** (Database Management System): phần mềm quản lý dữ liệu nói chung — lưu, truy vấn, quản trị. Bao hàm mọi mô hình: file phẳng, phân cấp, mạng, quan hệ, tài liệu...\
- **RDBMS** (Relational DBMS): một loại DBMS theo **mô hình quan hệ** — dữ liệu ở các bảng có cột, có khóa và quan hệ giữa các bảng, truy vấn bằng SQL, và thường đảm bảo ACID. PostgreSQL, MySQL, SQL Server, Oracle là RDBMS.\
\
Nói cách khác RDBMS là tập con của DBMS. Điểm phân biệt của RDBMS: cấu trúc bảng có schema rõ, ràng buộc toàn vẹn (primary/foreign key), và ngôn ngữ SQL chuẩn. Nhiều NoSQL (MongoDB, Redis) là DBMS nhưng không phải RDBMS vì không theo mô hình quan hệ.

## Detailed Answer (EN)
- **DBMS** (Database Management System): software that manages data in general — storing, querying, administering. It covers every model: flat file, hierarchical, network, relational, document...\
- **RDBMS** (Relational DBMS): a DBMS following the **relational model** — data in tables with columns, keys and relationships between tables, queried with SQL, and usually ACID-compliant. PostgreSQL, MySQL, SQL Server, Oracle are RDBMSs.\
\
In other words an RDBMS is a subset of DBMS. What sets an RDBMS apart: a clear table schema, integrity constraints (primary/foreign keys), and standard SQL. Many NoSQL systems (MongoDB, Redis) are DBMSs but not RDBMSs because they do not follow the relational model.
