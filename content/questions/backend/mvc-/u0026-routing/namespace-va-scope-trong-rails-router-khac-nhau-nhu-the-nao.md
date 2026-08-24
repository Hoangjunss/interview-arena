---
id: namespace-va-scope-trong-rails-router-khac-nhau-nhu-the-nao
position: backend
technology: mvc-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Namespace và Scope trong Rails Router khác nhau như thế nào?

## Question (EN)
What is the difference between `namespace` and `scope` in Rails Router?

## Đáp án chi tiết (VI)
`namespace` và `scope` đều nhóm route, nhưng ảnh hưởng khác nhau:\
\
| | `namespace :admin` | `scope :admin` |\
|---|---|---|\
| URL prefix | `/admin/posts` | `/admin/posts` |\
| Controller | `Admin::PostsController` | `PostsController` |\
| Named helper | `admin_posts_path` | `posts_path` |\
\
```ruby\
# namespace: URL + module + helper\
namespace :admin do\
  resources :posts  # Admin::PostsController\
end\
\
# scope: chỉ URL prefix, controller không đổi\
scope :v1 do\
  resources :posts  # PostsController\
end\
```\
\
Dùng `namespace` cho admin panel (muốn tất cả đều tách biệt). Dùng `scope` cho API versioning khi muốn giữ controller cũ.

## Detailed Answer (EN)
Both group routes but affect different things:\
\
| | `namespace :admin` | `scope :admin` |\
|---|---|---|\
| URL prefix | `/admin/posts` | `/admin/posts` |\
| Controller | `Admin::PostsController` | `PostsController` |\
| Named helper | `admin_posts_path` | `posts_path` |\
\
```ruby\
# namespace: URL + module + helper prefix\
namespace :admin do\
  resources :posts  # Admin::PostsController\
end\
\
# scope: URL prefix only, controller unchanged\
scope :v1 do\
  resources :posts  # PostsController\
end\
```\
\
Use `namespace` for admin panels (full separation). Use `scope` for API versioning when you want to keep existing controllers.
