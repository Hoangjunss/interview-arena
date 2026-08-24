---
id: laravel-la-gi-va-no-giai-quyet-nhung-van-de-gi
position: backend
technology: laravel-cơ-bản
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Laravel là gì và nó giải quyết những vấn đề gì?

## Question (EN)
What is Laravel and what problems does it solve?

## Đáp án chi tiết (VI)
Laravel là framework PHP hiện đại với cú pháp thanh lịch và bộ công cụ phong phú cho phép phát triển ứng dụng nhanh. Nó giải quyết các vấn đề phổ biến: routing (ánh xạ URL), templating (engine Blade), truy cập database (Eloquent ORM), xác thực, validation, quản lý session và testing. Tuân theo mô hình MVC để tách biệt các mối quan tâm. Tính năng tích hợp sẵn tiết kiệm thời gian phát triển so với tự viết từ đầu. Laravel 11 (2024) đơn giản hóa đáng kể cấu trúc: bỏ `app/Http/Kernel.php`, dùng `bootstrap/app.php` để cấu hình middleware; bỏ `EventServiceProvider`, `AuthServiceProvider` — đăng ký tập trung trong `AppServiceProvider`.

## Detailed Answer (EN)
Laravel is a modern PHP web framework providing elegant syntax and rich tools for rapid application development. It solves common problems: routing (URL mapping), templating (Blade engine), database access (Eloquent ORM), authentication, validation, session management, and testing. Follows MVC pattern separating concerns. Built-in features save development time vs. writing everything from scratch. Laravel 11 (2024) significantly streamlined the structure: removed `app/Http/Kernel.php` (middleware now registered in `bootstrap/app.php` via `-\u003ewithMiddleware()`), removed `EventServiceProvider` and `AuthServiceProvider` — everything consolidated in `AppServiceProvider`.
