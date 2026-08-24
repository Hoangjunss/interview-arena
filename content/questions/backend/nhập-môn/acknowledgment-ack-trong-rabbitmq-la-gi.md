---
id: acknowledgment-ack-trong-rabbitmq-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Acknowledgment (ack) trong RabbitMQ là gì?

## Question (EN)
What is acknowledgment (ack) in RabbitMQ?

## Đáp án chi tiết (VI)
Acknowledgment là cách consumer báo cho RabbitMQ biết \\"tôi đã nhận và xử lý xong message này, bạn có thể xóa nó đi\\". Mặc định là auto-ack — RabbitMQ gửi xong là coi như done. Best practice là manual ack: consumer xử lý xong mới gửi ack; nếu crash trước khi ack, RabbitMQ tự động giao lại message cho consumer khác. Đây là cơ chế cốt lõi đảm bảo không mất message khi consumer gặp sự cố.

## Detailed Answer (EN)
Acknowledgment is how a consumer tells RabbitMQ \\"I've successfully processed this message, you can delete it.\\" Auto-ack marks messages delivered immediately on send regardless of processing outcome. Manual ack means the consumer sends the ack only after successful processing — if it crashes beforehand, RabbitMQ redelivers to another consumer. This prevents message loss during failures.
