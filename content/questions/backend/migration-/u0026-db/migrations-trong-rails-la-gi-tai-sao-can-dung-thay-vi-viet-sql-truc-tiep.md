---
id: migrations-trong-rails-la-gi-tai-sao-can-dung-thay-vi-viet-sql-truc-tiep
position: backend
technology: migration-\u0026-db
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Migrations trong Rails là gì? Tại sao cần dùng thay vì viết SQL trực tiếp?

## Question (EN)
What are Rails migrations? Why use them instead of raw SQL?

## Đáp án chi tiết (VI)
Migration là Ruby class mô tả **thay đổi schema DB** theo thời gian — có thể chạy lên (`up`/`change`) hoặc rollback xuống (`down`).\
\
```ruby\
class AddAgeToUsers \u003c ActiveRecord::Migration[7.1]\
  def change\
    add_column :users, :age, :integer\
  end\
end\
```\
\
**Tại sao không viết SQL trực tiếp:**\
- Version control được (mỗi migration là 1 file commit-able).\
- Portable: `change` method tự sinh SQL cho mọi DB (PostgreSQL/MySQL/SQLite).\
- Team sync: `rails db:migrate` áp đúng những migration chưa chạy.\
- Rollback an toàn: `rails db:rollback` undo migration gần nhất.

## Detailed Answer (EN)
A migration is a Ruby class that describes a **DB schema change** over time — it can be applied (`up`/`change`) or rolled back (`down`).\
\
```ruby\
class AddAgeToUsers \u003c ActiveRecord::Migration[7.1]\
  def change\
    add_column :users, :age, :integer\
  end\
end\
```\
\
**Why not raw SQL:**\
- Version-controlled (each migration is a committable file).\
- Portable: the `change` method auto-generates SQL for any DB engine (PostgreSQL/MySQL/SQLite).\
- Team sync: `rails db:migrate` applies only migrations not yet run.\
- Safe rollback: `rails db:rollback` undoes the most recent migration.
