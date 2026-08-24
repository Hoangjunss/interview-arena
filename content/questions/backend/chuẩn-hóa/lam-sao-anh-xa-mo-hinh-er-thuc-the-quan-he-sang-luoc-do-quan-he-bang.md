---
id: lam-sao-anh-xa-mo-hinh-er-thuc-the-quan-he-sang-luoc-do-quan-he-bang
position: backend
technology: chuẩn-hóa
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao ánh xạ mô hình ER (thực thể - quan hệ) sang lược đồ quan hệ (bảng)?

## Question (EN)
How do you map an ER (entity-relationship) model to a relational schema (tables)?

## Đáp án chi tiết (VI)
Các quy tắc ánh xạ cơ bản:\
\
- **Thực thể (entity)** → một bảng; thuộc tính → cột; khóa của thực thể → primary key.\
- **Thuộc tính đa trị (multi-valued)** → tách ra một bảng riêng nối bằng foreign key.\
- **Quan hệ 1–1**: nhúng foreign key (kèm UNIQUE) vào một trong hai bảng.\
- **Quan hệ 1–nhiều**: đặt foreign key ở **phía \\"nhiều\\"** trỏ về phía \\"một\\" (order.customer_id).\
- **Quan hệ nhiều–nhiều**: tạo **bảng trung gian** (junction) chứa foreign key tới cả hai bảng; khóa chính thường là cặp hai FK đó.\
- **Thực thể yếu (weak entity)**: khóa gồm khóa của thực thể chủ cộng thêm khóa phân biệt cục bộ.\
\
Hình dung: thực thể thành bảng, còn quan hệ được biểu diễn bằng khóa ngoại — trừ nhiều–nhiều phải cần một bảng riêng. Sau khi ánh xạ, thường kiểm tra lại bằng chuẩn hóa để loại trùng lặp.

## Detailed Answer (EN)
Core mapping rules:\
\
- **Entity** → a table; attributes → columns; the entity key → primary key.\
- **Multi-valued attribute** → split into its own table linked by a foreign key.\
- **1–1 relationship**: embed a foreign key (with UNIQUE) in one of the two tables.\
- **1–many relationship**: put the foreign key on the **\\"many\\" side** pointing to the \\"one\\" side (order.customer_id).\
- **Many–many relationship**: create a **junction table** holding foreign keys to both tables; its primary key is usually the pair of those two FKs.\
- **Weak entity**: its key is the owner entity key plus a local discriminator.\
\
Picture it: entities become tables and relationships are expressed by foreign keys — except many-to-many, which needs its own table. After mapping, it is common to double-check with normalization to remove redundancy.
