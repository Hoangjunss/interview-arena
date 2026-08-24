---
id: active-job-la-gi-tai-sao-can-xu-ly-background-job-trong-rails
position: backend
technology: testing-\u0026-job
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Active Job là gì? Tại sao cần xử lý background job trong Rails?

## Question (EN)
What is Active Job? Why is background job processing needed in Rails?

## Đáp án chi tiết (VI)
Active Job là interface thống nhất để tạo và enqueue background jobs — có thể chạy với nhiều backend (Sidekiq, Resque, GoodJob) mà không đổi code job.\
\
**Tại sao cần:** một số tác vụ không nên chạy trong HTTP request vì tốn thời gian hoặc dễ fail (gửi email, resize ảnh, gọi API bên ngoài, generate report).\
\
```ruby\
class WelcomeEmailJob \u003c ApplicationJob\
  queue_as :default\
\
  def perform(user_id)\
    user = User.find(user_id)\
    UserMailer.welcome(user).deliver_now\
  end\
end\
\
WelcomeEmailJob.perform_later(user.id)                       # async\
WelcomeEmailJob.set(wait: 5.minutes).perform_later(user.id)  # delayed\
```\
\
Lưu `user.id` thay vì object — object có thể stale khi job thực thi.

## Detailed Answer (EN)
Active Job is a unified interface for creating and enqueuing background jobs — it can run with different backends (Sidekiq, Resque, GoodJob) without changing the job code.\
\
**Why it's needed:** some tasks shouldn't run inline in an HTTP request because they are slow or failure-prone (sending email, resizing images, calling external APIs, generating reports).\
\
```ruby\
class WelcomeEmailJob \u003c ApplicationJob\
  queue_as :default\
\
  def perform(user_id)\
    user = User.find(user_id)\
    UserMailer.welcome(user).deliver_now\
  end\
end\
\
WelcomeEmailJob.perform_later(user.id)                       # async\
WelcomeEmailJob.set(wait: 5.minutes).perform_later(user.id)  # delayed\
```\
\
Pass `user.id` not the object — the object may be stale by the time the job runs.
