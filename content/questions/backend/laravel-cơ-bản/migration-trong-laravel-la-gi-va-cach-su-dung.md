---
id: migration-trong-laravel-la-gi-va-cach-su-dung
position: backend
technology: laravel-cơ-bản
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Migration trong Laravel là gì và cách sử dụng?

## Question (EN)
What are Laravel migrations and how do you use them?

## Đáp án chi tiết (VI)
Migration là định nghĩa schema database được quản lý bằng version control. Tạo bằng `php artisan make:migration create_users_table`. Định nghĩa bảng trong method `up()`: `Schema::create(\\"users\\

## Detailed Answer (EN)
Migrations are version-controlled database schema definitions. Create with `php artisan make:migration create_users_table`. Define tables in `up()` method: `Schema::create(\\"users\\
