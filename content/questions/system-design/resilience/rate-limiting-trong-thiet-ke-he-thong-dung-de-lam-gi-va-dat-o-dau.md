---
id: rate-limiting-trong-thiet-ke-he-thong-dung-de-lam-gi-va-dat-o-dau
position: system-design
technology: resilience
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rate limiting trong thiết kế hệ thống dùng để làm gì và đặt ở đâu?

## Question (EN)
In system design, what is rate limiting for and where is it applied?

## Đáp án chi tiết (VI)
Rate limiting giới hạn số request một client được gửi trong một cửa sổ thời gian, nhằm **chống lạm dụng/DoS**, đảm bảo công bằng giữa người dùng, và **bảo vệ downstream khỏi quá tải**. Vượt hạn → trả **`429 Too Many Requests`** kèm `Retry-After`.\
\
Thuật toán: **fixed window**, **sliding window**, **token bucket** (cho burst có kiểm soát), **leaky bucket** (làm phẳng traffic).\
\
Đặt ở đâu:\
- **API gateway/edge**: chặn sớm, giảm tải toàn hệ.\
- **Per-service**: bảo vệ tài nguyên riêng.\
\
Ở hệ phân tán, bộ đếm phải **chia sẻ giữa nhiều node** → thường lưu ở **store tập trung (Redis)** để tổng hạn đúng, thay vì đếm cục bộ từng node.

## Detailed Answer (EN)
Rate limiting caps how many requests a client may send in a time window, to **prevent abuse/DoS**, ensure fairness across users, and **protect downstream from overload**. Exceeding the limit → **`429 Too Many Requests`** with `Retry-After`.\
\
Algorithms: **fixed window**, **sliding window**, **token bucket** (controlled bursts), **leaky bucket** (traffic smoothing).\
\
Where to apply:\
- **API gateway/edge**: block early, offload the whole system.\
- **Per-service**: protect its own resources.\
\
In a distributed system the counter must be **shared across nodes** → usually kept in a **central store (Redis)** so the global limit is correct, rather than counting per node.
