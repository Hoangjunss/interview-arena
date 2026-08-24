---
id: rabbitmq-xu-ly-backpressure-nhu-the-nao
position: backend
technology: reliability-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RabbitMQ xử lý backpressure như thế nào?

## Question (EN)
How does RabbitMQ handle backpressure?

## Đáp án chi tiết (VI)
RabbitMQ có hai cơ chế backpressure độc lập: (1) **Memory watermark** (mặc định 40% RAM): khi đạt ngưỡng, broker dừng nhận publish mới và block connection. (2) **Disk free space alarm** (mặc định 50MB free): khi disk sắp đầy, broker cũng block publishing — độc lập với memory. Cả hai đều có thể block producer đồng thời. Producer bị block sẽ gặp timeout, nên cần monitor queue depth và consumer lag để phòng ngừa. Giải pháp: thêm consumer, tối ưu throughput consumer, hoặc tăng memory/disk broker.

## Detailed Answer (EN)
RabbitMQ has two independent backpressure mechanisms: (1) **Memory watermark** (default 40% RAM): when reached, the broker stops accepting publishes and blocks producer connections. (2) **Disk free space alarm** (default 50MB free): when disk is nearly full, publishing is also blocked — independently of memory. Both can block producers simultaneously. Blocked publishers experience timeouts, so monitor queue depth and consumer lag. Solutions: add consumers, optimize throughput, or increase broker memory/disk.
