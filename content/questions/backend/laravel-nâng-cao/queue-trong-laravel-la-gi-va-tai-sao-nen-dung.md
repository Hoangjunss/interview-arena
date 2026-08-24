---
id: queue-trong-laravel-la-gi-va-tai-sao-nen-dung
position: backend
technology: laravel-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Queue trong Laravel là gì và tại sao nên dùng?

## Question (EN)
What are Laravel queues and why use them?

## Đáp án chi tiết (VI)
Queue trì hoãn các tác vụ tốn thời gian sang background worker. Thay vì gửi email trong request (làm chậm user), queue job: `Mail::queue(new SendEmail($user))` trả về ngay. Worker xử lý các queued job bất đồng bộ. Tạo job: `php artisan make:job ProcessPayment` với method `handle()`. Cấu hình trong `.env` với `QUEUE_CONNECTION=redis` (từ Laravel 7+; không phải `QUEUE_DRIVER` cũ). Chạy worker: `php artisan queue:work`. \
\
**Lợi ích:** response nhanh hơn, xử lý traffic spike, retry job thất bại tự động, xử lý theo thứ tự. Thiết yếu cho: gửi email, xử lý ảnh, tạo báo cáo, gọi API. Queue cải thiện UX và độ tin cậy hệ thống.

## Detailed Answer (EN)
Queues defer time-consuming tasks to background workers. Instead of sending email during request (slowing user down), queue job: `Mail::queue(new SendEmail($user))` returns immediately. Workers process queued jobs asynchronously. Create job: `php artisan make:job ProcessPayment` with `handle()` method. Configure in `.env` with `QUEUE_CONNECTION=redis` (since Laravel 7+; the old `QUEUE_DRIVER` key was removed). Run workers: `php artisan queue:work`. \
\
**Benefits:** faster responses, handle traffic spikes, retry failed jobs automatically, process tasks in order. Essential for: sending emails, image processing, report generation, API calls. Queues improve user experience and system reliability.
