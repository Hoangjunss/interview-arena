---
id: khi-nao-nen-dung-redis-lam-cache
position: backend
technology: nosql
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng Redis làm cache?

## Question (EN)
When should you use Redis as a cache?

## Đáp án chi tiết (VI)
Dùng Redis làm cache khi: dữ liệu đọc nhiều hơn ghi, tính toán đắt (query DB phức tạp, gọi API), cần giảm tải DB, và chấp nhận dữ liệu cũ trong chốc lát.\
\
Vài chiến lược cache:\
- **Cache-aside** (phổ biến nhất): xem cache → trượt thì lấy DB → ghi vào cache.\
- **Write-through**: ghi cache + DB cùng lúc — nhất quán nhưng ghi chậm hơn.\
- **Write-behind**: ghi cache rồi ghi DB bất đồng bộ — nhanh nhưng rủi ro mất dữ liệu khi crash.\
\
**Cache stampede** (hay bị hỏi): khi một key hết hạn, rất nhiều request cùng dồn xuống DB một lúc. Khắc phục bằng mutex lock (`SET key val NX EX 30`) hoặc hết hạn sớm ngẫu nhiên trước TTL thật.\
\
Quản lý bộ nhớ qua `maxmemory-policy`: `allkeys-lru` (đẩy key ít dùng nhất — hợp cache thuần), `volatile-lru` (chỉ đẩy key có TTL), `noeviction` (full thì báo lỗi — hợp lưu session). Theo dõi `INFO stats`; tỉ lệ hit \u003e 80% là khỏe.

## Detailed Answer (EN)
Use Redis as a cache when: data is read-heavy, computations are expensive (complex DB queries, API calls), you need to reduce DB load, and brief staleness is acceptable.\
\
A few caching strategies:\
- **Cache-aside** (most common): check cache → on miss fetch DB → write to cache.\
- **Write-through**: write cache + DB together — consistent but slower writes.\
- **Write-behind**: write cache then write DB asynchronously — fast but risks data loss on crash.\
\
**Cache stampede** (often asked): when a key expires, many requests pile onto the DB at once. Prevent it with a mutex lock (`SET key val NX EX 30`) or randomized early expiration before the real TTL.\
\
Manage memory via `maxmemory-policy`: `allkeys-lru` (evict least-recently-used — for a pure cache), `volatile-lru` (only evict keys with a TTL), `noeviction` (error when full — for session storage). Monitor with `INFO stats`; a hit rate above 80% is healthy.
