---
id: generated-columns-trong-postgresql-dung-khi-nao
position: backend
technology: schema-\u0026-constraints
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generated columns trong PostgreSQL dùng khi nào?

## Question (EN)
When should you use generated columns in PostgreSQL?

## Đáp án chi tiết (VI)
Generated column là cột mà giá trị được *tự tính* từ các cột khác, nên bạn không phải lặp lại logic đó ở tầng app và có thể index/query trực tiếp trên nó. Hợp với công thức cố định, thuộc về dữ liệu: họ tên đầy đủ, key đã chuẩn hóa, hay một số tiền tính sẵn.\
```sql\
ALTER TABLE users ADD COLUMN full_name text\
GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED;\
```\
Đừng dùng generated column cho thứ phụ thuộc trạng thái bên ngoài, múi giờ thay đổi, hay hàm không \\"immutable\\" (kết quả có thể đổi theo thời điểm) — PostgreSQL sẽ không cho.

## Detailed Answer (EN)
A generated column is one whose value is *computed automatically* from other columns, so you don't repeat that logic in the app and can index/query it directly. It fits fixed formulas that belong to the data: a full name, a normalized key, or a precomputed amount.\
```sql\
ALTER TABLE users ADD COLUMN full_name text\
GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED;\
```\
Do not use a generated column for anything depending on external state, changing time zones, or a non-immutable function (whose result can change over time) — PostgreSQL will reject it.
