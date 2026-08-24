---
id: background-tasks-vs-celery-khi-nao-dung-cai-nao
position: backend
technology: fastapi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Background Tasks vs Celery — khi nào dùng cái nào?

## Question (EN)
Background Tasks vs Celery — when to use each?

## Đáp án chi tiết (VI)
Background Tasks: zero config, in-process, chạy sau khi response trả về client. Dùng cho: email xác nhận đơn giản, logging, non-critical async work. Celery: cần Redis/RabbitMQ broker, distributed workers, retry logic, monitoring với Flower. Dùng cho: payment processing, report generation, critical tasks cần retry. Lưu ý: Background Tasks bị mất nếu server restart — Celery persist tasks trong broker.

## Detailed Answer (EN)
Background Tasks: zero config, in-process, runs after response is sent. Use for: simple emails, logging, non-critical work. Celery: needs Redis/RabbitMQ, distributed workers, retry, Flower monitoring. Use for: payments, reports, critical tasks needing retry. Pitfall: BackgroundTasks are lost on server restart — Celery persists in broker.
