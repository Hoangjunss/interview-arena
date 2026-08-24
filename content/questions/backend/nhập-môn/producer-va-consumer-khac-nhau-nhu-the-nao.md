---
id: producer-va-consumer-khac-nhau-nhu-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Producer và consumer khác nhau như thế nào?

## Question (EN)
What is the difference between a producer and a consumer?

## Đáp án chi tiết (VI)
Producer là ứng dụng tạo và gửi message vào RabbitMQ, thường được kích hoạt bởi một sự kiện nào đó (user đăng ký, đặt hàng, v.v.). Consumer là ứng dụng nhận và xử lý message từ queue. Một ứng dụng hoàn toàn có thể đóng cả hai vai — ví dụ payment service consume message \\"order\\" và produce message \\"payment_processed\\" cho các service khác tiếp tục xử lý.

## Detailed Answer (EN)
A producer creates and sends messages to RabbitMQ, triggered by an event (user signup, order placed). A consumer receives and processes messages from a queue. One application can be both — a payment service might consume \\"order\\" messages and produce \\"payment_processed\\" messages for downstream services.
