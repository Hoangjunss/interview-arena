---
id: fanout-exchange-hoat-dong-nhu-the-nao
position: backend
technology: exchange-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Fanout exchange hoạt động như thế nào?

## Question (EN)
How does a fanout exchange work?

## Đáp án chi tiết (VI)
Fanout exchange bỏ qua hoàn toàn routing_key và broadcast mọi message đến tất cả queue đã bind, tạo giao tiếp one-to-many. Nếu có 3 queue bind vào fanout exchange, mỗi queue nhận một bản sao y hệt của mọi message. Fanout lý tưởng cho notification: sự kiện \\"user signup\\" gửi đến cả email service, SMS service, và logging service cùng lúc. Đây là exchange đơn giản nhất vì logic định tuyến trivial — tất cả hoặc không có gì.

## Detailed Answer (EN)
A fanout exchange ignores routing keys entirely and broadcasts every message to all bound queues, creating one-to-many communication. If three queues are bound, each receives an identical copy of every message. Fanout is ideal for notifications where multiple independent systems need the same event — like sending user signup to email, SMS, and logging services simultaneously.
