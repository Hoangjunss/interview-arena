---
id: event-driven-architecture-la-gi-loi-ich-va-cac-thach-thuc-khi-implement
position: system-design
technology: architecture-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event-Driven Architecture là gì? Lợi ích và các thách thức khi implement?

## Question (EN)
What is Event-Driven Architecture? What are its benefits and implementation challenges?

## Đáp án chi tiết (VI)
Event-Driven Architecture (EDA) là kiến trúc nơi các components giao tiếp với nhau qua events (notifications về điều gì đó đã xảy ra) thay vì direct API calls. Producer emit events mà không biết consumer là ai; consumer subscribe và xử lý events async – đạt được loose coupling cao. \
\
**Lợi ích:** producers và consumers hoàn toàn độc lập (có thể deploy, scale, fail độc lập), dễ thêm consumer mới mà không sửa producer, natural fit cho audit logging và event sourcing, handle high throughput tốt qua buffering. Thách thức: debugging và tracing khó hơn vì flow phi tuyến tính; eventual consistency – consumer có thể xử lý chậm hơn producer; ordering guarantees phức tạp (Kafka đảm bảo ordering trong partition); idempotency – consumer cần handle duplicate events; schema evolution khi event format thay đổi. Patterns quan trọng: dead letter queue cho failed events, event schema registry (Confluent Schema Registry), outbox pattern để đảm bảo atomicity giữa DB write và event publish.

## Detailed Answer (EN)
$83
