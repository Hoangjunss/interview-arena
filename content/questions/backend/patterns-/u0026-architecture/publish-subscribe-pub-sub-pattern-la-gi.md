---
id: publish-subscribe-pub-sub-pattern-la-gi
position: backend
technology: patterns-\u0026-architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Publish-subscribe (pub/sub) pattern là gì?

## Question (EN)
Explain the publish-subscribe (pub/sub) pattern.

## Đáp án chi tiết (VI)
Pub/sub pattern broadcast cùng một message đến nhiều consumer độc lập: producer gửi lên fanout hoặc topic exchange, nhiều queue bind vào đó, mỗi queue gửi bản sao của mình đến consumer riêng. Khác work queue — pub/sub nhân bản message, không chia. Dùng cho: hệ thống notification (gửi email, SMS, push notification độc lập nhau), phân phối event, đồng bộ dữ liệu. Scale bằng cách thêm queue và consumer mới mà không cần sửa producer.

## Detailed Answer (EN)
Pub/sub broadcasts the same message to multiple independent consumers: producer publishes to a fanout/topic exchange, multiple queues bind to it, each queue delivers its copy to its consumer(s). Unlike work queues where only one consumer gets each message, pub/sub duplicates. Use for notification systems, event distribution, data sync. Scale by adding queues and consumers without changing the producer.
