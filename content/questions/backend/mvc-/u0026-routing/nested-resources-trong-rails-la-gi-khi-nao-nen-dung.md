---
id: nested-resources-trong-rails-la-gi-khi-nao-nen-dung
position: backend
technology: mvc-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nested resources trong Rails là gì? Khi nào nên dùng?

## Question (EN)
What are nested resources in Rails? When should you use them?

## Đáp án chi tiết (VI)
Nested resources biểu diễn quan hệ cha-con trong URL: `/posts/:post_id/comments` — comment luôn thuộc về 1 post cụ thể.\
\
```ruby\
# config/routes.rb\
resources :posts do\
  resources :comments, only: [:index, :create, :destroy]\
end\
```\
\
Route được tạo: `GET /posts/:post_id/comments`, `POST /posts/:post_id/comments`, ...\
\
Trong `CommentsController`, lấy post qua `Post.find(params[:post_id])` rồi build comment từ `@post.comments`.\
\
**Best practice:** chỉ nest 1 cấp — `/posts/:post_id/comments` OK, nhưng nest sâu hơn khó đọc và khó maintain.

## Detailed Answer (EN)
Nested resources express parent-child relationships in URLs: `/posts/:post_id/comments` — a comment always belongs to a specific post.\
\
```ruby\
# config/routes.rb\
resources :posts do\
  resources :comments, only: [:index, :create, :destroy]\
end\
```\
\
Generated routes: `GET /posts/:post_id/comments`, `POST /posts/:post_id/comments`, etc.\
\
In `CommentsController`, load the parent via `Post.find(params[:post_id])` then build the child with `@post.comments.build(...)`.\
\
**Best practice:** only nest one level — `/posts/:post_id/comments` is fine, but going deeper is hard to read and maintain.
