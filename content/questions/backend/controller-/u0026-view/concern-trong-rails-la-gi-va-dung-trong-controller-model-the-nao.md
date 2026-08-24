---
id: concern-trong-rails-la-gi-va-dung-trong-controller-model-the-nao
position: backend
technology: controller-\u0026-view
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Concern trong Rails là gì và dùng trong Controller/Model thế nào?

## Question (EN)
What are Concerns in Rails and how are they used in Controllers and Models?

## Đáp án chi tiết (VI)
Concern là module được include vào nhiều class để tái sử dụng logic. Rails cung cấp `ActiveSupport::Concern` để tránh boilerplate.\
\
```ruby\
# app/controllers/concerns/authenticatable.rb\
module Authenticatable\
  extend ActiveSupport::Concern\
\
  included do\
    before_action :require_login\
  end\
\
  def require_login\
    redirect_to login_path unless current_user\
  end\
end\
\
class PostsController \u003c ApplicationController\
  include Authenticatable\
end\
```\
\
Model Concern hoạt động tương tự — thường dùng để share scope, callback, hay helper method giữa nhiều model. Concern tốt cho logic dùng ở nhiều nơi, nhưng không nên lạm dụng để \\"giấu\\" logic phức tạp.

## Detailed Answer (EN)
A Concern is a module included in multiple classes to share logic. Rails provides `ActiveSupport::Concern` to reduce boilerplate.\
\
```ruby\
# app/controllers/concerns/authenticatable.rb\
module Authenticatable\
  extend ActiveSupport::Concern\
\
  included do\
    before_action :require_login\
  end\
\
  def require_login\
    redirect_to login_path unless current_user\
  end\
end\
\
class PostsController \u003c ApplicationController\
  include Authenticatable\
end\
```\
\
Model Concerns work the same way — commonly used to share scopes, callbacks, or helper methods across models. Concerns are useful for logic shared in many places, but shouldn't be overused to \\"hide\\" complex logic.
