---
id: redis-streams-la-gi-so-sanh-voi-pub-sub-va-kafka-khi-nao-dung
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis Streams là gì? So sánh với Pub/Sub và Kafka, khi nào dùng?

## Question (EN)
What are Redis Streams? How do they compare t"])</script><script>self.__next_f.push([1,"o Pub/Sub and Kafka, and when should you use them?

## Đáp án chi tiết (VI)
Redis Streams (Redis 5.0) là log data structure lưu message theo thứ tự với persistent storage, consumer group, và message acknowledgment — lấp đầy khoảng cách giữa Pub/Sub (fire-and-forget) và Kafka (phức tạp, separate infrastructure). Mỗi message có auto-generated ID dạng `timestamp-sequence` (ví dụ: `1638000000000-0`). Consumer group trong Redis Streams tương tự Kafka: `XREADGROUP GROUP mygroup consumer1 COUNT 10 STREAMS mystream \u003e` đọc undelivered message; `XACK mystream mygroup message-id` acknowledge; `XPENDING` kiểm tra message chưa ack (để xử lý lại nếu consumer crash). `XADD stream * field1 value1` thêm message; `MAXLEN ~1000` để cap stream size. Dùng Redis Streams khi: cần reliable messaging nhưng không muốn setup Kafka, data volume vừa phải, team đã dùng Redis. Dùng Kafka khi: data volume cực lớn, cần long-term retention, multi-datacenter replication, hoặc cần Kafka ecosystem (Kafka Streams, Connect).

## Detailed Answer (EN)
$86
