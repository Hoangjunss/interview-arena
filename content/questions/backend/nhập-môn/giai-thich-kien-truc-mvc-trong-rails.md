---
id: giai-thich-kien-truc-mvc-trong-rails
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích kiến trúc MVC trong Rails.

## Question (EN)
Explain the MVC architecture in Rails.

## Đáp án chi tiết (VI)
Rails chia ứng dụng thành 3 tầng:\
\
| Tầng | Trách nhiệm | Ví dụ |\
|---|---|---|\
| **Model** | Dữ liệu + business logic; giao tiếp DB qua Active Record | `app/models/user.rb` |\
| **View** | Trình bày HTML cho người dùng (ERB/Haml/Slim) | `app/views/users/show.html.erb` |\
| **Controller** | Nhận request, gọi model, chọn view để render | `app/controllers/users_controller.rb` |\
\
**Luồng một request:**\
```\
Browser → Router → Controller#action → Model → DB\
                                     ↓\
                              View (render HTML) → Browser\
```\
\
MVC giúp tách biệt concern: UI thay đổi không ảnh hưởng logic DB, business rules không rò rỉ vào template.

## Detailed Answer (EN)
Rails divides an application into three layers:\
\
| Layer | Responsibility | Example |\
|---|---|---|\
| **Model** | Data + business logic; communicates with DB via Active Record | `app/models/user.rb` |\
| **View** | Renders HTML for the user (ERB/Haml/Slim) | `app/views/users/show.html.erb` |\
| **Controller** | Receives request, calls model, selects view to render | `app/controllers/users_controller.rb` |\
\
**Request lifecycle:**\
```\
Browser → Router → Controller#action → Model → DB\
                                     ↓\
                              View (render HTML) → Browser\
```\
\
MVC enforces separation of concerns: UI changes don't affect DB logic, and business rules don't leak into templates.
