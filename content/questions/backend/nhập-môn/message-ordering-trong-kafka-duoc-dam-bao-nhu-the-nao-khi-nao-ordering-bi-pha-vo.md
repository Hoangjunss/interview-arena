---
id: message-ordering-trong-kafka-duoc-dam-bao-nhu-the-nao-khi-nao-ordering-bi-pha-vo
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Message ordering trong Kafka được đảm bảo như thế nào? Khi nào ordering bị phá vỡ?

## Question (EN)
How is message ordering guaranteed in Kafka? When can ordering be broken?

## Đáp án chi tiết (VI)
Kafka đảm bảo thứ tự message trong phạm vi một partition — các message được ghi và đọc theo đúng thứ tự FIFO. Tuy nhiên, không có đảm bảo thứ tự giữa các partition khác nhau. Để đảm bảo ordering cho một nhóm message liên quan (ví dụ: tất cả sự kiện của một user), cần gán cùng một `message key` — Kafka sẽ hash key và luôn route message có cùng key vào cùng partition. Ordering có thể bị phá vỡ khi: producer bật `retries \u003e 0` và `max.in.flight.requests.per.connection \u003e 1` (message sau có thể arrive trước message trước bị retry) — giải pháp là bật `enable.idempotence=true`. Ngoài ra, rebalancing consumer group không ảnh hưởng đến thứ tự trong partition vì offset được duy trì.

## Detailed Answer (EN)
Kafka guarantees message ordering within a single partition — messages are written and read in strict FIFO order. However, there is no ordering guarantee across different partitions. To ensure ordering for a group of related messages (e.g., all events for a given user), assign the same `message key` — Kafka will hash the key and always route messages with the same key to the same partition. Ordering can be broken when a producer has `retries \u003e 0` and `max.in.flight.requests.per.connection \u003e 1` (a later message may arrive before a retried earlier one). The fix is to enable `enable.idempotence=true`. Consumer group rebalancing does not affect in-partition ordering because offsets are preserved.
