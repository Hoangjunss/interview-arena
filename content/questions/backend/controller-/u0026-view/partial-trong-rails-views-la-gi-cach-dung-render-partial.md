---
id: partial-trong-rails-views-la-gi-cach-dung-render-partial
position: backend
technology: controller-\u0026-view
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Partial trong Rails Views là gì? Cách dùng `render` partial?

## Question (EN)
What are partials in Rails Views? How do you render a partial?

## Đáp án chi tiết (VI)
Partial là fragment ERB tái sử dụng — file tên bắt đầu bằng `_` (underscore).\
\
```erb\
\u003c%# app/views/posts/_post.html.erb %\u003e\
\u003carticle\u003e\
  \u003ch2\u003e\u003c%= post.title %\u003e\u003c/h2\u003e\
  \u003cp\u003e\u003c%= post.body %\u003e\u003c/p\u003e\
\u003c/article\u003e\
```\
\
```erb\
\u003c%# app/views/posts/index.html.erb %\u003e\
\u003c%= render @posts %\u003e          \u003c%# Rails tự render _post.html.erb cho mỗi item %\u003e\
\u003c%= render partial: \\"post\\

## Detailed Answer (EN)
A partial is a reusable ERB fragment — its filename starts with `_` (underscore).\
\
```erb\
\u003c%# app/views/posts/_post.html.erb %\u003e\
\u003carticle\u003e\
  \u003ch2\u003e\u003c%= post.title %\u003e\u003c/h2\u003e\
  \u003cp\u003e\u003c%= post.body %\u003e\u003c/p\u003e\
\u003c/article\u003e\
```\
\
```erb\
\u003c%# app/views/posts/index.html.erb %\u003e\
\u003c%= render @posts %\u003e          \u003c%# Rails auto-renders _post.html.erb for each item %\u003e\
\u003c%= render partial: \\"post\\
