---
id: enum-trong-active-record-la-gi-cach-dinh-nghia-va-dung-trong-query
position: backend
technology: migration-\u0026-db
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Enum trong Active Record là gì? Cách định nghĩa và dùng trong query?

## Question (EN)
What is an Enum in Active Record? How do you define and use it in queries?

## Đáp án chi tiết (VI)
Enum map integer trong DB thành tên có nghĩa trong Ruby — giúp code đọc rõ hơn và tiết kiệm storage.\
\
```ruby\
# Migration\
add_column :orders, :status, :integer, default: 0\
\
# Model (Rails 7+ dùng hash syntax)\
class Order \u003c ApplicationRecord\
  enum :status, { pending: 0, processing: 1, shipped: 2, delivered: 3, cancelled: 4 }\
end\
\
# Generated methods:\
order.pending?    # =\u003e true/false\
order.processing! # update status = 1 ngay lập tức\
Order.shipped     # scope: WHERE status = 2\
order.status      # =\u003e \\"pending\\" (string)\
```\
\
**Lưu ý:** dùng `_prefix:` hoặc `_suffix:` khi có nhiều enum trên cùng model để tránh conflict method name:\
\
```ruby\
enum :status,   { active: 0, archived: 1 }, _prefix: :status\
enum :category, { active: 0, inactive: 1 }, _prefix: :category\
# → status_active?, category_active?\
```

## Detailed Answer (EN)
Enums map DB integers to meaningful names in Ruby — cleaner code and reduced storage.\
\
```ruby\
# Migration\
add_column :orders, :status, :integer, default: 0\
\
# Model (Rails 7+ hash syntax)\
class Order \u003c ApplicationRecord\
  enum :status, { pending: 0, processing: 1, shipped: 2, delivered: 3, cancelled: 4 }\
end\
\
# Generated methods:\
order.pending?    # =\u003e true/false\
order.processing! # updates status = 1 immediately\
Order.shipped     # scope: WHERE status = 2\
order.status      # =\u003e \\"pending\\" (string)\
```\
\
**Note:** use `_prefix:` or `_suffix:` when a model has multiple enums to avoid method name collisions:\
\
```ruby\
enum :status,   { active: 0, archived: 1 }, _prefix: :status\
enum :category, { active: 0, inactive: 1 }, _prefix: :category\
# → status_active?, category_active?\
```
