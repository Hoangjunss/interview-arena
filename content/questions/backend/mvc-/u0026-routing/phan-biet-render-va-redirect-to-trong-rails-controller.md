---
id: phan-biet-render-va-redirect-to-trong-rails-controller
position: backend
technology: mvc-\u0026-routing
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `render` và `redirect_to` trong Rails Controller.

## Question (EN)
What is the difference between `render` and `redirect_to` in a Rails Controller?

## Đáp án chi tiết (VI)
`render` dựng view ngay trong request hiện tại — không tạo request mới, URL giữ nguyên, instance variables vẫn còn.\
`redirect_to` gửi HTTP 302, bảo browser **tạo request mới** đến URL khác — controller hiện tại kết thúc, action mới chạy từ đầu.\
\
**Lỗi thường gặp:** dùng `render` sau POST tạo record → F5 submit lại form (double-submit). Quy tắc **PRG (Post → Redirect → Get):** sau POST thành công luôn dùng `redirect_to`.\
\
```ruby\
def create\
  @post = Post.new(post_params)\
  if @post.save\
    redirect_to @post, notice: \\"Tạo thành công!\\"\
  else\
    render :new, status: :unprocessable_entity  # giữ lại lỗi validation\
  end\
end\
```

## Detailed Answer (EN)
`render` builds the view within the current request — no new request, URL stays the same, instance variables remain intact.\
`redirect_to` sends an HTTP 302, telling the browser to **make a new request** to another URL — the current controller finishes, and the new action starts from scratch.\
\
**Classic mistake:** using `render` after a successful POST → refreshing resubmits the form (double-submit). **PRG rule (Post → Redirect → Get):** after a successful POST always use `redirect_to`.\
\
```ruby\
def create\
  @post = Post.new(post_params)\
  if @post.save\
    redirect_to @post, notice: \\"Created successfully!\\"\
  else\
    render :new, status: :unprocessable_entity  # preserve validation errors\
  end\
end\
```
