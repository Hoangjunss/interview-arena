---
id: latency-va-throughput-khac-nhau-ra-sao
position: system-design
technology: performance
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Latency và throughput khác nhau ra sao?

## Question (EN)
How do latency and throughput differ?

## Đáp án chi tiết (VI)
- **Latency**: thời gian xử lý **một** request (ví dụ 20ms). Đo bằng percentile (p50/p95/p99) chứ không chỉ trung bình, vì đuôi phân phối mới phản ánh trải nghiệm xấu nhất.\
- **Throughput**: số request phục vụ được **trong một đơn vị thời gian** (ví dụ 5000 req/s).\
\
Hai đại lượng độc lập: hệ có thể throughput cao nhưng latency cao (batch), hoặc latency thấp mà throughput thấp. Batching, buffering hay hàng đợi thường **tăng throughput nhưng cũng tăng latency** — cần cân bằng theo yêu cầu sản phẩm.

## Detailed Answer (EN)
- **Latency**: time to handle **one** request (e.g. 20ms). Report it as percentiles (p50/p95/p99), not just the average, since the tail reflects the worst experiences.\
- **Throughput**: how many requests are served **per unit time** (e.g. 5000 req/s).\
\
The two are independent: a system can have high throughput but high latency (batching), or low latency but low throughput. Batching, buffering or queueing usually **raise throughput but also raise latency** — balance them against product needs.
