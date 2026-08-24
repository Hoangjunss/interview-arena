---
id: polymorphic-association-trong-rails-la-gi-cho-vi-du-thuc-te
position: backend
technology: active-record
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Polymorphic Association trong Rails là gì? Cho ví dụ thực tế.

## Question (EN)
What is a Polymorphic Association in Rails? Give a real-world example.

## Đáp án chi tiết (VI)
Polymorphic association cho phép một model `belongs_to` nhiều model khác nhau qua cùng một association.\
\
**Ví dụ:** `Comment` có thể thuộc về `Post` hoặc `Video`.\
\
```ruby\
# Migration\
create_table :comments do |t|\
  t.text    :body\
  t.references :commentable, polymorphic: true  # tạo commentable_id + commentable_type\
end\
\
# Models\
class Comment \u003c ApplicationRecord\
  belongs_to :commentable, polymorphic: true\
end\
\
class Post \u003c ApplicationRecord\
  has_many :comments, as: :commentable\
end\
\
class Video \u003c ApplicationRecord\
  has_many :comments, as: :commentable\
end\
\
# Query\
post.comments      # Comments với commentable_type=\\"Post\\

## Detailed Answer (EN)
A polymorphic association lets a model `belongs_to` multiple other models through a single association.\
\
**Example:** `Comment` can belong to either `Post` or `Video`.\
\
```ruby\
# Migration\
create_table :comments do |t|\
  t.text    :body\
  t.references :commentable, polymorphic: true  # creates commentable_id + commentable_type\
end\
\
# Models\
class Comment \u003c ApplicationRecord\
  belongs_to :commentable, polymorphic: true\
end\
\
class Post \u003c ApplicationRecord\
  has_many :comments, as: :commentable\
end\
\
class Video \u003c ApplicationRecord\
  has_many :comments, as: :commentable\
end\
\
# Query\
post.comments      # Comments with commentable_type=\\"Post\\
