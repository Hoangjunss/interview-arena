---
id: direct-exchange-hoat-dong-nhu-the-nao
position: backend
technology: exchange-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Direct exchange hoạt động như thế nào?

## Question (EN)
How does a direct exchange work?

## Đáp án chi tiết (VI)
Direct exchange định tuyến message dựa trên khớp chính xác routing_key — so sánh routing_key của message với routing_key của binding, chỉ queue nào có binding khớp chính xác mới nhận được. \
\
**Ví dụ:** gửi message với routing_key \\"user.created\\" thì chỉ queue bind với routing_key \\"user.created\\" mới nhận, không phải \\"user.updated\\". Direct exchange phù hợp cho one-to-one communication hoặc phân phối các loại task khác nhau đến worker tương ứng.

## Detailed Answer (EN)
A direct exchange routes messages based on exact routing key matching — it compares the message's routing key against binding routing keys, and only queues with an exact match receive the message. For example, routing key \\"user.created\\" reaches only queues bound with \\"user.created\\
