---
id: model-trong-laravel-la-gi-va-cach-tao-chung
position: backend
technology: eloquent-\u0026-database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Model trong Laravel là gì và cách tạo chúng?

## Question (EN)
What are Laravel models and how do you create them?

## Đáp án chi tiết (VI)
Model đại diện cho bảng database theo cách hướng đối tượng. Tạo bằng `php artisan make:model User`. Các property: `protected $table` (override tên bảng), `protected $fillable` (cột được mass-assign như name, email), `protected $hidden` (loại khỏi output như password), `protected $casts` (ép kiểu như created_at thành date). \
\
**Ví dụ:** `$user = User::create([\\"name\\" =\u003e \\"John\\

## Detailed Answer (EN)
Models represent database tables in object-oriented way. Create with `php artisan make:model User`. Properties: `protected $table` (override table name), `protected $fillable` (mass-assignable columns like name, email), `protected $hidden` (exclude from output like password), `protected $casts` (type casting like created_at as date). \
\
**Example:** `$user = User::create([\\"name\\" =\u003e \\"John\\
