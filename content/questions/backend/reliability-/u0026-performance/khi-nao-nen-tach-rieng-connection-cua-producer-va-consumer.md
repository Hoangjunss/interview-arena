---
id: khi-nao-nen-tach-rieng-connection-cua-producer-va-consumer
position: backend
technology: reliability-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên tách riêng connection của producer và consumer?

## Question (EN)
When should you separate producer and consumer connections?

## Đáp án chi tiết (VI)
Trong môi trường high-throughput, nên dùng TCP connection riêng: một cho producer, một cho consumer. Khi dùng chung connection, backpressure từ phía producer (quá nhiều message) có thể block consumer gửi ack về broker, gây deadlock. Với connection riêng, consumer ack độc lập không bị ảnh hưởng bởi producer flow. Với ứng dụng traffic thấp, một connection với nhiều channel là ổn. Best practice production: connection riêng cho publisher và consumer, mỗi bên có thread pool và connection pool phù hợp.

## Detailed Answer (EN)
In high-throughput scenarios, use separate TCP connections: one for producers, one for consumers. On the same connection, producer backpressure can block consumers from sending acks, creating a deadlock. With separate connections, consumers ack independently. For low-traffic apps, one connection with multiple channels is fine. Production best practice: always separate publisher and consumer connections.
