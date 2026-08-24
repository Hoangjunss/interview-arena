---
id: persistent-message-va-transient-message-khac-nhau-nhu-the-nao
position: backend
technology: reliability-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Persistent message và transient message khác nhau như thế nào?

## Question (EN)
What is the difference between persistent and transient messages?

## Đáp án chi tiết (VI)
Persistent message có delivery mode 2, được ghi xuống disk, survive broker crash/restart — an toàn nhưng chậm hơn do disk I/O. Transient message có delivery mode 1, chỉ sống trong RAM, mất khi broker crash — nhanh nhưng rủi ro. Dùng persistent cho dữ liệu critical (thanh toán, đơn hàng, user account), transient cho dữ liệu có thể thay thế (notification, analytics, cache invalidation). \
\
**Lưu ý:** queue durable KHÔNG đủ — cần cả queue durable VÀ message persistent mới đảm bảo survive hoàn toàn.

## Detailed Answer (EN)
Persistent messages (delivery mode 2) are written to disk and survive broker crashes — safe but slower due to disk I/O. Transient (delivery mode 1) stay in RAM only and are lost on crash — fast but risky. Use persistent for critical data (payments, orders), transient for replaceable data (notifications, analytics). Important: you need BOTH a durable queue AND a persistent message for guaranteed survival.
