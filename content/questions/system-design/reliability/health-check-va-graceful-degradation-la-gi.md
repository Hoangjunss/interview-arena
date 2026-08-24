---
id: health-check-va-graceful-degradation-la-gi
position: system-design
technology: reliability
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Health check và graceful degradation là gì?

## Question (EN)
What are health checks and graceful degradation?

## Đáp án chi tiết (VI)
**Health check**: endpoint (ví dụ `/health`) để hệ thống tự kiểm tra \\"instance này còn phục vụ được không\\". Load balancer/orchestrator gọi định kỳ, **loại instance hỏng** khỏi pool và định tuyến sang instance khỏe.\
- **Liveness**: tiến trình còn sống không (nếu treo → restart).\
- **Readiness**: đã sẵn sàng nhận traffic chưa (đã kết nối DB, warmup xong).\
- Health check nên kiểm cả dependency quan trọng, nhưng tránh để **một dependency phụ làm cả instance bị đánh dấu chết**.\
\
**Graceful degradation**: khi một phần hệ thống lỗi, phần còn lại **vẫn phục vụ được ở mức giảm** thay vì sập toàn bộ. Ví dụ: trang chủ mất recommendation service → hiển thị danh sách mặc định; cache lỗi → đọc thẳng DB. Đi kèm circuit breaker + fallback.

## Detailed Answer (EN)
**Health check**: an endpoint (e.g. `/health`) letting the system self-report \\"can this instance still serve?\\". Load balancers/orchestrators poll it, **evict unhealthy instances** from the pool, and route to healthy ones.\
- **Liveness**: is the process alive (if hung → restart).\
- **Readiness**: is it ready to take traffic (DB connected, warmup done).\
- Health checks should probe key dependencies, but avoid letting **one minor dependency mark the whole instance dead**.\
\
**Graceful degradation**: when part of the system fails, the rest **keeps serving at a reduced level** instead of collapsing. E.g. the homepage loses the recommendation service → show a default list; cache fails → read straight from the DB. Pairs with circuit breaker + fallback.
