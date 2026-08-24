---
id: phan-biet-primary-key-foreign-key-unique-key-va-composite-key
position: backend
technology: keys-\u0026-constraints
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt primary key, foreign key, unique key và composite key?

## Question (EN)
Distinguish primary key, foreign key, unique key and composite key.

## Đáp án chi tiết (VI)
- **Primary key (PK)**: định danh duy nhất mỗi hàng; **không NULL**, mỗi bảng chỉ một PK. Thường có index tự động.\
- **Unique key**: đảm bảo giá trị không trùng, nhưng **cho phép NULL** và một bảng có nhiều unique constraint.\
- **Foreign key (FK)**: cột tham chiếu tới PK của bảng khác → giữ **toàn vẹn tham chiếu** (không cho trỏ tới bản ghi không tồn tại); kèm hành vi `ON DELETE`/`ON UPDATE` (CASCADE, RESTRICT, SET NULL).\
- **Composite key**: khóa gồm **nhiều cột** kết hợp mới là duy nhất (vd `(order_id, product_id)` trong bảng nối).\
\
Hay bị hỏi: PK vs unique (PK = unique + not-null + 1 cái/bảng) và ý nghĩa của FK trong việc chống dữ liệu mồ côi.

## Detailed Answer (EN)
- **Primary key (PK)**: uniquely identifies each row; **NOT NULL**, one PK per table. Usually auto-indexed.\
- **Unique key**: guarantees no duplicates, but **allows NULL** and a table may have several unique constraints.\
- **Foreign key (FK)**: a column referencing another table's PK → enforces **referential integrity** (no pointing at a non-existent row); comes with `ON DELETE`/`ON UPDATE` behavior (CASCADE, RESTRICT, SET NULL).\
- **Composite key**: a key made of **multiple columns** that are unique only in combination (e.g. `(order_id, product_id)` in a join table).\
\
Common follow-up: PK vs unique (PK = unique + not-null + one per table) and how FKs prevent orphaned data.
