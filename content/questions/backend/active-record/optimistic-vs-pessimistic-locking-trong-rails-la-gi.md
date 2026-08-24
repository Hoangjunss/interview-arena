---
id: optimistic-vs-pessimistic-locking-trong-rails-la-gi
position: backend
technology: active-record
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Optimistic vs Pessimistic Locking trong Rails là gì?

## Question (EN)
What is Optimistic vs Pessimistic Locking in Rails?

## Đáp án chi tiết (VI)
Cả hai đều ngăn race condition khi nhiều user sửa cùng record.\
\
**Optimistic Locking** (default khi có cột `lock_version`):\
- Không lock DB. Rails gắn `lock_version` vào record. Khi save, kiểm tra version có khớp không — nếu user khác đã sửa trước → raise `ActiveRecord::StaleObjectError`.\
- Tốt cho trường hợp conflict ít xảy ra.\
\
```ruby\
# Migration: add_column :products, :lock_version, :integer, default: 0\
product = Product.find(1)         # lock_version = 5\
# ... user khác cũng đang sửa ...\
product.update!(name: \\"New\\")      # raise StaleObjectError nếu version đổi\
```\
\
**Pessimistic Locking** (DB-level lock):\
- Dùng SQL `SELECT ... FOR UPDATE` — record bị lock cho đến khi transaction kết thúc.\
\
```ruby\
Product.transaction do\
  product = Product.lock.find(1)  # SELECT ... FOR UPDATE\
  product.decrement!(:stock)\
end\
```\
\
Dùng Pessimistic khi conflict xảy ra thường xuyên (e.g. trừ kho). Optimistic khi conflict hiếm.

## Detailed Answer (EN)
Both prevent race conditions when multiple users edit the same record simultaneously.\
\
**Optimistic Locking** (enabled by a `lock_version` column):\
- No DB lock. Rails tracks a `lock_version`. On save, it checks if the version still matches — if another user saved first → raises `ActiveRecord::StaleObjectError`.\
- Good when conflicts are rare.\
\
```ruby\
# Migration: add_column :products, :lock_version, :integer, default: 0\
product = Product.find(1)         # lock_version = 5\
# ... another user edits concurrently ...\
product.update!(name: \\"New\\")      # raises StaleObjectError if version changed\
```\
\
**Pessimistic Locking** (DB-level lock):\
- Uses SQL `SELECT ... FOR UPDATE` — the row is locked until the transaction ends.\
\
```ruby\
Product.transaction do\
  product = Product.lock.find(1)  # SELECT ... FOR UPDATE\
  product.decrement!(:stock)\
end\
```\
\
Use Pessimistic when conflicts are frequent (e.g. inventory deduction). Use Optimistic when conflicts are rare.
