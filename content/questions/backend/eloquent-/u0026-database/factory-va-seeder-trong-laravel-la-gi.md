---
id: factory-va-seeder-trong-laravel-la-gi
position: backend
technology: eloquent-\u0026-database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Factory và Seeder trong Laravel là gì?

## Question (EN)
What are database factories and seeders in Laravel?

## Đáp án chi tiết (VI)
Factory tạo dữ liệu giả để test: `php artisan make:factory UserFactory`. Định nghĩa: `public function definition() { return [\\"name\\" =\u003e $this-\u003efaker-\u003ename, \\"email\\" =\u003e $this-\u003efaker-\u003eunique()-\u003esafeEmail]; }` rồi dùng `User::factory()-\u003ecreate()` hoặc `User::factory(10)-\u003ecreate()` cho 10 bản ghi. Seeder populate database: `php artisan make:seeder UserSeeder` rồi gọi factory `User::factory(100)-\u003ecreate()` và chạy bằng `php artisan db:seed`. Thiết yếu cho development (dữ liệu giả) và testing (dữ liệu nhất quán). Factory dùng thư viện Faker để tạo dữ liệu ngẫu nhiên thực tế.

## Detailed Answer (EN)
Factories generate fake data for testing: `php artisan make:factory UserFactory`. Define: `public function definition() { return [\\"name\\" =\u003e $this-\u003efaker-\u003ename, \\"email\\" =\u003e $this-\u003efaker-\u003eunique()-\u003esafeEmail]; }` then use `User::factory()-\u003ecreate()` or `User::factory(10)-\u003ecreate()` for 10 records. Seeders populate database: `php artisan make:seeder UserSeeder` then call factory `User::factory(100)-\u003ecreate()` and run with `php artisan db:seed`. Essential for development (fake data) and testing (consistent test data). Factories use Faker library for realistic random data.
