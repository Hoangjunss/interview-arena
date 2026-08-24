---
id: priority-queue-trong-rabbitmq-la-gi-va-khi-nao-nen-dung
position: backend
technology: reliability-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Priority queue trong RabbitMQ là gì và khi nào nên dùng?

## Question (EN)
What are priority queues and when would you use them?

## Đáp án chi tiết (VI)
Priority queue cho phép gán mức ưu tiên cho message, message priority cao được consume trước. Khai báo queue với `x-max-priority` (khuyến nghị ≤ 10 để tránh overhead). Priority hợp lệ của message là từ 0 đến giá trị `x-max-priority` khai báo — không phải luôn luôn 0-255. Dùng cho: request hỗ trợ của VIP user ưu tiên hơn user thường, critical system alert trước routine logging, tính năng paid tier trước free tier. Giữ `x-max-priority` thấp để tránh overhead lưu trữ và memory.

## Detailed Answer (EN)
Priority queues let you assign priority levels to messages so higher-priority messages are consumed first. Declare the queue with `x-max-priority` (keep ≤ 10 for performance). Valid message priority is 0 to the declared `x-max-priority` value — not always 0-255. Use for VIP user requests, critical alerts before routine logs, paid tier before free tier. Keep `x-max-priority` low to avoid storage and memory overhead.
