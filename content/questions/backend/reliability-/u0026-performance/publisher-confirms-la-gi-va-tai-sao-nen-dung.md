---
id: publisher-confirms-la-gi-va-tai-sao-nen-dung
position: backend
technology: reliability-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Publisher confirms là gì và tại sao nên dùng?

## Question (EN)
What are publisher confirms and why use them?

## Đáp án chi tiết (VI)
Publisher confirms là tương đương consumer ack nhưng ở phía producer: khi bật, RabbitMQ gửi ack cho producer sau khi message được route vào queue (hoặc persist nếu durable). Không có confirms, producer không có guarantee message đến được broker. Với confirms, producer chờ (hoặc handle async) ack trước khi coi publish thành công — nếu timeout, retry. Đánh đổi: confirms tăng latency nhưng ngăn mất message ở phía producer. Dùng cho message critical (order, payment), bỏ qua cho non-critical (analytics).

## Detailed Answer (EN)
Publisher confirms are the producer-side equivalent of consumer acks — when enabled, RabbitMQ acknowledges once the message is routed to a queue (or persisted if durable). Without confirms, producers have no guarantee their message reached the broker. With confirms, producers can retry on timeout. Trade-off: confirms add latency but prevent message loss on the producer side.
