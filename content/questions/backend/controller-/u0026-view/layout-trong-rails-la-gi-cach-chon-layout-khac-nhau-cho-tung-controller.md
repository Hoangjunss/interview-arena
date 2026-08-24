---
id: layout-trong-rails-la-gi-cach-chon-layout-khac-nhau-cho-tung-controller
position: backend
technology: controller-\u0026-view
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Layout trong Rails là gì? Cách chọn layout khác nhau cho từng controller?

## Question (EN)
What is a Layout in Rails? How do you select a different layout per controller?

## Đáp án chi tiết (VI)
Layout là \\"wrapper\\" HTML chứa phần chung của trang (header, footer, nav). Mặc định mọi action dùng `app/views/layouts/application.html.erb`.\
\
```erb\
\u003c%# app/views/layouts/application.html.erb %\u003e\
\u003c!DOCTYPE html\u003e\
\u003chtml\u003e\
  \u003chead\u003e...\u003c/head\u003e\
  \u003cbody\u003e\
    \u003c%= yield %\u003e  \u003c%# nội dung của từng action render vào đây %\u003e\
  \u003c/body\u003e\
\u003c/html\u003e\
```\
\
**Chọn layout theo controller:**\
```ruby\
class AdminController \u003c ApplicationController\
  layout \\"admin\\"  # dùng app/views/layouts/admin.html.erb\
end\
\
# Hoặc điều kiện:\
class PostsController \u003c ApplicationController\
  layout :choose_layout\
\
  private\
\
  def choose_layout\
    current_user\u0026.admin? ? \\"admin\\" : \\"application\\"\
  end\
end\
```\
\
Dùng `render layout: false` để render không có layout (API response JSON).

## Detailed Answer (EN)
A layout is an HTML \\"wrapper\\" containing the shared parts of a page (header, footer, nav). By default every action uses `app/views/layouts/application.html.erb`.\
\
```erb\
\u003c%# app/views/layouts/application.html.erb %\u003e\
\u003c!DOCTYPE html\u003e\
\u003chtml\u003e\
  \u003chead\u003e...\u003c/head\u003e\
  \u003cbody\u003e\
    \u003c%= yield %\u003e  \u003c%# each action's content is rendered here %\u003e\
  \u003c/body\u003e\
\u003c/html\u003e\
```\
\
**Select layout per controller:**\
```ruby\
class AdminController \u003c ApplicationController\
  layout \\"admin\\"  # uses app/views/layouts/admin.html.erb\
end\
\
# Or conditionally:\
class PostsController \u003c ApplicationController\
  layout :choose_layout\
\
  private\
\
  def choose_layout\
    current_user\u0026.admin? ? \\"admin\\" : \\"application\\"\
  end\
end\
```\
\
Use `render layout: false` to render without a layout (e.g. for JSON API responses).
