---
id: file-upload-va-luu-tru-trong-laravel-lam-the-nao
position: backend
technology: i-o
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File upload và lưu trữ trong Laravel làm thế nào?

## Question (EN)
How do file upload and storage work in Laravel?

## Đáp án chi tiết (VI)
Laravel Filesystem (dựa trên **Flysystem**) trừu tượng nhiều **\\"disk\\"** — `local`, `public`, `s3`... — cấu hình trong `config/filesystems.php`, và **cùng một API `Storage`** cho mọi disk. Đổi từ local sang S3 không phải sửa code nghiệp vụ.\
\
```php\
// $request-\u003efile('avatar') trả về UploadedFile\
$path = $request-\u003efile('avatar')-\u003estore('avatars', 'public');\
// =\u003e 'avatars/abc123.jpg' (tên random), URL: Storage::url($path)\
\
$request-\u003efile('doc')-\u003estoreAs('docs', $customName, 's3'); // đặt tên + chọn disk\
```\
\
- **Validate** trước khi lưu: rule `file`, `image`, `mimes:jpg,png`, `max:2048` (đơn vị **KB**).\
- File cần truy cập qua URL: dùng disk `public` rồi chạy `php artisan storage:link` (tạo symlink `storage/app/public` → `public/storage`).\
- Đọc/ghi tuỳ ý qua `Storage::disk('s3')-\u003eput(...)`, `Storage::url()`, `Storage::delete()`.\
- **Không** nhồi nội dung file vào cột DB — chỉ lưu **đường dẫn**.

## Detailed Answer (EN)
Laravel’s Filesystem (built on **Flysystem**) abstracts multiple **\\"disks\\"** — `local`, `public`, `s3`... — configured in `config/filesystems.php`, with the **same `Storage` API** for every disk. Moving from local to S3 requires no business-code change.\
\
```php\
// $request-\u003efile('avatar') returns an UploadedFile\
$path = $request-\u003efile('avatar')-\u003estore('avatars', 'public');\
// =\u003e 'avatars/abc123.jpg' (random name), URL: Storage::url($path)\
\
$request-\u003efile('doc')-\u003estoreAs('docs', $customName, 's3'); // set name + pick disk\
```\
\
- **Validate** before storing: rules `file`, `image`, `mimes:jpg,png`, `max:2048` (in **KB**).\
- For URL-accessible files: use the `public` disk then run `php artisan storage:link` (symlinks `storage/app/public` → `public/storage`).\
- Read/write freely via `Storage::disk('s3')-\u003eput(...)`, `Storage::url()`, `Storage::delete()`.\
- **Do not** cram file contents into a DB column — store only the **path**.
