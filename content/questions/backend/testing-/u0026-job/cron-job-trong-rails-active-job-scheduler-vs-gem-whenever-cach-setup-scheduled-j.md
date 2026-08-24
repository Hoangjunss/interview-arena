---
id: cron-job-trong-rails-active-job-scheduler-vs-gem-whenever-cach-setup-scheduled-j
position: backend
technology: testing-\u0026-job
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cron job trong Rails — Active Job scheduler vs gem whenever? Cách setup scheduled job?

## Question (EN)
Cron jobs in Rails — `whenever` gem vs Active Job scheduler? How do you set up a scheduled job?

## Đáp án chi tiết (VI)
Rails không có built-in cron scheduler. Có hai hướng phổ biến:\
\
**1. Gem `whenever`** — viết cron syntax trong Ruby, generate crontab:\
```ruby\
# config/schedule.rb\
every 1.day, at: \\"2:00 am\\" do\
  rake \\"reports:daily\\"\
end\
\
every :hour do\
  runner \\"CleanupJob.perform_later\\"\
end\
```\
Chạy `bundle exec whenever --update-crontab` để apply. Yêu cầu server có cron daemon.\
\
**2. Sidekiq-cron / GoodJob** — scheduler chạy bên trong process Sidekiq/GoodJob, không cần crontab:\
```ruby\
# config/initializers/sidekiq.rb\
Sidekiq::Cron::Job.create(\
  name: \\"Daily report\\

## Detailed Answer (EN)
Rails has no built-in cron scheduler. Two common approaches:\
\
**1. `whenever` gem** — write cron syntax in Ruby, generates a crontab:\
```ruby\
# config/schedule.rb\
every 1.day, at: \\"2:00 am\\" do\
  rake \\"reports:daily\\"\
end\
\
every :hour do\
  runner \\"CleanupJob.perform_later\\"\
end\
```\
Run `bundle exec whenever --update-crontab` to apply. Requires a server with a cron daemon.\
\
**2. sidekiq-cron / GoodJob** — scheduler runs inside the Sidekiq/GoodJob process, no crontab needed:\
```ruby\
# config/initializers/sidekiq.rb\
Sidekiq::Cron::Job.create(\
  name: \\"Daily report\\
