---
id: content-negotiation-trong-rails-respond-to-va-respond-with-dung-nhu-the-nao
position: backend
technology: controller-\u0026-view
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Content negotiation trong Rails — `respond_to` và `respond_with` dùng như thế nào?

## Question (EN)
Content negotiation in Rails — how do you use `respond_to`?

## Đáp án chi tiết (VI)
Content negotiation cho phép một action phản hồi theo format khác nhau (HTML, JSON, XML) tùy `Accept` header hoặc URL extension.\
\
```ruby\
class PostsController \u003c ApplicationController\
  def show\
    @post = Post.find(params[:id])\
\
    respond_to do |format|\
      format.html  # render app/views/posts/show.html.erb\
      format.json { render json: @post }\
      format.xml  { render xml: @post }\
    end\
  end\
end\
```\
\
Request `GET /posts/1` → HTML. `GET /posts/1.json` hoặc header `Accept: application/json` → JSON.\
\
`respond_with` (từ gem `responders`) ngắn gọn hơn cho CRUD chuẩn nhưng ít tùy biến hơn. Với Rails API mode (`ActionController::API`), response mặc định là JSON và không cần `respond_to`.

## Detailed Answer (EN)
Content negotiation lets a single action respond in different formats (HTML, JSON, XML) based on the `Accept` header or URL extension.\
\
```ruby\
class PostsController \u003c ApplicationController\
  def show\
    @post = Post.find(params[:id])\
\
    respond_to do |format|\
      format.html  # renders app/views/posts/show.html.erb\
      format.json { render json: @post }\
      format.xml  { render xml: @post }\
    end\
  end\
end\
```\
\
`GET /posts/1` → HTML. `GET /posts/1.json` or `Accept: application/json` header → JSON.\
\
`respond_with` (via the `responders` gem) is more concise for standard CRUD but less flexible. In Rails API mode (`ActionController::API`), JSON is the default and `respond_to` is usually unnecessary.
