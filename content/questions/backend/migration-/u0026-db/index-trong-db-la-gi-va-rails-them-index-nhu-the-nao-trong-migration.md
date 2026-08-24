---
id: index-trong-db-la-gi-va-rails-them-index-nhu-the-nao-trong-migration
position: backend
technology: migration-\u0026-db
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Index trong DB là gì và Rails thêm index như thế nào trong migration?

## Question (EN)
What is a database index and how does Rails add indexes in a migration?

## Đáp án chi tiết (VI)
Index là cấu trúc dữ liệu phụ (B-tree) giúp DB tìm kiếm nhanh theo column mà không phải scan toàn bảng.\
\
```ruby\
class AddIndexToUsersEmail \u003c ActiveRecord::Migration[7.1]\
  def change\
    add_index :users, :email, unique: true\
    add_index :posts, [:user_id, :status]  # composite index\
  end\
end\
```\
\
**Khi nào cần index:**\
- Foreign key columns (`user_id`, `post_id`) → luôn cần để JOIN nhanh.\
- Columns thường xuất hiện trong `WHERE` / `ORDER BY`.\
- `uniqueness: true` validation → cần unique index để đảm bảo ở tầng DB.\
\
**Cẩn thận:** index tăng tốc `SELECT` nhưng làm chậm `INSERT`/`UPDATE` — không index mọi column.

## Detailed Answer (EN)
An index is an auxiliary data structure (B-tree) that lets the DB find rows by column value without a full table scan.\
\
```ruby\
class AddIndexToUsersEmail \u003c ActiveRecord::Migration[7.1]\
  def change\
    add_index :users, :email, unique: true\
    add_index :posts, [:user_id, :status]  # composite index\
  end\
end\
```\
\
**When to add an index:**\
- Foreign key columns (`user_id`, `post_id`) — always needed for fast JOINs.\
- Columns frequently appearing in `WHERE` / `ORDER BY`.\
- `uniqueness: true` validations → need a unique index to enforce it at the DB level.\
\
**Caution:** indexes speed up `SELECT` but slow down `INSERT`/`UPDATE` — don't index every column.
