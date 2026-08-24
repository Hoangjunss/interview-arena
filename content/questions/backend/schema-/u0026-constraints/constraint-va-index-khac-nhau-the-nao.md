---
id: constraint-va-index-khac-nhau-the-nao
position: backend
technology: schema-\u0026-constraints
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Constraint và index khác nhau thế nào?

## Question (EN)
How are constraints different from indexes?

## Đáp án chi tiết (VI)
Dễ lẫn vì một số constraint tự tạo index, nhưng vai trò khác nhau: **constraint là quy tắc dữ liệu** (primary key, foreign key, unique, check, not null), còn **index là cấu trúc giúp tìm/đọc nhanh hơn**. Một unique constraint thường tạo unique index ở bên dưới để thực thi, nhưng không phải index nào cũng là quy tắc nghiệp vụ.\
\
Những quy tắc nghiệp vụ nên khai báo bằng constraint:\
```sql\
ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);\
ALTER TABLE orders ADD CONSTRAINT positive_total CHECK (total \u003e= 0);\
```\
Nếu chỉ tạo index để query nhanh hơn thì đừng nhầm nó với một quy tắc dữ liệu — nó không ép tính duy nhất hay điều kiện gì cả.

## Detailed Answer (EN)
They are easy to mix up because some constraints create an index, but their roles differ: **a constraint is a data rule** (primary key, foreign key, unique, check, not null), while **an index is a structure that makes finding/reading faster**. A unique constraint usually creates a unique index underneath to enforce itself, but not every index is a business rule.\
\
Business rules should be declared as constraints:\
```sql\
ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);\
ALTER TABLE orders ADD CONSTRAINT positive_total CHECK (total \u003e= 0);\
```\
If an index exists only to speed up queries, do not confuse it with a data rule — it enforces no uniqueness or condition.
