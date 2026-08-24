---
id: queue-depth-la-gi-va-xu-ly-nhu-the-nao-khi-no-tang
position: backend
technology: operations-\u0026-monitoring
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Queue depth là gì và xử lý như thế nào khi nó tăng?

## Question (EN)
What is queue depth and how do you handle it growing?

## Đáp án chi tiết (VI)
Queue depth là số message hiện trong queue bao gồm cả unacked. Queue depth tăng liên tục nghĩa là consumer đang xử lý chậm hơn producer (consumer lag). Nguyên nhân: consumer chậm (CPU-bound, I/O wait, bug), thiếu consumer, downstream service fail. Debug: kiểm tra consumer throughput, error rate, latency. Giải pháp: (1) Tăng số consumer; (2) Tối ưu consumer code; (3) Tăng prefetch nếu consumer bursty; (4) Dùng DLX để isolate failure; (5) Thêm observability để trace message chậm. Monitoring queue depth giúp phát hiện vấn đề trước khi user bị ảnh hưởng.

## Detailed Answer (EN)
Queue depth is the number of messages in a queue including unacked. Growing depth indicates consumers falling behind producers (consumer lag). Root causes: slow consumer (CPU, I/O, bugs), too few consumers, downstream failures. Solutions: increase consumer count, optimize consumer code, increase prefetch for bursty consumers, use DLX to isolate failures. Monitoring queue depth catches issues hours before users notice.
