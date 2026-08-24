---
id: task-scheduling-trong-laravel-la-gi
position: backend
technology: công-cụ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Task scheduling trong Laravel là gì?

## Question (EN)
What is task scheduling in Laravel?

## Đáp án chi tiết (VI)
Thay vì rải nhiều dòng cron rời rạc trên server, Laravel cho định nghĩa **lịch chạy bằng code** trong `routes/console.php` (hoặc `schedule()` của Kernel ở bản cũ).\
\
**Điểm mấu chốt:** chỉ cần **một entry cron duy nhất** trên server chạy mỗi phút, còn lại Laravel tự quyết task nào đến hạn:\
\
```cron\
* * * * * cd /path \u0026\u0026 php artisan schedule:run \u003e\u003e /dev/null 2\u003e\u00261\
```\
\
```php\
Schedule::command('report:generate')\
  -\u003edailyAt('01:00')\
  -\u003ewithoutOverlapping();  // không cho lần chạy mới chồng lên lần trước\
\
Schedule::command('emails:send')-\u003eeveryFiveMinutes();\
```\
\
Các modifier hữu ích:\
- `withoutOverlapping()` — chặn chạy chồng khi task trước chưa xong.\
- `onOneServer()` — môi trường nhiều server, chỉ **một** server chạy task.\
- `runInBackground()`, và hook `before()`/`after()`.\
\
Dev local dùng `php artisan schedule:work` để mô phỏng cron mà không cần cấu hình crontab.

## Detailed Answer (EN)
Instead of scattering messy cron lines on the server, Laravel lets you define the **schedule in code** in `routes/console.php` (or the Kernel’s `schedule()` in older versions).\
\
**Key idea:** you need just **one cron entry** on the server running every minute; Laravel decides which tasks are due:\
\
```cron\
* * * * * cd /path \u0026\u0026 php artisan schedule:run \u003e\u003e /dev/null 2\u003e\u00261\
```\
\
```php\
Schedule::command('report:generate')\
  -\u003edailyAt('01:00')\
  -\u003ewithoutOverlapping();  // don’t let a new run overlap the previous one\
\
Schedule::command('emails:send')-\u003eeveryFiveMinutes();\
```\
\
Useful modifiers:\
- `withoutOverlapping()` — prevents overlap when the prior run hasn’t finished.\
- `onOneServer()` — in a multi-server setup, only **one** server runs the task.\
- `runInBackground()`, plus `before()`/`after()` hooks.\
\
Locally, `php artisan schedule:work` simulates cron without touching crontab.
