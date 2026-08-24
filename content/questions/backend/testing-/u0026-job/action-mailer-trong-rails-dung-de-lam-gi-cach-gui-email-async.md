---
id: action-mailer-trong-rails-dung-de-lam-gi-cach-gui-email-async
position: backend
technology: testing-\u0026-job
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Action Mailer trong Rails dùng để làm gì? Cách gửi email async?

## Question (EN)
What is Action Mailer in Rails? How do you send emails asynchronously?

## Đáp án chi tiết (VI)
Action Mailer cho phép tạo và gửi email từ Rails, tương tự như Controller nhưng cho email.\
\
```ruby\
# app/mailers/user_mailer.rb\
class UserMailer \u003c ApplicationMailer\
  default from: \\"no-reply@example.com\\"\
\
  def welcome(user)\
    @user = user\
    mail(to: @user.email, subject: \\"Chào mừng bạn!\\")\
  end\
end\
\
# Gửi sync (trong request) — chặn response\
UserMailer.welcome(user).deliver_now\
\
# Gửi async qua Active Job — không chặn\
UserMailer.welcome(user).deliver_later\
```\
\
View nằm ở `app/views/user_mailer/welcome.html.erb`. Test với `ActionMailer::Base.deliveries` (test mode tích hợp sẵn).

## Detailed Answer (EN)
Action Mailer lets you create and send emails from Rails, similar to a Controller but for email.\
\
```ruby\
# app/mailers/user_mailer.rb\
class UserMailer \u003c ApplicationMailer\
  default from: \\"no-reply@example.com\\"\
\
  def welcome(user)\
    @user = user\
    mail(to: @user.email, subject: \\"Welcome!\\")\
  end\
end\
\
# Send sync (in request) — blocks response\
UserMailer.welcome(user).deliver_now\
\
# Send async via Active Job — non-blocking\
UserMailer.welcome(user).deliver_later\
```\
\
The view lives at `app/views/user_mailer/welcome.html.erb`. Test using `ActionMailer::Base.deliveries` (built-in test mode).
