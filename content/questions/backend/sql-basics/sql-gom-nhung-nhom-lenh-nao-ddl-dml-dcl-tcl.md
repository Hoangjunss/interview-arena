---
id: sql-gom-nhung-nhom-lenh-nao-ddl-dml-dcl-tcl
position: backend
technology: sql-basics
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SQL gồm những nhóm lệnh nào (DDL, DML, DCL, TCL)?

## Question (EN)
What command groups make up SQL (DDL, DML, DCL, TCL)?

## Đáp án chi tiết (VI)
SQL được chia thành các nhóm lệnh theo mục đích:\
\
- **DDL (Data Definition Language)** — định nghĩa cấu trúc: `CREATE`, `ALTER`, `DROP`, `TRUNCATE`. Tác động lên schema (bảng, index, ràng buộc).\
- **DML (Data Manipulation Language)** — thao tác dữ liệu bên trong bảng: `INSERT`, `UPDATE`, `DELETE`. (`SELECT` được xếp là DML hoặc tách riêng thành **DQL — Data Query Language** tùy tài liệu.)\
- **DCL (Data Control Language)** — phân quyền: `GRANT`, `REVOKE`.\
- **TCL (Transaction Control Language)** — điều khiển giao dịch: `COMMIT`, `ROLLBACK`, `SAVEPOINT`.\
\
Hay bị hỏi kèm: `TRUNCATE` là DDL (không phải DML) dù nghe như xóa dữ liệu, vì nó bỏ luôn vùng lưu trữ thay vì xóa từng hàng. Một số DDL (như trong Oracle) **tự động commit**, còn PostgreSQL cho DDL chạy trong transaction. Thực tế dev dùng DML phần lớn thời gian, DDL khi migration; DCL/TCL thường do DBA/DevOps đảm nhận.

## Detailed Answer (EN)
SQL is grouped into command families by purpose:\
\
- **DDL (Data Definition Language)** — defines structure: `CREATE`, `ALTER`, `DROP`, `TRUNCATE`. Acts on the schema (tables, indexes, constraints).\
- **DML (Data Manipulation Language)** — manipulates data inside tables: `INSERT`, `UPDATE`, `DELETE`. (`SELECT` is classed as DML or split out as **DQL — Data Query Language** depending on the source.)\
- **DCL (Data Control Language)** — access control: `GRANT`, `REVOKE`.\
- **TCL (Transaction Control Language)** — transaction control: `COMMIT`, `ROLLBACK`, `SAVEPOINT`.\
\
Common follow-up: `TRUNCATE` is DDL (not DML) despite sounding like a delete, because it drops the storage rather than removing rows one by one. Some DDL (e.g. in Oracle) **auto-commits**, whereas PostgreSQL lets DDL run inside a transaction. In practice devs use DML most of the time and DDL during migrations; DCL/TCL are usually handled by DBAs/DevOps.
