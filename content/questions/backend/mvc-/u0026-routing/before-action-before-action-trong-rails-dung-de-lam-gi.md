---
id: before-action-before-action-trong-rails-dung-de-lam-gi
position: backend
technology: mvc-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Before action (`before_action`) trong Rails dùng để làm gì?

## Question (EN)
What is `before_action` in Rails and what is it used for?

## Đáp án chi tiết (VI)
`before_action` là callback chạy **trước** một hoặc nhiều action của controller — dùng để factoring logic dùng chung (authentication, authorization, load record).\
\
```ruby\
class PostsController \u003c ApplicationController\
  before_action :authenticate_user!\
  before_action :set_post, only: [:show, :edit, :update, :destroy]\
\
  def show\
    # @post đã sẵn sàng từ set_post\
  end\
\
  private\
\
  def set_post\
    @post = Post.find(params[:id])\
  end\
end\
```\
\
Nếu `before_action` gọi `render` hoặc `redirect_to`, chuỗi callback dừng và action gốc **không chạy**. Các loại khác: `after_action`, `around_action`.

## Detailed Answer (EN)
`before_action` is a callback that runs **before** one or more controller actions — used to factor out shared logic (authentication, authorization, record loading).\
\
```ruby\
class PostsController \u003c ApplicationController\
  before_action :authenticate_user!\
  before_action :set_post, only: [:show, :edit, :update, :destroy]\
\
  def show\
    # @post is already available from set_post\
  end\
\
  private\
\
  def set_post\
    @post = Post.find(params[:id])\
  end\
end\
```\
\
If a `before_action` calls `render` or `redirect_to`, the callback chain halts and the original action **does not run**. Other types: `after_action`, `around_action`.
