---
id: binding-trong-rabbitmq-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Binding trong RabbitMQ là gì?

## Question (EN)
What is a binding in RabbitMQ?

## Đáp án chi tiết (VI)
Binding là quy tắc kết nối exchange với queue, xác định khi nào message được định tuyến từ exchange đến queue đó. Binding dùng một `routing_key` (chuỗi string) làm tiêu chí so khớp — ví dụ: bind queue \\"orders\\" vào exchange \\"direct\\" với routing_key \\"new_order\\

## Detailed Answer (EN)
A binding is a rule connecting an exchange to a queue, specifying which messages get routed there. Bindings use a `routing_key` string as matching criteria — for example, binding a \\"orders\\" queue to a \\"direct\\" exchange with routing_key \\"new_order\\" means only messages with that key reach that queue. Without bindings, exchanges have no queues to deliver to.
