---
id: event-trong-laravel-la-gi-va-cach-su-dung
position: backend
technology: laravel-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event trong Laravel là gì và cách sử dụng?

## Question (EN)
What are Laravel events and how do you use them?

## Đáp án chi tiết (VI)
Event cho phép giao tiếp loosely coupled—khi điều gì đó xảy ra (event UserCreated), các listener phản ứng. Tạo event: `php artisan make:event UserCreated` với property `public $user`. Tạo listener: `php artisan make:listener SendWelcomeEmail --event=UserCreated`. Dispatch từ model: `UserCreated::dispatch($user)`. Listener thực thi đồng bộ theo mặc định, hoặc queue với `implements ShouldQueue`. Event tách biệt code—logic tạo user không biết về email, notification. **Laravel 11+**: `EventServiceProvider` đã bị xóa—listener đăng ký trong `AppServiceProvider` qua `Event::listen()` hoặc dùng auto-discovery (event discovery tự động).

## Detailed Answer (EN)
Events enable decoupled communication—when something happens (UserCreated event), listeners react. Create event: `php artisan make:event UserCreated` with `public $user` property. Create listener: `php artisan make:listener SendWelcomeEmail --event=UserCreated`. Dispatch from model: `UserCreated::dispatch($user)`. Listeners execute synchronously by default, or queue with `implements ShouldQueue`. Events decouple code—user creation logic doesn't know about emails, notifications. **Laravel 11+**: `EventServiceProvider` was removed — listeners are registered in `AppServiceProvider` via `Event::listen()` or use automatic event discovery.
