---
id: broadcasting-trong-laravel-la-gi-va-khi-nao-nen-dung
position: backend
technology: laravel-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Broadcasting trong Laravel là gì và khi nào nên dùng?

## Question (EN)
What is broadcasting in Laravel and when do you use it?

## Đáp án chi tiết (VI)
Broadcasting gửi dữ liệu thời gian thực đến client kết nối qua WebSocket. Tạo channel: `php artisan make:channel OrderChannel` xác định ai có thể lắng nghe. Broadcast event trong controller: `broadcast(new OrderShipped($order))`. Frontend dùng Laravel Echo đăng ký: `Echo.channel(\\"order.\\" + orderId).listen(\\"OrderShipped\\

## Detailed Answer (EN)
Broadcasting sends real-time data to connected clients via WebSockets. Create channel: `php artisan make:channel OrderChannel` authorizing who can listen. Broadcast event in controller: `broadcast(new OrderShipped($order))`. Frontend with Laravel Echo subscribes: `Echo.channel(\\"order.\\" + orderId).listen(\\"OrderShipped\\
