---
id: collection-trong-laravel-la-gi-va-cach-su-dung
position: backend
technology: laravel-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Collection trong Laravel là gì và cách sử dụng?

## Question (EN)
What are Laravel collections and how do you use them?

## Đáp án chi tiết (VI)
Collection cung cấp nhiều method tiện dụng để làm việc với mảng dữ liệu. Eloquent query trả về collection: `$users = User::all();` rồi `$users-\u003emap(fn($u) =\u003e $u-\u003eemail)-\u003eunique()-\u003esort()`. Các method quan trọng: `map()` (biến đổi), `filter()` (lọc), `each()` (lặp), `pluck()` (lấy cột), `groupBy()` (nhóm), `chunk()` (chia nhỏ), `diff()` (so sánh), `merge()` (gộp). \
\
**Ví dụ:** `User::all()-\u003ewhere(\\"active\\

## Detailed Answer (EN)
Collections provide powerful methods for working with arrays. Eloquent queries return collections: `$users = User::all();` then `$users-\u003emap(fn($u) =\u003e $u-\u003eemail)-\u003eunique()-\u003esort()`. Key methods: `map()` (transform), `filter()` (select matching), `each()` (iterate), `pluck()` (extract column), `groupBy()` (group items), `chunk()` (split into groups), `diff()` (compare), `merge()` (combine). \
\
**Example:** `User::all()-\u003ewhere(\\"active\\
