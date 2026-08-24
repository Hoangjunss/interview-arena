---
id: lam-the-nao-de-viet-migration-an-toan-tren-production-db-lon-zero-downtime
position: backend
technology: migration-\u0026-db
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để viết migration an toàn trên production DB lớn (zero-downtime)?

## Question (EN)
How do you write a zero-downtime migration on a large production DB?

## Đáp án chi tiết (VI)
Trên bảng hàng triệu row, một số migration gây lock cả bảng và downtime:\
\
**Nguy hiểm:**\
```ruby\
# Thêm column NOT NULL không có default → lock cả bảng\
add_column :orders, :status, :string, null: false\
\
# Thêm index không có CONCURRENTLY → block writes\
add_index :orders, :user_id\
```\
\
**An toàn:**\
```ruby\
# 1. Thêm column nullable (không lock)\
add_column :orders, :status, :string\
\
# 2. Backfill data trong batch\
Order.in_batches.update_all(status: \\"pending\\")\
\
# 3. Sau khi data đầy đủ, thêm constraint NOT NULL riêng\
change_column_null :orders, :status, false\
\
# Index với CONCURRENTLY — không block reads/writes\
add_index :orders, :user_id, algorithm: :concurrently\
```\
\
Gem **strong_migrations** tự phát hiện unsafe migration và gợi ý cách viết lại an toàn.

## Detailed Answer (EN)
On tables with millions of rows, some migrations lock the entire table and cause downtime:\
\
**Dangerous:**\
```ruby\
# Adding NOT NULL column with no default → full table lock\
add_column :orders, :status, :string, null: false\
\
# Adding index without CONCURRENTLY → blocks writes\
add_index :orders, :user_id\
```\
\
**Safe approach:**\
```ruby\
# 1. Add nullable column (no lock)\
add_column :orders, :status, :string\
\
# 2. Backfill in batches\
Order.in_batches.update_all(status: \\"pending\\")\
\
# 3. After data is populated, add the NOT NULL constraint separately\
change_column_null :orders, :status, false\
\
# Index with CONCURRENTLY — does not block reads/writes\
add_index :orders, :user_id, algorithm: :concurrently\
```\
\
The **strong_migrations** gem automatically detects unsafe migrations and suggests safe rewrites.
