---
id: message-queue-la-gi-va-khi-nao-nen-dung
position: backend
technology: messaging
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Message queue là gì và khi nào nên dùng?

## Question (EN)
What is a message queue and when should you use one?

## Đáp án chi tiết (VI)
Message queue là kênh **giao tiếp bất đồng bộ** giữa các service: **producer** đẩy message vào queue, **consumer** lấy ra xử lý; message tồn tại tới khi được xử lý.\
\
Lợi ích:\
- **Decoupling**: producer và consumer không phụ thuộc trực tiếp, không cần online cùng lúc.\
- **Buffering / load leveling**: hàng đợi hấp thụ spike, consumer xử lý theo nhịp của mình.\
- **Resilience**: message được giữ lại → retry khi lỗi, không mất việc.\
\
Dùng khi: tách tác vụ nặng khỏi luồng request (gửi mail, xử lý ảnh), làm phẳng traffic đột biến, giao tiếp giữa microservice. Ví dụ: **RabbitMQ**, **Amazon SQS** (point-to-point), **Kafka** (log/stream, throughput cao).

## Detailed Answer (EN)
A message queue is an **asynchronous communication** channel between services: a **producer** pushes messages onto the queue and a **consumer** pulls and processes them; messages persist until processed.\
\
Benefits:\
- **Decoupling**: producer and consumer do not depend on each other directly and need not be online at the same time.\
- **Buffering / load leveling**: the queue absorbs spikes; consumers work at their own pace.\
- **Resilience**: messages are retained → retry on failure, no lost work.\
\
Use it to: move heavy tasks off the request path (email, image processing), smooth traffic spikes, and connect microservices. Examples: **RabbitMQ**, **Amazon SQS** (point-to-point), **Kafka** (log/stream, high throughput).
