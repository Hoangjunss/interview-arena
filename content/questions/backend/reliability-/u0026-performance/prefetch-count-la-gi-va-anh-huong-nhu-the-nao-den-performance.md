---
id: prefetch-count-la-gi-va-anh-huong-nhu-the-nao-den-performance
position: backend
technology: reliability-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prefetch count là gì và ảnh hưởng như thế nào đến performance?

## Question (EN)
What is prefetch count and how does it affect performance?

## Đáp án chi tiết (VI)
Prefetch count (QoS setting) giới hạn số message chưa ack mà RabbitMQ gửi cho consumer cùng lúc — nếu prefetch là 1, broker chờ ack trước khi gửi message tiếp. Prefetch cao (ví dụ 1000) cho throughput nhanh hơn nhưng tốn bộ nhớ và rủi ro mất nhiều message nếu consumer crash. Prefetch thấp (1) an toàn hơn, phân phối đều hơn nhưng latency cao hơn. Best practice: prefetch = số thread worker trong consumer (ví dụ prefetch 10 cho 10 thread), cân bằng giữa throughput và safety.

## Detailed Answer (EN)
Prefetch count (QoS) limits how many unacknowledged messages RabbitMQ sends to a consumer at once — prefetch of 1 means the broker waits for an ack before sending the next. High prefetch (1000) gives faster throughput but higher memory use and crash risk. Low prefetch (1) is safer with more even distribution but higher latency. Best practice: prefetch = number of worker threads.
