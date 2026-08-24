---
id: nhieu-queue-co-the-bind-vao-cung-mot-exchange-khong
position: backend
technology: exchange-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nhiều queue có thể bind vào cùng một exchange không?

## Question (EN)
Can multiple queues bind to the same exchange?

## Đáp án chi tiết (VI)
Hoàn toàn có thể. Nhiều queue có thể bind vào cùng một exchange với các routing_key hoặc pattern khác nhau, tạo ra fan-out behavior — một message đến nhiều queue. \
\
**Ví dụ:** event \\"user.created\\" có thể gửi đến cả queue \\"email_notifications\\" lẫn queue \\"analytics\\

## Detailed Answer (EN)
Yes, absolutely. Multiple queues bind to the same exchange with different routing keys or patterns, creating fan-out behavior where one message reaches multiple queues. For example, a \\"user.created\\" event can go to both an \\"email_notifications\\" queue and an \\"analytics\\" queue, each processed independently. This is how you implement pub/sub patterns.
