---
id: cache-stampede-thundering-herd-la-gi-cac-cach-phong-tranh-trong-redis
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache stampede (thundering herd) là gì? Các cách phòng tránh trong Redis?

## Question (EN)
What is a cache stampede (thundering herd)? How do you prevent it in Redis?

## Đáp án chi tiết (VI)
Cache stampede xảy ra khi một hot cache key expire, hàng trăm/nghìn request đồng thời không thấy key trong cache, tất cả cùng query database, gây overload. Cách phòng tránh: Probabilistic Early Expiration — thay vì expire chính xác, tính toán xác suất recompute tăng dần khi gần expire, một request 'may mắn' sẽ recompute trước khi thực sự expire (không cần lock). Mutex/Distributed lock — request đầu tiên acquire lock và load data, các request khác đợi hoặc trả về stale data. Stale-while-revalidate — trả về data cũ ngay lập tức trong khi background job refresh cache (không có downtime nhưng data có thể stale ngắn). Cache warming — preload cache trước khi deploy hoặc khi key sắp expire. Dùng TTL jitter (thêm random ±10-20% vào TTL) để tránh nhiều key expire cùng lúc (tránh stampede hàng loạt). Trong practice, kết hợp mutex lock + stale cache fallback là pattern phổ biến nhất.

## Detailed Answer (EN)
A cache stampede occurs when a hot cache key expires and hundreds or thousands of concurrent requests simultaneously find no data in the cache, all hitting the database at once and causing overload. Prevention strategies: Probabilistic Early Expiration — instead of a hard expiry, increase the probability of a cache refresh as the TTL approaches zero; one 'lucky' request recomputes the value before it actually expires (no lock needed). Mutex/Distributed lock — the first request acquires a lock and loads fresh data; other requests either wait or return stale data. Stale-while-revalidate — immediately return the stale value while a background job refreshes the cache (no downtime, but data may be briefly stale). Cache warming — preload the cache before deployment or before a key is about to expire. Use TTL jitter (add a random ±10-20% offset to TTLs) to prevent many keys from expiring simultaneously. In practice, combining a mutex lock with a stale-cache fallback is the most common pattern.
