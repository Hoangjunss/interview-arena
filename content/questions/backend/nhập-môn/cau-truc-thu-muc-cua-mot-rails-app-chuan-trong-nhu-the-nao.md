---
id: cau-truc-thu-muc-cua-mot-rails-app-chuan-trong-nhu-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cấu trúc thư mục của một Rails app chuẩn trông như thế nào?

## Question (EN)
What does the standard Rails application directory structure look like?

## Đáp án chi tiết (VI)
Các thư mục quan trọng cần biết:\
\
```\
app/\
  controllers/   # Controller classes\
  models/        # Model classes (Active Record)\
  views/         # ERB templates\
  jobs/          # Active Job classes\
  mailers/       # Action Mailer classes\
config/\
  routes.rb      # Toàn bộ định nghĩa route\
  database.yml   # Cấu hình DB (dev/test/prod)\
db/\
  schema.rb      # Schema hiện tại (auto-generated)\
  migrate/       # Migration files\
test/ (hoặc spec/)  # Tests\
Gemfile         # Dependencies\
```\
\
CoC quy định: model `User` → file `app/models/user.rb` → bảng DB `users`. Không cần khai báo mapping — Rails suy ra từ tên.

## Detailed Answer (EN)
Key directories to know:\
\
```\
app/\
  controllers/   # Controller classes\
  models/        # Model classes (Active Record)\
  views/         # ERB templates\
  jobs/          # Active Job classes\
  mailers/       # Action Mailer classes\
config/\
  routes.rb      # All route definitions\
  database.yml   # DB config (dev/test/prod)\
db/\
  schema.rb      # Current schema (auto-generated)\
  migrate/       # Migration files\
test/ (or spec/)  # Tests\
Gemfile          # Dependencies\
```\
\
CoC dictates: model `User` → file `app/models/user.rb` → DB table `users`. No explicit mapping needed — Rails infers it from the name.
