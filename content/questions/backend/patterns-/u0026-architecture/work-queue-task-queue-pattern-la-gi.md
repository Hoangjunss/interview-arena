---
id: work-queue-task-queue-pattern-la-gi
position: backend
technology: patterns-\u0026-architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Work queue (task queue) pattern là gì?

## Question (EN)
Explain the work queue (task queue) pattern.

## Đáp án chi tiết (VI)
Work queue pattern phân phối các tác vụ dài hạn cho nhiều worker: producer gửi task vào một queue duy nhất, nhiều consumer cùng lắng nghe, RabbitMQ round-robin message giữa chúng. Nếu worker crash giữa chừng, message requeue sang worker khác. Dùng cho: resize ảnh, gửi email, tạo report, xuất PDF. Implementation: producer → direct exchange → một queue; consumer dùng prefetch=1 để phân phối công bằng, manual ack để đảm bảo xử lý thành công, DLX cho message fail. Scale bằng cách thêm worker instance.

## Detailed Answer (EN)
Work queue distributes long-running tasks among multiple workers: producer sends tasks to a single queue, multiple consumers listen, RabbitMQ round-robins messages. If a worker crashes, the message requeues to another. Use for image resizing, email sending, PDF generation. Implementation: prefetch=1 for fair distribution, manual ack for guaranteed processing, DLX for failures. Scale horizontally by adding more workers.
