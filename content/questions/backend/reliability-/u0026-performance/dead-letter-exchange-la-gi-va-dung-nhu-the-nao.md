---
id: dead-letter-exchange-la-gi-va-dung-nhu-the-nao
position: backend
technology: reliability-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dead-letter exchange là gì và dùng như thế nào?

## Question (EN)
What is a dead-letter exchange and how would you use it?

## Đáp án chi tiết (VI)
Dead-letter exchange (DLX) là exchange đặc biệt nhận các message không thể xử lý được. RabbitMQ route message đến DLX khi: (1) `basic.reject` / `basic.nack` với `requeue=false`, (2) message hết TTL, (3) queue vượt max-length. RabbitMQ **không** tự track retry count — đó là logic phía consumer, thường qua header `x-death`. Bạn bind một queue khác vào DLX để inspect lỗi, log, gửi alert, hoặc retry với logic khác.\
\
**Ví dụ:** consumer chính fail → message vào dead-letter queue → service phân tích riêng inspect và route đến human review queue.

## Detailed Answer (EN)
A dead-letter exchange (DLX) receives messages that cannot be processed. RabbitMQ routes a message to the DLX when: (1) `basic.reject` / `basic.nack` with `requeue=false`, (2) TTL expires, (3) queue max-length overflow. RabbitMQ does **not** track retry count natively — consumers manage this via the `x-death` header. Bind another queue to inspect failures, log them, alert, or retry with different logic.\
\
**Example:** consumer fails → DLX → analyzer inspects → human review queue.
