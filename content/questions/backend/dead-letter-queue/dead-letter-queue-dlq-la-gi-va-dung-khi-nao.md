---
id: dead-letter-queue-dlq-la-gi-va-dung-khi-nao
position: backend
technology: dead-letter-queue
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dead letter queue (DLQ) là gì và dùng khi nào?

## Question (EN)
What is a dead letter queue (DLQ) and when is it used?

## Đáp án chi tiết (VI)
DLQ là một hàng đợi phụ chứa các message **không xử lý được** sau khi đã retry đủ số lần (sai định dạng, bug consumer, dữ liệu không hợp lệ...).\
\
Vì sao cần:\
- Tránh **poison message** làm kẹt hoặc lặp vô hạn cả hàng đợi chính.\
- **Cô lập** lỗi để hàng đợi chính vẫn chạy tiếp.\
- Giữ lại message lỗi để **điều tra, sửa, rồi replay** sau.\
\
Cách dùng: đặt ngưỡng retry (max receive count); vượt ngưỡng → chuyển message sang DLQ; gắn **alert** khi DLQ có message; định kỳ xem xét và xử lý lại. Có sẵn ở SQS và RabbitMQ; với Kafka thường tự dựng bằng một topic riêng (vd `orders.DLT`) do Kafka không có DLQ tích hợp.

## Detailed Answer (EN)
A DLQ is a side queue holding messages that **cannot be processed** after enough retries (bad format, consumer bug, invalid data...).\
\
Why it exists:\
- Prevents a **poison message** from blocking or infinitely looping the main queue.\
- **Isolates** failures so the main queue keeps flowing.\
- Retains failed messages to **investigate, fix, and replay** later.\
\
Usage: set a retry threshold (max receive count); past it, route the message to the DLQ; **alert** when the DLQ is non-empty; review and reprocess periodically. Built into SQS and RabbitMQ; with Kafka you typically build one via a dedicated topic (e.g. `orders.DLT`) since Kafka has no native DLQ.
