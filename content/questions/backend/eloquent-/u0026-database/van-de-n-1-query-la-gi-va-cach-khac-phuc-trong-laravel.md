---
id: van-de-n-1-query-la-gi-va-cach-khac-phuc-trong-laravel
position: backend
technology: eloquent-\u0026-database
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vấn đề N+1 query là gì và cách khắc phục trong Laravel?

## Question (EN)
What is the N+1 query problem and how do you fix it?

## Đáp án chi tiết (VI)
Vấn đề N+1 xảy ra khi lấy records cha rồi truy cập relationship trên từng cái. \
\
**Ví dụ:** `$users = User::all();` (1 query), sau đó `foreach($users as $user) { echo $user-\u003eposts; }` (N query thêm). Kết quả: 1+N query tổng cộng rất kém hiệu quả. Khắc phục bằng eager loading: `User::with(\\"posts\\")-\u003eget()` tải tất cả user và post chỉ trong 2 query. Chain: `User::with(\\"posts.comments\\")-\u003eget()`. Dùng `load()` để lazy eager loading: `$users-\u003eload(\\"posts\\")`. Kiểm tra bằng debugbar để xác nhận số lượng query. Eager loading rất quan trọng cho hiệu suất.

## Detailed Answer (EN)
N+1 problem happens when fetching parent records, then accessing relationship on each one. \
\
**Example:** `$users = User::all();` (1 query), then `foreach($users as $user) { echo $user-\u003eposts; }` (N additional queries). Result: 1 + N queries total is inefficient. Fix with eager loading: `User::with(\\"posts\\")-\u003eget()` loads all users AND their posts in just 2 queries. Also `with()` chaining: `User::with(\\"posts.comments\\")-\u003eget()`. Use `load()` for lazy loading: `$users-\u003eload(\\"posts\\")`. Check with debugbar to verify query count. Eager loading critical for performance.
