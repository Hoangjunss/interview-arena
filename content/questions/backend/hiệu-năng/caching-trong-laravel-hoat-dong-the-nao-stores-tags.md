---
id: caching-trong-laravel-hoat-dong-the-nao-stores-tags
position: backend
technology: hiệu-năng
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Caching trong Laravel hoạt động thế nào (stores, tags)?

## Question (EN)
How does caching work in Laravel (stores, tags)?

## Đáp án chi tiết (VI)
Laravel cung cấp **một API `Cache` thống nhất** trên nhiều driver (store): `file`, `database`, `redis`, `memcached`, `array` (cho test), `null`. Cấu hình trong `config/cache.php` — đổi backend **không phải sửa code**.\
\
```php\
Cache::put('key', $value, now()-\u003eaddMinutes(10));\
$value = Cache::get('key', $default);\
\
// get-hoặc-tính-rồi-lưu trong một lệnh\
$users = Cache::remember('users', 600, fn () =\u003e User::all());\
\
Cache::store('redis')-\u003eput(...); // chọn store cụ thể\
```\
\
- **Cache tags** gom nhiều key thành nhóm để xoá cùng lúc: `Cache::tags(['posts'])-\u003eput(...)` rồi `Cache::tags(['posts'])-\u003eflush()`. **Chỉ `redis`/`memcached` hỗ trợ tags** — driver `file`/`database` thì không.\
- `Cache::remember` chỉ là *get-hoặc-tính-rồi-lưu*, **không** chống thundering herd: khi key hết hạn, nhiều request cùng miss vẫn cùng chạy callback.\
- **Atomic lock** (`Cache::lock`) mới là thứ chống được stampede/race — chỉ cho một tiến trình tính lại giá trị, các request khác chờ hoặc dùng bản cũ.

## Detailed Answer (EN)
$82
