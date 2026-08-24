---
id: cac-loai-associations-quan-he-trong-active-record-la-gi
position: backend
technology: active-record
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các loại associations (quan hệ) trong Active Record là gì?

## Question (EN)
What are the types of associations in Active Record?

## Đáp án chi tiết (VI)
Active Record hỗ trợ 6 loại association:\
\
```ruby\
# 1:1 — User có 1 profile\
class User \u003c ApplicationRecord\
  has_one :profile\
end\
class Profile \u003c ApplicationRecord\
  belongs_to :user   # foreign key: user_id trên bảng profiles\
end\
\
# 1:N — User có nhiều posts\
class User \u003c ApplicationRecord\
  has_many :posts, dependent: :destroy\
end\
\
# N:N — Post có nhiều tags, Tag có nhiều posts\
class Post \u003c ApplicationRecord\
  has_many :post_tags\
  has_many :tags, through: :post_tags\
end\
```\
\
**Quy tắc foreign key:** `belongs_to` bên nào thì bảng đó chứa foreign key.\
\
`has_many :through` (3 bảng) dùng khi join table cần thêm attributes. `has_and_belongs_to_many` (2 bảng) dùng khi join table thuần túy không cần id/attrs.

## Detailed Answer (EN)
Active Record supports 6 association types:\
\
```ruby\
# 1:1 — User has one profile\
class User \u003c ApplicationRecord\
  has_one :profile\
end\
class Profile \u003c ApplicationRecord\
  belongs_to :user   # foreign key: user_id on profiles table\
end\
\
# 1:N — User has many posts\
class User \u003c ApplicationRecord\
  has_many :posts, dependent: :destroy\
end\
\
# N:N — Post has many tags, Tag has many posts\
class Post \u003c ApplicationRecord\
  has_many :post_tags\
  has_many :tags, through: :post_tags\
end\
```\
\
**Foreign key rule:** whichever side has `belongs_to` — that table holds the foreign key.\
\
Use `has_many :through` (3 tables) when the join table needs extra attributes. Use `has_and_belongs_to_many` (2 tables) for a pure join table without extra attrs.
