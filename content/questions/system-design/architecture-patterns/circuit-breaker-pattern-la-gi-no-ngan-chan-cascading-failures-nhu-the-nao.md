---
id: circuit-breaker-pattern-la-gi-no-ngan-chan-cascading-failures-nhu-the-nao
position: system-design
technology: architecture-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Circuit Breaker Pattern là gì? Nó ngăn chặn cascading failures như thế nào?

## Question (EN)
What is the Circuit Breaker Pattern? How does it prevent cascading failures?

## Đáp án chi tiết (VI)
Circuit Breaker là pattern bảo vệ hệ thống khỏi cascading failures khi một dependency bị lỗi – lấy cảm hứng từ cầu dao điện. Hoạt động qua 3 states: Closed (hoạt động bình thường, theo dõi failure rate), Open (sau khi failure rate vượt threshold, tất cả requests đều fail fast ngay lập tức mà không gọi service lỗi – cho service thời gian recover), Half-Open (sau timeout, cho một số requests thử đến service, nếu thành công thì đóng lại, nếu thất bại thì mở lại). Ví dụ không có Circuit Breaker: Payment Service gọi Fraud Detection Service bị chậm → threads bị block chờ timeout → thread pool exhaustion → Payment Service cũng down → cascading failure lan rộng. Với Circuit Breaker: sau N failures, mở circuit, fail fast với cached response hoặc fallback → hệ thống vẫn partially functional. Netflix Hystrix là library phổ biến (hiện maintenance mode), Resilience4j là lựa chọn hiện đại hơn cho Java; Python có pybreaker; built-in trong Istio Service Mesh.

## Detailed Answer (EN)
$83
