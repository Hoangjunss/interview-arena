---
id: rack-la-gi-rails-lien-quan-den-rack-nhu-the-nao
position: backend
technology: nhập-môn
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rack là gì? Rails liên quan đến Rack như thế nào?

## Question (EN)
What is Rack? How does Rails relate to Rack?

## Đáp án chi tiết (VI)
Rack là interface chuẩn giữa Ruby web framework và web server (Puma, Unicorn, Passenger). Mọi Rack app là một object có method `call(env)` trả về `[status, headers, body]`.\
\
Rails là một **Rack application** — khi Puma nhận request, nó gọi Rails app qua Rack interface.\
\
```ruby\
# config.ru — entry point Rack\
require_relative \\"config/environment\\"\
run Rails.application\
```\
\
**Middleware stack:** Rails dùng Rack middleware chaining — mỗi middleware wrap request/response (logging, CSRF check, session, gzip compression, ...). Xem bằng `rails middleware`.\
\
Hiểu Rack giúp debug middleware, viết custom middleware, và tích hợp với các Rack-compatible library như Warden (Devise dùng bên dưới).

## Detailed Answer (EN)
Rack is a standard interface between Ruby web frameworks and web servers (Puma, Unicorn, Passenger). Every Rack app is an object with a `call(env)` method that returns `[status, headers, body]`.\
\
Rails is a **Rack application** — when Puma receives a request it calls the Rails app via the Rack interface.\
\
```ruby\
# config.ru — Rack entry point\
require_relative \\"config/environment\\"\
run Rails.application\
```\
\
**Middleware stack:** Rails uses Rack middleware chaining — each middleware wraps the request/response (logging, CSRF check, session, gzip, ...). Inspect with `rails middleware`.\
\
Understanding Rack helps debug middleware, write custom middleware, and integrate Rack-compatible libraries like Warden (used under the hood by Devise).
