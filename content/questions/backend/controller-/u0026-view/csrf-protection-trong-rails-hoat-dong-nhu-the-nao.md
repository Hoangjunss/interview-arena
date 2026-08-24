---
id: csrf-protection-trong-rails-hoat-dong-nhu-the-nao
position: backend
technology: controller-\u0026-view
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSRF protection trong Rails hoạt động như thế nào?

## Question (EN)
How does CSRF protection work in Rails?

## Đáp án chi tiết (VI)
CSRF (Cross-Site Request Forgery) là tấn công khiến trình duyệt nạn nhân gửi request đến server thay mặt họ.\
\
Rails bảo vệ bằng cách nhúng **authenticity token** (random string unique per session) vào mọi form. Controller kiểm tra token trước mọi non-GET request:\
\
```ruby\
class ApplicationController \u003c ActionController::Base\
  protect_from_forgery with: :exception  # default\
end\
```\
\
Request từ site khác không có token → `ActionController::InvalidAuthenticityToken` (403).\
\
**API mode:** `ActionController::API` không include CSRF protection (stateless API dùng JWT/token thay thế, không dùng session cookie).

## Detailed Answer (EN)
CSRF (Cross-Site Request Forgery) is an attack that tricks the victim's browser into sending a request to a server on their behalf.\
\
Rails defends by embedding an **authenticity token** (a random string unique per session) in every form. The controller verifies the token before every non-GET request:\
\
```ruby\
class ApplicationController \u003c ActionController::Base\
  protect_from_forgery with: :exception  # default\
end\
```\
\
Requests from other sites lack the token → `ActionController::InvalidAuthenticityToken` (403).\
\
**API mode:** `ActionController::API` excludes CSRF protection (stateless APIs use JWT/tokens instead of session cookies).
