---
id: rails-api-mode-la-gi-khac-gi-so-voi-full-rails-app
position: backend
technology: controller-\u0026-view
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rails API mode là gì? Khác gì so với full Rails app?

## Question (EN)
What is Rails API mode? How does it differ from a full Rails app?

## Đáp án chi tiết (VI)
Rails API mode (`rails new my-api --api`) tạo app gọn hơn — bỏ các middleware và module dành riêng cho browser-based apps.\
\
**Khác biệt chính:**\
\
| | Full Rails | API Mode |\
|---|---|---|\
| Base controller | `ActionController::Base` | `ActionController::API` |\
| Middleware | Sessions, cookies, CSRF, flash | Bỏ sessions/cookies/CSRF |\
| View layer | ERB, helpers | Không có |\
| Response | HTML + JSON | JSON (mặc định) |\
\
```ruby\
# app/controllers/application_controller.rb (API mode)\
class ApplicationController \u003c ActionController::API\
end\
```\
\
Dùng API mode khi xây dựng backend cho SPA (React/Vue) hoặc mobile app. Authentication thường dùng JWT qua `Authorization: Bearer ...` header thay vì cookie session.\
\
Nếu sau cần thêm views (e.g. admin panel), có thể include lại specific modules của `ActionController::Base`.

## Detailed Answer (EN)
Rails API mode (`rails new my-api --api`) creates a leaner app — it strips middleware and modules only needed for browser-based apps.\
\
**Key differences:**\
\
| | Full Rails | API Mode |\
|---|---|---|\
| Base controller | `ActionController::Base` | `ActionController::API` |\
| Middleware | Sessions, cookies, CSRF, flash | Sessions/cookies/CSRF removed |\
| View layer | ERB, helpers | None |\
| Response | HTML + JSON | JSON (default) |\
\
```ruby\
# app/controllers/application_controller.rb (API mode)\
class ApplicationController \u003c ActionController::API\
end\
```\
\
Use API mode when building a backend for a SPA (React/Vue) or mobile app. Authentication typically uses JWT via `Authorization: Bearer ...` header instead of cookie sessions.\
\
If you later need views (e.g. an admin panel), you can re-include specific `ActionController::Base` modules.
