---
id: outbox-pattern-la-gi-va-tai-sao-can-dung
position: backend
technology: patterns-\u0026-architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Outbox pattern là gì và tại sao cần dùng?

## Question (EN)
What is the outbox pattern and why use it?

## Đáp án chi tiết (VI)
Outbox pattern đảm bảo message không bao giờ bị mất khi publish lên RabbitMQ đồng thời với update database. Thay vì update DB rồi publish (có thể mất message nếu publish fail), bạn ghi cả business data VÀ message vào DB trong cùng một transaction, sau đó một background job đọc outbox table và publish lên RabbitMQ. Đảm bảo: DB commit thành công thì message sẽ được publish; DB commit fail thì không có gì xảy ra. Sau khi publish thành công và nhận confirm, xóa record khỏi outbox. Thiết yếu cho event-sourced và saga architecture.

## Detailed Answer (EN)
The outbox pattern ensures messages are never lost when publishing alongside database updates. Instead of updating DB then publishing (publish can fail), write both business data AND the message to DB in one transaction, then a background job publishes from the outbox table. If DB commit succeeds, the message eventually publishes; if it fails, neither happens. After successful publish and confirm, delete the outbox record.
