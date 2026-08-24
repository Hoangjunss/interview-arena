---
id: transactional-outbox-pattern-la-gi-tai-sao-can-thiet-khi-dung-kafka-voi-database
position: backend
technology: architecture-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transactional Outbox Pattern là gì? Tại sao cần thiết khi dùng Kafka với database?

## Question (EN)
What is the Transactional Outbox Pattern? Why is it necessary when using Kafka with a database?

## Đáp án chi tiết (VI)
Vấn đề: khi một service cần cập nhật DB và publish event lên Kafka trong cùng một operation, nếu không có coordination: DB commit thành công nhưng Kafka publish fail → inconsistency (event mất); hoặc Kafka publish thành công nhưng DB rollback → inconsistency (event giả). Hai thao tác này không thể wrap trong 2-phase commit thực tế. **Outbox pattern** giải quyết bằng cách: (1) Trong cùng DB transaction, write business data VÀ write event vào bảng `outbox` trong DB; (2) Một separate process (Outbox Processor/CDC) đọc bảng outbox và publish lên Kafka; (3) Sau khi publish thành công, đánh dấu event là processed (hoặc xóa). Implement bằng Debezium CDC (capture thay đổi outbox table trực tiếp từ DB transaction log) → zero-polling-delay. Nhược điểm: thêm độ phức tạp, publish có thể bị delay nhỏ. Đây là pattern bắt buộc trong distributed system production-grade.

## Detailed Answer (EN)
The problem: when a service needs to update a database and publish an event to Kafka in the same operation, without coordination either outcome can occur: the DB commit succeeds but the Kafka publish fails → inconsistency (lost event); or the Kafka publish succeeds but the DB transaction rolls back → inconsistency (phantom event). These two operations cannot practically be wrapped in a 2-phase commit. **The Outbox pattern** solves this by: (1) within a single DB transaction, writing both the business data AND the event to an `outbox` table in the same DB; (2) a separate process (Outbox Processor/CDC) reads the outbox table and publishes events to Kafka; (3) after a successful publish, marking the event as processed (or deleting it). The most efficient implementation uses Debezium CDC to capture outbox table changes directly from the DB transaction log → zero polling delay. Drawbacks: added complexity and a small publish delay. This is a mandatory pattern in production-grade distributed systems.
