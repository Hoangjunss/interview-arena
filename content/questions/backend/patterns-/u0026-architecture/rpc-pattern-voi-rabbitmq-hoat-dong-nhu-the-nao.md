---
id: rpc-pattern-voi-rabbitmq-hoat-dong-nhu-the-nao
position: backend
technology: patterns-\u0026-architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RPC pattern với RabbitMQ hoạt động như thế nào?

## Question (EN)
Explain the RPC (Remote Procedure Call) pattern with RabbitMQ.

## Đáp án chi tiết (VI)
RPC pattern thực hiện request-response qua RabbitMQ thay vì REST đồng bộ: client gửi message vào server queue kèm `reply_to` (tên temporary queue) và `correlation_id` (định danh duy nhất), server xử lý và publish kết quả vào `reply_to` queue, client nhận response từ đó. Tối ưu hiện đại: dùng \\"direct reply-to\\" (amq.rabbitmq.reply-to) để tránh overhead tạo queue. Phù hợp cho cross-service query khi RPC an toàn hơn REST (không timeout mạng), tích hợp async system với sync requirement.

## Detailed Answer (EN)
RPC makes request-response calls over RabbitMQ: client sends a message with `reply_to` (temporary queue name) and `correlation_id` to a server queue; server processes and publishes the result to the `reply_to` queue; client receives the response. Modern optimization: use \\"direct reply-to\\" (amq.rabbitmq.reply-to) to avoid queue creation overhead. Good for cross-service queries needing synchronous semantics.
