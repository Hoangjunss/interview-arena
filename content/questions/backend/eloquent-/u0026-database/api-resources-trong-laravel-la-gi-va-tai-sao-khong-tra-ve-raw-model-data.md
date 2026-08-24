---
id: api-resources-trong-laravel-la-gi-va-tai-sao-khong-tra-ve-raw-model-data
position: backend
technology: eloquent-\u0026-database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
API Resources trong Laravel là gì và tại sao không trả về raw model data?

## Question (EN)
What are API Resources in Laravel and why not return raw model data?

## Đáp án chi tiết (VI)
API Resources chuyển đổi Eloquent model thành JSON response nhất quán mà không lộ schema DB. \
\
**Ví dụ:** `return UserResource::collection($users)` thay vì `return $users-\u003etoJson()`. \
\
**Lợi ích:** tự ẩn các field nhạy cảm (password, internal ID), transform format dữ liệu (snake_case sang camelCase), include relationship có điều kiện với `-\u003ewhen()`, tạo API contract ổn định cho frontend, version response độc lập với DB schema. Ngăn vô tình expose password hash, soft-deleted data. Tạo bằng: `php artisan make:resource UserResource`. Là best practice bắt buộc với bất kỳ API public nào.

## Detailed Answer (EN)
API Resources transform Eloquent models into consistent JSON responses without exposing database schema. \
\
**Example:** `return UserResource::collection($users)` vs `return $users-\u003etoJson()`. \
\
**Benefits:** automatically hide sensitive fields (passwords, internal IDs), transform data formats (snake_case to camelCase), conditionally include relationships with `-\u003ewhen()`, provide stable API contracts for frontend teams, version responses independently from DB schema. Prevents accidental exposure of password hashes, soft-deleted data. Create with: `php artisan make:resource UserResource`. Mandatory best practice for any public API.
