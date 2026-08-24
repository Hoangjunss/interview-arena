---
id: cqrs-pattern-voi-kafka-command-side-va-query-side-tach-biet-nhu-the-nao
position: backend
technology: architecture-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CQRS pattern với Kafka: Command side và Query side tách biệt như thế nào?

## Question (EN)
CQRS pattern with Kafka: how are Command side and Query side separated?

## Đáp án chi tiết (VI)
CQRS (Command Query Responsibility Segregation) tách biệt model cho write (Command) và read (Query). Kafka là event bus lý tưởng để kết nối hai side: (1) **Command side**: nhận command (CreateOrder), validate, update write model (DB), publish event (OrderCreated) lên Kafka; (2) **Event consumer**: subscribe Kafka topic, xử lý event để update read model (search index, cache, materialized view phù hợp cho query); (3) **Query side**: đọc từ read model đã được optimize (Elasticsearch cho full-text search, Redis cho low-latency lookup, PostgreSQL view cho reports). Lợi ích: write và read model c"])</script><script>self.__next_f.push([1,"ó thể scale độc lập; read model optimize cho access pattern cụ thể; dễ add thêm read model mới mà không ảnh hưởng write side. **Nhược điểm:** eventual consistency — sau khi write, read model chưa update ngay (thường \u003c 100ms nhưng phải communicate với user). Cần careful UX: sau khi user tạo order, show optimistic UI thay vì đọc lại từ DB ngay.

## Detailed Answer (EN)
$88
