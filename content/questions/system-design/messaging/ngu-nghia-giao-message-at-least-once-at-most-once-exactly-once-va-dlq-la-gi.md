---
id: ngu-nghia-giao-message-at-least-once-at-most-once-exactly-once-va-dlq-la-gi
position: system-design
technology: messaging
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ngữ nghĩa giao message (at-least-once, at-most-once, exactly-once) và DLQ là gì?

## Question (EN)
What are message delivery semantics (at-least-once, at-most-once, exactly-once) and a DLQ?

## Đáp án chi tiết (VI)
Ba mức đảm bảo giao message:\
- **At-most-once**: giao tối đa một lần, **có thể mất** message (không retry). Đơn giản, nhanh; hợp dữ liệu ít quan trọng (metric, log).\
- **At-least-once**: **không mất** nhưng **có thể trùng** (retry khi không chắc đã ack). Phổ biến nhất → consumer phải **idempotent** để xử lý trùng an toàn.\
- **Exactly-once**: mỗi message ảnh hưởng đúng một lần. Lý tưởng nhưng **rất khó/tốn**; thực tế thường đạt được bằng **at-least-once + dedupe idempotent** ở consumer.\
\
**Dead-letter queue (DLQ)**: hàng đợi phụ chứa message **xử lý thất bại nhiều lần** (lỗi độc/poison message). Thay vì retry vô hạn làm nghẽn queue chính, message hỏng được chuyển sang DLQ để **điều tra và xử lý riêng**, không chặn phần còn lại.

## Detailed Answer (EN)
Three delivery guarantees:\
- **At-most-once**: delivered at most once, **may be lost** (no retry). Simple and fast; fits low-value data (metrics, logs).\
- **At-least-once**: **never lost** but **may duplicate** (retries when an ack is uncertain). The most common → the consumer must be **idempotent** to handle duplicates safely.\
- **Exactly-once**: each message takes effect exactly once. Ideal but **very hard/expensive**; in practice usually achieved via **at-least-once + idempotent dedupe** at the consumer.\
\
**Dead-letter queue (DLQ)**: a side queue holding messages that **fail processing repeatedly** (poison messages). Instead of retrying forever and clogging the main queue, bad messages move to the DLQ for **separate investigation and handling**, without blocking the rest.
