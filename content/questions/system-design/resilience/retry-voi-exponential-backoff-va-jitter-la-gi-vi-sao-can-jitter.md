---
id: retry-voi-exponential-backoff-va-jitter-la-gi-vi-sao-can-jitter
position: system-design
technology: resilience
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Retry với exponential backoff và jitter là gì? Vì sao cần jitter?

## Question (EN)
What are retries with exponential backoff and jitter, and why add jitter?

## Đáp án chi tiết (VI)
Khi gọi một dịch vụ bị lỗi tạm thời (timeout, 503), **retry** có thể thành công ở lần sau. Nhưng retry ngay lập tức và dồn dập lại **làm dịch vụ đang yếu càng quá tải**.\
\
- **Exponential backoff**: chờ tăng theo cấp số nhân giữa các lần thử (1s, 2s, 4s, 8s…) → giãn tải, cho dịch vụ hồi phục.\
- **Jitter (ngẫu nhiên hóa)**: cộng thêm độ trễ ngẫu nhiên. Nếu nhiều client cùng backoff theo cùng công thức, chúng sẽ **retry đồng loạt** thành từng đợt (thundering herd); jitter làm **phân tán** các lần retry ra.\
\
Kèm theo: **giới hạn số lần retry** và tổng thời gian, **chỉ retry lỗi tạm thời** (không retry lỗi 4xx do sai request), và đảm bảo thao tác **idempotent** để retry an toàn.

## Detailed Answer (EN)
When a call fails transiently (timeout, 503), a **retry** may succeed. But retrying immediately and aggressively **overloads an already struggling service**.\
\
- **Exponential backoff**: wait exponentially longer between attempts (1s, 2s, 4s, 8s…) → spreads load and lets the service recover.\
- **Jitter (randomization)**: add a random delay. If many clients back off on the same formula, they **retry in synchronized waves** (thundering herd); jitter **spreads** the retries out.\
\
Also: **cap the retry count** and total time, **retry only transient errors** (not 4xx bad requests), and make the operation **idempotent** so retries are safe.
