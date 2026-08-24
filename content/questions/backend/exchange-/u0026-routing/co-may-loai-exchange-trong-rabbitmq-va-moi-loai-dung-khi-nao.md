---
id: co-may-loai-exchange-trong-rabbitmq-va-moi-loai-dung-khi-nao
position: backend
technology: exchange-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có mấy loại exchange trong RabbitMQ và mỗi loại dùng khi nào?

## Question (EN)
What are the four main exchange types in RabbitMQ?

## Đáp án chi tiết (VI)
Có 4 loại exchange chính: (1) **Direct** — định tuyến dựa trên exact match routing_key, dùng phân phối task đến worker cụ thể; (2) **Fanout** — broadcast mọi message đến tất cả queue đã bind bất kể routing_key, dùng cho notification; (3) **Topic** — định tuyến theo pattern wildcard (* khớp một từ, # khớp không hoặc nhiều từ), dùng cho hệ thống event phân cấp; (4) **Headers** — định tuyến theo header attribute thay vì routing_key, dùng khi logic phức tạp. Thực tế hay dùng Direct và Topic nhất.

## Detailed Answer (EN)
Four exchange types: (1) Direct — exact routing key match, for task distribution to specific workers; (2) Fanout — broadcasts to all bound queues regardless of routing key, for notifications; (3) Topic — wildcard pattern matching (* = one word, # = zero or more), for hierarchical events; (4) Headers — routes by message headers, for complex routing logic. Direct and Topic are most commonly used in practice.
