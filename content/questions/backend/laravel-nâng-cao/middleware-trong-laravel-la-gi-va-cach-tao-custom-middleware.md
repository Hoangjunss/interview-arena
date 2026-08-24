---
id: middleware-trong-laravel-la-gi-va-cach-tao-custom-middleware
position: backend
technology: laravel-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Middleware trong Laravel là gì và cách tạo custom middleware?

## Question (EN)
What is middleware in Laravel and how do you create custom middleware?

## Đáp án chi tiết (VI)
Middleware lọc các HTTP request/response. Tạo: `php artisan make:middleware CheckAge` với `handle($request, $next)` trả về `$next($request)`. **Laravel 11+**: không còn `app/Http/Kernel.php` — đăng ký middleware global qua `-\u003ewithMiddleware()` trong `bootstrap/app.php`; `$routeMiddleware` cũng đã bị xóa. \
\
**Ví dụ:** `Route::get(\\"/admin\\

## Detailed Answer (EN)
Middleware filters HTTP requests/responses. Create: `php artisan make:middleware CheckAge` with `handle($request, $next)` returning `$next($request)`. **Laravel 11+**: `app/Http/Kernel.php` was removed — register global middleware via `-\u003ewithMiddleware()` in `bootstrap/app.php`; `$routeMiddleware` was also removed. \
\
**Example:** `Route::get(\\"/admin\\
