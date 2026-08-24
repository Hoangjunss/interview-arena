---
id: circuit-breaker-va-retry-voi-exponential-backoff-giai-quyet-gi
position: system-design
technology: resilience
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Circuit breaker và retry với exponential backoff giải quyết gì?

## Question (EN)
What do the circuit breaker and retry-with-exponential-backoff patterns solve?

## Đáp án chi tiết (VI)
Cả hai là mẫu **chịu lỗi** khi gọi service phụ thuộc hay lỗi/chậm.\
\
**Retry + exponential backoff**: khi gọi thất bại tạm thời, thử lại sau khoảng chờ **tăng dần** (1s, 2s, 4s...) thay vì retry dồn dập. Thêm **jitter** (ngẫu nhiên hóa) để tránh nhiều client cùng retry đồng loạt (thundering herd). Chỉ retry lỗi **tạm thời/idempotent**; giới hạn số lần.\
\
**Circuit breaker** (Fowler): bọc lời gọi trong một \\"cầu dao\\" có 3 trạng thái. **Closed**: cho gọi bình thường, đếm lỗi. Lỗi vượt ngưỡng → **Open**: chặn gọi ngay, trả lỗi/fallback tức thì, cho service kia thời gian hồi phục. Sau timeout → **Half-open**: cho vài request thử; thành công thì đóng lại, thất bại thì mở tiếp.\
\
Bổ trợ nhau: backoff tránh dồn request về service đang lỗi; breaker chặn **retry vô ích khi service đã sập**, ngăn lỗi lan (cascading failure) và giải phóng tài nguyên.

## Detailed Answer (EN)
Both are **fault-tolerance** patterns for calling dependencies that may fail or slow down.\
\
**Retry + exponential backoff**: on a transient failure, retry after **growing** waits (1s, 2s, 4s...) instead of hammering. Add **jitter** (randomization) so many clients do not retry in lockstep (thundering herd). Only retry **transient/idempotent** calls; cap the attempts.\
\
**Circuit breaker** (Fowler): wrap the call in a \\"breaker\\" with 3 states. **Closed**: calls pass normally, failures are counted. Failures past a threshold → **Open**: calls are blocked immediately, returning an error/fallback fast and giving the other service time to recover. After a timeout → **Half-open**: a few trial requests pass; success closes it, failure re-opens it.\
\
They complement each other: backoff avoids flooding; the breaker stops **useless retries when the service is already down**, prevents cascading failure, and frees resources.
