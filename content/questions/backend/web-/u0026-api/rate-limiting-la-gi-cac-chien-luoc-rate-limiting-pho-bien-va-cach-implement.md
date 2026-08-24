---
id: rate-limiting-la-gi-cac-chien-luoc-rate-limiting-pho-bien-va-cach-implement
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rate limiting là gì? Các chiến lược rate limiting phổ biến và cách implement?

## Question (EN)
What is rate limiting? What are common rate limiting strategies and how do you implement them?

## Đáp án chi tiết (VI)
Rate limiting giới hạn số request trong khoảng thời gian để bảo vệ server khỏi abuse, DDoS, và đảm bảo fair usage.\
\
Các thuật toán:\
- Fixed Window: đếm request trong window cố định (100 req/minute) — đơn giản nhưng có edge case tại boundary.\
- Sliding Window Log: lưu timestamp từng request, đếm trong rolling window — chính xác nhưng tốn memory.\
- Sliding Window Counter: kết hợp hai window giữa — balance giữa độ chính xác và hiệu quả.\
- Token Bucket: bucket chứa tokens, mỗi request tiêu 1 token, token được refill đều — cho phép burst ngắn hạn.\
- Leaky Bucket: queue request và xử lý với tốc độ cố định — smooth output.\
\
Implement: Redis INCR + EXPIRE cho distributed rate limiting; response headers `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After` để client biết limit. Rate limit theo IP, user ID, API key, hoặc kết hợp.

## Detailed Answer (EN)
Rate limiting restricts the number of requests within a time window to protect the server from abuse, DDoS attacks, and to ensure fair usage.\
\
Common algorithms:\
- Fixed Window: counts requests in a fixed window (100 req/minute) — simple but has an edge case at window boundaries.\
- Sliding Window Log: stores a timestamp for each request and counts within a rolling window — accurate but memory-intensive.\
- Sliding Window Counter: combines two adjacent fixed windows — balances accuracy and efficiency.\
- Token Bucket: a bucket holds tokens, each request consumes one token, tokens refill at a steady rate — allows short bursts.\
- Leaky Bucket: queues requests and processes them at a fixed rate — smooths output.\
\
Implementation: use Redis INCR + EXPIRE for distributed rate limiting; include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After` response headers so clients know their limits. Rate limit by IP, user ID, API key, or a combination.
