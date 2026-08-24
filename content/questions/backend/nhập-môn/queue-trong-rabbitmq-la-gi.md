---
id: queue-trong-rabbitmq-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Queue trong RabbitMQ là gì?

## Question (EN)
What is a queue in RabbitMQ?

## Đáp án chi tiết (VI)
Queue là buffer lưu trữ message do producer gửi, chờ consumer lấy và xử lý. Message được giao theo thứ tự FIFO (vào trước ra trước), dù RabbitMQ cũng hỗ trợ priority queue. Một queue có thể có nhiều consumer, RabbitMQ phân phối message theo round-robin mặc định để cân bằng tải. Message tồn tại trong queue cho đến khi được consumer acknowledge hoặc hết hạn TTL.

## Detailed Answer (EN)
A queue is a buffer storing messages from producers, waiting for consumers to retrieve and process them. Messages are delivered FIFO, though priority queues are supported. A queue can have multiple consumers, and RabbitMQ distributes messages round-robin by default for fair load balancing. Messages persist until acknowledged or expired.
