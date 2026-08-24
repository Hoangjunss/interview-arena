---
id: flash-messages-trong-rails-la-gi-phan-biet-flash-va-flash-now
position: backend
technology: controller-\u0026-view
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flash messages trong Rails là gì? Phân biệt `flash` và `flash.now`.

## Question (EN)
What are flash messages in Rails? What is the difference between `flash` and `flash.now`?

## Đáp án chi tiết (VI)
`flash` lưu thông báo ngắn cho **request tiếp theo** — thường dùng sau `redirect_to`.\
`flash.now` lưu cho **request hiện tại** — dùng khi `render` (không redirect).\
\
```ruby\
def create\
  @post = Post.new(post_params)\
  if @post.save\
    flash[:notice] = \\"Tạo thành công!\\"  # sẽ hiện ở request kế tiếp\
    redirect_to @post\
  else\
    flash.now[:alert] = \\"Lỗi dữ liệu!\\"  # hiện ngay trong render này\
    render :new, status: :unprocessable_entity\
  end\
end\
```\
\
Flash tự xóa sau khi được đọc — không cần clean up thủ công. Trong layout, đọc bằng `flash[:notice]` / `flash[:alert]`.

## Detailed Answer (EN)
`flash` stores a short message for the **next request** — typically used after `redirect_to`.\
`flash.now` stores it for the **current request** — used with `render` (no redirect).\
\
```ruby\
def create\
  @post = Post.new(post_params)\
  if @post.save\
    flash[:notice] = \\"Created successfully!\\"  # shown on next request\
    redirect_to @post\
  else\
    flash.now[:alert] = \\"Data error!\\"  # shown immediately in this render\
    render :new, status: :unprocessable_entity\
  end\
end\
```\
\
Flash is automatically cleared after being read — no manual cleanup needed. In the layout, read via `flash[:notice]` / `flash[:alert]`.
