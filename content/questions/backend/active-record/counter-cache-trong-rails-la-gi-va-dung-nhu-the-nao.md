---
id: counter-cache-trong-rails-la-gi-va-dung-nhu-the-nao
position: backend
technology: active-record
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Counter Cache trong Rails là gì và dùng như thế nào?

## Question (EN)
What is Counter Cache in Rails and how do you use it?

## Đáp án chi tiết (VI)
Counter Cache lưu sẵn số lượng associated records vào cột trong bảng cha — tránh phải `COUNT(*)` mỗi lần hiển thị.\
\
```ruby\
# Migration\
add_column :posts, :comments_count, :integer, default: 0\
\
# Model\
class Comment \u003c ApplicationRecord\
  belongs_to :post, counter_cache: true\
  # Rails tự increment posts.comments_count khi tạo comment\
  # và decrement khi xóa\
end\
\
# Query: không cần COUNT query nữa\
post.comments_count   # đọc từ cột, O(1)\
# vs\
post.comments.count   # SELECT COUNT(*) FROM comments WHERE post_id = ...\
```\
\
**Lưu ý:** nếu counter lệch (import trực tiếp vào DB), dùng `Post.reset_counters(post_id, :comments)` để recalculate.

## Detailed Answer (EN)
Counter Cache stores the count of associated records in a column on the parent table — avoids issuing a `COUNT(*)` query each time the count is displayed.\
\
```ruby\
# Migration\
add_column :posts, :comments_count, :integer, default: 0\
\
# Model\
class Comment \u003c ApplicationRecord\
  belongs_to :post, counter_cache: true\
  # Rails auto-increments posts.comments_count on create\
  # and decrements on destroy\
end\
\
# Query: no COUNT query needed\
post.comments_count   # reads from column, O(1)\
# vs\
post.comments.count   # SELECT COUNT(*) FROM comments WHERE post_id = ...\
```\
\
**Note:** if the counter drifts (e.g. direct DB imports), use `Post.reset_counters(post_id, :comments)` to recalculate.
