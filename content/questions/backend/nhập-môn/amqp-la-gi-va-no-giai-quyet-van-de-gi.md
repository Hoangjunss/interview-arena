---
id: amqp-la-gi-va-no-giai-quyet-van-de-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
AMQP là gì và nó giải quyết vấn đề gì?

## Question (EN)
What is AMQP and what problem does it solve?

## Đáp án chi tiết (VI)
AMQP (Advanced Message Queuing Protocol) là giao thức nhị phân tiêu chuẩn hóa cho message-oriented middleware, giúp các ứng dụng và ngôn ngữ lập trình khác nhau có thể giao tiếp đáng tin cậy. Nó giải quyết vấn đề vendor lock-in và không tương thích: ứng dụng Python có thể gửi message mà ứng dụng Java consume được mà không cần tầng chuyển đổi riêng. AMQP đảm bảo tính interoperability giữa các client bất kể ngôn ngữ hay hệ điều hành.\
\
RabbitMQ sử dụng **AMQP 0-9-1** là protocol chính. **AMQP 1.0** là tiêu chuẩn ISO hoàn toàn khác — được hỗ trợ trong RabbitMQ 4.0 (built-in, không cần plugin riêng).

## Detailed Answer (EN)
AMQP (Advanced Message Queuing Protocol) is a standardized binary protocol for message-oriented middleware enabling applications in different languages to communicate reliably. It solves vendor lock-in and incompatibility — a Python app can send messages that a Java app consumes with no custom translation.\
\
Note: RabbitMQ primarily uses **AMQP 0-9-1**. AMQP 1.0 is a completely separate ISO-standardized standard, also supported starting RabbitMQ 4.0 (now built-in).
