---
id: composer-la-gi-va-laravel-dung-no-the-nao
position: backend
technology: công-cụ
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Composer là gì và Laravel dùng nó thế nào?

## Question (EN)
What is Composer and how does Laravel use it?

## Đáp án chi tiết (VI)
**Composer** là trình quản lý dependency **theo từng project** cho PHP (vai trò như npm với Node). Nó giải quyết cây phụ thuộc và tự sinh autoloader.\
\
- `composer.json` — khai báo package + ràng buộc version theo semver (`^8.0`, `~2.3`).\
- `composer.lock` — **ghim version chính xác** đã cài để build tái lập được. **Commit file này**; **không commit** thư mục `vendor/`.\
- `composer install` cài đúng theo lock; `composer update` nâng cấp và ghi lại lock.\
- Autoload **PSR-4**: `require 'vendor/autoload.php'` rồi dùng class theo namespace, không cần `require` thủ công.\
\
Laravel dựa hoàn toàn vào Composer:\
\
```bash\
composer create-project laravel/laravel my-app\
composer require laravel/sanctum\
```\
\
Package Laravel còn được nạp tự động qua **package auto-discovery** (khai báo trong `extra.laravel` của package) nên thường không cần đăng ký service provider bằng tay.

## Detailed Answer (EN)
**Composer** is PHP’s **per-project** dependency manager (the role npm plays for Node). It resolves the dependency tree and generates an autoloader.\
\
- `composer.json` — declares packages and semver version constraints (`^8.0`, `~2.3`).\
- `composer.lock` — **pins the exact installed versions** for reproducible builds. **Commit it**; **do not commit** the `vendor/` folder.\
- `composer install` installs exactly per the lock; `composer update` upgrades and rewrites the lock.\
- **PSR-4** autoloading: `require 'vendor/autoload.php'` then use classes by namespace, no manual `require`.\
\
Laravel is built entirely on Composer:\
\
```bash\
composer create-project laravel/laravel my-app\
composer require laravel/sanctum\
```\
\
Laravel packages are also loaded via **package auto-discovery** (declared in the package’s `extra.laravel`), so you usually don’t register service providers by hand.
