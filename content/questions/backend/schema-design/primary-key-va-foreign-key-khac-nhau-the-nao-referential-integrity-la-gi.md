---
id: primary-key-va-foreign-key-khac-nhau-the-nao-referential-integrity-la-gi
position: backend
technology: schema-design
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Primary key và foreign key khác nhau thế nào? Referential integrity là gì?

## Question (EN)
Primary key vs foreign key — what is the difference, and what is referential integrity?

## Đáp án chi tiết (VI)
- **Primary key (khóa chính)**: một hoặc nhiều cột **định danh duy nhất** mỗi hàng. Giá trị phải **duy nhất và khác NULL**; mỗi bảng có **tối đa một** primary key (thường tự tạo index B-tree cho nó).\
- **Foreign key (khóa ngoại)**: cột trong bảng con **tham chiếu tới primary key** của bảng cha, thể hiện quan hệ (vd `orders.user_id` trỏ tới `users.id`).\
\
**Referential integrity (toàn vẹn tham chiếu)**: DB đảm bảo mọi giá trị foreign key **phải trỏ tới một hàng có thật** ở bảng cha — không thể tạo đơn hàng cho user không tồn tại. Khi hàng cha bị xóa/sửa, hành vi do `ON DELETE`/`ON UPDATE` quy định: **`CASCADE`** (xóa/cập nhật lan sang con), **`RESTRICT`/`NO ACTION`** (chặn nếu còn con tham chiếu), **`SET NULL`**/`SET DEFAULT`.\
\
Ý nghĩa: ràng buộc này để **DB tự canh** tính nhất quán quan hệ, thay vì phó mặc cho code ứng dụng kiểm tra (dễ sót).

## Detailed Answer (EN)
- **Primary key**: one or more columns that **uniquely identify** each row. Values must be **unique and non-NULL**; a table has **at most one** primary key (usually backed by an automatic B-tree index).\
- **Foreign key**: a column in a child table that **references the primary key** of a parent table, expressing a relationship (e.g. `orders.user_id` points to `users.id`).\
\
**Referential integrity**: the DB guarantees every foreign-key value **must point to a real row** in the parent table — you cannot create an order for a nonexistent user. When a parent row is deleted/updated, behavior follows `ON DELETE`/`ON UPDATE`: **`CASCADE`** (propagate to children), **`RESTRICT`/`NO ACTION`** (block while referencing children exist), **`SET NULL`**/`SET DEFAULT`.\
\
The point: let the **DB enforce** relational consistency itself rather than relying on application code to check (which is easy to miss).
