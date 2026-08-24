---
id: laravel-reverb-la-gi-va-khac-pusher-nhu-the-nao
position: backend
technology: laravel-nâng-cao
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Laravel Reverb là gì và khác Pusher như thế nào?

## Question (EN)
What is Laravel Reverb and how does it differ from Pusher?

## Đáp án chi tiết (VI)
Reverb là WebSocket server first-party của Laravel, ra mắt cùng Laravel 11 (2024) và hỗ trợ từ Laravel 10+ để broadcasting sự kiện real-time. Khác với Pusher (dịch vụ bên thứ ba tính phí): Reverb tự host (self-hosted), mã nguồn mở, miễn phí, và dùng cùng Broadcasting facade API nên có thể chuyển đổi mà không cần sửa code. Cấu hình trong `config/reverb.php`. Frontend vẫn dùng Laravel Echo như bình thường. \
\
**Ưu điểm:** không phụ thuộc external service, giảm chi phí, scale linh hoạt. Phù hợp cho: thông báo real-time, live dashboard, tính năng cộng tác, chat.

## Detailed Answer (EN)
Reverb is Laravel's first-party WebSocket server, launched with Laravel 11 (2024) and supports Laravel 10+ for real-time event broadcasting. Unlike Pusher (paid third-party service): Reverb is self-hosted, open-source, free, and uses the same Broadcasting facade API so you can switch without code changes. Configure in `config/reverb.php`. Frontend still uses Laravel Echo as usual. \
\
**Benefits:** no external service dependency, reduced costs, flexible scaling. Ideal for: real-time notifications, live dashboards, collaborative features, chat.
