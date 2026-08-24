---
id: lam-the-nao-de-xu-ly-message-bi-loi-va-retry-trong-rabbitmq
position: backend
technology: reliability-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để xử lý message bị lỗi và retry trong RabbitMQ?

## Question (EN)
How do you handle message failures and retries in RabbitMQ?

## Đáp án chi tiết (VI)
RabbitMQ không tự retry message bị lỗi — đó là nhiệm vụ của consumer. Các pattern phổ biến: (1) **Nack + requeue**: consumer bắt exception, gửi nack với requeue=true, message quay lại queue (cần cẩn thận để tránh loop vô hạn). (2) **Dead-letter + retry**: message fail → dead-letter queue → retry consumer đợi N giây rồi republish lên queue gốc. (3) **Circuit breaker**: phát hiện liên tục fail, tạm dừng consume, kiểm tra sau. Để cap số lần retry, consumer đọc header `x-death` — RabbitMQ populate header này mỗi khi message đi qua DLX. Kết hợp manual ack, DLX, và monitoring tạo nên retry handling robust.

## Detailed Answer (EN)
RabbitMQ doesn't auto-retry — it's the consumer's responsibility. Common patterns: (1) Negative ack with requeue: catch exception, nack with requeue=true (avoid infinite loops). (2) Dead-letter with retry: message fails, goes to DLX, a retry consumer waits N seconds then republishes to the original queue. (3) Circuit breaker in consumer. To cap retries, inspect the `x-death` header — RabbitMQ populates it each time a message passes through a DLX. Combine manual ack, dead-letters, and monitoring for robust retry handling.
