---
id: dieu-gi-xay-ra-khi-queue-khong-co-consumer-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điều gì xảy ra khi queue không có consumer nào?

## Question (EN)
What happens when a queue has no consumers?

## Đáp án chi tiết (VI)
Khi queue không có consumer, message vẫn tiếp tục đến và tích lũy trong queue vô thời hạn (hoặc đến khi hết TTL). Đây là thiết kế bình thường — queue sinh ra để buffer message khi consumer tạm thời không available. Tuy nhiên trong production cần monitor vì \\"zero consumer\\" thường báo hiệu worker pod bị crash hoặc bug trong startup logic. Đó là lý do cần alert khi \\"consumer count == 0\\" kéo dài.

## Detailed Answer (EN)
Messages continue arriving and accumulating indefinitely (or until TTL expires). Queues are designed for this — they buffer messages when consumers are temporarily unavailable. However in production, zero consumers often indicates a crashed worker or startup bug. This is why alerting on \\"consumer count == 0\\" for more than a few minutes is critical.
