---
id: service-provider-trong-laravel-la-gi
position: backend
technology: laravel-cơ-bản
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Service Provider trong Laravel là gì?

## Question (EN)
What is a service provider in Laravel?

## Đáp án chi tiết (VI)
Service Provider bootstrap các dịch vụ của ứng dụng. Có hai method chính: `register()` (bind vào container) và `boot()` (truy cập các service đã bind). \
\
**Ví dụ:** AppServiceProvider đăng ký custom service, MailServiceProvider cài đặt mail. Định nghĩa binding: `$this-\u003eapp-\u003ebind(PaymentInterface::class, StripePayment::class)`. Dùng cho: đăng ký event listener, publish config file, mở rộng tính năng. Provider chạy sớm trong lifecycle của Laravel, lý tưởng cho các tác vụ thiết lập. Tạo custom provider bằng `php artisan make:provider CustomServiceProvider`. **Laravel 11+**: mảng `providers` trong `config/app.php` đã bị xóa — package discovery tự động, custom provider đăng ký qua `AppServiceProvider` hoặc `bootstrap/providers.php`.

## Detailed Answer (EN)
Service Providers bootstrap application services. Two main methods: `register()` (bind into container) and `boot()` (access bound services). \
\
**Example:** AppServiceProvider registers custom services, MailServiceProvider sets up mail service. Define binding: `$this-\u003eapp-\u003ebind(PaymentInterface::class, StripePayment::class)`. Use for: registering event listeners, publishing config files, extending features. Providers run early in Laravel lifecycle, ideal for setup tasks. Create custom provider with `php artisan make:provider CustomServiceProvider`. **Laravel 11+**: the `providers` array in `config/app.php` was removed — packages are auto-discovered, and custom providers are registered via `AppServiceProvider` or `bootstrap/providers.php`.
