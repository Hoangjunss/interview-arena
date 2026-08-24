---
id: rate-limiter-implement-trong-go
position: backend
technology: web-\u0026-api
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rate limiter implement trong Go?

## Question (EN)
How do you implement a rate limiter in Go?

## Đáp án chi tiết (VI)
Để implement rate limiting trong Go, cách chuẩn là dùng package `golang.org/x/time/rate` với token bucket algorithm: `limiter := rate.NewLimiter(rate.Every(time.Second), 10)` tạo limiter cho phép 10 request mỗi giây. Trong HTTP middleware, kiểm tra `if !limiter.Allow()` và trả về status 429 Too Many Requests nếu vượt giới hạn. Để giới hạn theo từng client (per-IP), cần dùng `map[string]*rate.Limiter` kết hợp với mutex để quản lý limiter riêng cho mỗi IP, đồng thời nên dọn dẹp các limiter cũ theo định kỳ để tránh memory leak. Trong môi trường production nhiều server, nên dùng Redis-based distributed rate limiter để đảm bảo giới hạn nhất quán across tất cả instances.

## Detailed Answer (EN)
The standard approach uses `golang.org/x/time/rate` with a token bucket: `limiter := rate.NewLimiter(rate.Every(time.Second), 10)` allows 10 requests per second. In HTTP middleware, check `if !limiter.Allow()` and return 429 Too Many Requests if exceeded. For per-client limiting, maintain a `map[string]*rate.Limiter` protected by a mutex, and periodically clean up stale limiters to avoid memory leaks. In a multi-server production environment, use a Redis-based distributed rate limiter to enforce consistent limits across all instances.
